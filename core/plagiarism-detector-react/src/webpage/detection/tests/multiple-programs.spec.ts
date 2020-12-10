import { assert } from "chai"
import { applyAlgOnAllPairs } from "../src/multiple-programs"

function exampleAlgorithm(x: any) {
  return x.lhs_str + x.rhs_str + 'z'
}

const sampleProgs = ['a', 'b', 'c', 'd', 'e']

describe("multiple programs", () => {
  it("test multiple programs with swapped pairs allowed", () => {
    assert.deepEqual(applyAlgOnAllPairs(sampleProgs, exampleAlgorithm, true),
      ["abz", "baz", "acz", "caz", "adz", "daz", "aez", "eaz", "bcz", "cbz", "bdz", "dbz", "bez", "ebz", "cdz", "dcz", "cez", "ecz", "dez", "edz"])
  })
  it("test multiple programs with swapped pairs not allowed", () => {
    assert.deepEqual(applyAlgOnAllPairs(sampleProgs, exampleAlgorithm, true), ["abz", "baz", "acz", "caz", "adz", "daz", "aez", "eaz", "bcz", "cbz", "bdz", "dbz", "bez", "ebz", "cdz", "dcz", "cez", "ecz", "dez", "edz"])
  })
})