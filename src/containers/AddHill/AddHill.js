import React, {Component} from "react";
import {
    Header3,
    Header6,
    List,
    ListInForm,
    ListItem, ShowNewCityFormButton,
    StyledForm
} from "../../components/StyledComponents";
import {Col, Form, Row} from "react-bootstrap";
import axios from "axios";
import TempCountryInputForm from "../../components/CommonForms/TempCountryInputForm";
import SelectInputForm from "../../components/CommonForms/SelectInputForm";
import NewHillForm from "./NewHillForm";

class AddHill extends Component {

    state = {
        countries: [],
        currentCountry: null,
        newHillVenueId: "",
        newHillName: "",
        venues: [],
        selectedVenueId: "",
        hills: [],
        selectedHillName: "",
        selectedHillId: "",
        hillVersions: [],
        showHillVersionsList: false,
        sizesOfHill: [],
        newHillSizeOfHillId: "",
        showNewHillForm: false
    }

    componentDidMount() {
        axios.get('/api/countries/venues')
            .then(res => {
                this.setState({
                    countries: res.data
                })
            }).catch(error => console.log(error))
        axios.get('/api/sizeOfHill')
            .then(res => {
                this.setState({
                    sizesOfHill: res.data
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
        })

    }

    toggleNewHillFormVisibility = () => {
        this.setState({
            showNewHillForm: !this.state.showNewHillForm
        })
    }
    updateHillsList = () => {
        axios.get('/api/hills/' + this.state.selectedVenueId)
            .then(res => {
                this.setState(
                    {
                        hills: res.data
                    }
                )
            })
    }

    addNewHill = () => {

        //just trying this out
        const found = this.state.venues.filter(function(item) { return item.id === 1; })
        console.log(found)
    }

    render() {

        console.log(this.state)

        let hillsListItems = <ListItem disabled>no hills yet in this venue</ListItem>
        if (this.state.hills.length > 0) {
            hillsListItems = this.state.hills.map(hill =>
                <ListItem key={hill.id} id={hill.id} className="list-group-item list-group-item-action"
                          onClick={e => {
                              this.setState({
                                  showHillVersionsList: !this.state.showHillVersionsList,
                                  selectedHillName: e.target.innerText,
                                  selectedHillId: e.target.id,
                              }, () => {
                                  this.state.hills.map(hill => {
                                      this.setState({
                                          hillVersions: hill.hillVersions
                                      })
                                  })
                              })
                          }}>
                    {hill.name}
                </ListItem>
            )
        }

        let selectedHillHeader = null
        let hillVersionsListItems = null
        if (this.state.showHillVersionsList) {
            selectedHillHeader = <Header6>Current hill versions of {this.state.selectedHillName} </Header6>
            hillVersionsListItems = this.state.hillVersions.map(hillVersion =>
                <ListItem key={hillVersion.id} id={hillVersion.id}>
                    From: {hillVersion.first_year}, Until: {hillVersion.last_year}, K: {hillVersion.kPoint},
                    HS: {hillVersion.hillSize}
                </ListItem>
            )
        }

        let showNewHillButton
        let newHillForm = null
        if (this.state.selectedVenueId !== "") {
            showNewHillButton = <ShowNewCityFormButton variant={"secondary"} onClick={this.toggleNewHillFormVisibility}>
                Add new hill in this venue
            </ShowNewCityFormButton>
        } else {
            showNewHillButton = <ShowNewCityFormButton variant={"secondary"} disabled>
                Add new hill in this venue
            </ShowNewCityFormButton>
        }

        if (this.state.showNewHillForm) {
            newHillForm = <NewHillForm
                onChangeName={e => {
                    this.setState({
                        newHillName: e.target.value
                    })
                }}
                sizesOfHill={this.state.sizesOfHill}
                onChangeSizeOfHill={e => this.setState({
                    newHillSizeOfHillId: e.target.value
                })}
                newHillName={this.state.newHillName}
                selectedVenueId={this.state.selectedVenueId}
                newHillSizeOfHillId={this.state.newHillSizeOfHillId}
                addNewHill={this.addNewHill}/>
        }


        return (
            <React.Fragment>
                <Header3>Register a Hill</Header3>

                <StyledForm>

                    {/*Country*/}
                    <TempCountryInputForm
                        title={"Country"}
                        valuesToShow={["name"]}
                        items={this.state.countries}
                        onChangeValue={e => {
                            this.setState({
                                selectedVenueId: "",
                                selectedHillName: "",
                                selectedHillId: "",
                                hills: [],
                                hillVersions: []
                            }, () => this.updateListsToCurrentCountry(e))
                        }}/>

                    {/*Venue*/}
                    <SelectInputForm
                        key={this.state.currentCountry}
                        title={"Venue"}
                        items={this.state.venues}
                        valuesToShow={["name"]}
                        onChangeValue={e =>
                            this.setState({
                                selectedVenueId: e.target.value,
                                selectedHillName: "",
                                selectedHillId: "",
                            }, () => this.updateHillsList())}
                    />

                    {/*Hills*/}
                    <Form.Group as={Row}>
                        <Form.Label column sm={2}>Hills:</Form.Label>
                        <Col sm={10}>
                            <ListInForm>{hillsListItems}</ListInForm>
                        </Col>
                    </Form.Group>


                    {selectedHillHeader}

                    <List>{hillVersionsListItems}</List>

                    {showNewHillButton}

                    {newHillForm}


                </StyledForm>
            </React.Fragment>
        )
    }
}

export default AddHill;