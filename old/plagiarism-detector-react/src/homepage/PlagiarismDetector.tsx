import React from 'react';
import {Col} from 'react-bootstrap';
//import Button from 'react-bootstrap/Button'
import Container from "react-bootstrap/cjs/Container";
import Row from "react-bootstrap/Row";
import TopNavBar from "./topNavBar/topNavBar";
import Student1 from "./student1/Student1";
import Student2 from "./student 2/Student2";
import SideNavBar from "./sidebar/sideNavBar";
import { Input, Form, Layout, Button, List} from "antd";
import { FormInstance } from "antd/lib/form";
import { DeleteOutlined } from '@ant-design/icons';
import PlagiarismDetectorState from "./PlagiarismDetectorState";
import Upload from "./upload/Upload";
import Progress from "./progress/Progress";
import Dropzone from "./dropzone/Dropzone";
import InfoPage from "./topNavBar/InfoPage";
import {BrowserRouter as Router, Link, Route} from 'react-router-dom'


// interface PlagiarismDetectorItem {
//     title: string;
// }
//
// interface PlagiarismDetectorState {
//     items: PlagiarismDetectorItem[];
// }

export default class PlagiarismDetector extends React.Component<{}, PlagiarismDetectorState> {



    render() {
        return (
            <div>
                <head>
                    <link rel="stylesheet"
                          href="https://stackpath.bootstrapcdn.com/bootstrap/4.3.1/css/bootstrap.min.css"
                          integrity="sha384-ggOyR0iXCbMQv3Xipma34MD+dH/1fQ784/j6cY/iJTQUOhcWr7x9JvoRxT2MZw1T"
                          crossOrigin="anonymous"/>

                </head>

                <TopNavBar/>
                <SideNavBar/>

                <Container className="students">
                    <Row>

                        <Col>
                            <Student1/>

                        </Col>
                        <Col>
                            <Student2/>
                        </Col>
                    </Row>
                </Container>
                <Router>
                    <Route
                        exact={true}
                        path="/infoPage"
                        component={InfoPage}/>
                </Router>






            </div>
            )
    }
}
