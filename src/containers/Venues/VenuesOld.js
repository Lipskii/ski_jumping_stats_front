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
import {Button} from "react-bootstrap";
import NewCityForm from "../../components/CommonForms/NewCityForm";
import EditModal from "../../components/Modals/EditModal";
import TextInputForm from "../../components/CommonForms/TextInputForm";
import SelectInputForm from "../../components/CommonForms/SelectInputForm";
import TempCountryInputForm from "../../components/CommonForms/TempCountryInputForm";



class VenuesOld extends Component {

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
        newCityButtonText: "Do you want to add new city?",
        selectedVenueId: "",
        selectedVenueName: "",
        showEditModal: false
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


    handleCloseNoAction = () => {
        this.setState({
            showEditModal: false,
            selectedVenueId: "",
            selectedVenueName: ""
        })
    }


    deleteVenue = () => {
        axios.delete('/api/venue/ ' + this.state.selectedVenueId)
            .then(res => {
                console.log(res);
                console.log(res.data);
            }).catch(error => console.log(error)).finally(() => {
            this.handleCloseNoAction()
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

    onSubmitVenueForm = (e) => {
        let postSuccessful = true

        e.preventDefault()

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
        return (

            <React.Fragment>
                <EditModal show={this.state.showEditModal} handleClose={this.deleteVenue}
                           selectedName={this.state.selectedVenueName} handleCloseNoAction={this.handleCloseNoAction}/>

                <Header3>Register a Venue</Header3>

                <StyledForm onSubmit={this.onSubmitVenueForm}>

                    {/*Country*/}
                    <TempCountryInputForm title={"Country"} items={this.state.countries} valuesToShow={["name"]}
                                          onChangeValue={e => {
                                              this.setState({
                                                  newVenueCityId: "",
                                                  newVenueSkiClubId: ""
                                              }, () => this.updateListsToCurrentCountry(e))
                                          }}/>

                    {/*Toggle venues list*/}
                    <StyledDiv2Centered>
                        <CheckButton size="sm" onClick={this.changeVenuesListVisibility}>Toggle venues
                            list</CheckButton>
                    </StyledDiv2Centered>

                    {/*venues list*/}
                    {this.state.showVenuesList ? <List> {this.state.venues.length > 0 ? this.state.venues.map(venue =>
                            this.state.venues.map(venue =>
                                <ListItem key={venue.id} id={venue.id} className="list-group-item list-group-item-action"
                                          onDoubleClick={e =>
                                              this.setState({
                                                  selectedVenueName: e.target.innerText,
                                                  selectedVenueId: e.target.id,
                                                  showEditModal: true
                                              })}
                                >
                                    {venue.name}, {venue.city}, Opened in: {venue.yearOfOpening}, capacity: {venue.capacity}
                                </ListItem>)) :
                        <p>There are currently no venues in {this.state.currentCountry}</p>} </List> : null}

                    {/*Name*/}
                    <TextInputForm title={"Name"} onChangeValue={e => {
                        this.setState({
                            newVenueName: e.target.value
                        })
                    }}/>

                    {/*City*/}
                    <SelectInputForm title={"City"}
                                     key={this.state.currentCountry}
                                     items={this.state.cities}
                                     valuesToShow={["name", ",", "region"]}
                                     onChangeValue={e => {
                                         this.setState({
                                             newVenueCityId: e.target.value
                                         })
                                     }}/>

                    {/*New City Form*/}
                    <ShowNewCityFormButton onClick={this.handleNewCityButton}
                                           variant={"secondary"}>{this.state.newCityButtonText}</ShowNewCityFormButton>
                    {this.state.showNewCityForm ? <NewCityForm currentCountry={this.state.currentCountry}
                                                               updateLists={this.updateListsToCurrentCountry}/> : null}

                    {/*Ski Club*/}
                    <SelectInputForm title={"Ski club"}
                                     key={this.state.currentCountry + "1"}
                                     items={this.state.skiClubs}
                                     valuesToShow={["name"]}
                                     onChangeValue={e => {
                                         this.setState({
                                             newVenueSkiClubId: e.target.value
                                         })
                                     }}
                    />

                    {/*year of opening*/}
                    <TextInputForm title={"Opened in"} onChangeValue={e => {
                        this.setState({
                            newVenueYearOfOpening: e.target.value
                        })
                    }}/>

                    {/*capacity*/}
                    <TextInputForm title={"Capacity"} onChangeValue={e => {
                        this.setState({
                            newVenueCapacity: e.target.value
                        })
                    }}/>


                    <StyledDiv2Right>
                        <Button  type="submit" disabled={!(this.state.currentCountry !== null &&
                            this.state.newVenueName.length > 0 && this.state.newVenueSkiClubId.length > 0
                            && this.state.newVenueCityId !== "" && this.state.newVenueYearOfOpening.length > 0)}>Submit</Button>
                    </StyledDiv2Right>

                </StyledForm>
            </React.Fragment>
        )
    }
}

export default VenuesOld