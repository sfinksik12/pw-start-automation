import { expect as baseExpect } from '@playwright/test';
import { assertionBase } from './expectBase';

export const toBeStringAllure = baseExpect.extend({
  async toBeStringAllure(value: unknown, whatMessage?: string) {
    const subject = whatMessage ?? 'value';
    const logMessage = `🔍 Check: "${subject}" should be a string`;
    return assertionBase({
      assertionContext: this,
      baseAssertionName: 'toBe',
      logMessage,
      data: {
        actualValue: typeof value,
        expectedValue: 'string',
      },
    });
  },
});
