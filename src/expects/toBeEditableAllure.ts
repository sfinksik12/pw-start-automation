import { expect as baseExpect } from '@playwright/test';
import { assertionBase, logMessageElem } from './expectBase';

export const toBeEditableAllure = baseExpect.extend({
  async toBeEditableAllure(locator: unknown, whatMessage?: string) {
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
