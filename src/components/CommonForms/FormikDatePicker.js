import React from "react";
import {useField, useFormikContext} from "formik";
import {Col, Form, Row} from "react-bootstrap";
import {ErrorLabel} from "../StyledComponents";
import {DatePicker, Space} from 'antd';
import moment from 'moment';
import 'antd/dist/antd.css';


export const FormikDatePicker = ({label, ...props}) => {
    const {setFieldValue} = useFormikContext();
    const [field, meta] = useField(props);
    const dateFormat = 'DD/MM/YYYY';
    return (
        <Form.Group as={Row}>
            <Form.Label column sm={2}>
                {label}
            </Form.Label>
            <Col sm={2}>
                <DatePicker
                    {...field}
                    {...props}
                    defaultValue={moment('01/01/2001', dateFormat)}
                    format={dateFormat}
                    selected={moment(field.value && new Date(field.value)) || null}
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