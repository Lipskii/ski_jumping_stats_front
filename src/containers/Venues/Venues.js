import React, {Component} from "react";
import axios from "axios";
import {Header3, StyledDiv2Right1000, StyledDivCentered1000, TableButton} from "../../components/StyledComponents";
import TempCountryInputForm from "../../components/CommonForms/TempCountryInputForm";
import {Table, Pagination, Button} from "react-bootstrap";
import VenueForm from "./VenueForm";
import Loader from "react-loader-spinner";

//TODO fetch cities in different request; finish form; fetch venues in different request
class Venues extends Component {
    state = {
        activePage: 1,
        countries: [],
        cities: [],
        formHeaderText: '',
        venues: [],
        venuesLoading: true,
        selectedCountryId: '',
        showVenueForm: false
    }


    componentDidMount() {
        axios.get('/api/countries/venues')
            .then(res => {
                this.setState({
                    countries: res.data
                }, () => this.updateVenues(0))
            },).catch(error => console.log(error))
    }

    updateVenues = (x) => {

        if (Number.isNaN(x)) {
            x = 0
        }

        let venuesList = []
        const countries = this.state.countries

        if (x !== 0) {
            const country = countries.find(country => country.id === x)
            let citiesWithVenues
            citiesWithVenues = country.cities.filter(city => city.venues.length > 0)
            for (const city of citiesWithVenues) {
                for (const club of city.skiClubs) {
                    if (club.venues.length > 0) {
                        for (const venue of city.venues) {
                            let listObject = {
                                venue: venue,
                                city: city,
                                clubs: club
                            }
                            venuesList.push(listObject)
                        }
                    }
                }
            }
        } else {
            for (const country of countries) {
                let citiesWithVenues
                citiesWithVenues = country.cities.filter(city => city.venues.length > 0)
                for (const city of citiesWithVenues) {
                    for (const club of city.skiClubs) {
                        if (club.venues.length > 0) {
                            for (const venue of city.venues) {
                                let listObject = {
                                    venue: venue,
                                    city: city,
                                    clubs: club
                                }
                                venuesList.push(listObject)
                            }
                        }
                    }
                }
            }
        }
        venuesList.sort((a, b) => a.venue.name.localeCompare(b.venue.name))

        console.log(venuesList)
        this.setState({
            venues: venuesList,
            venuesLoading: false
        })

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
                    <TempCountryInputForm
                        title={"Show venues from:"}
                        valuesToShow={["name"]}
                        items={this.state.countries}
                        onChangeValue={e => {
                            this.setState({
                                selectedCountryId: e.target.value,
                                activePage: 1,
                                venueLoading: true
                            }, () => this.updateVenues(parseInt(this.state.selectedCountryId)))
                        }}/>

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
                            <Table bordered hover>
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
                                            <tr key={venue.venue.id} id={venue.venue.id}>
                                                <td>{venue.venue.name}</td>
                                                <td>{venue.city.name}</td>
                                                <td>{venue.venue.yearOfOpening}</td>
                                                <td>{venue.venue.capacity}</td>
                                                <td>{venue.clubs.name}</td>
                                                <td>
                                                    <TableButton id={venue.venue.id} name={venue.venue.name} size="sm"
                                                                 variant={"info"}
                                                                 onClick={e => this.handleEditButton(e)}>
                                                        Edit
                                                    </TableButton>
                                                    <TableButton id={venue.venue.id} name={venue.venue.name} size="sm"
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
                            formHeaderText: "Adding venue"
                        })} variant={"success"}>New Venue</Button>
                    </StyledDiv2Right1000>




                </StyledDivCentered1000>

                {this.state.showVenueForm ?
                    <>
                        <VenueForm
                            initialName={""}
                            mainHeader={"SE"}
                        />
                    </>
                    : null}


            </React.Fragment>
        )
    }
}


export default Venues