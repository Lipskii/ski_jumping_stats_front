import React, {Component} from "react";
import axios from "axios";
import {Header3, StyledDiv2Right1000, StyledDivCentered1000, TableButton} from "../../components/StyledComponents";
import {Table, Pagination, Button, Form} from "react-bootstrap";
import VenueForm from "./VenueForm";
import Loader from "react-loader-spinner";
import SelectInputForm from "../../components/CommonForms/SelectInputForm";

//TODO finish form
class Venues extends Component {
    state = {
        activePage: 1,
        countriesWithVenues: [],
        cities: [],
        citiesForForm: [],
        citiesWithVenues: [],
        clubs: [],
        clubsForForm: [],
        formHeaderText: '',
        venues: [],
        venuesLoading: false,
        currentCountry: '',
        showVenueForm: false
    }

    componentDidMount() {
        axios.all([
            axios.get('/api/countries'),
            axios.get('/api/countries/venues'),
            axios.get('/api/venues'),
            axios.get('/api/skiClubs'),
            axios.get('/api/cities'),
            axios.get('/api/cities/venues')

        ])
            .then(axios.spread((countriesData, countriesWithVenuesData, venuesData, skiClubsData, citiesData, citiesWithVenuesData) => {
                this.setState({
                    countries: countriesData.data,
                    countriesWithVenues: countriesWithVenuesData.data,
                    venues: venuesData.data,
                    clubs: skiClubsData.data,
                    clubsForForm: skiClubsData.data,
                    citiesForForm: citiesData.data,
                    cities: citiesData.data,
                    citiesWithVenues: citiesWithVenuesData.data
                })
            }))
            .catch(error => console.log(error))
    }

    updateToCountry = (e) => {
        let eTargetValue
        let urlStringVenues
        let urlStringCities
        let urlStringClubs

        if (e === undefined || e.target.value === "") {
            eTargetValue = this.state.currentCountry
            urlStringVenues = '/api/venues'
            urlStringCities = '/api/cities'
            urlStringClubs = '/api/skiClubs'
        } else {
            eTargetValue = e.target.value
            urlStringVenues = '/api/venues/country/' + e.target.value
            urlStringCities = '/api/cities/country/' + e.target.value
            urlStringClubs = '/api/skiClubs/country/' + e.target.value
        }

        this.setState({
            currentCountry: eTargetValue,
            venuesLoading: true
        }, () => {
            axios.all([
                axios.get(urlStringVenues),
                axios.get(urlStringClubs),
                axios.get(urlStringCities)

            ])
                .then(axios.spread((venuesData, skiClubsData, citiesData) => {
                    console.log(urlStringCities)
                    console.log(citiesData)
                    this.setState({
                        venues: venuesData.data,
                        clubs: skiClubsData.data,
                        citiesWithVenues: citiesData.data,
                        venuesLoading: false
                    })
                }))
                .catch(error => console.log(error))
        })
    }

    updateToCity = (e) => {
        let urlStringVenues


        if (e === undefined || e.target.value === "") {
            urlStringVenues = '/api/venues/country/' + this.state.currentCountry
        } else {
            urlStringVenues = '/api/venues/city/' + e.target.value
        }

        this.setState({
            venuesLoading: true
        }, () => {


            axios.get(urlStringVenues)
                .then(res => {
                    this.setState({
                        venues: res.data,
                        venuesLoading: false
                    })
                })
                .catch(error => console.log(error))
        })
    }

    filterFormCities = (e) => {

        let urlStringCities
        let urlStringClubs

        if (e === undefined || e.target.value === "") {
            urlStringCities = '/api/cities'
            urlStringClubs = '/api/skiClubs'
        } else {
            urlStringCities = '/api/cities/country/' + e.target.value
            urlStringClubs = '/api/skiClubs/country/' + e.target.value
        }


        axios.all([
            axios.get(urlStringCities),
            axios.get(urlStringClubs)
        ])
            .then(axios.spread((citiesData,skiClubsData)=>{
                this.setState({
                    clubsForForm: skiClubsData.data,
                    citiesForForm: citiesData.data,
                })
            }))
            .catch(error => console.log(error))
    }

    handleEditButton = (e) => {

    }

    handleDeleteButton = (e) => {

    }

