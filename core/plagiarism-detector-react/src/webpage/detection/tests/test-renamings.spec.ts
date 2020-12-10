import { assert } from "chai"
import { Program } from "../src/abstract-syntax-tree"
import { get_prog_unnamed_hash, program_modulo_locations } from "../src/plagiarism-algorithm"
import { prog_1_parsed } from "../src/program-examples"
import { renameProgram } from "../src/rename-ast"


const prog_1_ast_renamed = {
  "kind": "Program",
  "body": [
    {
      "kind": "VariableDefinition",
      "name": "NAME",
      "expr": {
        "kind": "NumericLiteral",
        "value": "3.14"
      }
    },
    {
      "kind": "FunctionDefinition",
      "name": "NAME",
      "params": [
        "INAME"
      ],
      "body": {
        "kind": "elsecond",
        "clauses": [
          {
            "kind": "cond-clause",
            "lhs": {
              "kind": "CallExpression",
              "callee": "=",
              "args": [
                {
                  "kind": "NumericLiteral",
                  "value": "0"
                },
                {
                  "kind": "Identifier",
                  "name": "INAME"
                }
              ]
            },
            "rhs": {
              "kind": "NumericLiteral",
              "value": "1"
            }
          }
        ],
        "elserhs": {
          "kind": "CallExpression",
          "callee": "*",
          "args": [
            {
              "kind": "Identifier",
              "name": "INAME"
            },
            {
              "kind": "CallExpression",
              "callee": "NAME",
              "args": [
                {
                  "kind": "CallExpression",
                  "callee": "-",
                  "args": [
                    {
                      "kind": "Identifier",
                      "name": "INAME"
                    },
                    {
                      "kind": "NumericLiteral",
                      "value": "1"
                    }
                  ]
                }
              ]
            }
          ]
        }
      }
    },
    {
      "kind": "VariableDefinition",
      "name": "NAME",
      "expr": {
        "kind": "NumericLiteral",
        "value": "6.28"
      }
    },
    {
      "kind": "FunctionDefinition",
      "name": "NAME",
      "params": [
        "INAME",
        "INAME"
      ],
      "body": {
        "kind": "if",
        "test": {
          "kind": "or",
          "args": [
            {
              "kind": "CallExpression",
              "callee": "<",
              "args": [
                {
                  "kind": "Identifier",
                  "name": "INAME"
                },
                {
                  "kind": "NumericLiteral",
                  "value": "0"
                }
              ]
            },
            {
              "kind": "CallExpression",
              "callee": "<",
              "args": [
                {
                  "kind": "Identifier",
                  "name": "INAME"
                },
                {
                  "kind": "NumericLiteral",
                  "value": "0"
                }
              ]
            }
          ]
        },
        "then": {
          "kind": "StringLiteral",
          "value": "bad"
        },
        "else": {
          "kind": "CallExpression",
          "callee": "+",
          "args": [
            {
              "kind": "Identifier",
              "name": "INAME"
            },
            {
              "kind": "Identifier",
              "name": "INAME"
            }
          ]
        }
      }
    }
  ]
}

describe("replacing with NAME", () => {
  it("replacing with name", () => {
    assert.deepEqual(
      renameProgram(prog_1_parsed),
      prog_1_ast_renamed as Program
    )
  })
})




const rename_main_lhs = {
  "kind": "Program", "body":
    [
      {
        "kind": "VariableDefinition", "name": "the-pi", "expr": { "kind": "NumericLiteral", "value": "3.14" },
        "location": { "start": { "offset": 0, "line": 1, "column": 1 }, "end": { "offset": 20, "line": 1, "column": 21 } }
      },
      {
        "kind": "FunctionDefinition", "name": "fact", "params": ["n"], "body": { "kind": "elsecond", "clauses": [{ "kind": "cond-clause", "lhs": { "kind": "CallExpression", "callee": "=", "args": [{ "kind": "NumericLiteral", "value": "0" }, { "kind": "Identifier", "name": "n" }] }, "rhs": { "kind": "NumericLiteral", "value": "1" } }], "elserhs": { "kind": "CallExpression", "callee": "*", "args": [{ "kind": "Identifier", "name": "n" }, { "kind": "CallExpression", "callee": "fact", "args": [{ "kind": "CallExpression", "callee": "-", "args": [{ "kind": "Identifier", "name": "n" }, { "kind": "NumericLiteral", "value": "1" }] }] }] } },
        "location": { "start": { "offset": 22, "line": 3, "column": 1 }, "end": { "offset": 96, "line": 5, "column": 38 } }
      }]
} as Program

