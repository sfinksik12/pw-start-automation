import { expect as baseExpect } from '@playwright/test';
import { assertionBase, logMessageElem } from './expectBase';

export const toBeDisabledAllure = baseExpect.extend({
  async toBeDisabledAllure(locator: unknown, whatMessage?: string) {
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
