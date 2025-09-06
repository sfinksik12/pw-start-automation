import { SchemaValidator } from './schemaValidator.js';
import { request, expect } from '@playwright/test';
import { authStrategies } from './authStrategies.js';
import { AllureReport } from './allureReport.js';
import dotenv from 'dotenv';

dotenv.config();

let allureReport = new AllureReport();

export class API {
  constructor(option) {
    this.request = request;
    this.option = option;
    this.allureReport = allureReport;
    this.schemaValidator = new SchemaValidator();
  }

  async sendRequest(options, method, url) {
    const context = await this.request.newContext();
    const response = await context[method.toLowerCase()](url.href, options);
    await this.allureReport.attachStatusCode(await response.status());
    await this.attachRequestDetailsToReport(options, response);
    await this.attachResponseDetailsToReport(response);
    return response;
  }

  async attachRequestDetailsToReport(options) {
    await this.allureReport.attachRequestHeaders(options.headers);
    if (options.data) {
      await this.allureReport.attachRequestData(options.data);
    }
  }

  async attachResponseDetailsToReport(response) {
    await this.allureReport.attachResponseHeaders(await response.headers());
    const responseBody = await this.parseResponse(response);
    await this.allureReport.attachResponseData(responseBody);
  }

  async parseResponse(response) {
    try {
      return await response.json();
    } catch (error) {
      return await response.text();
    }
  }

  async createRequest(serviceParams) {
    const url = this.buildUrl();
    const options = await this.buildRequestOptions(serviceParams, url);
    const methodEmoji = this.getMethodEmoji(this.option.method);

    const responsePromise = this.allureReport.allure.step(`${methodEmoji} ${this.option.method} ${url}`, () =>
      this.sendRequest(options, this.option.method, url),
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

  buildUrl() {
    let baseUrl = this.option.url.replace(/\/\//, '');
    let path = this.option.path.replace(/^\//, '');
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
    let combinedUrl = `${baseUrl}/${path}`;
    let url = new URL(combinedUrl);

    if (this.option.params) {
      Object.entries(this.option.params).forEach(([key, value]) => {
        url.searchParams.append(key, value);
      });
    }

    return url;
  }

  async buildRequestOptions(serviceParams, url) {
    let headers = {};

    if (this.option.data instanceof FormData) {
      // Для FormData всегда используем multipart/form-data
      const boundary = '----WebKitFormBoundary' + Math.random().toString(16).slice(2);
      headers = {
        'Content-Type': `multipart/form-data; boundary=${boundary}`,
        ...this.option.headers,
      };
    } else {
      headers = {
        'Content-Type': this.option.headers?.['Content-Type'] || 'application/json',
        ...this.option.headers,
      };
    }

    const options = {
      verify: false,
      headers,
      ...this.option.params,
    };

    if (this.option.data) {
      options['data'] = this.option.data;
    }

    // Динамическая обработка авторизации через паттерн Strategy
    if (serviceParams.methodAuth) {
      const strategy = authStrategies[serviceParams.methodAuth];
      if (!strategy) {
        throw new Error(`Unsupported authentication method: ${serviceParams.methodAuth}`);
      }

      const context = {
        method: this.option.method,
        path: this.option.path,
        search: url.search,
        data: this.option.data,
        rawData: this.option.rawData,
      };

      const authHeaders = await strategy(serviceParams, context);
      options.headers = { ...options.headers, ...authHeaders };
    }

    return options;
  }

  async handleResponse(responsePromise) {
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
    } catch (error) {
      return null;
    }
  }

  getMethodEmoji(method) {
    const methodMap = {
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

export async function httpRequest(comment, options, serviceParams = {}) {
  const { responsePromise, json } = await allureReport.allure.step(comment, async () => {
    return await new API(options, allureReport).createRequest(serviceParams);
  });
  let awaitedPromise = await responsePromise;
  return { promise: awaitedPromise, json };
}
