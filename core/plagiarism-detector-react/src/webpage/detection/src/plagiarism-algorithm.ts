import parser from '../parser/parser.js';
import { DefinitionOrExpression, Expression, Loc, Program } from './abstract-syntax-tree'
import { dissoc, equals, filter, map, path, zip } from 'ramda';
import { renameDefExpr, renameProgram } from './rename-ast';
import { CopyInfo, ProgLocHash, ProgramPair, ProgramPairLocs, ProgramPathPair, ProgramStrPair, ProgUnnamedHash, SimilarLocs } from './data-definitions';
import { genChangingCommentsAndSpaces, genExtractCode, genMovingCode, genOk, renamingVarGen } from './copy-info-generation';

export function get_copy_info(programStrPair: ProgramStrPair): CopyInfo {
  return move_progs(programStrPairToProgamPair(programStrPair))
}

export function lhs_rhs_loc_info(programStrPair: ProgramStrPair): ProgramPairLocs {
  return programLocHashToLocs(programLocHash(programStrPairToProgamPair(programStrPair)))
}

export function program_modulo_locations(prog: Program): Program {
  return ({ kind: prog.kind, body: map(dissoc("location"), prog.body) as DefinitionOrExpression[] })
}

export function program_modulo_locations_dups(programPair: ProgramPair): DefinitionOrExpression[] {
  const lhs_prog_body = programPair.lhs_prog.body;
  const rhs_prog_body = programPair.rhs_prog.body;
  let dups = [];
  for (let i = 0; i < lhs_prog_body.length; i++) {
    let thisDefExpr = lhs_prog_body[i]
    if (isThisInDefExprs(thisDefExpr, rhs_prog_body)) {
      dups.push(thisDefExpr)
    }
  }
  return dups;
}

export function program_modulo_locations_dups_body(programPair: ProgramPair): DefinitionOrExpression[] {
  const lhs_prog_body = programPair.lhs_prog.body;
  const rhs_prog_body = programPair.rhs_prog.body;
  let dups = [];
  for (let i = 0; i < lhs_prog_body.length; i++) {
    let thisDefExpr = lhs_prog_body[i]
    if (isThisInDefExprsBody(thisDefExpr, rhs_prog_body)) {
      dups.push(thisDefExpr)
    }
  }
  return dups;
}

function isThisInDefExprs(thisDefExpr: DefinitionOrExpression, defExprs: DefinitionOrExpression[]) {
  return filter(e => equals(thisDefExpr, e), defExprs).length > 0
}

function isThisInDefExprsBody(thisDefExpr: DefinitionOrExpression, defExprs: DefinitionOrExpression[]) {
  return filter(e => equals(getBody(thisDefExpr), getBody(e)), defExprs).length > 0
}

function getBody(defExpr: DefinitionOrExpression): Expression {
  return defExpr.kind === "FunctionDefinition" ? defExpr.body : defExpr.expr
}


export function get_from_prog_loc_hash(defOrExpr: DefinitionOrExpression, hash: [DefinitionOrExpression, Loc][]): Loc {
  return filter(assocVal => equals(assocVal[0], defOrExpr), hash)[0][1]
}

export function get_prog_unnamed_hash(prog: Program) {
  return map(defExprRenamedNoLocPairLoc, prog.body)
}

export function defExprNoLocation(defexpr: DefinitionOrExpression): DefinitionOrExpression {
  return dissoc("location", defexpr)
}

export function get_prog_loc_hash(prog: Program): [DefinitionOrExpression, Loc][] {
  return map(defExprNoLocationPairLocation, prog.body)
}

export function defExprRenamedNoLocPairLoc(defExpr: DefinitionOrExpression): [DefinitionOrExpression, Loc] {
  return [renameDefExpr(defExprNoLocation(defExpr)), defExprLoc(defExpr)]
}

export function defExprNoLocationPairLocation(defExpr: DefinitionOrExpression): [DefinitionOrExpression, Loc] {
  return [defExprNoLocation(defExpr), defExprLoc(defExpr)]
}

export function defExprLoc(defExpr: DefinitionOrExpression) {
  return <Loc>defExpr.location
}

export function parse_prog(str: string): Program {
  return parser.parse(str);
}
export function read_from_path(path: string): string {
  // Turned into a stub because NODE's fs doesn't exist on the browser
  // return fs.readFileSync(path, { encoding: 'utf8', flag: 'r' })
  return path;
}

export function programPathPairToProgramStrPair(prog_path_pair: ProgramPathPair): ProgramStrPair {
  return { lhs_str: read_from_path(prog_path_pair.lhs_path), rhs_str: read_from_path(prog_path_pair.rhs_path) }
}

export function programStrPairToProgamPair(prog_str_path: ProgramStrPair): ProgramPair {
  return { lhs_prog: parse_prog(prog_str_path.lhs_str), rhs_prog: parse_prog(prog_str_path.rhs_str) }
}

export function programPathPairToProgramPair(programPathPair: ProgramPathPair): ProgramPair {
  return programStrPairToProgamPair(programPathPairToProgramStrPair(programPathPair));
}

export function move_paths(pathPair: ProgramPathPair): CopyInfo {
  return move_progs(programPathPairToProgramPair(pathPair))
}

