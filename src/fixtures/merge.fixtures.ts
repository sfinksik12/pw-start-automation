import { test as baseTest, mergeTests, mergeExpects } from '@playwright/test';
import { expectExtensions } from '../expects';

export const test = mergeTests(baseTest);
export const expect = mergeExpects(...expectExtensions);
