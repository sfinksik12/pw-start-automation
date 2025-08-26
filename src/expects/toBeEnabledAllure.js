import { expect as baseExpect } from '@playwright/test';
import { assertionBase, logMessageElem } from './expectBase.js';

export const toBeEnabledAllure = baseExpect.extend({
  async toBeEnabledAllure(locator, whatMessage) {
    const subject = whatMessage ?? logMessageElem(locator);
    const logMessage = `👁️ Check: "${subject}" should be enabled`;
    return assertionBase({
      assertionContext: this,
      baseAssertionName: 'toBeEnabled',
      logMessage,
      data: { locator },
    });
  },
});
