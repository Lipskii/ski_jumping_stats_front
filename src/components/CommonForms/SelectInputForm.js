import React from 'react'
import {Col, Form, Row} from "react-bootstrap";

const SelectInputForm = ({children,...props}) =>
    (
        <Form.Group as={Row}>
            <Form.Label column sm={2}>{props.title}</Form.Label>
            <Col sm={10}>
                <Form.Control as="select" {...props}>
                    {children}
                </Form.Control>
                <Form.Text className="text-muted">
                    {props.hintTextDown}
                </Form.Text>
            </Col>
        </Form.Group>
    )


export default SelectInputForm