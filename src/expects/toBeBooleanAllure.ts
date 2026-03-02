import { expect as baseExpect } from '@playwright/test';
import { assertionBase } from './expectBase';

export const toBeBooleanAllure = baseExpect.extend({
  async toBeBooleanAllure(value: unknown, whatMessage?: string) {
    const subject = whatMessage ?? 'value';
    const logMessage = `🔍 Check: "${subject}" should be a boolean value`;
    return assertionBase({
      assertionContext: this,
      baseAssertionName: 'toBe',
      logMessage,
      data: {
        actualValue: typeof value,
        expectedValue: 'boolean',
      },
    });
  },
});
