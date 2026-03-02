import { expect as baseExpect } from '@playwright/test';
import { assertionBase, logMessageElem } from './expectBase';

export const toHaveTextAllure = baseExpect.extend({
  async toHaveTextAllure(locator: unknown, expectedText: string | RegExp, whatMessage?: string) {
    const subject = whatMessage ?? logMessageElem(locator);
    const logMessage = `📝 Check: "${subject}" should contain text "${expectedText}"`;
    return assertionBase({
      assertionContext: this,
      baseAssertionName: 'toHaveText',
      logMessage,
      data: {
        locator,
        expectedValue: expectedText,
      },
    });
  },
});
