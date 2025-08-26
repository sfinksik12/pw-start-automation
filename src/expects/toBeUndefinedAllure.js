import { expect as baseExpect } from '@playwright/test';
import { assertionBase } from './expectBase.js';

export const toBeUndefinedAllure = baseExpect.extend({
  async toBeUndefinedAllure(value, whatMessage) {
    const subject = whatMessage ?? 'value';
    const logMessage = `🔍 Check: "${subject}" should be undefined`;
    return assertionBase({
      assertionContext: this,
      baseAssertionName: 'toBe',
      logMessage,
      data: {
        actualValue: value,
        expectedValue: undefined,
      },
    });
  },
});
