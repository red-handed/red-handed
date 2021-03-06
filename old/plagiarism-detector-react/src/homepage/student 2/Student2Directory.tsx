import React from 'react';
import {Col, ListGroup} from "react-bootstrap";
import {FormInstance} from "antd/lib/form";
import {Button, Form, Input, List} from "antd";
import PlagiarismDetectorState from "../PlagiarismDetectorState";
import PlagiarismDetectorItem from "../PlagiarismDetectorItem";

class Student2Directory extends  React.Component<{}, PlagiarismDetectorState> {
    newPlagiarismForm: React.RefObject<FormInstance>;
    constructor(props:{}) {
        super(props);

        this.newPlagiarismForm = React.createRef();
        this.state = {items: []}
    }

    newFile(values: any) {
        let file = values.itemText;
        this.newPlagiarismForm.current?.setFieldsValue({itemText: ""});
        this.setState((prevState)=>({
            items : prevState.items.concat([{title: file}])
        }));
    }

    deleteFile(item: PlagiarismDetectorItem) {
        this.setState((prevState) => ({
            items:prevState.items.filter(i => i = item)
        }))
    }

    renderFile(item: PlagiarismDetectorItem) {
        return <ListGroup.Item className="list-group" variant="danger">
            {item.title}
            <Button className="btn-danger btn-lg float-rig" onClick={this.deleteFile.bind(this, item)}/>
        </ListGroup.Item>
    }

    render() {
        return <div>
            <Form onFinish={(values:{})=> this.newFile(values)} /*ref={this.newPlagiarismForm}*/>
                <input type="file"
                       id="student1Upload"
                       name="student1Upload"
                       multiple
                       accept=".scm,.ss,.rkt"/>
                <Form.Item label="Uploaded Files" name='itemText'><Input /></Form.Item>
            </Form>
            <List
                className="list-group"
                bordered
                dataSource={this.state.items}
                renderItem={this.renderFile.bind(this)}
            />
        </div>

    }
}

export default Student2Directory
