import { expect as baseExpect } from '@playwright/test';
import { assertionBase, logMessageElem } from './expectBase';

export const toBeEnabledAllure = baseExpect.extend({
  async toBeEnabledAllure(locator: unknown, whatMessage?: string) {
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