    render() {
        console.log(this.state)


        let items = [];
        let numberOfPages = this.state.venues.length / 7
        if (this.state.venues.length % 7 !== 0) {
            numberOfPages++
        }

        for (let number = 1; number <= numberOfPages; number++) {
            items.push(
                <Pagination.Item key={number} id={number} active={number === this.state.activePage} onClick={e => {
                    this.setState({
                        activePage: parseInt(e.target.id)
                    })
                }}>
                    {number}
                </Pagination.Item>
            );
        }


        return (
            <React.Fragment>
                <Header3>Venues</Header3>

                <StyledDivCentered1000>

                    {/*Select Country*/}
                    <strong>Filter</strong>
                    <SelectInputForm
                        title={"Country"}
                        defaultValue={""}
                        onChange={e => {
                            this.setState({
                                selectedCountryId: e.target.value,
                                activePage: 1,
                                venuesLoading: true
                            }, () => this.updateToCountry(e))
                        }}
                    >
                        <option value={""}>All countries</option>
                        {this.state.countriesWithVenues.map(country =>
                            <option key={country.id} value={country.id}>
                                {country.name}
                            </option>)}
                    </SelectInputForm>

                    {/*City*/}
                    <SelectInputForm
                        key={this.state.currentCountry}
                        title={"City:"}
                        disabled={this.state.citiesWithVenues.length < 1}
                        defaultValue={""}
                        onChange={e => {
                            this.setState({
                                activePage: 1,
                                //venuesLoading: true
                            }, () => this.updateToCity(e))
                        }}
                    >
                        <option value={""}>All cities</option>
                        {this.state.citiesWithVenues.map(city => (
                            <option key={city.id} value={city.id} name={city.name}>{city.name}</option>
                        ))}
                    </SelectInputForm>


                    {/*Venues*/}
                    {this.state.venuesLoading ?
                        <Loader
                            type="ThreeDots"
                            color="#00BFFF"
                            height={80}
                            width={80}
                            style={{textAlign: 'center'}}
                        />
                        :
                        <div>
                            <Table bordered hover striped>
                                <thead>
                                <tr>
                                    <th>Venue</th>
                                    <th>City</th>
                                    <th>Opened in</th>
                                    <th>Capacity</th>
                                    <th>Club</th>
                                    <th>Actions</th>
                                </tr>
                                </thead>
                                <tbody>
                                {this.state.venues.map(venue => {
                                    if (((this.state.activePage - 1) * 7 <= this.state.venues.indexOf(venue)) && (this.state.venues.indexOf(venue) < this.state.activePage * 7)) {
                                        return (
                                            <tr key={venue.id} id={venue.id}>
                                                <td>{venue.name}</td>
                                                <td>{venue.city.name}</td>
                                                <td>{venue.yearOfOpening}</td>
                                                <td>{venue.capacity}</td>
                                                <td>{venue.skiClub.name}</td>
                                                <td>
                                                    <TableButton id={venue.id} name={venue.name} size="sm"
                                                                 variant={"info"}
                                                                 onClick={e => this.handleEditButton(e)}>
                                                        Edit
                                                    </TableButton>
                                                    <TableButton id={venue.id} name={venue.name} size="sm"
                                                                 variant={"danger"}
                                                                 onClick={e => this.handleDeleteButton(e)}>
                                                        Delete
                                                    </TableButton>
                                                </td>
                                            </tr>
                                        )
                                    }
                                })}
                                </tbody>
                            </Table>
                            <Pagination>{items}</Pagination>
                        </div>
                    }

                    <StyledDiv2Right1000>
                        <Button onClick={() => this.setState({
                            showVenueForm: !this.state.showVenueForm,
                            formHeaderText: "Adding new venue"
                        })} variant={"success"}>New Venue</Button>
                    </StyledDiv2Right1000>


                </StyledDivCentered1000>

                {this.state.showVenueForm ?
                    <>
                        <VenueForm
                            initialName={""}
                            mainHeader={this.state.formHeaderText}
                            cities={this.state.citiesForForm}
                            clubs={this.state.clubsForForm}
                            countries={this.state.countries}
                            currentCountry={this.state.currentCountry}
                            filterByCountry={this.filterFormCities}
                            updateCities={this.updateToCountry}
                        />
                    </>
                    : null}


            </React.Fragment>
        )
    }
}


export default Venues