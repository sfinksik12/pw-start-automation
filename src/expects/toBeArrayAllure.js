import { expect as baseExpect } from '@playwright/test';
import { assertionBase } from './expectBase.js';

export const toBeArrayAllure = baseExpect.extend({
  async toBeArrayAllure(value, whatMessage) {
    const subject = whatMessage ?? 'value';
    const logMessage = `🔍 Check: "${subject}" should be an array`;
    return assertionBase({
      assertionContext: this,
      baseAssertionName: 'toBe',
      logMessage,
      data: {
        actualValue: Array.isArray(value),
        expectedValue: true,
      },
    });
  },
});
