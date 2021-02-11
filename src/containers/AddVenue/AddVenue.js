import React, {Component} from 'react'
import {
    CheckButton,
    Header3,
    List,
    ListItem,
    ShowNewCityFormButton,
    StyledDiv2Centered, StyledDiv2Right,
    StyledForm
} from "../../components/StyledComponents";
import axios from "axios";
import {Button, Col, Form, Row} from "react-bootstrap";
import NewCityForm from "../../components/CommonForms/NewCityForm";

//TODO add form fields validation
class AddVenue extends Component {

    state = {
        countries: [],
        currentCountry: null,
        venues: [],
        showVenuesList: false,
        cities: [],
        newVenueCityId: "",
        skiClubs: [],
        newVenueSkiClubId: "",
        newVenueName: "",
        newVenueCapacity: "",
        newVenueYearOfOpening: "",
        newCityButtonText: "Do you want to add new city?"
    }

    componentDidMount() {
        axios.get('/api/countries')
            .then(res => {
                this.setState({
                    countries: res.data
                })
            }).catch(error => console.log(error))
    }

    updateListsToCurrentCountry = (e) => {
        let eTargetValue

        if (e === undefined) {
            eTargetValue = this.state.currentCountry
        } else {
            eTargetValue = e.target.value
        }

        this.setState({
            currentCountry: eTargetValue
        }, () => {

            axios.get('/api/venue/' + this.state.currentCountry)
                .then(res => {
                    this.setState({
                        venues: res.data
                    })
                }).catch(error => console.log(error))

            axios.get('/api/skiClubs/' + this.state.currentCountry)
                .then(res => {
                    this.setState({
                        skiClubs: res.data,
                    })
                })
                .catch(error => console.log(error))

            axios.get('/api/cities/' + this.state.currentCountry)
                .then(res => {
                    this.setState({
                        cities: res.data,
                    })
                }).catch(error => console.log(error))
        })

    }

    changeVenuesListVisibility = () => {
        this.setState({
            showVenuesList: !this.state.showVenuesList
        })
    }

    handleNewCityButton = () => {
        this.setState({
            showNewCityForm: !this.state.showNewCityForm
        })

        if (!this.state.showNewCityForm) {
            this.setState({
                newCityButtonText: "hide"
            })
        } else {
            this.setState({
                newCityButtonText: "Do you want to add new city?"
            })
        }
    }

    onSubmitVenueForm = () => {
        let postSuccessful = true

        axios.post("/api/venue", {
            name: this.state.newVenueName,
            city: this.state.newVenueCityId,
            skiClub: this.state.newVenueSkiClubId,
            yearOfOpening: this.state.newVenueYearOfOpening,
            capacity: this.state.newVenueCapacity

        }).then(function (response) {
            console.log(response.data);
        })
            .catch(function (error) {
                console.log(error);
                postSuccessful = false
            }).finally(() => {
                if (postSuccessful) {
                    window.alert(this.state.newVenueName + " added!")
                    this.updateListsToCurrentCountry();
                } else {
                    window.alert("Ups, something went wrong")
                }


            }
        )
    }

