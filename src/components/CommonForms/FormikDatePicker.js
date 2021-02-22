import React from "react";
import { useField, useFormikContext } from "formik";
import DatePicker from "react-datepicker";
import {Col, Form, Row} from "react-bootstrap";

export const DatePickerField = ({ label, ...props }) => {
    const { setFieldValue } = useFormikContext();
    const [field] = useField(props);
    return (
        <Form.Group as={Row}>
            <Form.Label column sm={2}>
                {label}
            </Form.Label>
            <Col sm={10}>
            <DatePicker
                {...field}
                {...props}
                selected={(field.value && new Date(field.value)) || null}
                onChange={val => {
                    setFieldValue(field.name, val);
                }}
                placeholderText="dd/mm/yyyy"
                dateFormat="dd/MM/yyyy"
            />
            </Col>
        </Form.Group>

    );
};