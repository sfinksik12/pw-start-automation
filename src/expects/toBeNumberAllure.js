import { expect as baseExpect } from '@playwright/test';
import { assertionBase } from './expectBase.js';

export const toBeNumberAllure = baseExpect.extend({
  async toBeNumberAllure(value, whatMessage) {
    const subject = whatMessage ?? 'value';
    const logMessage = `🔍 Check: "${subject}" should be a number`;
    return assertionBase({
      assertionContext: this,
      baseAssertionName: 'toBe',
      logMessage,
      data: {
        actualValue: typeof value,
        expectedValue: 'number',
      },
    });
  },
});
