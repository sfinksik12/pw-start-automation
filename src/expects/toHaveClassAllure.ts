import { expect as baseExpect } from '@playwright/test';
import { assertionBase, logMessageElem } from './expectBase';

export const toHaveClassAllure = baseExpect.extend({
  async toHaveClassAllure(locator: unknown, expectedClass: string | RegExp, options?: { timeout?: number }) {
    const logMessage = `📝 Check: "${logMessageElem(locator)}" should have class "${expectedClass}"`;

    return assertionBase({
      assertionContext: this,
      baseAssertionName: 'toHaveClass',
      logMessage,
      data: {
        locator,
        expectedValue: expectedClass,
        timeout: options?.timeout,
      },
    });
  },
});
