import { expect as baseExpect } from '@playwright/test';
import { assertionBase, logMessageElem } from './expectBase';

export const toBeVisibleAllure = baseExpect.extend({
  async toBeVisibleAllure(locator: unknown, whatMessage?: string) {
    const subject = whatMessage ?? logMessageElem(locator);
    const logMessage = `👁️ Check: "${subject}" should be visible`;
    return assertionBase({
      assertionContext: this,
      baseAssertionName: 'toBeVisible',
      logMessage,
      data: { locator },
    });
  },
});