const rename_lhs_no_loc = {
  "kind": "Program", "body":
    [
      {
        "kind": "VariableDefinition", "name": "the-pi", "expr": { "kind": "NumericLiteral", "value": "3.14" },
      },
      {
        "kind": "FunctionDefinition", "name": "fact", "params": ["n"], "body": { "kind": "elsecond", "clauses": [{ "kind": "cond-clause", "lhs": { "kind": "CallExpression", "callee": "=", "args": [{ "kind": "NumericLiteral", "value": "0" }, { "kind": "Identifier", "name": "n" }] }, "rhs": { "kind": "NumericLiteral", "value": "1" } }], "elserhs": { "kind": "CallExpression", "callee": "*", "args": [{ "kind": "Identifier", "name": "n" }, { "kind": "CallExpression", "callee": "fact", "args": [{ "kind": "CallExpression", "callee": "-", "args": [{ "kind": "Identifier", "name": "n" }, { "kind": "NumericLiteral", "value": "1" }] }] }] } },
      }]
} as Program


const rename_lhs_no_names = {
  "kind": "Program", "body":
    [
      {
        "kind": "VariableDefinition", "name": "NAME", "expr": { "kind": "NumericLiteral", "value": "3.14" },
      },
      {
        "kind": "FunctionDefinition", "name": "NAME", "params": ["INAME"], "body": { "kind": "elsecond", "clauses": [{ "kind": "cond-clause", "lhs": { "kind": "CallExpression", "callee": "=", "args": [{ "kind": "NumericLiteral", "value": "0" }, { "kind": "Identifier", "name": "INAME" }] }, "rhs": { "kind": "NumericLiteral", "value": "1" } }], "elserhs": { "kind": "CallExpression", "callee": "*", "args": [{ "kind": "Identifier", "name": "INAME" }, { "kind": "CallExpression", "callee": "NAME", "args": [{ "kind": "CallExpression", "callee": "-", "args": [{ "kind": "Identifier", "name": "INAME" }, { "kind": "NumericLiteral", "value": "1" }] }] }] } },
      }]
} as Program


const rename_main_lhs_hashed: any = [
  [
    {
      "kind": "VariableDefinition", "name": "NAME", "expr": { "kind": "NumericLiteral", "value": "3.14" },
    },
    { "start": { "offset": 0, "line": 1, "column": 1 }, "end": { "offset": 20, "line": 1, "column": 21 } }
  ],
  [
    {
      "kind": "FunctionDefinition", "name": "NAME", "params": ["INAME"], "body": { "kind": "elsecond", "clauses": [{ "kind": "cond-clause", "lhs": { "kind": "CallExpression", "callee": "=", "args": [{ "kind": "NumericLiteral", "value": "0" }, { "kind": "Identifier", "name": "INAME" }] }, "rhs": { "kind": "NumericLiteral", "value": "1" } }], "elserhs": { "kind": "CallExpression", "callee": "*", "args": [{ "kind": "Identifier", "name": "INAME" }, { "kind": "CallExpression", "callee": "NAME", "args": [{ "kind": "CallExpression", "callee": "-", "args": [{ "kind": "Identifier", "name": "INAME" }, { "kind": "NumericLiteral", "value": "1" }] }] }] } },
    },
    { "start": { "offset": 22, "line": 3, "column": 1 }, "end": { "offset": 96, "line": 5, "column": 38 } }
  ]
]

