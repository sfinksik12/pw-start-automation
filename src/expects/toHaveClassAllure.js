import { expect as baseExpect } from '@playwright/test';
import { assertionBase, logMessageElem } from './expectBase.js';

export const toHaveClassAllure = baseExpect.extend({
  async toHaveClassAllure(locator, expectedClass, options) {
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
