import { expect as baseExpect } from '@playwright/test';
import { assertionBase } from './expectBase';

export const toBeAllure = baseExpect.extend({
  async toBeAllure(value: unknown, expected: unknown, whatMessage?: string) {
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
