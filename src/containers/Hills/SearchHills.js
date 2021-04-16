import {Row} from "react-bootstrap";
import React, {Component} from "react";
import {DatePicker, Select} from "antd";
import axios from "axios";
import SearchingField from "../Results/SearchingField";
import SearchHillsTable from "./SearchHillsTable";


const {RangePicker} = DatePicker;

class SearchHills extends Component {

    state = {
        cities: [],
        countries: [],
        filterCityId: '',
        filterCountryId: '',
        filterSizeId: '',
        filterVenueId: '',
        hills: [],
        hillsLoading: false,
        hillRecords: [],
        sizes: [],
        venues: [],
    }


    componentDidMount() {
        this.setState({
            countries: this.props.countries,//.filter(country => country.),
            cities: this.props.cities,
            hills: this.props.hills,
            hillRecords: this.props.hillRecords,
            sizes: this.props.sizes,
            venues: this.props.venues
        })
    }

    filter = () => {
        axios.all([
            axios.get('api/cities?cityId=' + this.state.filterCountryId),
            axios.get('/api/hills?countryId=' + this.state.filterCountryId
                + '&cityId=' + this.state.filterCityId
                + '&sizeOfHillId=' + this.state.filterSizeId
                + '&venueId=' + this.state.filterVenueId),
            axios.get('/api/venues?hasHills=true'
                + '&countryId='+ this.state.filterCountryId)
        ])
            .then(axios.spread((
                citiesData,
                hillsData,
                venuesData
            ) => {
                this.setState({
                    cities: citiesData.data,
                    hills: hillsData.data,
                    hillsLoading: false,
                    venues: venuesData.data
                })
            }))
            .catch(error => console.log(error))
    }


    render() {
        console.log(this.state)
        return (
            <div>
                <Row>
                    <h3 style={{margin: "auto", marginBottom: "10px"}}>Search Hills</h3>
                </Row>

                <SearchingField
                    label={"Country:"}
                    defaultValue={""}
                    placeholder={"Select country"}
                    onChange={(id) => {
                        this.setState({
                            hillsLoading: true,
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
                            hillsLoading: true,
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
             //      key={this.state.venues}
                    label={"Venue:"}
                    defaultValue={""}
                    placeholder={"Select venue"}
                    onChange={(id) => {
                        this.setState({
                            hillsLoading: true,
                            filterVenueId: id
                        }, () => this.filter())
                    }}
                >
                    <Select.Option value={""}>All venues</Select.Option>
                    {this.state.venues.map(venue =>
                        <Select.Option key={venue.id} value={venue.id}>
                            {venue.name}
                        </Select.Option>)}
                </SearchingField>

                <SearchingField
                    key={this.state.sizes}
                    label={"Size:"}
                    defaultValue={""}
                    placeholder={"Select size"}
                    onChange={(id) => {
                        this.setState({
                            hillsLoading: true,
                            filterSizeId: id
                        }, () => this.filter())
                    }}
                >
                    <Select.Option value={""}>All sizes</Select.Option>
                    {this.state.sizes.map(size =>
                        <Select.Option key={size.id} value={size.id}>
                            {size.designation}
                        </Select.Option>)}
                </SearchingField>

                <Row>
                    {this.state.hills.length > 0 ? <SearchHillsTable
                        hills={this.state.hills}
                        hillsLoading={this.state.hillsLoading}
                        hillRecords={this.state.hillRecords}
                    /> : <p style={{textAlign: "center"}}>No hills found</p>}
                </Row>
            </div>
        )
    }
}

export default SearchHills


