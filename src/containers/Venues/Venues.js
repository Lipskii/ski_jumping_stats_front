import React, {Component} from "react";
import axios from "axios";
import {Header3, StyledDiv2Right1000, StyledDivCentered1000, TableButton} from "../../components/StyledComponents";
import {Table, Pagination, Button, Form} from "react-bootstrap";
import VenueForm from "./VenueForm";
import Loader from "react-loader-spinner";
import SelectInputForm from "../../components/CommonForms/SelectInputForm";
import AddingModal from "../../components/Modals/AddingModal";
import DeleteModal from "../../components/Modals/DeleteModal";
import CompletedModal from "../../components/Modals/CompletedModal";


class Venues extends Component {
    state = {
        activePage: 1,
        countriesWithVenues: [],
        countries: [],
        cities: [],
        citiesForForm: [],
        citiesWithVenues: [],
        clubs: [],
        clubsForForm: [],
        editVenue: false,
        venueToDelete: '',
        venueToEdit: '',
        venues: [],
        venuesLoading: false,
        currentCountry: '',
        newVenue: false,
        showAddingModal: false,
        showDeleteModal: false,
        showCompletedModal: false,
        completedModalText: "",
        completedModalStatus: false
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
            .then(axios.spread((citiesData, skiClubsData) => {
                this.setState({
                    clubsForForm: skiClubsData.data,
                    citiesForForm: citiesData.data,
                })
            }))
            .catch(error => console.log(error))
    }

    postVenue = (values) => {
        let successful = false
        this.setState({
            showAddingModal: true
        },() => {
            axios.post('/api/venues', {
                name: values.name,
                yearOfOpening: values.yearOfOpening,
                capacity: values.capacity,
                skiClub: this.state.clubsForForm.find(club => club.id === parseInt(values.skiClubId)),
                city: this.state.citiesForForm.find(city => city.id === parseInt(values.cityId))
            })
                .then(res => {
                    if (res.status === 200) {
                        successful = true
                    }
                    console.log(res)
                    this.updateToCountry()
                })
                .catch(error => console.log(error))
                .finally(() => {
                    let modalText
                    if(successful){
                        modalText = values.name + " added."
                    } else {
                        modalText = "Ups, there was a problem. Try again."
                    }
                    this.setState({
                        showCompletedModal: true,
                        completedModalText: modalText,
                        completedModalStatus: successful,
                        showAddingModal: false
                    })
                })
        })

    }

    editVenue = (values) => {
        let successful = false
        this.setState({
            showAddingModal: true
        },() => {
            axios.put('/api/venues/' + this.state.venueToEdit.id, {
                name: values.name,
                yearOfOpening: values.yearOfOpening,
                capacity: values.capacity,
                skiClub: this.state.clubsForForm.find(club => club.id === parseInt(values.skiClubId)),
                city: this.state.citiesForForm.find(city => city.id === parseInt(values.cityId))
            })
                .then(res => {
                    if (res.status === 200) {
                        successful = true
                    }
                    this.updateToCountry()
                })
                .catch(error => console.log(error))
                .finally(() => {
                    let modalText
                        if(successful){
                            modalText = values.name + " edited."
                        } else {
                            modalText = "Ups, there was a problem. Try again."
                        }
                        this.setState({
                        showCompletedModal: true,
                        completedModalText: modalText,
                        completedModalStatus: successful,
                        showAddingModal: false
                    })
                })
        })
    }

    deleteVenue = () =>{
        window.alert("Delete venue called " + this.state.venueToDelete.id)
        this.setState({
            showDeleteModal: false
        })
    }


    render() {
        console.log(this.state)


        let items = [];
        let numberOfPages = this.state.venues.length / 8
        if (this.state.venues.length % 8 !== 0) {
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

                <CompletedModal
                    show={this.state.showCompletedModal}
                    text={this.state.completedModalText}
                    onHide={() => this.setState({
                        showCompletedModal: false,
                        completedModalText: ""
                    })}
                    status={this.state.completedModalStatus}
                />

                <DeleteModal
                    show={this.state.showDeleteModal}
                    onHide={() => this.setState({
                        showDeleteModal: false,
                        venueToDelete: ''
                    })}
                    title={this.state.venueToDelete.name}
                    handleDelete={this.deleteVenue}
                />
                <AddingModal show={this.state.showAddingModal}/>

                <Header3>Venues</Header3>

                <StyledDivCentered1000>

                    {/*Select Country*/}
                    <strong>Filter</strong>
                    <SelectInputForm
                        title={"Country"}
                        defaultValue={""}
                        onChange={e => {
                            this.setState({
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
                        key={this.state.citiesWithVenues}
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
                            <Table bordered hover striped size={"sm"}>
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
                                    if (((this.state.activePage - 1) * 8 <= this.state.venues.indexOf(venue)) && (this.state.venues.indexOf(venue) < this.state.activePage * 8)) {
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
                                                                 onClick={() =>
                                                                 this.setState({
                                                                     editVenue: false,
                                                                     newVenue: false,
                                                                    venueToEdit: venue
                                                                 },() => this.setState({
                                                                     editVenue: true
                                                                 }))}>
                                                        Edit
                                                    </TableButton>
                                                    <TableButton id={venue.id} name={venue.name} size="sm"
                                                                 variant={"danger"}
                                                                 onClick={() => this.setState({
                                                                     showDeleteModal: true,
                                                                     venueToDelete: venue
                                                                 })
                                                                 }>
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
                            newVenue: !this.state.newVenue,
                            editVenue: false,
                        })} variant={"success"}>New Venue</Button>
                    </StyledDiv2Right1000>


                </StyledDivCentered1000>

                {this.state.newVenue ?
                        <VenueForm
                            initialName={''}
                            initialClubId={''}
                            initialCapacity={''}
                            initialCityId={''}
                            initialYearOfOpening={''}
                            mainHeader={"Adding new venue"}
                            cities={this.state.citiesForForm}
                            clubs={this.state.clubsForForm}
                            countries={this.state.countries}
                            currentCountry={this.state.currentCountry}
                            filterByCountry={this.filterFormCities}
                            updateCities={this.updateToCountry}
                            isEdit={false}
                            onSubmit={this.postVenue}
                        />
                    : null}

                {this.state.editVenue ? <VenueForm
                    initialName={this.state.venueToEdit.name}
                    initialClubId={this.state.venueToEdit.skiClub.id}
                    initialCapacity={this.state.venueToEdit.capacity}
                    initialCityId={this.state.venueToEdit.city.id}
                    initialYearOfOpening={this.state.venueToEdit.yearOfOpening}
                    mainHeader={"Editing " + this.state.venueToEdit.name}
                    clubs={this.state.clubsForForm}
                    isEdit={true}
                    showCities={false}
                    onSubmit={this.editVenue}
                /> : null}


            </React.Fragment>
        )
    }
}


export default Venues