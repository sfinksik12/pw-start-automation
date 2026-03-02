import { expect as baseExpect } from '@playwright/test';
import { assertionBase } from './expectBase';

export const toBeUndefinedAllure = baseExpect.extend({
  async toBeUndefinedAllure(value: unknown, whatMessage?: string) {
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
