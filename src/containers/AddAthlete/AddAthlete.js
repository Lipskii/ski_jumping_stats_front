import React, {Component} from 'react'
import axios from "axios";
import {
    CheckButton,
    StyledDiv2Centered,
    StyledForm,
    ListItem, List, ShowNewCityFormButton, StyledDiv2Right, Header3
} from "../../components/StyledComponents";
import {Button, Col, Form, Row} from "react-bootstrap";
import DatePicker from "react-datepicker";
import "react-datepicker/dist/react-datepicker.css";
import NewCityForm from "../../components/CommonForms/NewCityForm";
import EditModal from "../../components/Modal/EditModal";
import TempCountryInputForm from "../../components/CommonForms/TempCountryInputForm";
import TextInputForm from "../../components/CommonForms/TextInputForm";
import SelectInputForm from "../../components/CommonForms/SelectInputForm";




class AddAthlete extends Component {

    state = {
        countries: [],
        skiClubs: [],
        skiJumpers: [],
        cities: [],
        showNewCityForm: false,
        skis: [],
        currentCountry: "",
        athletesListVisibility: false,
        newAthleteFirstName: "",
        newAthleteLastName: "",
        newAthleteCityId: "",
        selectedDate: new Date(),
        newAthleteDateDay: "",
        newAthleteDateMonth: "",
        newAthleteDateYear: "",
        newAthleteGenderId: "",
        newAthleteIsActive: "",
        newAthleteSkiClubId: "",
        newAthleteSkisId: "",
        newCityButtonText: "Do you want to add new city?",
        selectedSkiJumperName: "",
        selectedSkiJumperId: "",
        showEditModal: false
    }


