import { expect as baseExpect } from '@playwright/test';
import { assertionBase } from './expectBase';

export const toBeNullAllure = baseExpect.extend({
  async toBeNullAllure(value: unknown, whatMessage?: string) {
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