const rename_main_rhs = {
  "kind": "Program", "body": [
    {
      "kind": "VariableDefinition", "name": "ip-eht", "expr": { "kind": "NumericLiteral", "value": "3.14" },
      "location": { "start": { "offset": 0, "line": 1, "column": 1 }, "end": { "offset": 20, "line": 1, "column": 21 } }
    },
    {
      "kind": "FunctionDefinition", "name": "tcaf", "params": ["n"], "body": { "kind": "elsecond", "clauses": [{ "kind": "cond-clause", "lhs": { "kind": "CallExpression", "callee": "=", "args": [{ "kind": "NumericLiteral", "value": "0" }, { "kind": "Identifier", "name": "n" }] }, "rhs": { "kind": "NumericLiteral", "value": "1" } }], "elserhs": { "kind": "CallExpression", "callee": "*", "args": [{ "kind": "Identifier", "name": "n" }, { "kind": "CallExpression", "callee": "tcaf", "args": [{ "kind": "CallExpression", "callee": "-", "args": [{ "kind": "Identifier", "name": "n" }, { "kind": "NumericLiteral", "value": "1" }] }] }] } },
      "location": { "start": { "offset": 22, "line": 3, "column": 1 }, "end": { "offset": 104, "line": 5, "column": 42 } }
    },
    {
      "kind": "VariableDefinition", "name": "tau", "expr": { "kind": "NumericLiteral", "value": "6.28" },
      "location": { "start": { "offset": 106, "line": 7, "column": 1 }, "end": { "offset": 123, "line": 7, "column": 18 } }
    },
    {
      "kind": "FunctionDefinition", "name": "sum-both-nat", "params": ["n", "m"], "body": { "kind": "if", "test": { "kind": "or", "args": [{ "kind": "CallExpression", "callee": "<", "args": [{ "kind": "Identifier", "name": "n" }, { "kind": "NumericLiteral", "value": "0" }] }, { "kind": "CallExpression", "callee": "<", "args": [{ "kind": "Identifier", "name": "m" }, { "kind": "NumericLiteral", "value": "0" }] }] }, "then": { "kind": "StringLiteral", "value": "bad" }, "else": { "kind": "CallExpression", "callee": "+", "args": [{ "kind": "Identifier", "name": "n" }, { "kind": "Identifier", "name": "m" }] } },
      "location": { "start": { "offset": 125, "line": 9, "column": 1 }, "end": { "offset": 206, "line": 12, "column": 16 } }
    }]
} as Program


const rename_rhs_no_loc = {
  "kind": "Program", "body": [
    {
      "kind": "VariableDefinition", "name": "ip-eht", "expr": { "kind": "NumericLiteral", "value": "3.14" },
    },
    {
      "kind": "FunctionDefinition", "name": "tcaf", "params": ["n"], "body": { "kind": "elsecond", "clauses": [{ "kind": "cond-clause", "lhs": { "kind": "CallExpression", "callee": "=", "args": [{ "kind": "NumericLiteral", "value": "0" }, { "kind": "Identifier", "name": "n" }] }, "rhs": { "kind": "NumericLiteral", "value": "1" } }], "elserhs": { "kind": "CallExpression", "callee": "*", "args": [{ "kind": "Identifier", "name": "n" }, { "kind": "CallExpression", "callee": "tcaf", "args": [{ "kind": "CallExpression", "callee": "-", "args": [{ "kind": "Identifier", "name": "n" }, { "kind": "NumericLiteral", "value": "1" }] }] }] } },
    },
    {
      "kind": "VariableDefinition", "name": "tau", "expr": { "kind": "NumericLiteral", "value": "6.28" },
    },
    {
      "kind": "FunctionDefinition", "name": "sum-both-nat", "params": ["n", "m"], "body": { "kind": "if", "test": { "kind": "or", "args": [{ "kind": "CallExpression", "callee": "<", "args": [{ "kind": "Identifier", "name": "n" }, { "kind": "NumericLiteral", "value": "0" }] }, { "kind": "CallExpression", "callee": "<", "args": [{ "kind": "Identifier", "name": "m" }, { "kind": "NumericLiteral", "value": "0" }] }] }, "then": { "kind": "StringLiteral", "value": "bad" }, "else": { "kind": "CallExpression", "callee": "+", "args": [{ "kind": "Identifier", "name": "n" }, { "kind": "Identifier", "name": "m" }] } },
    }]
} as Program

