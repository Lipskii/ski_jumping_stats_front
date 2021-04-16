import {Col, Row} from "react-bootstrap";
import React, {Component} from "react";
import {DatePicker, Select} from "antd";
import axios from "axios";
import SearchingField from "../Results/SearchingField";
import SkiJumpersTable from "./SkiJumpersTable";


const {RangePicker} = DatePicker;

class SearchSkiJumpers extends Component {

    state = {
        cities: [],
        competitions: [],
        countries: [],
        filterActive: '',
        filterCityId: '',
        filterCountryId: '',
        filterGenderId: '',
        filterLastName: '',
        filterSeason: '',
        filterSeriesId: '',
        filterSizeId: '',
        filterSkiClubId: '',
        filterVenueId: '',
        filterYearAfter: '',
        filterYearBefore: '',
        genders: [],
        series: [],
        skiClubs: [],
        skiJumpers: [],
        skiJumpersLoading: false,
        sizes: [],
        venues: [],
    }


    componentDidMount() {
        this.setState({
            countries: this.props.countries,
            cities: this.props.cities,
            genders: this.props.genders,
            skiClubs: this.props.skiClubs,
            skiJumpers: this.props.skiJumpers
        })
    }

    filter = () => {
        // let lastNamePathPart
        // console.log("FILTER")
        // if(this.state.filterLastName === '' ){
        //     lastNamePathPart = ''
        // } else {
        //     lastNamePathPart = '&lastNameLike=' + this.state.filterLastName
        // }
        // console.log(lastNamePathPart)
        axios.get('/api/skiJumpers?&countryId=' + this.state.filterCountryId
            + '&cityId=' + this.state.filterCityId
            + '&genderId=' + this.state.filterGenderId
            + '&isActive=' + this.state.filterActive
            + '&skiClubId=' + this.state.filterSkiClubId
            + '&bornAfter=' + this.state.filterYearAfter
            + '&bornBefore=' + this.state.filterYearBefore
            // + lastNamePathPart
        )
            .then(res => {
                this.setState({
                    skiJumpers: res.data,
                    skiJumpersLoading: false
                })
            })
            .catch(error => console.log(error))
    }

    render() {
        console.log(this.state)
        return (
            <div>
                <Row>
                    <h3 style={{margin: "auto", marginBottom: "10px"}}>Search Ski Jumpers</h3>
                </Row>

                <SearchingField
                    label={"Country:"}
                    defaultValue={""}
                    placeholder={"Select country"}
                    onChange={(id) => {
                        this.setState({
                            skiJumpersLoading: true,
                            filterCountryId: id
                        }, () => this.filter())
                    }}
                >
                    <Select.Option value={""}>All countries</Select.Option>
                    {this.state.countries.map(country =>
                        <Select.Option key={country.id} value={country.id}>
                            {country.name}
                        </Select.Option>)}
                </SearchingField>

                <SearchingField
                    label={"City:"}
                    defaultValue={""}
                    placeholder={"Select city"}
                    onChange={(id) => {
                        this.setState({
                            skiJumpersLoading: true,
                            filterCityId: id
                        }, () => this.filter())
                    }}
                >
                    <Select.Option value={""}>All cities</Select.Option>
                    {this.state.cities.map(city =>
                        <Select.Option key={city.id} value={city.id}>
                            {city.name}
                        </Select.Option>)}
                </SearchingField>

                <SearchingField
                    label={"Gender:"}
                    placeholder={"Select gender"}
                    defaultValue={""}
                    onChange={(id) => {
                        this.setState({
                            skiJumpersLoading: true,
                            filterGenderId: id
                        }, () => this.filter())
                    }}
                >
                    <Select.Option value={""}>Male and Female</Select.Option>
                    {this.state.genders.map(gender =>
                        <Select.Option key={gender.id} value={gender.id}>
                            {gender.gender}
                        </Select.Option>)}
                </SearchingField>

                <SearchingField
                    label={"Status:"}
                    defaultValue={""}
                    placeholder={"Select status"}
                    onChange={(id) => {
                        this.setState({
                            skiJumpersLoading: true,
                            filterActive: id
                        }, () => this.filter())
                    }}
                >
                    <Select.Option value={""}>Active and retired</Select.Option>
                    <Select.Option value={true}>Active</Select.Option>
                    <Select.Option value={false}>Retired</Select.Option>
                </SearchingField>

                <SearchingField
                    label={"Club:"}
                    defaultValue={""}
                    placeholder={"club"}
                    onChange={(id) => {
                        this.setState({
                            skiJumpersLoading: true,
                            filterSkiClubId: id
                        }, () => this.filter())
                    }}
                >
                    <Select.Option value={""}>All clubs</Select.Option>
                    {this.state.skiClubs.map(skiClub =>
                        <Select.Option key={skiClub.id} value={skiClub.id}>
                            {skiClub.name}
                        </Select.Option>)}
                </SearchingField>

                <Row style={{marginBottom: "10px"}}>
                    <Col sm={2}>
                        <label>Born between:</label>
                    </Col>
                    <Col sm={10}>
                        <RangePicker
                            picker="year"
                            onChange={(e) => {

                                this.setState({
                                    competitionsLoading: true,
                                    filterYearAfter: e[0]._d.toISOString().slice(0, 10),
                                    filterYearBefore: e[1]._d.toISOString().slice(0, 10)
                                }, () => this.filter())
                            }}
                        />
                    </Col>
                </Row>

                <Row>
                    {this.state.skiJumpers.length > 0 ? <SkiJumpersTable
                        skiJumpers={this.state.skiJumpers}
                        skiJumpersLoading={this.state.skiJumpersLoading}
                    /> : <p style={{textAlign: "center"}}>No jumpers found</p>}
                </Row>

            </div>
        )
    }
}

export default SearchSkiJumpers


