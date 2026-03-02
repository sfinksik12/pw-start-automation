/**
 * Паттерн Strategy для поддержки различных типов авторизации
 * Каждая стратегия принимает serviceParams и context, возвращает заголовки авторизации
 */

export interface BearerServiceParams {
  token: string;
}

export interface BasicServiceParams {
  username: string;
  password: string;
}

export interface ApiKeyServiceParams {
  apiKey: string;
  headerName?: string;
}

export type ServiceParams = BearerServiceParams | BasicServiceParams | ApiKeyServiceParams;

export type AuthStrategy = (serviceParams: ServiceParams) => Promise<Record<string, string>>;

export const authStrategies: Record<string, AuthStrategy> = {
  // Bearer Token авторизация (JWT, OAuth)
  bearer: async (serviceParams) => {
    const params = serviceParams as BearerServiceParams;
    if (!params.token) {
      throw new Error('Bearer token is required for Bearer authentication');
    }
    return {
      Authorization: `Bearer ${params.token}`,
    };
  },

  // Basic Auth авторизация
  basic: async (serviceParams) => {
    const params = serviceParams as BasicServiceParams;
    if (!params.username || !params.password) {
      throw new Error('Username and password are required for Basic authentication');
    }
    const encoded = Buffer.from(`${params.username}:${params.password}`).toString('base64');
    return {
      Authorization: `Basic ${encoded}`,
    };
  },

  // API Key авторизация
  apiKey: async (serviceParams) => {
    const params = serviceParams as ApiKeyServiceParams;
    if (!params.apiKey) {
      throw new Error('API key is required for API Key authentication');
    }
    return {
      [params.headerName || 'X-API-Key']: params.apiKey,
    };
  },
};
