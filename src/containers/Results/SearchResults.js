import {Col, Form, Row} from "react-bootstrap";
import React from "react";
import {Select} from "antd";
import {Option} from "antd/es/mentions";
import SearchingField from "./SearchingField";

const SearchResults = (props) => {

    return (
        <Col sm={8}>
            <Row>
                <h3 style={{margin: "auto", marginBottom: "10px"}}>Search Competitions</h3>
            </Row>

            <SearchingField
                label={"Series:"}
                placeholder={"Select a series"}
            >
                <Option value={""}>All series</Option>
                {props.series.map(series =>
                    <Option key={series.id} value={series.id}>
                        {series.name}
                    </Option>)}
            </SearchingField>

            <SearchingField
                label={"Country:"}
                placeholder={"Select a country"}
            >
                <Option value={""}>All countries</Option>
                {props.countries.map(country =>
                    <Option key={country.id} value={country.id}>
                        {country.name}
                    </Option>)}
            </SearchingField>

            <SearchingField
                label={"Venues:"}
                placeholder={"Select a venue"}
            >
                <Option value={""}>All venues</Option>
                {props.venues.map(venues =>
                    <Option key={venues.id} value={venues.id}>
                        {venues.name}
                    </Option>)}
            </SearchingField>

            <SearchingField
                label={"Size of hill:"}
                placeholder={"Select a size"}
            >
                <Option value={""}>All sizes</Option>
                {props.sizes.map(size =>
                    <Option key={size.id} value={size.id}>
                        {size.designation}
                    </Option>)}
            </SearchingField>

        </Col>
    )
}

export default SearchResults


{/*</div>*/}
{/*<SelectInputForm*/}
{/*    title={"Series:"}*/}
{/*    defaultValue={""}*/}
{/*    onChange={e => {*/}
{/*        this.setState({*/}
{/*            activePage: 1,*/}
{/*            competitionsLoading: true,*/}
{/*            filterSeriesId: e.target.value*/}
{/*        }, () => this.filter())*/}
{/*    }}*/}
{/*>*/}
{/*    <option value={""}>All series</option>*/}
{/*    {this.state.series.map(series =>*/}
{/*        <option key={series.id} value={series.id}>*/}
{/*            {series.name}*/}
{/*        </option>)}*/}
{/*</SelectInputForm>*/}

