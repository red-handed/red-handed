import React from 'react';
import {Col, ListGroup, ListGroupItem} from "react-bootstrap";
import { Input, Form, Layout, Button, List} from "antd";
import { FormInstance } from "antd/lib/form";
import PlagiarismDetectorState from "../PlagiarismDetectorState";
import PlagiarismDetectorItem from "../PlagiarismDetectorItem";
import Upload from "../upload/Upload";



class Student1Directory extends  React.Component<{}, PlagiarismDetectorState> {

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
        return <ListGroup.Item className="list-group" variant="light">
            {item.title}
            <Button className="btn-danger btn-lg float-right" onClick={this.deleteFile.bind(this, item)}/>
        </ListGroup.Item>
    }

    getResults(file: File) {
        let read = new FileReader();
        read.readAsText(file, 'UTF-8');
        read.onloadend = function(){
            console.log(read.result)
            return read.result
        }
    }

    
    render() {
        return <div>


            <Upload/>
            <hr/>
            <textarea name="" id="textarea">

                                </textarea>

        </div>

    }
}

export default Student1Directory
