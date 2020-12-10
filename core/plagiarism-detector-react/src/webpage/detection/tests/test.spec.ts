import { assert } from "chai"
import { DefinitionOrExpression, Loc, Program } from "../src/abstract-syntax-tree";
import { get_from_prog_loc_hash, get_prog_loc_hash, move_progs, program_modulo_locations, program_modulo_locations_dups } from "../src/plagiarism-algorithm";



const fdef_lhs_loc: Loc = {
  "start": {
    "offset": 0,
    "line": 1,
    "column": 1
  },
  "end": {
    "offset": 81,
    "line": 4,
    "column": 16
  }
}

const fdef_lhs: DefinitionOrExpression = {
  "kind": "FunctionDefinition",
  "name": "sum-both-nat",
  "params": [
    "n",
    "m"
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
              "name": "n"
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
              "name": "m"
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
          "name": "n"
        },
        {
          "kind": "Identifier",
          "name": "m"
        }
      ]
    }
  },
  "location": fdef_lhs_loc
}



const fdef_lhs_no_loc: DefinitionOrExpression = {
  "kind": "FunctionDefinition",
  "name": "sum-both-nat",
  "params": [
    "n",
    "m"
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
              "name": "n"
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
              "name": "m"
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
          "name": "n"
        },
        {
          "kind": "Identifier",
          "name": "m"
        }
      ]
    }
  }
}


const cdef_lhs_loc: Loc = {
  "start": {
    "offset": 83,
    "line": 6,
    "column": 1
  },
  "end": {
    "offset": 100,
    "line": 6,
    "column": 18
  }
}


const cdef_lhs: DefinitionOrExpression = {
  "kind": "VariableDefinition",
  "name": "tau",
  "expr": {
    "kind": "NumericLiteral",
    "value": "6.28"
  },
  "location": cdef_lhs_loc
}



const cdef_lhs_no_loc: DefinitionOrExpression = {
  "kind": "VariableDefinition",
  "name": "tau",
  "expr": {
    "kind": "NumericLiteral",
    "value": "6.28"
  }
}



const cdef_rhs_loc = {
  "start": {
    "offset": 0,
    "line": 1,
    "column": 1
  },
  "end": {
    "offset": 17,
    "line": 1,
    "column": 18
  }
}

const cdef_rhs: DefinitionOrExpression = {
  "kind": "VariableDefinition",
  "name": "tau",
  "expr": {
    "kind": "NumericLiteral",
    "value": "6.28"
  },
  "location": cdef_rhs_loc
}

const cdef_rhs_no_loc: DefinitionOrExpression = {
  "kind": "VariableDefinition",
  "name": "tau",
  "expr": {
    "kind": "NumericLiteral",
    "value": "6.28"
  }
}



const fdef_rhs_loc: Loc = {
  "start": {
    "offset": 19,
    "line": 3,
    "column": 1
  },
  "end": {
    "offset": 100,
    "line": 6,
    "column": 16
  }
}

const fdef_rhs: DefinitionOrExpression = {
  "kind": "FunctionDefinition",
  "name": "sum-both-nat",
  "params": [
    "n",
    "m"
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
              "name": "n"
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
              "name": "m"
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
          "name": "n"
        },
        {
          "kind": "Identifier",
          "name": "m"
        }
      ]
    }
  },
  "location": fdef_rhs_loc
}

const fdef_rhs_no_loc: DefinitionOrExpression = {
  "kind": "FunctionDefinition",
  "name": "sum-both-nat",
  "params": [
    "n",
    "m"
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
              "name": "n"
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
              "name": "m"
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
          "name": "n"
        },
        {
          "kind": "Identifier",
          "name": "m"
        }
      ]
    }
  }
}

const lhs: Program = { "kind": "Program", "body": [fdef_lhs, cdef_lhs] };
const lhs_no_loc: Program = { "kind": "Program", "body": [fdef_lhs_no_loc, cdef_lhs_no_loc] };
const rhs: Program = { "kind": "Program", "body": [cdef_rhs, fdef_rhs] }
const rhs_no_loc: Program = { "kind": "Program", "body": [cdef_rhs_no_loc, fdef_rhs_no_loc] };



describe("test removal of locs", () => {
  it("test removal of locs from lhs", () => {
    assert.deepEqual(program_modulo_locations(lhs), lhs_no_loc)
  })
  it("test removal of locs from rhs", () => {
    assert.deepEqual(program_modulo_locations(rhs), rhs_no_loc)
  })
})


describe("test hashing of defexpr based", () => {
  it("test hashing of lhs", () => {
    assert.deepEqual(get_prog_loc_hash(lhs), [[fdef_lhs_no_loc, fdef_lhs_loc], [cdef_lhs_no_loc, cdef_lhs_loc]])
  })
  it("test hashing of rhs", () => {
    assert.deepEqual(get_prog_loc_hash(rhs), [[cdef_rhs_no_loc, cdef_rhs_loc], [fdef_rhs_no_loc, fdef_rhs_loc]])
  })
})

describe("getting locations for each expression from hashes", () => {
  it("test hashing of lhs 1", () => {
    assert.deepEqual(get_from_prog_loc_hash(fdef_lhs_no_loc, get_prog_loc_hash(lhs)), fdef_lhs_loc)
  })
  it("test hashing of lhs 2", () => {
    assert.deepEqual(get_from_prog_loc_hash(cdef_lhs_no_loc, get_prog_loc_hash(lhs)), cdef_lhs_loc)
  })

  it("test hashing of rhs 1", () => {
    assert.deepEqual(get_from_prog_loc_hash(fdef_rhs_no_loc, get_prog_loc_hash(rhs)), fdef_rhs_loc)
  })
  it("test hashing of rhs 2", () => {
    assert.deepEqual(get_from_prog_loc_hash(cdef_rhs_no_loc, get_prog_loc_hash(rhs)), cdef_rhs_loc)
  })

})


describe("dups testing", () => {
  it("getting dups from no loc programs", () => {
    assert.deepEqual(program_modulo_locations_dups(
      { lhs_prog: program_modulo_locations(lhs), rhs_prog: program_modulo_locations(rhs) }
    ), [
      fdef_lhs_no_loc,
      cdef_lhs_no_loc
    ])
  })
})


describe("testing movement of expressions in a program", () => {
  it("testing the movement of expressions", () => {
    assert.deepEqual(move_progs({ lhs_prog: lhs, rhs_prog: rhs }),
      {
        type: "moving code",
        loc: [
          [fdef_lhs_loc, fdef_rhs_loc],
          [cdef_lhs_loc, cdef_rhs_loc]
        ],
        similarity: 100
      }
    )
  })
})

