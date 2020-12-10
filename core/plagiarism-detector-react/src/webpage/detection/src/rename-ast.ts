/**
 * This file contains code to do a renaming by traversing the AST. 
 * 
 * There are 2 different renamings:
 * Type 1 rename: 
 *    The names for identifiers that are found in the callee position 
 *    of a call experssion, and function names get one type of name.
 * Type 2 rename:
 *    The names for identifiers in parameter and argument positions
 *    are renamed to a second constants. 
 * Renaming does not occur for primitives.
 */

import { map } from "ramda";
import { AndExpression, BooleanLiteral, CallExpression, Clause, CondExpression, DefinitionOrExpression, Expression, FunctionDefinition, Identifier, IfExpression, NumericLiteral, OrExpression, Program, StringLiteral, VariableDefinition } from "./abstract-syntax-tree";
import { isPrim } from "./language-primitives";

/**
 * Type 1 renamings are done to:
 */
const FUNC_CALLEE_VAR_NAME = "NAME"

/**
 * Type 2 renamings are done to:
 */
const PARAM_ARG_NAME = "INAME"


/**
 * A program is renamed by renaming each part of its body.
 * @param program The Program to rename
 */
export function renameProgram(program: Program): Program {
  return ({ kind: program.kind, body: map(defExpr => renameDefExpr(defExpr), program.body) })
}

/**
 * Renaming is done by dispatching to either a varible definition or a function definition.
 * @param defExpr The Definition of Expression to rename.
 */
export function renameDefExpr(defExpr: DefinitionOrExpression): DefinitionOrExpression {
  return defExpr.kind === "VariableDefinition"
    ? varDefRename(defExpr)
    : functionDefRename(defExpr);
}

/**
 * The name of a variable definition is renamed directly, the renaming for the expression
 * is dispatched.
 * @param variableDefinition The variable definition to rename.
 */
export function varDefRename(variableDefinition: VariableDefinition): VariableDefinition {
  return ({
    kind: variableDefinition.kind,
    name: FUNC_CALLEE_VAR_NAME,
    expr: renameExpression(variableDefinition.expr)
  })
}

/**
 * The name of the function definition is changed directly, so are the parameters, 
 * the body-expression is also renamed. 
 * @param functionDefinition The Function Definition to rename.
 */
export function functionDefRename(functionDefinition: FunctionDefinition): FunctionDefinition {
  return ({
    kind: functionDefinition.kind,
    name: FUNC_CALLEE_VAR_NAME,
    params: map(n => PARAM_ARG_NAME, functionDefinition.params),
    body: renameExpression(functionDefinition.body),
  })
}

/**
 * For each kind of expression, the renaming is dispatched to each kind.
 * @param expression The Expression to rename.
 */
export function renameExpression(expression: Expression): Expression {
  if (expression.kind === "BooleanLiteral") {
    return rename_boolean_literal(expression)
  } else if (expression.kind === "CallExpression") {
    return rename_call_expression(expression);
  } else if (expression.kind === "Identifier") {
    return rename_identifier(expression)
  } else if (expression.kind === "NumericLiteral") {
    return rename_numericLiteral(expression)
  } else if (expression.kind === "StringLiteral") {
    return rename_string_literal(expression)
  } else if (expression.kind === "and") {
    return rename_and_expression(expression)
  } else if (expression.kind === "elsecond") {
    return rename_cond_expression(expression)
  } else if (expression.kind === "if") {
    return rename_if_expression(expression);
  } else if (expression.kind === "or") {
    return rename_or_expression(expression);
  } else {
    return expression;
  }
}

/**
 * The rename of a call expression renames the callee directly, and also each argument 
 * from left to right.
 * @param callExpression The Call Expression to rename.
 */
export function rename_call_expression(callExpression: CallExpression): CallExpression {
  return ({
    kind: callExpression.kind,
    callee: isPrim(callExpression.callee) ? callExpression.callee : FUNC_CALLEE_VAR_NAME,
    args: map(renameExpression, callExpression.args,)
  })
}

/**
 * For each conditional of the cond, the rename takes place on the lhs, and rhs of each clause.
 * For the clause with "else," the rename only takes place on the rhs.
 * @param condExpression The Cond Expression to rename.
 */
export function rename_cond_expression(condExpression: CondExpression): CondExpression {
  return ({
    kind: condExpression.kind,
    clauses: map(renameClause, condExpression.clauses),
    elserhs: renameExpression(condExpression.elserhs)
  })
}

/**
 * For a cond-clause, the LHS, and RHS are expressions that are renamed.
 * @param clause The cond clause to rename.
 */
export function renameClause(clause: Clause): Clause {
  return ({
    kind: clause.kind,
    lhs: renameExpression(clause.lhs),
    rhs: renameExpression(clause.rhs)
  })
}

/**
 * The three clauses of "if" are renamed.
 * @param ifExpression The if-expression to rename.
 */
export function rename_if_expression(ifExpression: IfExpression): IfExpression {
  return ({
    kind: ifExpression.kind,
    test: renameExpression(ifExpression.test),
    then: renameExpression(ifExpression.then),
    else: renameExpression(ifExpression.else)
  })
}

/**
 * The sub-expressions of "and" are renamed from left to right.
 * @param andExpression The and-expression to rename.
 */
export function rename_and_expression(andExpression: AndExpression): AndExpression {
  return ({
    kind: andExpression.kind,
    args: map(renameExpression, andExpression.args)
  })
}

/**
 * The sub-expressions of the "or" are renamed from left to right.
 * @param orExpression The or-expression to rename.
 */
export function rename_or_expression(orExpression: OrExpression): OrExpression {
  return ({
    kind: orExpression.kind,
    args: map(renameExpression, orExpression.args)
  })
}

/**
 * THe name attribute of an identifier is renamed.
 * @param identifier The identifier to rename.
 */
export function rename_identifier(identifier: Identifier): Identifier {
  return ({
    kind: identifier.kind,
    name: PARAM_ARG_NAME
  })
}

/**
 * A numeric literal, when renamed, returns itself.
 * @param numericLiteral The numeric literal to rename.
 */
export function rename_numericLiteral(numericLiteral: NumericLiteral): NumericLiteral {
  return ({
    kind: numericLiteral.kind,
    value: numericLiteral.value
  })
}

/**
 * A boolean literal, when renamed, returns itself.
 * @param booleanLiteral The boolean literal to rename.
 */
export function rename_boolean_literal(booleanLiteral: BooleanLiteral): BooleanLiteral {
  return ({
    kind: booleanLiteral.kind,
    value: booleanLiteral.value
  })
}

/**
 * A string literal, when renamed returns itself.
 * @param stringLiteral The string-literal to rename.
 */
export function rename_string_literal(stringLiteral: StringLiteral): StringLiteral {
  return ({
    kind: stringLiteral.kind,
    value: stringLiteral.value
  })
}
