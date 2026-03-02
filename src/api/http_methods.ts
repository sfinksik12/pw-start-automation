import { SchemaValidator } from './schemaValidator';
import { request, expect } from '@playwright/test';
import { authStrategies } from './authStrategies';
import { AllureReport } from './allureReport';
import dotenv from 'dotenv';

dotenv.config();

const allureReport = new AllureReport();

export interface APIRequestOptions {
  method: string;
  url: string;
  path: string;
  headers?: Record<string, string>;
  data?: unknown;
  rawData?: unknown;
  params?: Record<string, string>;
  schema?: object;
}

export interface ServiceParams {
  methodAuth?: string;
  token?: string;
  username?: string;
  password?: string;
  apiKey?: string;
  headerName?: string;
}

export class API {
  private readonly requestContext: typeof request;
  private readonly option: APIRequestOptions;
  private readonly allureReport: AllureReport;
  private readonly schemaValidator: SchemaValidator;

  constructor(option: APIRequestOptions) {
    this.requestContext = request;
    this.option = option;
    this.allureReport = allureReport;
    this.schemaValidator = new SchemaValidator();
  }

  async sendRequest(
    options: Record<string, unknown> & { headers?: Record<string, string>; data?: unknown },
    method: string,
    url: URL
  ): Promise<import('@playwright/test').APIResponse> {
    const context = await this.requestContext.newContext();
    const contextAny = context as unknown as Record<string, (url: string, options?: unknown) => Promise<import('@playwright/test').APIResponse>>;
    const response = await contextAny[method.toLowerCase()](url.href, options);
    await this.allureReport.attachStatusCode(response.status());
    await this.attachRequestDetailsToReport(options);
    await this.attachResponseDetailsToReport(response);
    return response;
  }

  async attachRequestDetailsToReport(options: { headers?: Record<string, string>; data?: unknown }): Promise<void> {
    if (options.headers) {
      await this.allureReport.attachRequestHeaders(options.headers);
    }
    if (options.data) {
      await this.allureReport.attachRequestData(options.data);
    }
  }

  async attachResponseDetailsToReport(response: import('@playwright/test').APIResponse): Promise<void> {
    const headers = response.headers();
    await this.allureReport.attachResponseHeaders(headers as Record<string, string>);
    const responseBody = await this.parseResponse(response);
    await this.allureReport.attachResponseData(responseBody);
  }

  async parseResponse(response: import('@playwright/test').APIResponse): Promise<unknown> {
    try {
      return await response.json();
    } catch {
      return await response.text();
    }
  }

  async createRequest(serviceParams: ServiceParams = {}): Promise<{ responsePromise: Promise<import('@playwright/test').APIResponse>; json: unknown }> {
    const url = this.buildUrl();
    const options = await this.buildRequestOptions(serviceParams, url);
    const methodEmoji = this.getMethodEmoji(this.option.method);

    const responsePromise = this.allureReport.allure.step(`${methodEmoji} ${this.option.method} ${url}`, () =>
      this.sendRequest(options, this.option.method, url)
    );

    const json = await this.handleResponse(responsePromise);

    if (this.option.schema) {
      const validationData = await this.schemaValidator.validate(this.option.schema, json);
      if (!validationData.isValid) {
        await this.allureReport.attachValidationErrorData(validationData.validateErrors);
      }
      expect(validationData.isValid).toEqual(true);
    }

    return { responsePromise, json };
  }

  buildUrl(): URL {
    let baseUrl = this.option.url.replace(/\/\//, '');
    const path = this.option.path.replace(/^\//, '');
    let afterMarker = '';
    let markerIndex = baseUrl.indexOf('xc');
    let markerLength = 2;

    if (markerIndex === -1) {
      markerIndex = baseUrl.indexOf('dp');
      markerLength = 2;
    }

    if (markerIndex !== -1 && markerIndex + markerLength < baseUrl.length) {
      afterMarker = baseUrl.slice(markerIndex + markerLength);
      baseUrl = baseUrl.slice(0, markerIndex + markerLength);
    }

    baseUrl = `${baseUrl}${afterMarker}`;
    const combinedUrl = `${baseUrl}/${path}`;
    const url = new URL(combinedUrl);

    if (this.option.params) {
      Object.entries(this.option.params).forEach(([key, value]) => {
        url.searchParams.append(key, value);
      });
    }

    return url;
  }

  async buildRequestOptions(
    serviceParams: ServiceParams,
    url: URL
  ): Promise<Record<string, unknown> & { headers: Record<string, string> }> {
    let headers: Record<string, string>;

    if (this.option.data instanceof FormData) {
      const boundary = '----WebKitFormBoundary' + Math.random().toString(16).slice(2);
      headers = {
        'Content-Type': `multipart/form-data; boundary=${boundary}`,
        ...(this.option.headers ?? {}),
      };
    } else {
      headers = {
        'Content-Type': this.option.headers?.['Content-Type'] || 'application/json',
        ...(this.option.headers ?? {}),
      };
    }

    const options: Record<string, unknown> & { headers: Record<string, string> } = {
      verify: false,
      headers,
      ...(this.option.params ?? {}),
    };

    if (this.option.data) {
      options['data'] = this.option.data;
    }

    if (serviceParams.methodAuth) {
      const strategy = authStrategies[serviceParams.methodAuth];
      if (!strategy) {
        throw new Error(`Unsupported authentication method: ${serviceParams.methodAuth}`);
      }

      const authHeaders = await strategy(serviceParams as import('./authStrategies').ServiceParams);
      options.headers = { ...options.headers, ...authHeaders };
    }

    return options;
  }

  async handleResponse(responsePromise: Promise<import('@playwright/test').APIResponse>): Promise<unknown> {
    const response = await responsePromise;
    try {
      const buffer = await response.body();
      if (buffer && buffer.length > 0) {
        const jsonString = buffer.toString('utf8');
        if (jsonString.trim() !== '') {
          return JSON.parse(jsonString);
        }
      }
      return null;
    } catch {
      return null;
    }
  }

  getMethodEmoji(method: string): string {
    const methodMap: Record<string, string> = {
      GET: '🔍',
      POST: '📝',
      PUT: '📤',
      PATCH: '🔄',
      DELETE: '🗑️',
      HEAD: '👀',
      OPTIONS: '⚙️',
    };
    return methodMap[method.toUpperCase()] || '🌐';
  }
}

export async function httpRequest(
  comment: string,
  options: APIRequestOptions,
  serviceParams: ServiceParams = {}
): Promise<{ promise: import('@playwright/test').APIResponse; json: unknown }> {
  const { responsePromise, json } = await allureReport.allure.step(comment, async () => {
    return await new API(options).createRequest(serviceParams);
  });
  const awaitedPromise = await responsePromise;
  return { promise: awaitedPromise, json };
}
