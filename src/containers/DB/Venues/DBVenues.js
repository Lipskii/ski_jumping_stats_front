import React, {Component} from "react";
import axios from "axios";
import {Header3, StyledDiv2Right1200, StyledDivCentered1200, TableButton} from "../../../components/StyledComponents";
import {Table, Pagination, Button} from "react-bootstrap";
import VenueForm from "./VenueForm";
import Loader from "react-loader-spinner";
import SelectInputForm from "../../../components/CommonForms/SelectInputForm";
import AddingModal from "../../../components/Modals/AddingModal";
import DeleteModal from "../../../components/Modals/DeleteModal";
import CompletedModal from "../../../components/Modals/CompletedModal";



class DBVenues extends Component {
    state = {
        activePage: 1,
        countriesWithVenues: [],
        countries: [],
        cities: [],
        citiesForForm: [],
        clubs: [],
        clubsForForm: [],
        editVenue: false,
        filterCityId: '',
        filterCountryId: '',
        filterSkiClubId: '',
        venueToDelete: '',
        venueToEdit: '',
        venues: [],
        venuesLoading: true,
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
            axios.get('/api/cities')

        ])
            .then(axios.spread((countriesData, countriesWithVenuesData, venuesData, skiClubsData, citiesData) => {
                this.setState({
                    countries: countriesData.data,
                    countriesWithVenues: countriesWithVenuesData.data,
                    venues: venuesData.data,
                    clubs: skiClubsData.data,
                    clubsForForm: skiClubsData.data,
                    citiesForForm: citiesData.data,
                    cities: citiesData.data,
                    venuesLoading: false,
                })
            }))
            .catch(error => console.log(error))
    }

    filterFormCities = (e) => {
        axios.all([
            axios.get('/api/cities?countryId=' + e.target.value),
            axios.get('/api/skiClubs?countryId=' + e.target.value)
        ])
            .then(axios.spread((citiesData, skiClubsData) => {
                this.setState({
                    clubsForForm: skiClubsData.data,
                    citiesForForm: citiesData.data,
                })
            }))
            .catch(error => console.log(error))
    }

    filter = () => {
        axios.all([
            axios.get('/api/venues?skiClubId=' + this.state.filterSkiClubId
                + '&countryId=' + this.state.filterCountryId
                + '&cityId=' + this.state.filterCityId),
            axios.get('/api/cities?&countryId=' + this.state.filterCountryId),
            axios.get('/api/skiClubs?&countryId=' + this.state.filterCountryId),
        ])
            .then(axios.spread((venuesData, citiesData, skiClubsData) => {
                this.setState({
                    venues: venuesData.data,
                    clubs: skiClubsData.data,
                    cities: citiesData.data,
                    venuesLoading: false
                })
            }))
            .catch(error => console.log(error))
    }


    postVenue = (values) => {
        let successful = false
        this.setState({
            showAddingModal: true
        }, () => {
            axios.post('/api/venues', {
                name: values.name,
                yearOfOpening: values.yearOfOpening,
                capacity: values.capacity,
                skiClub: this.state.clubsForForm.find(club => club.id === parseInt(values.skiClubId)),
                city: this.state.citiesForForm.find(city => city.id === parseInt(values.cityId))
            })
                .then(res => {
                    successful = true
                    console.log(res)
                    this.filter()
                })
                .catch(error => console.log(error))
                .finally(() => {
                    let modalText
                    if (successful) {
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
        }, () => {
            axios.put('/api/venues/' + this.state.venueToEdit.id, {
                name: values.name,
                yearOfOpening: values.yearOfOpening,
                capacity: values.capacity,
                skiClub: this.state.clubsForForm.find(club => club.id === parseInt(values.skiClubId)),
                city: this.state.citiesForForm.find(city => city.id === parseInt(values.cityId))
            })
                .then(res => {
                    successful = true
                    this.filter()
                })
                .catch(error => console.log(error))
                .finally(() => {
                    let modalText
                    if (successful) {
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

    deleteVenue = () => {
        // window.alert("Delete venue called " + this.state.venueToDelete.id)
        let successful = true
        this.setState({
            showDeleteModal: false
        }, () => {
            axios.delete('/api/venues/' + this.state.venueToDelete.id)
                .then(res => {
                    console.log(res)
                    this.filter()
                })
                .catch(error => {
                    successful = false
                    console.log(error)
                })
                .finally(() => {
                    let modalText
                    if (successful) {
                        modalText = this.state.venueToDelete.name + " deleted."
                    } else {
                        modalText = "Ups, there was a problem. Try again."
                    }
                    this.setState({
                        showCompletedModal: true,
                        completedModalText: modalText,
                        completedModalStatus: successful,
                        showDeleteModal: false
                    })
                })
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

                <StyledDivCentered1200>

                    {/*Select Country*/}
                    <strong>Filter</strong>
                    <SelectInputForm
                        title={"Country"}
                        defaultValue={""}
                        onChange={e => {
                            this.setState({
                                activePage: 1,
                                venuesLoading: true,
                                filterCountryId: e.target.value
                            }, () => this.filter())
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
                        key={this.state.cities}
                        title={"City:"}
                        disabled={this.state.cities.length < 1}
                        defaultValue={""}
                        onChange={e => {
                            this.setState({
                                activePage: 1,
                                //venuesLoading: true
                                filterCityId: e.target.value
                            }, () => this.filter())
                        }}
                    >
                        <option value={""}>All cities</option>
                        {this.state.cities.map(city => (
                            <option key={city.id} value={city.id} name={city.name}>{city.name}</option>
                        ))}
                    </SelectInputForm>


                    {/*DBVenues*/}
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
                                    <th>Country</th>
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
                                                <td>{venue.city.region.country.code}</td>
                                                <td>{venue.yearOfOpening}</td>
                                                <td>{venue.capacity}</td>
                                                <td>{venue.skiClub.name}</td>
                                                <td>
                                                    <TableButton id={venue.id} name={venue.name} size="sm"
                                                                 variant={"info"}
                                                                 onClick={() =>
                                                                     this.setState({
                                                                         editVenue: true,
                                                                         venueToEdit: venue
                                                                     })}>
                                                        Edit
                                                    </TableButton>
                                                    <TableButton id={venue.id} name={venue.name} size="sm"
                                                                 variant={"danger"}
                                                                 onClick={() => this.setState({
                                                                     showDeleteModal: true,
                                                                     venueToDelete: venue,
                                                                     editVenue: false
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

                    <StyledDiv2Right1200>
                        <Button onClick={() => this.setState({
                            newVenue: true
                        })} variant={"success"}>New Venue</Button>
                    </StyledDiv2Right1200>


                </StyledDivCentered1200>

                {this.state.newVenue ?
                    <VenueForm
                        show={this.state.newVenue}
                        onHide={() => this.setState({
                            newVenue: false
                        })}
                        initialName={''}
                        initialClubId={''}
                        initialCapacity={''}
                        initialCityId={''}
                        initialYearOfOpening={''}
                        mainHeader={"Adding new venue"}
                        cities={this.state.citiesForForm}
                        clubs={this.state.clubsForForm}
                        countries={this.state.countries}
                        initialCountry={''}
                        filterByCountry={this.filterFormCities}
                        isEdit={false}
                        onSubmit={this.postVenue}
                    />
                    : null}

                {this.state.editVenue ? <VenueForm
                    show={this.state.editVenue}
                    onHide={() => this.setState({
                        editVenue: false
                    })}
                    initialName={this.state.venueToEdit.name}
                    initialClubId={this.state.venueToEdit.skiClub.id}
                    initialCapacity={this.state.venueToEdit.capacity}
                    initialCityId={this.state.venueToEdit.city.id}
                    initialCountry={this.state.venueToEdit.city.region.country.id}
                    cities={this.state.citiesForForm}
                    initialYearOfOpening={this.state.venueToEdit.yearOfOpening}
                    countries={this.state.countries}
                    filterByCountry={this.filterFormCities}
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


export default DBVenues