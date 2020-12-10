import React from 'react'
import {Progress} from "antd";
import {ProgressBar} from "react-bootstrap";
import socketIOClient from "socket.io-client";
import {Sim} from './sim'

let socket = require('socket.io-client')

type sim = {type: string, loc: []}
var sims: sim[] = []

socket.on('res', (copyInfo: sim[]) => {
    copyInfo.map(sim => {
        sims.push(sim)
    })

  });

class SimList extends React.Component<{}, {sims:[]}>{
    constructor(props: []) {
        super(props);
        this.state = {
            sims: [] 
        }
    }

     render() {
        return (
        <div>
            <div className="sim-block ">
                <h3>Similarities</h3>

                <ol className="list-group list-group-flush overflow-auto sim-list scrollbar-ripe-malinka" > 
                    
                {
                    this.state.sims.map( (sim:sim) =>{
                        return <Sim name={sim.type} loc={sim.loc}/>
                    })
                }
                </ol>
                
            </div>
        </div>

        )
        }
    }
        
export default SimList
