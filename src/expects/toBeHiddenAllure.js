import { expect as baseExpect } from '@playwright/test';
import { assertionBase, logMessageElem } from './expectBase.js';

export const toBeHiddenAllure = baseExpect.extend({
  async toBeHiddenAllure(locator, whatMessage) {
    const subject = whatMessage ?? logMessageElem(locator);
    const logMessage = `👁️ Check: "${subject}" should be hidden`;
    return assertionBase({
      assertionContext: this,
      baseAssertionName: 'toBeHidden',
      logMessage,
      data: { locator },
    });
  },
});
