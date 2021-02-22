import React from "react";
import {Col, Form, Row} from "react-bootstrap";

/**
 * @deprecated
 */
const TextInputForm = (props) => (

    <Form.Group as={Row}>
        <Form.Label column sm={2}>
            {props.title}:
        </Form.Label>
        <Col sm={10}>
            <Form.Control type="text" disabled={props.disabled} onChange={props.onChangeValue} placeholder={props.placeholder} isInvalid={props.isInvalid}/>
            {props.hintTextDown}
        </Col>

    </Form.Group>
    )



export default TextInputForm