    render() {
        console.log(this.state)

        let venuesList = null

        let newCityForm = null


        if (this.state.showNewCityForm) {
            newCityForm =
                <NewCityForm currentCountry={this.state.currentCountry} updateLists={this.updateListsToCurrentCountry}/>
        }

        if (this.state.showVenuesList) {

            let listItems = <p>There are currently no venues in {this.state.currentCountry}</p>

            if (this.state.venues.length > 0) {
                listItems = this.state.venues.map(venue =>
                    <ListItem key={venue.id}>
                        {venue.name}, {venue.city}
                    </ListItem>)
            }

            venuesList = <List>
                {listItems}
            </List>


        }

        return (

            <React.Fragment>
                <Header3>Register a Venue</Header3>

                <StyledForm>

                    {/*Country*/}
                    <Form.Group as={Row}>
                        <Form.Label column sm={2}>Country:</Form.Label>
                        <Col sm={10}>
                            <Form.Control as="select" defaultValue={""} onChange={e => {
                                this.setState({
                                    newVenueCityId: "",
                                    newVenueSkiClubId: ""
                                }, () => this.updateListsToCurrentCountry(e))
                            }}>
                                <option value={""} disabled>Choose...</option>
                                {this.state.countries.map(country =>
                                    <option key={country.id}>
                                        {country.name}
                                    </option>)}
                            </Form.Control>
                        </Col>
                    </Form.Group>

                    {/*Toggle venues list*/}
                    <StyledDiv2Centered>
                        <CheckButton size="sm" onClick={this.changeVenuesListVisibility}>Toggle venues
                            list</CheckButton>
                    </StyledDiv2Centered>
                    {venuesList}

                    {/*Name*/}
                    <Form.Group as={Row}>
                        <Form.Label column sm={2}>
                            Name:
                        </Form.Label>
                        <Col sm={10}>
                            <Form.Control type="text" onChange={e => {
                                this.setState({
                                    newVenueName: e.target.value
                                })
                            }}/>
                        </Col>
                    </Form.Group>

                    {/*City*/}
                    <Form.Group as={Row}>
                        <Form.Label column sm={2}>City:</Form.Label>
                        <Col sm={10}>
                            <Form.Control as="select" defaultValue={""} onChange={e => {
                                this.setState({
                                    newVenueCityId: e.target.value
                                })
                            }}>
                                <option value={""}>Choose...</option>
                                {this.state.cities.map(city =>
                                    <option key={city.id} value={city.id}>
                                        {city.name}, {city.region}
                                    </option>)}
                            </Form.Control>
                        </Col>
                    </Form.Group>

                    {/*New City Form*/}
                    <ShowNewCityFormButton onClick={this.handleNewCityButton}
                                           variant={"secondary"}>{this.state.newCityButtonText}</ShowNewCityFormButton>
                    {newCityForm}

                    {/*Ski Club*/}
                    <Form.Group as={Row}>
                        <Form.Label column sm={2}>Ski club:</Form.Label>
                        <Col sm={10}>
                            <Form.Control as="select" defaultValue={""} onChange={e => {
                                this.setState({
                                    newVenueSkiClubId: e.target.value
                                })
                            }}>
                                <option value={""}>Choose...</option>
                                {this.state.skiClubs.map(skiClub =>
                                    <option key={skiClub.id} value={skiClub.id}>
                                        {skiClub.name}
                                    </option>)}
                            </Form.Control>
                        </Col>
                    </Form.Group>

                    {/*year of opening*/}
                    <Form.Group as={Row}>
                        <Form.Label column sm={2}>
                            Opened in:
                        </Form.Label>
                        <Col sm={10}>
                            <Form.Control type="text" onChange={e => {
                                this.setState({
                                    newVenueYearOfOpening: e.target.value
                                })
                            }}/>
                        </Col>
                    </Form.Group>

                    {/*capacity*/}
                    <Form.Group as={Row}>
                        <Form.Label column sm={2}>
                            Capacity:
                        </Form.Label>
                        <Col sm={10}>
                            <Form.Control type="text" onChange={e => {
                                this.setState({
                                    newVenueCapacity: e.target.value
                                })
                            }}/>
                        </Col>
                    </Form.Group>

                    <StyledDiv2Right>
                        <Button onClick={this.onSubmitVenueForm} disabled={!(this.state.currentCountry !== null &&
                            this.state.newVenueName.length > 0 && this.state.newVenueSkiClubId.length > 0
                            && this.state.newVenueCityId !== "" && this.state.newVenueYearOfOpening.length > 0)}>Submit</Button>
                    </StyledDiv2Right>


                </StyledForm>
            </React.Fragment>
        )
    }
}

export default AddVenue