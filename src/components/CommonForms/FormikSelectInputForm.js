import React from 'react'
import {Col, Form, Row} from "react-bootstrap";
import {useField} from "formik";
import {ErrorLabel} from "../StyledComponents";


const FormikSelectInputForm = ({label, hintTextDown, ...props}) =>{

    const [field, meta] = useField(props);

    return (
        <Form.Group as={Row}>
            <Form.Label column sm={2}>{label}:</Form.Label>
            <Col sm={10}>
                <Form.Control as="select" {...field} {...props} >
                </Form.Control>
                <Form.Text className="text-muted">
                    {hintTextDown}
                </Form.Text>
                {meta.touched && meta.error ? (
                    <ErrorLabel>{meta.error}</ErrorLabel>
                ) : null}
            </Col>
        </Form.Group>
    )
}



export default FormikSelectInputForm