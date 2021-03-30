import {Col, Row} from "react-bootstrap";
import React from "react";
import {Select} from "antd";
import CompetitionsTable from "./CompetitionsTable";

const SearchingField = ({children,...props}) => {

    return (
        <div>
        <Row style={{marginBottom: "10px"}}>
            <Col sm={2}>
                <label>{props.label}</label>
            </Col>
            <Col sm={10}>
                <Select
                    showSearch
                    style={{width: "100%"}}
                    placeholder={props.placeholder}
                    optionFilterProp="children"
                    filterOption={(input, option) =>
                        option.children.toLowerCase().indexOf(input.toLowerCase()) >= 0
                    }
                >
                    {children}
                </Select>
            </Col>
        </Row>
        </div>
    )
}

export default SearchingField

