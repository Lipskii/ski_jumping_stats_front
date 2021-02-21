import React, {Component} from "react";
import {
    Header3, Header5,
    Header6,
    List,
    ListInForm,
    ListItem, SmallTd, StyledDiv2Right1000,
    StyledForm, TableButton
} from "../../components/StyledComponents";
import {Button, Col, Form, Row, Table} from "react-bootstrap";
import axios from "axios";
import TempCountryInputForm from "../../components/CommonForms/TempCountryInputForm";
import SelectInputForm from "../../components/CommonForms/SelectInputForm";
import TextInputForm from "../../components/CommonForms/TextInputForm";
import DatePicker from "react-datepicker";
import AddEditHillForm from "./AddEditHillForm";


//TODO (in api) save hill only if hill version is valid
//TODO add some sort of feedback that there is db action going on

class Hills extends Component {

    state = {
        countries: [],
        currentCountry: null,
        newHillName: "",
        venues: [],
        selectedVenueId: "",
        hills: [],
        selectedHillName: "",
        selectedHillId: "",
        hillVersions: [],
        sizesOfHill: [],
        showNewHillForm: false,
        newHillSizeOfHillId: "",
        newHillKPoint: "",
        newHillHS: "",
        newHille1: "",
        newHille2: "",
        newHilles: "",
        newHillt: "",
        newHillGamma: "",
        newHillAlpha: "",
        newHillr1: "",
        newHillh: "",
        newHilln: "",
        newHills: "",
        newHilll1: "",
        newHilll2: "",
        newHilla: "",
        newHillBetap: "",
        newHillBeta: "",
        newHillBetal: "",
        newHillrl: "",
        newHillr2l: "",
        newHillr2: "",
        newHillzu: "",
        newHillP: "",
        newHillL: "",
        newHillb1: "",
        newHillb2: "",
        newHillbk: "",
        newHillbu: "",
        newHilld: "",
        newHillq: "",
        newHillv0: "",
        newHillValidSinceDay: "",
        newHillValidSinceMonth: "",
        newHillValidSinceYear: "",
        newHillValidUntilDay: "",
        newHillValidUntilMonth: "",
        newHillValidUntilYear: "",
        newHillCertificateLink: "",
        newHillValidSinceFullDate: "",
        newHillValidUntilFullDate: "",
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

        e.preventDefault()

        let postSuccessful = true

        axios.post("/api/hillVersion", {
            hillId: this.state.selectedHillId,
            name: this.state.newHillName,
            venueId: this.state.selectedVenueId,
            sizeId: this.state.newHillSizeOfHillId,
            kPoint: this.state.newHillKPoint.replace(",", "."),
            hillSize: this.state.newHillHS.replace(",", "."),
            es: this.state.newHilles.replace(",", "."),
            e1: this.state.newHille1.replace(",", "."),
            e2: this.state.newHille2.replace(",", "."),
            gamma: this.state.newHillGamma.replace(",", "."),
            r1: this.state.newHillr1.replace(",", "."),
            t: this.state.newHillt.replace(",", "."),
            alpha: this.state.newHillAlpha.replace(",", "."),
            s: this.state.newHills.replace(",", "."),
            v0: this.state.newHillv0.replace(",", "."),
            h: this.state.newHillh.replace(",", "."),
            n: this.state.newHilln.replace(",", "."),
            p: this.state.newHillP.replace(",", "."),
            l1: this.state.newHilll1.replace(",", "."),
            l2: this.state.newHilll2.replace(",", "."),
            betaP: this.state.newHillBetap.replace(",", "."),
            beta: this.state.newHillBeta.replace(",", "."),
            betaL: this.state.newHillBetal.replace(",", "."),
            l: this.state.newHillL.replace(",", "."),
            rl: this.state.newHillrl.replace(",", "."),
            r2l: this.state.newHillr2l.replace(",", "."),
            zu: this.state.newHillzu.replace(",", "."),
            r2: this.state.newHillr2.replace(",", "."),
            a: this.state.newHilla.replace(",", "."),
            b1: this.state.newHillb1.replace(",", "."),
            b2: this.state.newHillb2.replace(",", "."),
            bk: this.state.newHillbk.replace(",", "."),
            bu: this.state.newHillbu.replace(",", "."),
            d: this.state.newHilld.replace(",", "."),
            q: this.state.newHillq.replace(",", "."),
            certificate: this.state.newHillCertificateLink,
            validSinceYear: this.state.newHillValidSinceYear,
            validSinceMonth: this.state.newHillValidSinceMonth,
            validSinceDay: this.state.newHillValidSinceDay,
            validUntilYear: this.state.newHillValidUntilYear,
            validUntilMonth: this.state.newHillValidUntilMonth,
            validUntilDay: this.state.newHillValidUntilDay,

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
        let nameField = null
        if (!this.state.selectedHillId.length > 0) {
            hillFormHeader = <Header3>Adding a new hill</Header3>
            nameField =
                <TextInputForm title={"Name*"} disabled={!this.state.selectedVenueId.length > 0} onChangeValue={e => {
                    this.setState({
                        newHillName: e.target.value
                    })
                }}/>
        } else {
            hillFormHeader = <Header3>Adding new version of {this.state.selectedHillName}</Header3>
        }


        return (
            <React.Fragment>
                <Header3>Hills</Header3>

                {/*TODO remove StyledForm from here, add styled substitute (form will be in different file)*/}
                <StyledForm onSubmit={this.addNewHill}>

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

                    {this.state.selectedVenueId.length > 0 ? <StyledDiv2Right1000>
                        <Button onClick={() => this.setState({
                            showNewHillForm: !this.state.showNewHillForm
                        })} variant={"success"}>New Hill</Button>
                    </StyledDiv2Right1000> : null}

                    {this.state.selectedVenueId.length > 0 && !this.state.hills.length > 0 ?
                        <Form.Text muted>no hills yet in this venue</Form.Text> : null
                    }


                    {this.state.showNewHillForm ?
                        <AddEditHillForm
                            mainHeader={hillFormHeader}
                            nameField={nameField}
                            selectedVenueId={this.state.selectedVenueId}
                            sizesOfHill={this.state.sizesOfHill}
                        /> : null}

                </StyledForm>


            </React.Fragment>
        )
    }
}

export default Hills;