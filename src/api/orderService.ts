import { httpRequest } from './http_methods';

export class OrderService {
  authParams: unknown;
  baseUrl: string;
  endpoints: { orders: string };

  constructor(authParams: unknown = {}) {
    this.authParams = authParams;
    this.baseUrl = 'https://www.google.com/intl/ru/chrome';
    this.endpoints = {
      orders: '/',
    };
  }

  async getPage(filters: Record<string, string> = {}): Promise<{ promise: import('@playwright/test').APIResponse; json: unknown }> {
    const options = {
      method: 'GET',
      url: this.baseUrl,
      path: this.endpoints.orders,
      params: filters,
    };

    return await httpRequest('Получение страницы', options);
  }
}
