import { expect as baseExpect } from '@playwright/test';
import { assertionBase, logMessageElem } from './expectBase.js';

export const toBeDisabledAllure = baseExpect.extend({
  async toBeDisabledAllure(locator, whatMessage) {
    const subject = whatMessage ?? logMessageElem(locator);
    const logMessage = `👁️ Check: "${subject}" should be disabled`;
    return assertionBase({
      assertionContext: this,
      baseAssertionName: 'toBeDisabled',
      logMessage,
      data: { locator },
    });
  },
});
