import { allure } from 'allure-playwright';

export class AllureReport {
  constructor() {
    this.allure = allure;
  }

  async attachData(title, data) {
    const formattedData = this.formatDataAsJson(data);
    await this.allure.attachment(`${title}`, formattedData, 'application/json');
  }

  async attachStatusCode(code) {
    const statusEmoji = this.getStatusEmoji(code);
    await this.allure.logStep(`${statusEmoji} ${code}`);
  }

  async attachRequestData(data) {
    await this.attachData('📡 Request Data', data);
  }

  async attachRequestHeaders(headers) {
    await this.attachData('⬆️ Request Headers', headers);
  }

  async attachResponseData(data) {
    await this.attachData('📥 Response Data', data);
  }

  async attachResponseHeaders(headers) {
    await this.attachData('⬇️ Response Headers', headers);
  }

  async attachValidationErrorData(data) {
    await this.attachData('⚠️ Validation Error', data);
  }

  getStatusEmoji(code) {
    if (code >= 200 && code < 300) return '✓'; // Success
    if (code >= 300 && code < 400) return '↪️'; // Redirect
    if (code >= 400 && code < 500) return '⚡'; // Client Error
    if (code >= 500) return '⛔'; // Server Error
    return '❔'; // Unknown
  }

  formatDataAsJson(data) {
    const isJsonObject = typeof data === 'object' && data !== null;
    return isJsonObject ? JSON.stringify(data, null, 2) : data || '';
  }
}
