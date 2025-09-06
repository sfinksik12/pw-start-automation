import { httpRequest } from './http_methods.js';

export class OrderService {
  constructor(authParams = {}) {
    this.authParams = authParams;
    this.baseUrl = 'https://www.google.com/intl/ru/chrome';
    this.endpoints = {
      orders: '/',
    };
  }

  async getPage(filters = {}) {
    const options = {
      method: 'GET',
      url: this.baseUrl,
      path: this.endpoints.orders,
      params: filters,
    };

    // const authParams = { ...this.authParams, ...serviceParams };

    return await httpRequest('Получение страницы', options /*authParams*/);
  }
}