    componentDidMount() {
        axios.get('/api/countries')
            .then(res => {
                this.setState({
                    countries: res.data
                })
            }).catch(error => console.log(error))

        axios.get('/api/skis')
            .then(res => {
                this.setState({
                    skis: res.data
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

    deleteSkiJumper = () => {
        this.setState({
            showEditModal: !this.state.showEditModal,
            selectedSkiJumperId: "",
            selectedSkiJumperName: ""
        })
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
                    })
                }).catch(error => console.log(error))
        })

    }

    setDate = (date) => {
        this.convertDate(date)

        this.setState({
            selectedDate: date,
        })
    }

    convertDate = str => {
        str = str.toString();
        let parts = str.split(" ");
        let months = {
            Jan: "01",
            Feb: "02",
            Mar: "03",
            Apr: "04",
            May: "05",
            Jun: "06",
            Jul: "07",
            Aug: "08",
            Sep: "09",
            Oct: "10",
            Nov: "11",
            Dec: "12"
        };

        this.setState({
            newAthleteDateDay: parts[2],
            newAthleteDateMonth: months[parts[1]],
            newAthleteDateYear: parts[3]
        })
    };


    onSubmitAthleteForm = () => {
        let postSuccessful = true

        axios.post("/api/skiJumper", {
            firstName: this.state.newAthleteFirstName,
            lastName: this.state.newAthleteLastName,
            gender: this.state.newAthleteGenderId,
            birthdateDay: this.state.newAthleteDateDay,
            birthdateMonth: this.state.newAthleteDateMonth,
            birthdateYear: this.state.newAthleteDateYear,
            country: this.state.currentCountry,
            city: this.state.newAthleteCityId,
            isActive: this.state.newAthleteIsActive,
            skis: this.state.newAthleteSkisId,
            skiClub: this.state.newAthleteSkiClubId
        }).then(function (response) {
            console.log(response.data);
        })
            .catch(function (error) {
                console.log(error);
                postSuccessful = false
            }).finally(() => {
                if (postSuccessful) {
                    window.alert(this.state.newAthleteFirstName + " " + this.state.newAthleteLastName + " added!")
                    this.updateListsToCurrentCountry();
                } else {
                    window.alert("Ups, something went wrong")
                }


            }
        )
    }


    render() {

        return (
            <React.Fragment>

                <EditModal show={this.state.showEditModal} handleClose={this.deleteSkiJumper}
                           selectedName={this.state.selectedSkiJumperName} handleCloseNoAction={this.deleteSkiJumper}/>

                <Header3>Register an Athlete</Header3>
                <StyledForm>

                    {/*Country*/}
                    <TempCountryInputForm title={"Country"} items={this.state.countries} valuesToShow={["name"]}
                                          onChangeValue={this.updateListsToCurrentCountry}/>

                    {/*Toggle Athletes List*/}
                    <StyledDiv2Centered>
                        <CheckButton size="sm" onClick={this.changeAthletesListVisibility}>Toggle athletes
                            list</CheckButton>
                    </StyledDiv2Centered>


                    {this.state.athletesListVisibility ? <List>{this.state.skiJumpers.length > 0 ? this.state.skiJumpers.map(skiJumper =>
                        <ListItem key={skiJumper.id} id={skiJumper.id} onDoubleClick={e =>
                            this.setState({
                                selectedSkiJumperName: e.target.innerText,
                                selectedSkiJumperId: e.target.id,
                                showEditModal: true
                            })}>
                            {skiJumper.firstName} {skiJumper.lastName} ({skiJumper.gender}), {skiJumper.birthdate}, {skiJumper.skiClub}, {skiJumper.city}
                        </ListItem>)  : <p>There are currently no athletes in {this.state.currentCountry}</p> }</List> : null}

                    {/*First Name*/}
                    <TextInputForm title={"First name"} onChangeValue={e => {
                        this.setState({
                            newAthleteFirstName: e.target.value
                        })
                    }}/>

                    {/*Last Name*/}
                    <TextInputForm title={"Last name"} onChangeValue={e => {
                        this.setState({
                            newAthleteLastName: e.target.value
                        })
                    }}/>

                    {/*Gender*/}
                    <Form.Group as={Row}>
                        <Form.Label column sm={2}>Gender:</Form.Label>
                        <Col sm={10}>
                            <Form.Control as="select" defaultValue={""} onChange={e => {
                                this.setState({
                                    newAthleteGenderId: e.target.value
                                })
                            }}>
                                <option value={""}>Choose...</option>
                                <option value={1}>Female</option>
                                <option value={2}>Male</option>
                            </Form.Control>
                        </Col>
                    </Form.Group>


                    {/*Birthdate*/}
                    <Form.Group as={Row}>
                        <Form.Label column sm={2}>
                            Birthdate:
                        </Form.Label>
                        <Col sm={10}>
                            <DatePicker
                                closeOnScroll={true}
                                selected={this.state.selectedDate}
                                onChange={date => this.setDate(date)}
                                placeholderText="dd/mm/yyyy"
                                dateFormat="dd/MM/yyyy"
                            />
                        </Col>
                    </Form.Group>

                    {/*City*/}
                    <SelectInputForm title={"City"}
                                     key={this.state.currentCountry}
                                     items={this.state.cities}
                                     valuesToShow={["name", ",", "region"]}
                                     onChangeValue={e => {
                                         this.setState({
                                             newAthleteCityId: e.target.value
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
                                             newAthleteSkiClubId: e.target.value
                                         })
                                     }}
                    />

                    {/*Skis*/}
                    <SelectInputForm title={"Skis"}
                                     items={this.state.skis}
                                     valuesToShow={["brand"]}
                                     onChangeValue={e => {
                                         this.setState({
                                             newAthleteSkisId: e.target.value
                                         })
                                     }}
                    />

                    {/*Is Active*/}
                    <Form.Check type="checkbox" label="Is Active" onChange={e => {
                        this.setState({
                            newAthleteIsActive: !this.state.newAthleteIsActive
                        })
                    }}/>

                    <StyledDiv2Right>
                        <Button onClick={this.onSubmitAthleteForm} disabled={
                            !(this.state.newAthleteFirstName.length > 0
                                && this.state.newAthleteLastName.length > 0
                                && this.state.newAthleteGenderId.length > 0
                                && this.state.newAthleteDateDay.length > 0
                                && this.state.newAthleteDateMonth.length > 0
                                && this.state.newAthleteDateYear.length > 0
                            )}>Submit</Button>
                    </StyledDiv2Right>


                </StyledForm>
            </React.Fragment>
        )
    }

}


export default AddAthlete