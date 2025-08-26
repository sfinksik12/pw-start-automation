import { expect as baseExpect } from '@playwright/test';
import { assertionBase } from './expectBase.js';

function isPlainObject(val) {
  return val !== null && typeof val === 'object' && !Array.isArray(val);
}

export const toBeObjectAllure = baseExpect.extend({
  async toBeObjectAllure(value, whatMessage) {
    const subject = whatMessage ?? 'value';
    const logMessage = `🔍 Check: "${subject}" should be an object`;
    return assertionBase({
      assertionContext: this,
      baseAssertionName: 'toBe',
      logMessage,
      data: {
        actualValue: isPlainObject(value),
        expectedValue: true,
      },
    });
  },
});
