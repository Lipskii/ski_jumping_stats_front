import {Col, Row} from "react-bootstrap";
import React, {Component} from "react";
import SearchingField from "./SearchingField";
import {DatePicker, Select} from "antd";
import CompetitionsTable from "./CompetitionsTable";
import axios from "axios";


class SearchResults extends Component {

    state = {
        competitions: [],
        competitionsLoading: false,
        countries: [],
        filterCountryId: '',
        filterSeason: '',
        filterSeriesId: 9,
        filterSizeId: '',
        filterVenueId: '',
        series: [],
        sizes: [],
        venues: [],
    }


    componentDidMount() {
        this.setState({
            competitions: this.props.competitions,
            countries: this.props.countries,
            series: this.props.series,
            sizes: this.props.sizes,
            venues: this.props.venues,
        })
    }

    filter = () => {
        console.log(this.state)
        axios.all([
            axios.get('/api/competitions?seriesMajorId=' + this.state.filterSeriesId
                + '&countryId=' + this.state.filterCountryId
                + '&venueId=' + this.state.filterVenueId
                + '&sizeOfHillId=' + this.state.filterSizeId
                + '&season=' + this.state.filterSeason
                ), //+ '?hasResults=true'
            axios.get('/api/venues?hasHills=true'
                + '&countryId='+ this.state.filterCountryId)
        ])
            .then(axios.spread((
                competitionsData,
                venuesData
            ) => {
                this.setState({
                    competitions:  competitionsData.data,
                    competitionsLoading: false,
                    venues: venuesData.data
                })
            }))
            .catch(error => console.log(error))
            .finally(() => this.setState({
                pageLoading: false,
            }))
    }

    render() {
        console.log(this.state)
        return (
            <Col sm={8}>
                <Row>
                    <h3 style={{margin: "auto", marginBottom: "10px"}}>Search Competitions</h3>
                </Row>

                <SearchingField
                    label={"Series:"}
                    placeholder={"Select series"}
                    defaultValue={9}
                    onChange={(id) => {
                        this.setState({
                            competitionsLoading: true,
                            filterSeriesId: id
                        }, () => this.filter())
                    }}
                >
                    <Select.Option value={""}>All series</Select.Option>
                    {this.state.series.map(series =>
                        <Select.Option key={series.id} value={series.id}>
                            {series.name}
                        </Select.Option>)}
                </SearchingField>

                <SearchingField
                    label={"Country:"}
                    placeholder={"Select country"}
                    defaultValue={''}
                    onChange={(id) => {
                        this.setState({
                            competitionsLoading: true,
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
                    key={this.state.venues}
                    label={"Venues:"}
                    placeholder={"Select venue"}
                    defaultValue={''}
                    onChange={(id) => {
                        this.setState({
                            competitionsLoading: true,
                            filterVenueId: id
                        }, () => this.filter())
                    }}
                >
                    <Select.Option value={""}>All venues</Select.Option>
                    {this.state.venues.map(venue =>
                        <Select.Option key={venue.id} value={venue.id}>
                            {venue.name}, {venue.city.name}
                        </Select.Option>)}
                </SearchingField>

                <SearchingField
                    label={"Size of hill:"}
                    placeholder={"Select size"}
                    defaultValue={''}
                    onChange={(id) => {
                        this.setState({
                            competitionsLoading: true,
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

                <Row style={{marginBottom: "10px"}}>
                    <Col sm={2}>
                        <label>Season:</label>
                    </Col>
                    <Col sm={10}>
                        <DatePicker
                            picker="year"
                            placeholder={"Select season"}
                          //  defaultValue={'2021-01-01'}
                            onChange={(e) => {
                                console.log(e)
                                let year
                                if (e !== null) {
                                    year = e._d.getFullYear()
                                } else {
                                    year = ''
                                }
                                this.setState({
                                    competitionsLoading: true,
                                    filterSeason: year
                                }, () => this.filter())
                            }}
                        />
                    </Col>
                </Row>


                <Row style={{margin: "auto"}}>
                    {this.state.competitions.length > 0 ? <CompetitionsTable
                        competitions={this.state.competitions}
                        competitionsLoading={this.state.competitionsLoading}
                    /> : <p style={{textAlign: "center"}}>No competitions found</p>}
                </Row>


            </Col>
        )
    }
}

export default SearchResults


{/*</div>*/
}
{/*<SelectInputForm*/
}
{/*    title={"Series:"}*/
}
{/*    defaultValue={""}*/
}
{/*    onChange={e => {*/
}
{/*        this.setState({*/
}
{/*            activePage: 1,*/
}
{/*            competitionsLoading: true,*/
}
{/*            filterSeriesId: e.target.value*/
}
{/*        }, () => this.filter())*/
}
{/*    }}*/
}
{/*>*/
}
{/*    <option value={""}>All series</option>*/
}
{/*    {this.state.series.map(series =>*/
}
{/*        <option key={series.id} value={series.id}>*/
}
{/*            {series.name}*/
}
{/*        </option>)}*/
}
{/*</SelectInputForm>*/
}

