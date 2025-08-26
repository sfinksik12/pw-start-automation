import { toBeAllure } from './toBeAllure.js';
import { toBeVisibleAllure } from './toBeVisibleAllure.js';
import { toBeDisabledAllure } from './toBeDisabledAllure.js';
import { toBeEditableAllure } from './toBeEditableAllure.js';
import { toBeEnabledAllure } from './toBeEnabledAllure.js';
import { toBeHiddenAllure } from './toBeHiddenAllure.js';
import { toHaveTextAllure } from './toHaveTextAllure.js';
import { toHaveAttributeAllure } from './toHaveAttributeAllure.js';
import { toHaveClassAllure } from './toHaveClassAllure.js';
import { toEqualAllure } from './toEqualAllure.js';
import { toBeNumberAllure } from './toBeNumberAllure.js';
import { toBeStringAllure } from './toBeStringAllure.js';
import { toBeBooleanAllure } from './toBeBooleanAllure.js';
import { toBeArrayAllure } from './toBeArrayAllure.js';
import { toBeObjectAllure } from './toBeObjectAllure.js';
import { toBeUndefinedAllure } from './toBeUndefinedAllure.js';
import { toBeNullAllure } from './toBeNullAllure.js';
import { toContainAllure } from './toContainAllure.js';

export const expectExtensions = [
  toBeAllure,
  toBeVisibleAllure,
  toBeDisabledAllure,
  toBeEditableAllure,
  toBeEnabledAllure,
  toBeHiddenAllure,
  toHaveTextAllure,
  toHaveAttributeAllure,
  toHaveClassAllure,
  toEqualAllure,
  toBeNumberAllure,
  toBeStringAllure,
  toBeBooleanAllure,
  toBeArrayAllure,
  toBeObjectAllure,
  toBeUndefinedAllure,
  toBeNullAllure,
  toContainAllure,
];
