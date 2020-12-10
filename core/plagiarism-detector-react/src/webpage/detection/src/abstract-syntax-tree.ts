/**
 * Represents the location information that can be found in certain 
 * AST-nodes (added during the parsing phase). 
 * -- "start" is the start location information for the node
 * -- "end" is the end location information for the node
 */
export type Loc = {
  start: LocPos,
  end: LocPos
}

/**
 * -- The "offset" property contains an offset as a zero-based 
 *    index and 
 * -- "line" and "column" properties contain a line and a
 *    column as one-based indices.
 */
export type LocPos = {
  offset: number,
  line: number,
  column: number
}

/**
 * Represents the program as a sequence of 
 * Definitions or Expressions.
 */
export type Program = {
  kind: "Program",
  body: DefinitionOrExpression[]
};

/**
 * Represents the various kinds of expressions 
 * supported in hte language.
 */
export type Expression
  = CallExpression
  | CondExpression
  | IfExpression
  | AndExpression
  | OrExpression
  | Identifier
  | NumericLiteral
  | BooleanLiteral
  | StringLiteral


/**
 * A function Definition has a name, parameters, and 
 * a body, it also comes with location information.
 */
export type FunctionDefinition = {
  kind: "FunctionDefinition",
  name: string,
  params: string[],
  body: Expression,
  location?: Loc
}

/**
 * A variable definition has a name, and an expression
 * that's assigned to the name, as well as location 
 * information.
 */
export type VariableDefinition = {
  kind: "VariableDefinition",
  name: string,
  expr: Expression,
  location?: Loc
}

/**
 * A definitionOrExpression can either be a function 
 * or a variable.
 */
export type DefinitionOrExpression
  = FunctionDefinition
  | VariableDefinition


/**
 * Call expressions have a calee name and a sequence 
 * of argument expressions
 */
export type CallExpression = {
  kind: "CallExpression",
  callee: string,
  args: Expression[]
}


/**
 * A cond clause is a series of clauses followed by
 * the "else" clause.
 */
export type CondExpression = {
  kind: "elsecond",
  clauses: Clause[],
  elserhs: Expression
}

/**
 * A cond-clause consists of a rhs expression and 
 * an lhs expression.
 */
export type Clause = {
  kind: "cond-clause",
  lhs: Expression,
  rhs: Expression
}

/**
 * An if expression has a "test" expression, a "then" 
 * expression and an "else" expression.
 */
export type IfExpression = {
  kind: "if",
  test: Expression,
  then: Expression,
  else: Expression
}

/**
 * Represents a conjunction over a sequence of expressions.
 */
export type AndExpression = {
  kind: "and",
  args: Expression[]
}

/**
 * Represents a disjunction over a sequence of expressions.
 */
export type OrExpression = {
  kind: "or",
  args: Expression[]
}

/**
 * Represents an identifier name.
 */
export type Identifier = {
  kind: "Identifier",
  name: string
}

/**
 * Represents an numeric literal and its value as a string.
 */
export type NumericLiteral = {
  kind: "NumericLiteral",
  value: string
}

/**
 * Represents a boolean literal and its value as a boolean.
 */
export type BooleanLiteral = {
  kind: "BooleanLiteral",
  value: string
}

/**
 * Represents a string literal and its value as a string.
 */
export type StringLiteral = {
  kind: "StringLiteral",
  value: string
}
