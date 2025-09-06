import Ajv from 'ajv';
import addFormats from 'ajv-formats';
import addErrorMessages from 'ajv-errors';

/**
 * Класс SchemaValidator предоставляет методы для валидации объектов по заданной схеме
 * Использует библиотеку AJV для компиляции и выполнения валидации
 */
export class SchemaValidator {
  constructor() {
    this.ajv = new Ajv({ allErrors: true });
    addFormats(this.ajv); // Добавляем поддержку форматов
    addErrorMessages(this.ajv); // Настраиваем форматирование ошибок
  }

  async validate(schema, data) {
    const validate = this.ajv.compile(schema);
    const isValid = validate(data);
    const validateErrors = validate.errors ? this.formatErrors(validate.errors, data) : {};
    if (!isValid) {
      console.error('Ошибки валидации:', validateErrors);
    }
    return { isValid, validateErrors };
  }

  async findMatchingObject(validationSchema, response) {
    const validate = this.ajv.compile(validationSchema);

    for (let index = 0; index < response.length; index++) {
      if (validate(response[index])) {
        return { isValid: true, validIndex: index };
      }
    }

    return { isValid: false };
  }

  formatErrors(errors, data) {
    return errors.reduce((acc, error) => {
      const { instancePath, message, keyword, params } = error;
      const currentValue = this.getValueByPath(data, instancePath);
      const field = instancePath || 'root'; // Если instancePath пустой, то это корневой объект
      let errorMessage;

      switch (keyword) {
        case 'type':
          errorMessage = `Поле '${field}' должно быть типа ${params.type}, но сейчас ${typeof currentValue}.`;
          break;
        case 'const':
          errorMessage = `Поле '${field}' должно быть равно ${params.allowedValue}, но сейчас ${currentValue}.`;
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

  getValueByPath(obj, path) {
    const keys = path.split('/').filter(Boolean);
    return keys.reduce((acc, key) => acc && acc[key], obj);
  }
}
