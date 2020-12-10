import React from "react"

//creates a <span> with the provided string highlighted in the provided color
export function CodeSeg(props: { color: any; str: string }) {
    return (
        <span className="codeSeg" style={{ backgroundColor: props.color }}>
            {props.str}
        </span>
    )
}