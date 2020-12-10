import React from "react"
import { CodeSeg } from './codeSeg'
import { DisplayObj } from './PlagiarismDetector'


//maps the provided list of DidplayObj to HTML components
export function CodeSegList(props: DisplayObj[]) {
  const segs = props
  return (
    <div>
      {segs.map((seg: DisplayObj) => {
        <div>
          <CodeSeg color={seg.color} str={seg.str} />
        </div>
      })}
    </div>
  )
}
