import React from 'react';
import {Col} from "react-bootstrap";
import Student1Directory from "./Student1Directory";
import axios from 'axios';
import {Button, Form, Input, List} from "antd";
import {FormInstance} from "antd/lib/form";
import PlagiarismDetectorState from "../PlagiarismDetector";

class Student1 extends  React.Component{

    render() {
        return <div className="student1">
            <Col>
                <h3>Student 1</h3>
                <hr/>
                <Student1Directory/>
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
                <div className="form-group">
                                <textarea name="" id="textarea">
                                    {document.getElementById("fileInput")}
                                </textarea>
                </div>
            </Col>
        </div>

    }
}

export default Student1
