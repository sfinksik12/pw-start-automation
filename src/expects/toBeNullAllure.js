import { expect as baseExpect } from '@playwright/test';
import { assertionBase } from './expectBase.js';

export const toBeNullAllure = baseExpect.extend({
  async toBeNullAllure(value, whatMessage) {
    const subject = whatMessage ?? 'value';
    const logMessage = `🔍 Check: "${subject}" should be null`;
    return assertionBase({
      assertionContext: this,
      baseAssertionName: 'toBe',
      logMessage,
      data: {
        actualValue: value,
        expectedValue: null,
      },
    });
  },
});
