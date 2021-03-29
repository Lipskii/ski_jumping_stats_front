import React from "react";
import {useField, useFormikContext} from "formik";
import {Col, Form, Row} from "react-bootstrap";
import {ErrorLabel} from "../StyledComponents";
import {TimePicker} from 'antd';
import 'antd/dist/antd.css';

const FormikTimePicker = ({label, ...props}) => {
    const {setFieldValue} = useFormikContext();
    const [field, meta] = useField(props);

    return (
        <Form.Group as={Row}>
            <Form.Label column sm={2}>
                {label}
            </Form.Label>
            <Col sm={2}>
                <TimePicker
                    {...field}
                    {...props}
                    onChange={val => {
                        setFieldValue(field.name, val);
                    }}
                />
                {meta.touched && meta.error ? (
                    <ErrorLabel>{meta.error}</ErrorLabel>
                ) : null}
            </Col>

        </Form.Group>

    );
};

export default FormikTimePicker