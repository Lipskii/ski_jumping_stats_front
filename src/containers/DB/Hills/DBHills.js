import React, {Component} from "react";
import {
    Header3, HillNameTd, StyledDiv2Right1200, StyledDivCentered1200, TableButton
} from "../../../components/StyledComponents";
import {Button, Form, Table} from "react-bootstrap";
import axios from "axios";
import SelectInputForm from "../../../components/CommonForms/SelectInputForm";
import HillForm from "./HillForm";
import DeleteModal from "../../../components/Modals/DeleteModal";
import HillVersionReadMoreModal from "./HillVersionReadMoreModal";
import EditNameModal from "../../../components/Modals/EditNameModal";
import Loader from "react-loader-spinner";
import AddingModal from "../../../components/Modals/AddingModal";
import CompletedModal from "../../../components/Modals/CompletedModal";


//TODO refactor this class
class DBHills extends Component {

    state = {
        addedHillId: -1,
        cities: [],
        countries: [],
        currentCountry: "",
        formHeaderText: "",
        filterCountryId: '',
        venues: [],
        selectedVenueId: "",
        hills: [],
        hillToDelete: '',
        hillToReadMore: '',
        hillVersionToReadMore: '',
        selectedHillName: "",
        selectedHillId: "",
        selectedHillSize: '',
        hillsLoading: false,
        venuesLoading: true,
        sizesOfHill: [],
        showHillForm: false,
        toggleNameField: false,
        showAddingModal: false,
        showDeleteModal: false,
        showEditModal: false,
        showReadMoreModal: false,
        showCompletedModal: false,
        completedModalText: "",
        completedModalStatus: false
    }

    componentDidMount() {
        axios.all([
            axios.get('/api/countries/venues'),
            axios.get('/api/sizeOfHill'),
            axios.get('/api/venues')

        ])
            .then(axios.spread((countriesData, sizesData, venuesData) => {
                this.setState({
                    countries: countriesData.data,
                    sizesOfHill: sizesData.data,
                    venues: venuesData.data,
                    venuesLoading: false
                })
            }))
            .catch(error => console.log(error))
    }


