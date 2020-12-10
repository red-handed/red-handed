/**
 * Utility to pair up multiple programs to run the
 * algorithm on mulsiple files. 
 */

import { ProgramStrPair } from "./data-definitions";


// @ts-ignore
// all pairs excluding pairs with oneself
export function pairsOfArray(array: any[], swappedPairs: boolean): [any, any][] {
  const res = array.reduce((acc: [string, string][], _val: [string, string], i1: number) => [
    ...acc,
    ...new Array(array.length - 1 - i1).fill(0).map((_v, i2) => ([array[i1], array[i1 + 1 + i2]]))
  ], [])
  return swappedPairs
    ? res.map((pair: [any, any][]) => [pair, [pair[1], pair[0]]]).flatMap((x: any) => x)
    : res
}

// applies algorithm on all program pairs
export function applyAlgOnAllPairs(programs: string[], algorithm: any, swappedPairs: boolean) {
  return pairsOfArray(programs, swappedPairs).map((programPair: [string, string]) =>
    ({ lhs_str: programPair[0], rhs_str: programPair[1], })).map(algorithm)
}
