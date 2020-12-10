/**
 * The primitives of the language that are not affected by renamings. 
 */

import { equals, filter } from "ramda";

/**
 * Primitives are built-in names that we do not want to factor into 
 * the plagiarism checking.
 */

export const MULT = "*";
export const ADD = "+";
export const SUB = "-";
export const LT = "<";
export const LTE = "<=";
export const EQ = "=";
export const GT = ">";
export const GTE = ">=";
export const IS = "?";

/**
 * A list of all primitives in the language.
 */
export const PRIMS = [MULT, ADD, SUB, LT, LTE, EQ, GT, GTE, IS]

/**
 * Is name a primitive specified in the PRIMS array?
 * @param name A possible name.
 */
export function isPrim(name: string) {
  return filter(p => equals(name, p), PRIMS).length > 0
}
