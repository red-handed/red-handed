import React from "react"

//represents the student windows
export const Students = () => {
  return (
    <div className="row">

      <div className="col-sm">
        <div className="form-group text-bubble">

          <textarea className="form-control student-text"
            id="inputlhs"
            rows={15}>
          </textarea>
        </div>
      </div>
      <div className="col-sm">
        <div className="form-group text-bubble">

          <textarea className="form-control student-text"
            id="inputrhs"
            rows={15}>
          </textarea>
        </div>
      </div>

    </div>
  )
}