import { test } from '@playwright/test';

test('debug header', async ({ page }) => {
  await page.goto('https://playwright.dev');
  await page.waitForLoadState('networkidle');

  // Get header HTML structure
  const headerHTML = await page.evaluate(() => {
    const header = document.querySelector('header') || document.querySelector('nav') || document.querySelector('[class*="nav"]');
    return header?.outerHTML;
  });

  console.log('Header HTML:', headerHTML);

  // List all elements that might be header
  const allHeaders = await page.evaluate(() => {
    const elements = document.querySelectorAll('header, nav, [class*="nav"], [class*="header"], [class*="navbar"]');
    return Array.from(elements).map(el => ({
      tag: el.tagName,
      className: el.className,
      id: el.id,
      text: el.textContent?.substring(0, 100),
    }));
  });

  console.log('All header-like elements:', JSON.stringify(allHeaders, null, 2));
});