export function rename_paths(pathPair: ProgramPathPair): CopyInfo {
  return rename_progs(programPathPairToProgramPair(pathPair))
}

function programPairModuloLoc(programPair: ProgramPair): ProgramPair {
  return {
    lhs_prog: program_modulo_locations(programPair.lhs_prog),
    rhs_prog: program_modulo_locations(programPair.rhs_prog)
  }
}

function programPairRename(programPair: ProgramPair): ProgramPair {
  return {
    lhs_prog: renameProgram(programPair.lhs_prog),
    rhs_prog: renameProgram(programPair.rhs_prog)
  }
}

export function programLocHashToLocs(programPair: ProgLocHash): ProgramPairLocs {
  return {
    lhs_locs: programPair.lhs_loc_hash.map(p => p[1]),
    rhs_locs: programPair.rhs_loc_hash.map(p => p[1])
  }
}

export function programPairUnnamedHash(programPair: ProgramPair): ProgUnnamedHash {
  return {
    lhs_unnamed_hash: get_prog_unnamed_hash(programPair.lhs_prog),
    rhs_unnamed_hash: get_prog_unnamed_hash(programPair.rhs_prog)
  }
}

export function programLocHash(programPair: ProgramPair): ProgLocHash {
  return {
    lhs_loc_hash: get_prog_loc_hash(programPair.lhs_prog),
    rhs_loc_hash: get_prog_loc_hash(programPair.rhs_prog)
  }
}

// type ProgBodyHash = {
//   lhs_body_hash: [DefinitionOrExpression, Loc][]
//   rhs_body_hash: [DefinitionOrExpression, Loc][]
// }

// export function programPairBodyHash(programPair: ProgramPair): ProgBodyHash {
//   return {
//     lhs_body_hash: get_prog_body_hash(programPair.lhs_prog),
//     rhs_body_hash: get_prog_body_hash(programPair.rhs_prog)
//   }
// }
// export function get_prog_body_hash(prog: Program): [DefinitionOrExpression, Loc][] {
//   return map(defExprRenamedNoLocPairLoc, prog.body)
// }

// export function get_prog_unnamed_hash(prog: Program): [DefinitionOrExpression, Loc][] {
//   return []
// }


function unhash(hash: [DefinitionOrExpression, Loc][], sims: DefinitionOrExpression[]) {
  return map(e => get_from_prog_loc_hash(e, hash), sims)
}

function unhashUnnamedHashPair(unnamedHashPair: ProgUnnamedHash, sims: DefinitionOrExpression[]): SimilarLocs {
  return {
    lhs_loc: unhash(unnamedHashPair.lhs_unnamed_hash, sims),
    rhs_loc: unhash(unnamedHashPair.rhs_unnamed_hash, sims),
  }
}

function unhashLocHashPair(locHashPair: ProgLocHash, sims: DefinitionOrExpression[]): SimilarLocs {
  return {
    lhs_loc: unhash(locHashPair.lhs_loc_hash, sims),
    rhs_loc: unhash(locHashPair.rhs_loc_hash, sims)
  }
}

export function rename_progs(programPair: ProgramPair): CopyInfo {
  const noloc = programPairModuloLoc(programPair)
  const prog_mod_name_loc = programPairRename(noloc)
  const unnamedHashedPair = programPairUnnamedHash(programPair);
  const sims = program_modulo_locations_dups(prog_mod_name_loc);
  const unhashes = unhashUnnamedHashPair(unnamedHashedPair, sims)
  const locs = zip(unhashes.lhs_loc, unhashes.rhs_loc);
  return renamingVarGen(locs, programPair)
}

export function move_progs(programPair: ProgramPair): CopyInfo {
  const prog_mod_loc = programPairModuloLoc(programPair)
  const locHashPair = programLocHash(programPair);
  const sims = program_modulo_locations_dups(prog_mod_loc)
  const unhashes = unhashLocHashPair(locHashPair, sims)
  const locs = zip(unhashes.lhs_loc, unhashes.rhs_loc)
  return genMovingCode(locs, programPair);
}

export function extract_code(programPair: ProgramPair): CopyInfo {
  const prog_mod_loc = programPairModuloLoc(programPair)
  const locHashPair = programLocHash(programPair);
  const sims = program_modulo_locations_dups_body(prog_mod_loc)
  const unhashes = unhashLocHashPair(locHashPair, sims)
  const locs = zip(unhashes.lhs_loc, unhashes.rhs_loc)
  return genExtractCode(locs, programPair);
}

export function comments_and_whitespaces_strs(programStrPair: ProgramStrPair): CopyInfo {

  const lhs_prog_str = programStrPair.lhs_str
  const rhs_prog_str = programStrPair.rhs_str

  const lhs_prog = parser.parse(lhs_prog_str);
  const rhs_prog = parser.parse(rhs_prog_str)

  const lhs_prog_no_loc = program_modulo_locations(lhs_prog);
  const rhs_prog_no_loc = program_modulo_locations(rhs_prog);

  return equals(lhs_prog_no_loc, rhs_prog_no_loc) ? genChangingCommentsAndSpaces() : genOk();
}



// DEAL with a file that does not parse, and send a message
// 

// console.log(JSON.stringify(rename_strs_paths(
//   './corpus/test-files/rename-test-lhs.txt',
//   './corpus/test-files/rename-test-rhs.txt'
// )))
// 