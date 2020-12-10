import React, { DetailedHTMLProps, HTMLAttributes } from 'react';
import { Students } from './students';
import { CodeSegList } from './codeSegList';
import { get_copy_info, lhs_rhs_loc_info } from './detection/src/plagiarism-algorithm';
import { Loc } from './detection/src/abstract-syntax-tree';
import { equals, filter, length } from 'ramda';

function onloadfunction() {
  (document.getElementById("inputlhs") as HTMLElement).innerHTML = "(define x 1)";
  (document.getElementById("inputrhs") as HTMLElement).innerHTML = "(define x 2)";
  console.log("loaded")
}

function onClickSubmit() {
  const inputBoxLHS = document.getElementById("inputlhs") as HTMLTextAreaElement
  if (inputBoxLHS) {
    const lhs = inputBoxLHS.value
    const inputBoxRHS = document.getElementById("inputrhs") as HTMLTextAreaElement
    if (inputBoxRHS) {
      const rhs = inputBoxRHS.value
      display()
    } else {
      throw Error(`The "inputrhs" text area is not available!`)
    }
  } else {
    throw Error(`The "inputlhs" text area is not available!`)
  }
}

function display(): [DisplayObj[], DisplayObj[]] {


  let lhs = (document.getElementById("inputlhs") as HTMLTextAreaElement).value;
  let rhs = (document.getElementById("inputrhs") as HTMLTextAreaElement).value;

  let lhslocs = lhs_rhs_loc_info({ lhs_str: lhs, rhs_str: rhs }).lhs_locs;
  let lhsSubstrings = getSubstrings(lhs, lhslocs);

  let rhslocs = lhs_rhs_loc_info({ lhs_str: lhs, rhs_str: rhs }).rhs_locs;
  let rhsSubstrings = getSubstrings(rhs, rhslocs);

  // algorithm is run, similarities found
  let matches = get_copy_info({ lhs_str: lhs, rhs_str: rhs }).loc; // [Loc, Loc][]

  let leftMatches: Loc[] = [];
  let rightMatches: Loc[] = [];

  for (let i = 0; i < matches.length; i++) {
    leftMatches.push(matches[i][0]);
    rightMatches.push(matches[i][1]);
  }
  //Assign matches to substrings + colors
  return get_display_both_sides(lhsSubstrings, rhsSubstrings, leftMatches, rightMatches);
}

// recieves either LHS or RHS and returns a string with the location of a specific section
function getSubstrings(str: string, locs: Loc[]): [string, Loc][] {
  let substrings: [string, Loc][] = [];

  for (let i = 0; i < locs.length; i++) {
    substrings.push([str.substring(locs[i].start.offset, locs[i].end.offset), locs[i]]);
  }

  return substrings;
}

export type DisplayObj = {
  color: string;
  str: string;
}


function get_display_one_side(str_loc_assoc: [string, Loc][], sim_locs: Loc[]): DisplayObj[] {
  return str_loc_assoc.map(str_loc => {
    return length(filter(equals(str_loc[1]), sim_locs)) > 0
      ? { color: "yellow", str: str_loc[0] }
      : { color: "white", str: str_loc[0] }
  })

}


function get_display_both_sides(
  str_loc_lhs: [string, Loc][],
  str_loc_rhs: [string, Loc][],
  sim_locs_lhs: Loc[],
  sim_locs_rhs: Loc[]
): [DisplayObj[], DisplayObj[]] {

  // generates a color list of length that equals similarity
  // locs
  let colors: string[] = gen_color(sim_locs_rhs.length);

  // turns both lhs and rhs similarity locs to [loc, col][]
  // so each similarity loc has a color coupled to it
  let sim_locs_lhs_colors: [Loc, string][] = [];
  let sim_locs_rhs_colors: [Loc, string][] = []

  for (let l = 0; l < sim_locs_lhs.length; l++) {
    sim_locs_lhs_colors.push([sim_locs_lhs[l], colors[l]])
    sim_locs_rhs_colors.push([sim_locs_rhs[l], colors[l]])
  }

  let disp_obj_lhs: DisplayObj[] = []
  let disp_obj_rhs: DisplayObj[] = []

  // loops through the similarity locs and 
  // maps each str-loc pair to a display object with a 
  // random color if it matches a simmilarity location, otherwise
  // give it "white"
  for (let i = 0; i < sim_locs_rhs.length; i++) {
    let this_sim_loc_col_lhs = sim_locs_lhs_colors[i];

    for (let j = 0; j < str_loc_lhs.length; j++) {
      let this_str_loc_lhs: [string, Loc] = str_loc_lhs[j];
      if (equals(this_sim_loc_col_lhs[0]), this_str_loc_lhs[1]) {
        disp_obj_lhs.push({
          color: this_sim_loc_col_lhs[1],
          str: this_str_loc_lhs[0]
        })
      } else {
        disp_obj_lhs.push({
          color: "white",
          str: this_str_loc_lhs[0]
        })
      }
    }

    let this_sim_loc_col_rhs = sim_locs_rhs_colors[i];

    for (let k = 0; k < str_loc_rhs.length; k++) {
      let this_str_loc_rhs: [string, Loc] = str_loc_lhs[k];
      if (equals(this_sim_loc_col_rhs[0]), this_str_loc_rhs[1]) {
        disp_obj_rhs.push({
          color: this_sim_loc_col_rhs[1],
          str: this_str_loc_rhs[0]
        })
      } else {
        disp_obj_lhs.push({
          color: "white",
          str: this_str_loc_rhs[0]
        })
      }
    }
  }

  return [disp_obj_lhs, disp_obj_rhs]
}

//produces a random color
function getRandomColor(): string {
  var letters = '0123456789ABCDEF';
  var color = '#';
  for (var i = 0; i < 6; i++) {
    color += letters[Math.floor(Math.random() * 16)]
  }

  return color;
}

//produces a string[] of random colors with the length being the same as the input
function gen_color(n: number): string[] {
  let colors: string[] = [];

  for (var i = 0; i < n; i++) {
    colors[i] = getRandomColor();
  }

  return colors;
}

export default class PlagiarismDetector extends React.Component<({})> {
  render() {
    return (
      <div>
        <head>
          <link rel="stylesheet"
            href="https://stackpath.bootstrapcdn.com/bootstrap/4.3.1/css/bootstrap.min.css"
            integrity="sha384-ggOyR0iXCbMQv3Xipma34MD+dH/1fQ784/j6cY/iJTQUOhcWr7x9JvoRxT2MZw1T"
            crossOrigin="anonymous" />
        </head>

        <body onLoad={(e) => onloadfunction()}>
          <h1 className="title">RedHanded</h1>
          <blockquote className="blockquote">
            <footer className="blockquote-footer title">"Their words, not mine"</footer>
          </blockquote>

          <br></br>
          <div className="container">

            <Students />


            <div className="submit">
              <button type="submit"
                id="submitbtn"
                className="btn btn-primary"
                onClick={() => onClickSubmit()}
              >Submit</button>
            </div>


            <div className="container">
              <div className="row">
                <div className="col-sm">
                  <CodeSegList {...display()[0]} />
                  <pre id="displayrhs"
                    className="text-bubble">
                  </pre>
                </div>

                <div className="col-sm">
                  <CodeSegList {...display()[1]} />
                  <pre id="displayrhs"
                    className="text-bubble">
                  </pre>
                </div>
              </div>
            </div>
          </div>

        </body>
      </div>
    )

  }

}


