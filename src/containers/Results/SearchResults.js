import {Col, Row} from "react-bootstrap";
import React from "react";
import SearchingField from "./SearchingField";
import {DatePicker, Select} from "antd";

const SearchResults = (props) => {
    const { RangePicker } = DatePicker;

    return (
        <Col sm={8}>
            <Row>
                <h3 style={{margin: "auto", marginBottom: "10px"}}>Search Competitions</h3>
            </Row>

            <SearchingField
                label={"Series:"}
                placeholder={"Select a series"}
            >
                <Select.Option value={""}>All series</Select.Option>
                {props.series.map(series =>
                    <Select.Option key={series.id} value={series.id}>
                        {series.name}
                    </Select.Option>)}
            </SearchingField>

            <SearchingField
                label={"Country:"}
                placeholder={"Select a country"}
            >
                <Select.Option value={""}>All countries</Select.Option>
                {props.countries.map(country =>
                    <Select.Option key={country.id} value={country.id}>
                        {country.name}
                    </Select.Option>)}
            </SearchingField>

            <SearchingField
                label={"Venues:"}
                placeholder={"Select a venue"}
            >
                <Select.Option value={""}>All venues</Select.Option>
                {props.venues.map(venues =>
                    <Select.Option key={venues.id} value={venues.id}>
                        {venues.name}
                    </Select.Option>)}
            </SearchingField>

            <SearchingField
                label={"Size of hill:"}
                placeholder={"Select a size"}
            >
                <Select.Option value={""}>All sizes</Select.Option>
                {props.sizes.map(size =>
                    <Select.Option key={size.id} value={size.id}>
                        {size.designation}
                    </Select.Option>)}
            </SearchingField>

            <Row style={{marginBottom: "10px"}}>
                <Col sm={2}>
                    <label>Year:</label>
                </Col>
                <Col sm={10}>
                    <DatePicker picker="year" />
                </Col>
            </Row>

            <Row style={{marginBottom: "10px"}}>
                <Col sm={2}>
                    <label>Month:</label>
                </Col>
                <Col sm={10}>
                    <DatePicker picker="month" />
                </Col>
            </Row>


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

