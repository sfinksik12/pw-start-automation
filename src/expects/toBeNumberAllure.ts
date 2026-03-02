import { expect as baseExpect } from '@playwright/test';
import { assertionBase } from './expectBase';

export const toBeNumberAllure = baseExpect.extend({
  async toBeNumberAllure(value: unknown, whatMessage?: string) {
    const subject = whatMessage ?? 'value';
    const logMessage = `🔍 Check: "${subject}" should be a number`;
    return assertionBase({
      assertionContext: this,
      baseAssertionName: 'toBe',
      logMessage,
      data: {
        actualValue: typeof value,
        expectedValue: 'number',
      },
    });
  },
});
