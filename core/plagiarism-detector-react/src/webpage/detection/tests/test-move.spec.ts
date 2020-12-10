import { assert } from "chai"
import { move_progs, parse_prog } from "../src/plagiarism-algorithm"
import { moved_lhs, moved_rhs } from "../src/program-examples"

describe("test move with locs", () => {
  it("test move with move-test lhs, rhs", () => {
    assert.deepEqual(
      move_progs(
        {
          lhs_prog: parse_prog(moved_lhs),
          rhs_prog: parse_prog(moved_rhs)
        }
      ),
      {
        "type": "moving code",
        "loc": [
          [
            { "start": { "offset": 0, "line": 1, "column": 1 }, "end": { "offset": 17, "line": 1, "column": 18 } },
            { "start": { "offset": 83, "line": 6, "column": 1 }, "end": { "offset": 100, "line": 6, "column": 18 } }
          ],
          [
            { "start": { "offset": 19, "line": 3, "column": 1 }, "end": { "offset": 100, "line": 6, "column": 16 } },
            { "start": { "offset": 0, "line": 1, "column": 1 }, "end": { "offset": 81, "line": 4, "column": 16 } }
          ]],
        "similarity": 100
      }
    )
  })
})