import { assert } from "chai"
import { comments_and_whitespaces_strs } from "../src/plagiarism-algorithm"
import { prog_1, prog_3_comments_spaces, prog_5_renamed_1, prog_7_renamed_2, prog_9_reordered_1, prog_11_reordered_2, prog_13_lifted_1, prog_15_desugared_1 } from "../src/program-examples"

describe("testing comments/new lines", () => {
  it("test 1", () => {
    assert.deepEqual(comments_and_whitespaces_strs({ lhs_str: prog_1, rhs_str: prog_3_comments_spaces }), {
      type: "changing comments and spaces", loc: [], similarity: 100
    })
  })
  it("test 2", () => {
    assert.deepEqual(comments_and_whitespaces_strs({ lhs_str: prog_1, rhs_str: prog_5_renamed_1 }), { type: "ok", loc: [], similarity: 0 })
  })
  it("test 3", () => {
    assert.deepEqual(comments_and_whitespaces_strs({ lhs_str: prog_1, rhs_str: prog_7_renamed_2 }), { type: "ok", loc: [], similarity: 0 })
  })
  it("test 4", () => {
    assert.deepEqual(comments_and_whitespaces_strs({ lhs_str: prog_1, rhs_str: prog_9_reordered_1 }), { type: "ok", loc: [], similarity: 0 })
  })
  it("test 5", () => {
    assert.deepEqual(comments_and_whitespaces_strs({ lhs_str: prog_1, rhs_str: prog_11_reordered_2 }), { type: "ok", loc: [], similarity: 0 })
  })
  it("test 6", () => {
    assert.deepEqual(comments_and_whitespaces_strs({ lhs_str: prog_1, rhs_str: prog_13_lifted_1 }), { type: "ok", loc: [], similarity: 0 })
  })
  it("test 7", () => {
    assert.deepEqual(comments_and_whitespaces_strs({ lhs_str: prog_1, rhs_str: prog_15_desugared_1 }), { type: "ok", loc: [], similarity: 0 })
  })
})