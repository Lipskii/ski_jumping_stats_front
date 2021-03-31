import {Col, Row} from "react-bootstrap";
import React, {Component, useEffect, useState} from "react";
import {DatePicker, Select} from "antd";
import axios from "axios";
import SearchingField from "../Results/SearchingField";
import CompetitionsTable from "../Results/CompetitionsTable";
import SkiJumpersTable from "./SkiJumpersTable";

class SearchSkiJumpers extends Component {

    state = {
        cities: [],
        competitions: [],
        countries: [],
        filterActive: '',
        filterCityId: '',
        filterCountryId: '',
        filterGenderId: '',
        filterSeason: '',
        filterSeriesId: '',
        filterSizeId: '',
        filterSkiClubId: '',
        filterVenueId: '',
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
        console.log(this.state)
        axios.get('/api/skiJumpers?&countryId=' + this.state.filterCountryId
            + '&cityId=' + this.state.filterCityId
            + '&genderId=' + this.state.filterGenderId
            + '&isActive=' + this.state.filterActive
            + '&skiClubId=' + this.state.filterSkiClubId
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
            <Col sm={8}>
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



                <Row style={{margin: "auto"}}>
                    {this.state.skiJumpers.length > 0 ? <SkiJumpersTable
                        skiJumpers={this.state.skiJumpers}
                        skiJumpersLoading={this.state.skiJumpersLoading}
                    /> : <p style={{textAlign: "center"}}>No jumpers found</p>}
                </Row>


            </Col>
        )
    }
}

export default SearchSkiJumpers


