import { assert } from "chai"
import { program_modulo_locations } from "../src/plagiarism-algorithm"
import { prog_10_reordered_1_ast_json, prog_11_reordered_2_parsed, prog_12_reordered_2_ast_json, prog_13_lifted_1_parsed, prog_14_lifted_1_ast_json, prog_15_desugared_1_parsed, prog_16_desugared_1_ast_json, prog_1_parsed, prog_2_ast_json, prog_3_comments_spaces_parsed, prog_4_comments_spaces_ast_json, prog_5_renamed_1_parsed, prog_6_renamed_1_ast_json, prog_7_renamed_2_parsed, prog_8_renamed_2_ast_json, prog_9_reordered_1_parsed } from "../src/program-examples"


describe("test the parser", () => {

  it("test 1", () => {
    assert.deepEqual(program_modulo_locations(prog_1_parsed), program_modulo_locations(prog_2_ast_json))
  })
  it("test 2", () => {
    assert.deepEqual(program_modulo_locations(prog_3_comments_spaces_parsed), program_modulo_locations(prog_4_comments_spaces_ast_json))
  })

  it("test 3", () => {
    assert.deepEqual(program_modulo_locations(prog_5_renamed_1_parsed), program_modulo_locations(prog_6_renamed_1_ast_json))
  })

  it("test 4", () => {
    assert.deepEqual(program_modulo_locations(prog_7_renamed_2_parsed), program_modulo_locations(prog_8_renamed_2_ast_json))
  })

  it("test 5", () => {
    assert.deepEqual(program_modulo_locations(prog_9_reordered_1_parsed), program_modulo_locations(prog_10_reordered_1_ast_json))
  })

  it("test 6", () => {
    assert.deepEqual(program_modulo_locations(prog_11_reordered_2_parsed), program_modulo_locations(prog_12_reordered_2_ast_json))
  })

  it("test 7", () => {
    assert.deepEqual(program_modulo_locations(prog_13_lifted_1_parsed), program_modulo_locations(prog_14_lifted_1_ast_json))
  })

  it("test 8", () => {
    assert.deepEqual(program_modulo_locations(prog_15_desugared_1_parsed), program_modulo_locations(prog_16_desugared_1_ast_json))
  })
})




