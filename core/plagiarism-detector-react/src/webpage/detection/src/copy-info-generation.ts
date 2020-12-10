/**
 * Compute similarity percentage, and generate the CopyInfo 
 * object to send to the client.
 */

import { Loc } from "./abstract-syntax-tree"
import { ProgramPair, CopyInfo } from "./data-definitions"

export function genMovingCode(locs: [Loc, Loc][], programPair: ProgramPair): CopyInfo {
  return {
    type: "moving code", loc: locs, similarity: 100 * (locs.length / programPair.rhs_prog.body.length)
  }
}
export function genExtractCode(locs: [Loc, Loc][], programPair: ProgramPair): CopyInfo {
  return {
    type: "extracting code into functions", loc: locs, similarity: 100 * (locs.length / programPair.rhs_prog.body.length)
  }
}
export function genOk(): CopyInfo {
  return { type: "ok", loc: [], similarity: 0 }
}
export function genChangingCommentsAndSpaces(): CopyInfo {
  return { type: "changing comments and spaces", loc: [], similarity: 100 }
}
export function renamingVarGen(locs: [Loc, Loc][], programPair: ProgramPair): CopyInfo {
  return {
    type: "renaming variables", loc: locs, similarity: 100 * (locs.length / programPair.rhs_prog.body.length)
  }
}
export function desugar(locs: [Loc, Loc][], programPair: ProgramPair): CopyInfo {
  return { type: "desugaring", loc: [], similarity: 100 }
}