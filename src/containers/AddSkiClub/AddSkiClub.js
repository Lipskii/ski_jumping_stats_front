import React, {Component} from "react";
import axios from "axios";
import {Button, Col, Form, Row} from "react-bootstrap";
import {
    CheckButton,
    Header5, Header31,
    List,
    ListItem, StyledDiv1, StyledDiv2Right,
    StyledForm,
    StyledFormLabel,
    StyledFormSelect,
    StyledFormSmall
} from "./AddSkiClubStyledComponents";

//TODO add spinner during loading
//TODO add toasts as feedback after adding something
//TODO place countries in global state (redux)
//TODO fetch from api only those countries that have ski clubs in db
//TODO try different solutions with passing an object post (also look at api), pass object instead of Map<String,String>
//TODO split forms into different files

class AddSkiClub extends Component {

    state = {
        countries: [],
        skiClubs: [],
        searchCountryCode: "",
        loading: true,
        clubListVisible: false,
        cities: [],
        regions: [],
        currentCountry: "",
        newClubName: "",
        newClubCity: "",
        newCityName: "",
        newCityRegion: null,
        showNewCityForm: false,
        newCityButtonText: "Do you want to add new city?",
        showToast: false
    }

    componentDidMount() {
        console.log("Component did mount")
        axios.get('/api/countries')
            .then(res => {
                this.setState({
                    countries: res.data
                })
            }).catch(error => console.log(error))
    }

    updateClubsList = (e) => {
        console.log("updateClubsList")
        axios.get('/api/skiClubs/' + e.target.value)
            .then(res => {
                this.setState({
                    skiClubs: res.data
                })
            })
            .catch(error => console.log(error))
    }

    updateCitiesAndRegionsList = () => {
        console.log("updateCitiesAndRegionsList " + this.state.currentCountry)

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

        this.setState({
            newCityName: ""
        })
    }

    changeClubsListVisibility = () => {
        this.setState({
            clubListVisible: !this.state.clubListVisible
        })
    }

    addNewCity = () => {
        console.log("addNewCity")
        let postSuccessful = true


        axios.post('/api/city', {name: this.state.newCityName, region: this.state.newCityRegion})
            .then(function (response) {
                console.log(response.data);

            })
            .catch(function (error) {
                console.log(error);
                postSuccessful = false
            });

        if(postSuccessful){
            window.alert(this.state.newCityName + " added!")
        }else{
            window.alert("Ups, something went wrong")
        }

        this.updateCitiesAndRegionsList()

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

    onSubmitClubForm = () => {
        console.log("onSubmitClubForm")
        let postSuccessful = true

        axios.post("/api/skiClub", {
            name: this.state.newClubName,
            cityId: this.state.newClubCity
        })
            .then(function (response) {
                console.log(response.data);
            })
            .catch(function (error) {
                console.log(error);
                postSuccessful = false
            }).finally(() => {
            if(postSuccessful){
                window.alert(this.state.newClubName + " added!")
            }else{
                window.alert("Ups, something went wrong")
            }
        })

    }

    render() {

        let list = null
        let listItems = <ListItem>None</ListItem>
        let listForm = null
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


        if (this.state.clubListVisible) {
            listForm = <StyledFormSmall inline>
                <Form.Group>
                    <StyledFormLabel>Search by country: </StyledFormLabel>
                    <StyledFormSelect as="select" onChange={this.updateClubsList}>
                        <option disabled selected value></option>
                        {this.state.countries.map(country =>
                            <option key={country.code}>
                                {country.name}
                            </option>)}
                    </StyledFormSelect>
                </Form.Group>
            </StyledFormSmall>

            if (this.state.skiClubs.length > 0) {
                listItems = this.state.skiClubs.map(skiClub =>
                    <ListItem key={skiClub.id}>
                        {skiClub.name}, {skiClub.city}, {skiClub.code}
                    </ListItem>)
            }

            list = <List variant="flush">
                {listItems}
            </List>
        }

        return (
            <React.Fragment>

                <StyledDiv1>
                    <Header5>Existing Ski Clubs</Header5>
                    <CheckButton size="sm" onClick={this.changeClubsListVisibility}>Toggle list</CheckButton>
                </StyledDiv1>


                {listForm}
                {list}

                <Header31>Insert new ski club</Header31>

                <StyledForm>
                    <Form.Group as={Row}>
                        <Form.Label column sm={2}>
                            Name:
                        </Form.Label>
                        <Col sm={10}>
                            <Form.Control type="text" placeholder="eg. AZS AWF Zakopane" onChange={e => {
                                this.setState({
                                    newClubName: e.target.value
                                })
                            }}/>
                        </Col>
                    </Form.Group>

                    <Form.Group as={Row}>
                        <Form.Label column sm={2}>Country:</Form.Label>
                        <Col sm={10}>
                            <Form.Control as="select" onChange={e => {
                                this.state.currentCountry = e.target.value
                                this.updateCitiesAndRegionsList()
                            }}>
                                {this.state.countries.map(country =>
                                    <option key={country.code}>
                                        {country.name}
                                    </option>)}
                            </Form.Control>
                        </Col>
                    </Form.Group>

                    <Form.Group as={Row}>
                        <Form.Label column sm={2}>City:</Form.Label>
                        <Col sm={10}>
                            <Form.Control as="select" defaultValue={""} onChange={e => {
                                this.setState({
                                    newClubCity: e.target.value
                                })
                            }}>
                                <option value={""}/>
                                {this.state.cities.map(city =>
                                    <option key={city.id} value={city.id}> {city.name}, {city.region}</option>)}
                            </Form.Control>
                        </Col>
                    </Form.Group>

                    <Button onClick={this.handleNewCityButton}
                            variant={"secondary"}>{this.state.newCityButtonText}</Button>
                    {newCityForm}

                    <StyledDiv2Right>
                        <Button onClick={this.onSubmitClubForm}>Submit</Button>
                    </StyledDiv2Right>


                </StyledForm>
            </React.Fragment>

        )
    }

}

export default AddSkiClub