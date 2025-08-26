import { expect as baseExpect } from '@playwright/test';
import { assertionBase, logMessageElem } from './expectBase.js';

export const toBeEditableAllure = baseExpect.extend({
  async toBeEditableAllure(locator, whatMessage) {
    const subject = whatMessage ?? logMessageElem(locator);
    const logMessage = `👁️ Check: "${subject}" should be editable`;
    return assertionBase({
      assertionContext: this,
      baseAssertionName: 'toBeEditable',
      logMessage,
      data: { locator },
    });
  },
});