const rename_rhs_no_names = {
  "kind": "Program", "body": [
    {
      "kind": "VariableDefinition", "name": "NAME", "expr": { "kind": "NumericLiteral", "value": "3.14" },
    },
    {
      "kind": "FunctionDefinition", "name": "NAME", "params": ["INAME"], "body": { "kind": "elsecond", "clauses": [{ "kind": "cond-clause", "lhs": { "kind": "CallExpression", "callee": "=", "args": [{ "kind": "NumericLiteral", "value": "0" }, { "kind": "Identifier", "name": "INAME" }] }, "rhs": { "kind": "NumericLiteral", "value": "1" } }], "elserhs": { "kind": "CallExpression", "callee": "*", "args": [{ "kind": "Identifier", "name": "INAME" }, { "kind": "CallExpression", "callee": "NAME", "args": [{ "kind": "CallExpression", "callee": "-", "args": [{ "kind": "Identifier", "name": "INAME" }, { "kind": "NumericLiteral", "value": "1" }] }] }] } },
    },
    {
      "kind": "VariableDefinition", "name": "NAME", "expr": { "kind": "NumericLiteral", "value": "6.28" },
    },
    {
      "kind": "FunctionDefinition", "name": "NAME", "params": ["INAME", "INAME"], "body": { "kind": "if", "test": { "kind": "or", "args": [{ "kind": "CallExpression", "callee": "<", "args": [{ "kind": "Identifier", "name": "INAME" }, { "kind": "NumericLiteral", "value": "0" }] }, { "kind": "CallExpression", "callee": "<", "args": [{ "kind": "Identifier", "name": "INAME" }, { "kind": "NumericLiteral", "value": "0" }] }] }, "then": { "kind": "StringLiteral", "value": "bad" }, "else": { "kind": "CallExpression", "callee": "+", "args": [{ "kind": "Identifier", "name": "INAME" }, { "kind": "Identifier", "name": "INAME" }] } },
    }]
} as Program

const rename_main_rhs_hashed: any = [
  [
    {
      "kind": "VariableDefinition", "name": "NAME", "expr": { "kind": "NumericLiteral", "value": "3.14" }
    },
    {
      "start": { "offset": 0, "line": 1, "column": 1 }, "end": { "offset": 20, "line": 1, "column": 21 }
    }
  ],
  [
    {
      "kind": "FunctionDefinition", "name": "NAME", "params": ["INAME"], "body": { "kind": "elsecond", "clauses": [{ "kind": "cond-clause", "lhs": { "kind": "CallExpression", "callee": "=", "args": [{ "kind": "NumericLiteral", "value": "0" }, { "kind": "Identifier", "name": "INAME" }] }, "rhs": { "kind": "NumericLiteral", "value": "1" } }], "elserhs": { "kind": "CallExpression", "callee": "*", "args": [{ "kind": "Identifier", "name": "INAME" }, { "kind": "CallExpression", "callee": "NAME", "args": [{ "kind": "CallExpression", "callee": "-", "args": [{ "kind": "Identifier", "name": "INAME" }, { "kind": "NumericLiteral", "value": "1" }] }] }] } }
    },
    {
      "start": { "offset": 22, "line": 3, "column": 1 }, "end": { "offset": 104, "line": 5, "column": 42 }
    }
  ],
  [
    {
      "kind": "VariableDefinition", "name": "NAME", "expr": { "kind": "NumericLiteral", "value": "6.28" }
    },
    {
      "start": { "offset": 106, "line": 7, "column": 1 }, "end": { "offset": 123, "line": 7, "column": 18 }
    }
  ],
  [
    {
      "kind": "FunctionDefinition", "name": "NAME", "params": ["INAME", "INAME"], "body": { "kind": "if", "test": { "kind": "or", "args": [{ "kind": "CallExpression", "callee": "<", "args": [{ "kind": "Identifier", "name": "INAME" }, { "kind": "NumericLiteral", "value": "0" }] }, { "kind": "CallExpression", "callee": "<", "args": [{ "kind": "Identifier", "name": "INAME" }, { "kind": "NumericLiteral", "value": "0" }] }] }, "then": { "kind": "StringLiteral", "value": "bad" }, "else": { "kind": "CallExpression", "callee": "+", "args": [{ "kind": "Identifier", "name": "INAME" }, { "kind": "Identifier", "name": "INAME" }] } }
    },
    {
      "start": { "offset": 125, "line": 9, "column": 1 }, "end": { "offset": 206, "line": 12, "column": 16 }
    }
  ]
]


describe("replacing test", () => {
  it("checking no loc on [lhs, rhs]", () => {
    assert.deepEqual(
      [program_modulo_locations(rename_main_lhs), program_modulo_locations(rename_main_rhs)],
      [rename_lhs_no_loc, rename_rhs_no_loc]
    )
  })

  it("transforming no locs to no names in lhs and rhs", () => {
    assert.deepEqual(
      [renameProgram(rename_lhs_no_loc), renameProgram(rename_rhs_no_loc)],
      [rename_lhs_no_names, rename_rhs_no_names]
    )
  })

  it("test the hashing of no loc/names", () => {
    assert.deepEqual(
      [get_prog_unnamed_hash(rename_main_lhs), get_prog_unnamed_hash(rename_main_rhs)],
      [rename_main_lhs_hashed, rename_main_rhs_hashed]
    )
  })


})

