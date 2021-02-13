import React from "react";
import {Col, Form, Row} from "react-bootstrap";


const TextInputForm = (props) => (

    <Form.Group as={Row}>
        <Form.Label column sm={2}>
            {props.title}:
        </Form.Label>
        <Col sm={10}>
            <Form.Control type="text" onChange={props.onChangeValue}/>
        </Col>
    </Form.Group>
    )



export default TextInputForm