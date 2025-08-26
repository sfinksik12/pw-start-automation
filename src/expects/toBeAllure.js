import { expect as baseExpect } from '@playwright/test';
import { assertionBase } from './expectBase.js';

export const toBeAllure = baseExpect.extend({
  async toBeAllure(value, expected, whatMessage) {
    const subject = whatMessage ?? 'value';
    const logMessage = `🎯 Check: "${subject}" should be "${expected}"`;
    return assertionBase({
      assertionContext: this,
      baseAssertionName: 'toBe',
      logMessage,
      data: {
        actualValue: value,
        expectedValue: expected,
      },
    });
  },
});
