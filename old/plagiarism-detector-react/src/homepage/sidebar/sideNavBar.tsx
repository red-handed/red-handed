import React from 'react'
import {Progress} from "antd";
import {ProgressBar} from "react-bootstrap";
import SimList from "./simList"
import Percent from "./percent"
import { directive } from '@babel/types';

class SideNavBar extends React.Component {
    render() {
        return (
        <div>
            <div className="sidenav">

                <Percent/>
              
                <dl>
                    
                    <dt>
                        <SimList/>
                    </dt>
                    
                    
                </dl>

                
            </div>
        </div>
        )
    }
}

export default SideNavBar