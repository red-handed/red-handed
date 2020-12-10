/**
 * Desugars the AST. 
 * 
 * -- conds are turned into `ifs`
 * -- `and` and `or` are turned ito `ifs`
 * 
 */

import { map, tail } from "ramda";
import { AndExpression, BooleanLiteral, CallExpression, Clause, CondExpression, DefinitionOrExpression, Expression, FunctionDefinition, Identifier, IfExpression, NumericLiteral, OrExpression, Program, StringLiteral, VariableDefinition } from "./abstract-syntax-tree";
import { isPrim } from "./language-primitives";


export function desugar_program(program: Program): Program {
  return ({ kind: program.kind, body: map(defExpr => desugar_defExpr(defExpr), program.body) })
}

export function desugar_defExpr(defExpr: DefinitionOrExpression): DefinitionOrExpression {
  return defExpr.kind === "VariableDefinition"
    ? desugar_vardef(defExpr)
    : desugar_function_def(defExpr);
}


export function desugar_vardef(variableDefinition: VariableDefinition): VariableDefinition {
  return ({
    kind: variableDefinition.kind,
    name: variableDefinition.name,
    expr: desugar_expr(variableDefinition.expr)
  })
}


export function desugar_function_def(functionDefinition: FunctionDefinition): FunctionDefinition {
  return ({
    kind: functionDefinition.kind,
    name: functionDefinition.name,
    params: map(n => n, functionDefinition.params),
    body: desugar_expr(functionDefinition.body),
  })
}


export function desugar_expr(expression: Expression): Expression {
  if (expression.kind === "BooleanLiteral") {
    return desugar_boolean_literal(expression)
  } else if (expression.kind === "CallExpression") {
    return desugar_call_expr(expression);
  } else if (expression.kind === "Identifier") {
    return desugar_identifier(expression)
  } else if (expression.kind === "NumericLiteral") {
    return desugar_numeric_literal(expression)
  } else if (expression.kind === "StringLiteral") {
    return desugar_string_literal(expression)
  } else if (expression.kind === "and") {
    return desugar_and_expression(expression)
  } else if (expression.kind === "elsecond") {
    return desugar_cond_expr(expression)
  } else if (expression.kind === "if") {
    return desugar_if_expression(expression);
  } else if (expression.kind === "or") {
    return desugar_or_expression(expression);
  } else {
    return expression;
  }
}

export function desugar_call_expr(callExpression: CallExpression): CallExpression {
  return ({
    kind: callExpression.kind,
    callee: callExpression.callee,
    args: map(desugar_expr, callExpression.args,)
  })
}

export function desugar_cond_expr(condExpression: CondExpression): Expression {

  if (condExpression.clauses.length === 0) {
    return desugar_expr(condExpression.elserhs)
  } else {
    return {
      kind: "if",
      test: condExpression.clauses[0].lhs,
      then: condExpression.clauses[0].rhs,
      else: desugar_cond_expr({
        kind: "elsecond",
        clauses: tail(condExpression.clauses),
        elserhs: condExpression.elserhs
      })
    }
  }



  return ({
    kind: condExpression.kind,
    clauses: map(clause => {
      return {
        kind: clause.kind,
        lhs: desugar_expr(clause.lhs),
        rhs: desugar_expr(clause.rhs)
      }
    }, condExpression.clauses),
    elserhs: desugar_expr(condExpression.elserhs)
  })
}


export function desugar_if_expression(ifExpression: IfExpression): IfExpression {
  return ({
    kind: ifExpression.kind,
    test: desugar_expr(ifExpression.test),
    then: desugar_expr(ifExpression.then),
    else: desugar_expr(ifExpression.else)
  })
}

export function desugar_and_expression(andExpression: AndExpression): AndExpression {
  return ({
    kind: andExpression.kind,
    args: map(desugar_expr, andExpression.args)
  })
}

export function desugar_or_expression(orExpression: OrExpression): OrExpression {
  return ({
    kind: orExpression.kind,
    args: map(desugar_expr, orExpression.args)
  })
}

export function desugar_identifier(identifier: Identifier): Identifier {
  return ({
    kind: identifier.kind,
    name: identifier.name
  })
}

export function desugar_numeric_literal(numericLiteral: NumericLiteral): NumericLiteral {
  return ({
    kind: numericLiteral.kind,
    value: numericLiteral.value
  })
}

export function desugar_boolean_literal(booleanLiteral: BooleanLiteral): BooleanLiteral {
  return ({
    kind: booleanLiteral.kind,
    value: booleanLiteral.value
  })
}

export function desugar_string_literal(stringLiteral: StringLiteral): StringLiteral {
  return ({
    kind: stringLiteral.kind,
    value: stringLiteral.value
  })
}