    filter = () => {
        axios.all([
            axios.get('/api/venues?countryId=' + this.state.filterCountryId
                 ),
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

    updateHillsList = () => {
        if (this.state.selectedVenueId !== "") {
            const venue = this.state.venues.find(venue => venue.id === this.state.selectedVenueId)
            this.setState({
                hills: venue.hills
            })
        }
    }

    handleAddVersionButton = (e) => {
        this.setState({
            selectedHillName: e.target.name,
            selectedHillId: e.target.id,
            showHillForm: true,
            formHeaderText: "Adding new version of " + e.target.name
        })
    }

    handleEditButton = (e) => {

        this.setState({
            selectedHillName: e.target.name,
            selectedHillId: e.target.id,
            showEditModal: true,
        })
    }

    postData = (values) => {
        this.setState({
            showAddingModal: true
        })
        if (this.state.selectedHillId !== "") {
            this.postHillVersion(values)
        } else {
            this.postNewHill(values)
        }

    }

    postNewHill = (values) => {
        let id = -1
        let successful = true
        const hill = {
            name: values.name,
            venue: this.state.venues.find(venue => venue.id === parseInt(this.state.selectedVenueId)),
            sizeOfHill: this.state.sizesOfHill.find(size => size.id === parseInt(values.sizeOfHillId))
        }

        axios.post("/api/hills", {...hill})
            .then(response => {
                id = response.data.id
            })
            .catch(error => {
                successful = false
                console.log(error)
            })
            .finally(() => {
                if (successful) {
                    this.setState({
                        addedHillId: id
                    }, () => {
                        this.postHillVersion(values, hill)
                    })
                } else {
                    this.setState({
                        showCompletedModal: true,
                        completedModalText: "Ups, something went wrong. Try again.",
                        completedModalStatus: successful,
                        showAddingModal: false
                    })
                }
            })

    }

    postHillVersion = (values, hill) => {
        let hillToVersion

        if (hill !== undefined) {
            hill = {
                id: this.state.addedHillId,
                ...hill
            }
            hillToVersion = hill
        } else {
            hillToVersion = this.state.hills.find(hill => hill.id === parseInt(this.state.selectedHillId))
        }
        let successful = true

        axios.post("/api/hillVersions", {
            hill: hillToVersion,
            kPoint: values.kPoint,
            hillSize: values.hillSize,
            es: values.es,
            e1: values.e1,
            gamma: values.gamma,
            r1: values.r1,
            t: values.t,
            alpha: values.alpha,
            s: values.s,
            v0: values.v0,
            h: values.h,
            n: values.n,
            p: values.p,
            l1: values.l1,
            l2: values.l2,
            betaP: values.betap,
            beta: values.beta,
            betaL: values.betal,
            l: values.l,
            rl: values.rl,
            r2l: values.r2l,
            zu: values.zu,
            r2: values.r2,
            a: values.a,
            b1: values.b1,
            b2: values.b2,
            bk: values.bk,
            bu: values.bu,
            d: values.d,
            q: values.q,
            fisCertificate: values.certificate,
            validSince: values.validSince,
            validUntil: values.validUntil
        })
            .then(response => {
                console.log(response.data)
            })
            .catch(error => {
                console.log(error)
                successful = false
            })
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
                }, () => this.filter())
            })
    }

    editHill = (values) => {
        let successful = true
        axios.put("/api/hills/" + parseInt(this.state.selectedHillId), {
            name: values.name,
            venue: this.state.venues.find(venue => venue.id === this.state.selectedVenueId),
            sizeOfHill: this.state.sizesOfHill.find(size => size.id === parseInt(this.state.selectedHillSize))
        })
            .then(function (res) {
                console.log(res.data)
            })
            .catch(function (error) {
                console.log(error)
                successful = false
            })
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
    }

    deleteHill = () => {
        axios.delete("/api/hills/" + this.state.hillToDelete.id)
            .then(res => console.log(res))
            .catch(error => console.log(error))
            .finally(() => {
                this.setState({
                    showDeleteModal: false,
                }, () => this.filter())
            })
    }


    render() {
        console.log(this.state)
        return (
            <React.Fragment>

                <HillVersionReadMoreModal
                    hill={this.state.hillToReadMore}
                    version={this.state.hillVersionToReadMore}
                    show={this.state.showReadMoreModal}
                    onHide={() => this.setState({
                        showReadMoreModal: false
                    })}
                />

                <CompletedModal
                    show={this.state.showCompletedModal}
                    text={this.state.completedModalText}
                    onHide={() => this.setState({
                        showCompletedModal: false,
                        completedModalText: ""
                    })}
                />

                <AddingModal
                    show={this.state.showAddingModal}
                    onHide={() => this.setState({
                        showAddingModal: false
                    })}
                />

                {this.state.showDeleteModal ?
                    <DeleteModal
                        title={this.state.hillToDelete.name}
                        show={this.state.showDeleteModal}
                        onHide={() => this.setState({
                            showDeleteModal: false
                        })}
                        handleDelete={this.deleteHill}
                    /> : null}


                <Header3>Hills</Header3>

                <StyledDivCentered1200>

                    {/*Country*/}
                    <SelectInputForm
                        title={"Country"}
                        defaultValue={""}
                        onChange={e => {
                            this.setState({
                                    filterCountryId: e.target.value,
                                    venuesLoading: true,
                                    hills: [],
                                    hillVersions: []
                                }, () => this.filter()
                            )
                        }}
                    >
                        <option value={""}>All countries</option>
                        {this.state.countries.map(country =>
                            <option key={country.id} value={country.id}>
                                {country.name}
                            </option>)}
                    </SelectInputForm>

                    {this.state.venuesLoading ?
                        <Loader
                            type="ThreeDots"
                            color="#00BFFF"
                            height={80}
                            width={80}
                            style={{textAlign: 'center'}}
                        />
                        :
                        <SelectInputForm
                            key={this.state.currentCountry}
                            title={"Venue"}
                            disabled={this.state.venuesLoading}
                            hintTextDown={!(this.state.selectedVenueId !== "") ?
                                <small>Select a venue to continue</small> : null}
                            defaultValue={""}
                            onChange={e =>
                                this.setState({
                                    selectedVenueId: parseInt(e.target.value),
                                    selectedHillName: "",
                                    selectedHillId: "",
                                }, () => this.updateHillsList())}
                        >
                            <option value={""} disabled>Choose...</option>
                            {this.state.venues.map(venue =>
                                <option key={venue.id} value={venue.id} name={venue.name}>
                                    {venue.name}
                                </option>
                            )}
                        </SelectInputForm>}


                    {this.state.hillsLoading ?
                        <Loader
                            type="ThreeDots"
                            color="#00BFFF"
                            height={80}
                            width={80}
                            style={{textAlign: 'center'}}
                        />
                        : null}

                    {/*Table*/}
                    {this.state.hills.length > 0 && !this.state.hillsLoading ? <Table bordered hover striped>
                            <thead>
                            <tr>
                                <th>Name</th>
                                <th>Latest version</th>
                                <th>Actions</th>
                            </tr>
                            </thead>
                            <tbody>
                            {this.state.hills.map(
                                hill => (
                                    <tr key={hill.id} id={hill.id}>
                                        <HillNameTd>{hill.name}</HillNameTd>
                                        <td>
                                            <ul>
                                                {hill.hillVersions.map(hillVersion => (
                                                    <li key={hill.id + '_' + hillVersion.id}
                                                        style={{textDecoration: "underline"}}>
                                                        <Button variant={"link"} onClick={() => {
                                                            this.setState({
                                                                showReadMoreModal: true,
                                                                hillToReadMore: hill,
                                                                hillVersionToReadMore: hillVersion
                                                            })
                                                        }}>
                                                            {hillVersion.validSince} / {hillVersion.validUntil} (K: {hillVersion.kPoint} m,
                                                            HS: {hillVersion.hillSize} m)
                                                        </Button>
                                                    </li>
                                                ))}
                                            </ul>
                                            <small>Click on version to read more about it</small>
                                            {/*<Button*/}
                                            {/*    size={"sm"}*/}
                                            {/*    variant={"outline-dark"}*/}
                                            {/*    onClick={() => this.setState({*/}
                                            {/*        showReadMoreModal: true,*/}
                                            {/*        hillToReadMore: hill,*/}
                                            {/*        hillVersionToReadMore: ''*/}
                                            {/*    })}*/}
                                            {/*>Read more</Button>*/}
                                        </td>
                                        <td>
                                            <TableButton id={hill.id} name={hill.name} size="sm"
                                                         onClick={e => this.handleAddVersionButton(e)}>
                                                Add version
                                            </TableButton>
                                            <TableButton id={hill.id} size="sm" variant={"info"}
                                                         onClick={() => {
                                                             this.setState({
                                                                 selectedHillName: hill.name,
                                                                 selectedHillId: hill.id,
                                                                 selectHillSize: hill.sizeOfHill,
                                                                 showEditModal: true,
                                                             })
                                                         }}>
                                                Edit hill
                                            </TableButton>
                                            <EditNameModal
                                                name={this.state.selectedHillName}
                                                show={this.state.showEditModal}
                                                onHide={() => this.setState({
                                                    showEditModal: false
                                                })}
                                                onSubmit={this.editHill}
                                            />
                                            <TableButton id={hill.id} name={hill.name} variant={"danger"} size="sm"
                                                         onClick={e => {
                                                             this.setState({
                                                                 selectedHillName: e.target.name,
                                                                 selectedHillId: e.target.id,
                                                                 showDeleteModal: true,
                                                                 hillToDelete: hill
                                                             })
                                                         }}
                                            >
                                                Delete
                                            </TableButton>
                                        </td>
                                    </tr>
                                ))
                            }
                            </tbody>
                        </Table>
                        :
                        null
                    }
                    {this.state.selectedVenueId !== "" && !this.state.hills.length > 0 ?
                        <Form.Text muted>no hills yet in this venue</Form.Text> : null
                    }

                    {/*Add Hill Button*/}
                    {this.state.selectedVenueId !== "" ? <StyledDiv2Right1200>
                        <Button onClick={() => this.setState({
                            selectedHillId: "",
                            selectedHillName: "",
                            showHillForm: !this.state.showHillForm,
                            formHeaderText: "Adding new hill"
                        })} variant={"success"}>New Hill</Button>
                    </StyledDiv2Right1200> : null}


                    {/*New Version Form*/}
                    {this.state.showHillForm && this.state.selectedVenueId !== "" ?
                        <React.Fragment>
                            <StyledDiv2Right1200>
                                <Button size={"sm"} onClick={() => this.setState({
                                    showHillForm: false
                                })} variant={"secondary"}>Hide</Button>
                            </StyledDiv2Right1200>
                            <HillForm
                                mainHeader={this.state.formHeaderText}
                                showNameField={this.state.selectedHillId === ""}
                                selectedVenueId={this.state.selectedVenueId}
                                initialName={this.state.selectedHillName}
                                sizesOfHill={this.state.sizesOfHill}
                                onSubmit={this.postData}
                            /> </React.Fragment> : null}

                </StyledDivCentered1200>


            </React.Fragment>
        )
    }
}

export default DBHills;