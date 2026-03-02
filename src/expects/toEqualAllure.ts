import { expect as baseExpect } from '@playwright/test';
import { assertionBase } from './expectBase';

export const toEqualAllure = baseExpect.extend({
  async toEqualAllure(actual: unknown, expected: unknown, whatMessage?: string) {
    const subject = whatMessage ?? 'values';
    const logMessage = `🎯 Check: "${subject}" should be equal to "${expected}"`;
    return assertionBase({
      assertionContext: this,
      baseAssertionName: 'toEqual',
      logMessage,
      data: {
        actualValue: actual,
        expectedValue: expected,
      },
    });
  },
});
