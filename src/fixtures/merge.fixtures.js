import { test as baseTest, mergeTests, mergeExpects } from '@playwright/test';
import { expectExtensions } from '../expects/index.js';

export const test = mergeTests(baseTest);
export const expect = mergeExpects(...expectExtensions);
