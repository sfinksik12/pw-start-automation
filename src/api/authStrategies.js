/**
 * Паттерн Strategy для поддержки различных типов авторизации
 * Каждая стратегия принимает serviceParams и context, возвращает заголовки авторизации
 */
export const authStrategies = {
  // Bearer Token авторизация (JWT, OAuth)
  bearer: async serviceParams => {
    if (!serviceParams.token) {
      throw new Error('Bearer token is required for Bearer authentication');
    }
    return {
      Authorization: `Bearer ${serviceParams.token}`,
    };
  },

  // Basic Auth авторизация
  basic: async serviceParams => {
    if (!serviceParams.username || !serviceParams.password) {
      throw new Error('Username and password are required for Basic authentication');
    }
    const encoded = Buffer.from(`${serviceParams.username}:${serviceParams.password}`).toString('base64');
    return {
      Authorization: `Basic ${encoded}`,
    };
  },

  // API Key авторизация
  apiKey: async serviceParams => {
    if (!serviceParams.apiKey) {
      throw new Error('API key is required for API Key authentication');
    }
    return {
      [serviceParams.headerName || 'X-API-Key']: serviceParams.apiKey,
    };
  },
};
