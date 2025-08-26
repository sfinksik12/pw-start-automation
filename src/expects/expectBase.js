import { allure } from 'allure-playwright';
import { expect as baseExpected } from '@playwright/test';

export async function assertionBase(options) {
  const { assertionContext, baseAssertionName, logMessage, message } = options;
  const { actualValue, expectedValue, locator, page } = options.data;

  const customAssertionName = `${baseAssertionName}Allure`;

  let pass = false;
  let matcherResult;

  try {
    let actualInExpected;
    if (actualValue !== undefined) {
      actualInExpected = actualValue;
    } else if (locator !== undefined) {
      actualInExpected = typeof locator?.getLocator === 'function' ? locator.getLocator() : locator;
      if (typeof locator === 'object' && locator?.element) {
        actualInExpected = locator.element;
      }
    } else {
      actualInExpected = page;
    }

    const expectedInExpected = getExpectedOptions(options);

    await allure.step(logMessage, async () => {
      const expectBuilder = assertionContext.isSoft ? baseExpected.soft(actualInExpected) : baseExpected(actualInExpected);
      const expectChain = assertionContext.isNot ? expectBuilder.not : expectBuilder;
      await expectChain[baseAssertionName](...expectedInExpected);
    });

    pass = true;
  } catch (err) {
    matcherResult = err && (err.matcherResult || err);
    pass = false;
  }

  const finalMessage = getMessage(assertionContext, pass, customAssertionName, matcherResult, message);

  return {
    message: () => finalMessage,
    pass,
    name: customAssertionName,
    expectedValue,
    actual: matcherResult && matcherResult.actual !== undefined ? matcherResult.actual : actualValue,
  };
}

function getExpectedOptions(options) {
  const { expectedValue, attribute, timeout } = options.data;
  const arr = [];
  if (attribute) arr.push(attribute);
  if (expectedValue !== undefined) arr.push(expectedValue);
  if (timeout) arr.push({ timeout });
  return arr;
}

export function logMessageElem(locator, message) {
  if (message) return message;

  if (typeof locator === 'object' && locator !== null) {
    if (locator.displayName && locator.elementType) {
      return `${locator.elementType} "${locator.displayName}"`;
    }
    if (locator.name) return locator.name.toString();
    if (locator.elementType) return locator.elementType.toString();
  }

  if (locator?.toString) {
    const str = locator.toString();
    const match = str.match(/\.describe\("([^"]+)"\)/);
    if (match) return match[1];
    return str;
  }
  return String(locator);
}

export function getMessage(assertionContext, pass, customAssertionName, matcherResult, message) {
  if (pass) return 'passed';
  const hint = assertionContext.utils?.matcherHint
    ? assertionContext.utils.matcherHint(customAssertionName, undefined, undefined, {
        isNot: assertionContext.isNot,
      })
    : customAssertionName;
  return message || (typeof matcherResult === 'object' && matcherResult?.message) || matcherResult || hint;
}
