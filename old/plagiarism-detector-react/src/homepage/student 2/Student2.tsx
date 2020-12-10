import React from 'react';
import {Col} from "react-bootstrap";
import Student2Directory from "./Student2Directory";

class Student2 extends  React.Component {
    render() {
        return <div className="student2">
            <Col>
                <h3>Student 2</h3>
                <hr/>
                <Student2Directory/>
                <br/>
                <ul className="nav nav-tabs">
                    <li className="nav-item">
                        <a className="nav-link active" href="#">File1.ss</a>
                    </li>
                    <li className="nav-item">
                        <a className="nav-link" href="#">File2.ss</a>
                    </li>
                    <li className="nav-item">
                        <a className="nav-link" href="#">File3.ss</a>
                    </li>
                    <li className="nav-item">
                        <a className="nav-link disabled" href="#">File4.ss</a>
                    </li>
                    <hr/>
                </ul>
                <hr/>
                <textarea className="studentTextArea2"></textarea>

            </Col>
        </div>

    }
}

export default Student2
