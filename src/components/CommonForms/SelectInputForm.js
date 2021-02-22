import React from 'react'
import {Col, Form, Row} from "react-bootstrap";
/**
 * @deprecated
 */

const SelectInputForm = (props) =>
    (
        <Form.Group as={Row}>
            <Form.Label column sm={2}>{props.title}:</Form.Label>
            <Col sm={10}>
                <Form.Control as="select" defaultValue={""} disabled={props.disabled} onChange={props.onChangeValue}>
                    <option value={""} disabled>Choose...</option>
                    {props.items.map(item =>
                        <option key={item.id} value={item.id} name={item.name}>
                            {props.valuesToShow.map(value => {
                                if(item[value] !== undefined){
                                    return item[value]
                                } else {
                                    return value
                                }
                            })}
                        </option>)}
                </Form.Control>
                <Form.Text className="text-muted">
                    {props.hintTextDown}
                </Form.Text>
            </Col>
        </Form.Group>
    )


export default SelectInputForm