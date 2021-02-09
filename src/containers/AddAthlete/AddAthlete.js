import React, {Component} from 'react'
import axios from "axios";
import {Header3} from "./AddAthleteStyledComponents";
import {
    CheckButton,
    StyledDiv2Right,
    StyledDiv2Centered,
    StyledForm,
    ListItem, List
} from "../AddSkiClub/AddSkiClubStyledComponents";
import {Button, Col, Form, Row} from "react-bootstrap";
import {CalendarContainer} from "react-datepicker"



//TODO create one common styledComponentsFile
//TODO move creating new city into different file

class AddAthlete extends Component {

    state = {
        countries: [],
        skiClubs: [],
        skiJumpers: [],
        cities: [],
        showNewCityForm: false,
        newCityButtonText: "Do you want to add new city?",
        newCityName: "",
        newCityRegion: "",
        regions: [],
        currentCountry: "",
        athletesListVisibility: false,
        newAthleteFirstName: "",
        newAthleteLastName: "",
        newAthleteGender: null,
        newAthleteCity: null
    }


    componentDidMount() {
        axios.get('/api/countries')
            .then(res => {
                this.setState({
                    countries: res.data
                })
            }).catch(error => console.log(error))
    }

    changeAthletesListVisibility = () => {
        this.setState({
            athletesListVisibility: !this.state.athletesListVisibility
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

    addNewCity = () => {

        let postSuccessful = true

        axios.post('/api/city', {name: this.state.newCityName, region: this.state.newCityRegion})
            .then(function (response) {
                console.log(response.data);

            })
            .catch(function (error) {
                console.log(error);
                postSuccessful = false
            }).finally(() => {

            if (postSuccessful) {
                window.alert(this.state.newCityName + " added!")
            } else {
                window.alert("Ups, something went wrong")
            }

            this.updateListsToCurrentCountry()
        });


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

            axios.get('/api/skiJumper/' + this.state.currentCountry)
                .then(res => {
                    this.setState({
                        skiJumpers: res.data
                    })
                }).catch(error => console.log(error))

            axios.get('/api/skiClubs/' + this.state.currentCountry)
                .then(res => {
                    this.setState({
                        skiClubs: res.data
                    })
                })
                .catch(error => console.log(error))

            axios.get('/api/cities/' + this.state.currentCountry)
                .then(res => {
                    this.setState({
                        cities: res.data,
                        newClubCity: null
                    })
                }).catch(error => console.log(error))

            axios.get('/api/regions/' + this.state.currentCountry)
                .then(res => {
                    this.setState({
                        regions: res.data,
                    })
                }).catch(error => console.log(error))
        })


    }

    render() {
        let athletesList = null

        let newCityForm = null

        if (this.state.showNewCityForm) {
            newCityForm = <Form.Group>
                <Form.Label>New city in {this.state.currentCountry}:</Form.Label>
                <Form.Control type="text" placeholder="New city name"
                              onChange={e => this.setState({newCityName: e.target.value})}/>
                <br/>
                <Form.Group as={Row}>
                    <Form.Label column sm={2}>Region:</Form.Label>
                    <Col sm={10}>
                        <Form.Control as="select" defaultValue={""}
                                      onChange={e => this.setState({newCityRegion: e.target.value})}>

                            <option value={""}/>
                            {this.state.regions.map(region =>
                                <option key={region.id} value={region.name}>{region.name}</option>)}
                        </Form.Control>
                    </Col>
                </Form.Group>

                <Button variant="secondary" onClick={this.addNewCity}
                        disabled={this.state.newCityName.length < 1 || this.state.regions.length < 1}>
                    Add City
                </Button>
            </Form.Group>
        }

        if (this.state.athletesListVisibility) {
            let listItems = <p>There are currently no athletes in {this.state.currentCountry}</p>

            if (this.state.skiJumpers.length > 0) {
                listItems = this.state.skiJumpers.map(skiJumper =>
                    <ListItem key={skiJumper.id}>
                        {skiJumper.firstName} {skiJumper.lastName} ({skiJumper.gender}), {skiJumper.birthdate}, {skiJumper.skiClub}, {skiJumper.city}
                    </ListItem>)
            }

            athletesList = <List>
                {listItems}
            </List>

        }

        return (
            <React.Fragment>
                <Header3>Register an Athlete</Header3>
                <StyledForm>

                    {/*Country*/}
                    <Form.Group as={Row}>
                        <Form.Label column sm={2}>Country:</Form.Label>
                        <Col sm={10}>
                            <Form.Control as="select" defaultValue={""} onChange={this.updateListsToCurrentCountry}>
                                <option value={""}/>
                                {this.state.countries.map(country =>
                                    <option key={country.id}>
                                        {country.name}
                                    </option>)}
                            </Form.Control>
                        </Col>
                    </Form.Group>

                    <StyledDiv2Centered>
                        <CheckButton size="sm" onClick={this.changeAthletesListVisibility}>Toggle athletes
                            list</CheckButton>
                    </StyledDiv2Centered>
                    {athletesList}

                    <Form.Group as={Row}>
                        <Form.Label column sm={2}>
                            First name:
                        </Form.Label>
                        <Col sm={10}>
                            <Form.Control type="text" onChange={e => {
                                this.setState({
                                    newAthleteFirstName: e.target.value
                                })
                            }}/>
                        </Col>
                    </Form.Group>

                    <Form.Group as={Row}>
                        <Form.Label column sm={2}>
                            Last name:
                        </Form.Label>
                        <Col sm={10}>
                            <Form.Control type="text" onChange={e => {
                                this.setState({
                                    newAthleteLastName: e.target.value
                                })
                            }}/>
                        </Col>
                    </Form.Group>

                    <Form.Group as={Row}>
                        <Form.Label column sm={2}>City:</Form.Label>
                        <Col sm={10}>
                            <Form.Control as="select" defaultValue={""} onChange={e => {
                                this.setState({
                                    newAthleteCity: e.target.value
                                })
                            }}>
                                <option value={""}/>
                                {this.state.cities.map(city =>
                                    <option key={city.id}>
                                        {city.name}, {city.region}
                                    </option>)}
                            </Form.Control>
                        </Col>
                    </Form.Group>
                    <Button onClick={this.handleNewCityButton}
                            variant={"secondary"}>{this.state.newCityButtonText}</Button>

                    {newCityForm}





                </StyledForm>
            </React.Fragment>
        )
    }

}


export default AddAthlete