import { expect as baseExpect } from '@playwright/test';
import { assertionBase } from './expectBase';

export const toContainAllure = baseExpect.extend({
  async toContainAllure(value: unknown, expected: unknown, whatMessage?: string) {
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
