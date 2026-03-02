import { expect as baseExpect } from '@playwright/test';
import { assertionBase, logMessageElem } from './expectBase';

export const toHaveAttributeAllure = baseExpect.extend({
  async toHaveAttributeAllure(locator: unknown, attributeName: string, expectedValue: string | RegExp, whatMessage?: string) {
    const subject = whatMessage ?? logMessageElem(locator);
    const logMessage = `📝 Check: "${subject}" should have attribute "${attributeName}" with value "${expectedValue}"`;
    return assertionBase({
      assertionContext: this,
      baseAssertionName: 'toHaveAttribute',
      logMessage,
      data: {
        locator,
        attribute: attributeName,
        expectedValue,
      },
    });
  },
});
