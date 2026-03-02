import Ajv, { type ErrorObject } from 'ajv';
import addFormats from 'ajv-formats';
import addErrorMessages from 'ajv-errors';

/**
 * Класс SchemaValidator предоставляет методы для валидации объектов по заданной схеме
 * Использует библиотеку AJV для компиляции и выполнения валидации
 */
export class SchemaValidator {
  private ajv: Ajv;

  constructor() {
    this.ajv = new Ajv({ allErrors: true });
    addFormats(this.ajv);
    addErrorMessages(this.ajv);
  }

  async validate(schema: object, data: unknown): Promise<{ isValid: boolean; validateErrors: Record<string, string[]> }> {
    const validate = this.ajv.compile(schema);
    const isValid = validate(data);
    const validateErrors = validate.errors ? this.formatErrors(validate.errors, data) : {};
    if (!isValid) {
      console.error('Ошибки валидации:', validateErrors);
    }
    return { isValid, validateErrors };
  }

  async findMatchingObject(validationSchema: object, response: unknown[]): Promise<{ isValid: boolean; validIndex?: number }> {
    const validate = this.ajv.compile(validationSchema);

    for (let index = 0; index < response.length; index++) {
      if (validate(response[index])) {
        return { isValid: true, validIndex: index };
      }
    }

    return { isValid: false };
  }

  formatErrors(errors: ErrorObject[], data: unknown): Record<string, string[]> {
    return errors.reduce<Record<string, string[]>>((acc, error) => {
      const { instancePath, message, keyword, params } = error;
      const currentValue = this.getValueByPath(data, instancePath);
      const field = instancePath || 'root';
      let errorMessage: string;

      switch (keyword) {
        case 'type':
          errorMessage = `Поле '${field}' должно быть типа ${(params as { type?: string }).type}, но сейчас ${typeof currentValue}.`;
          break;
        case 'const':
          errorMessage = `Поле '${field}' должно быть равно ${(params as { allowedValue?: unknown }).allowedValue}, но сейчас ${currentValue}.`;
          break;
        default:
          errorMessage = `Поле '${field}': ${message}.`;
      }

      if (!acc[field]) {
        acc[field] = [];
      }
      acc[field].push(errorMessage);
      return acc;
    }, {});
  }

  getValueByPath(obj: unknown, path: string): unknown {
    const keys = path.split('/').filter(Boolean);
    return keys.reduce((acc: unknown, key) => (acc && typeof acc === 'object' && key in acc ? (acc as Record<string, unknown>)[key] : undefined), obj);
  }
}
