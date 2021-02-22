import React, {Component} from "react";
import {
    Header3, SmallTd, StyledDiv2Right1000, StyledDivCentered1000, TableButton
} from "../../components/StyledComponents";
import {Button, Col, Form, Row, Table} from "react-bootstrap";
import axios from "axios";
import TempCountryInputForm from "../../components/CommonForms/TempCountryInputForm";
import SelectInputForm from "../../components/CommonForms/SelectInputForm";
import TextInputForm from "../../components/CommonForms/TextInputForm";
import AddEditHillForm from "./AddEditHillForm";


//TODO add some sort of feedback that there is db action going on

class Hills extends Component {

    state = {
        countries: [],
        currentCountry: null,
        venues: [],
        selectedVenueId: "",
        hills: [],
        selectedHillName: "",
        selectedHillId: "",
        hillVersions: [],
        sizesOfHill: [],
        showNewHillForm: false,
        toggleNameField: false
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

    handleHillsListOnClick = (e) => {

        let newSelectedHillName
        let newSelectedHillId
        let newNameFieldLabel
        let newDisableNameField

        if (this.state.selectedHillId.length > 0) {
            newSelectedHillName = ""
            newSelectedHillId = ""
            newNameFieldLabel = "Name"
            newDisableNameField = true
        } else {
            newSelectedHillName = e.target.name
            newSelectedHillId = e.target.id
            newNameFieldLabel = "Name*"
            newDisableNameField = false
        }

        this.setState({
            showHillVersionsList: !this.state.showHillVersionsList,
            nameFieldLabel: newNameFieldLabel,
            disableNameField: newDisableNameField,
            selectedHillName: newSelectedHillName,
            selectedHillId: newSelectedHillId,
            showNewHillForm: !this.state.showNewHillForm
        }, () => {
            this.state.hills.map(hill => {
                this.setState({
                    hillVersions: hill.hillVersions
                }, () => {
                    this.updateHillsList()
                })
            })
        })

    }

    setDate = (date, option) => {
        const convertedDate = this.convertDate(date)

        if (option === 0) {
            this.setState({
                newHillValidSinceDay: convertedDate[0],
                newHillValidSinceMonth: convertedDate[1],
                newHillValidSinceYear: convertedDate[2],
                newHillValidSinceFullDate: date
            })
        } else {
            this.setState({
                newHillValidUntilDay: convertedDate[0],
                newHillValidUntilMonth: convertedDate[1],
                newHillValidUntilYear: convertedDate[2],
                newHillValidUntilFullDate: date
            })
        }


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

        return [parts[2], months[parts[1]], parts[3]]
    };

    addNewHill = (e) => {


        let postSuccessful = true

        axios.post("/api/hillVersion", {

        }).then(function (response) {
            console.log(response.data);
        })
            .catch(function (error) {
                console.log(error);
                postSuccessful = false
            }).finally(() => {
                if (postSuccessful) {
                    window.alert(this.state.newHillName + " added!")
                    this.updateListsToCurrentCountry();
                } else {
                    window.alert("Ups, something went wrong")
                }

                this.updateHillsList()
            }
        )
    }

    render() {

        //  console.log(this.state)

        let hillFormHeader
        if (!this.state.selectedHillId.length > 0) {
            hillFormHeader = <Header3>Adding a new hill</Header3>
        } else {
            hillFormHeader = <Header3>Adding new version of {this.state.selectedHillName}</Header3>
        }


        return (
            <React.Fragment>
                <Header3>Hills</Header3>

                <StyledDivCentered1000>

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
                        hintTextDown={!this.state.selectedVenueId.length > 0 ?
                            <small>Select a venue to continue</small> : null}
                        onChangeValue={e =>
                            this.setState({
                                selectedVenueId: e.target.value,
                                selectedHillName: "",
                                selectedHillId: "",
                            }, () => this.updateHillsList())}
                    />

                    {/*Table*/}
                    {this.state.hills.length > 0 ? <Table bordered hover>
                            <thead>
                            <tr>
                                <th>Name</th>
                                <th>Versions</th>
                                <th>Actions</th>
                            </tr>
                            </thead>
                            <tbody>
                            {this.state.hills.map(
                                hill =>
                                    <tr key={hill.id} id={hill.name}>
                                        <td>{hill.name}</td>
                                        <td>
                                            <ul>{hill.hillVersions.map(
                                                hillVersion => {
                                                    return (<li key={hillVersion.id}>K: {hillVersion.kPoint}m,
                                                        HS: {hillVersion.hillSize}m,
                                                        Valid: {hillVersion.first_year}-{hillVersion.last_year}</li>)
                                                }
                                            )}</ul>
                                        </td>
                                        <SmallTd>
                                            <TableButton id={hill.id} name={hill.name} size="sm"
                                                         onClick={e => this.handleHillsListOnClick(e)}>Add
                                                version</TableButton>
                                            <TableButton id={hill.id} name={hill.name} size="sm" variant={"info"}
                                                         onClick={e => this.handleHillsListOnClick(e)}>Edit</TableButton>
                                            <TableButton id={hill.id} name={hill.name} variant={"danger"} size="sm"
                                            >Delete</TableButton></SmallTd>
                                    </tr>
                            )}
                            </tbody>
                        </Table>
                        : null}
                    {this.state.selectedVenueId.length > 0 && !this.state.hills.length > 0 ?
                        <Form.Text muted>no hills yet in this venue</Form.Text> : null
                    }

                    {/*Add Hill Button*/}
                    {this.state.selectedVenueId.length > 0 ? <StyledDiv2Right1000>
                        <Button onClick={() => this.setState({
                            selectedHillId: "",
                            selectedHillName: "",
                            showNewHillForm: !this.state.showNewHillForm
                        })} variant={"success"}>New Hill</Button>
                    </StyledDiv2Right1000> : null}


                    {/*New Version Form*/}
                    {this.state.showNewHillForm ?
                        <AddEditHillForm
                            mainHeader={hillFormHeader}
                            showNameField={this.state.selectedHillId.length > 0}
                            selectedVenueId={this.state.selectedVenueId}
                            sizesOfHill={this.state.sizesOfHill}
                            onSubmit={this.addNewHill}
                        /> : null}

                </StyledDivCentered1000>


            </React.Fragment>
        )
    }
}

export default Hills;