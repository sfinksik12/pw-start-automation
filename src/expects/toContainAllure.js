import { expect as baseExpect } from '@playwright/test';
import { assertionBase } from './expectBase.js';

export const toContainAllure = baseExpect.extend({
  async toContainAllure(value, expected, whatMessage) {
    const subject = whatMessage ?? 'value';
    const logMessage = `🔍 Check: "${subject}" should contain "${expected}"`;
    return assertionBase({
      assertionContext: this,
      baseAssertionName: 'toContain',
      logMessage,
      data: {
        actualValue: value,
        expectedValue: expected,
      },
    });
  },
});
