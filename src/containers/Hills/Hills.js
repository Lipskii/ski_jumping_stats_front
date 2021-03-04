import React, {Component} from "react";
import {
    ErrorLabel,
    Header3, HillNameTd, SmallTd, StyledDiv2Right1000, StyledDivCentered1000, TableButton
} from "../../components/StyledComponents";
import {Button, Form, Table} from "react-bootstrap";
import axios from "axios";
import TempCountryInputForm from "../../components/CommonForms/TempCountryInputForm";
import SelectInputForm from "../../components/CommonForms/SelectInputForm";
import HillForm from "./HillForm";
import DeleteModal from "../../components/Modals/DeleteModal";
import ReadMoreModal from "../../components/Modals/ReadMoreModal";
import EditModal from "../../components/Modals/EditModal";
import Loader from "react-loader-spinner";
import AddingModal from "../../components/Modals/AddingModal";


class Hills extends Component {

    state = {
        countries: [],
        currentCountry: '',
        formHeaderText: "",
        venues: [],
        selectedVenueId: "",
        hills: [],
        selectedHillName: "",
        selectedHillId: "",
        setHillsLoading: false,
        setVenuesLoading: false,
        sizesOfHill: [],
        showHillForm: false,
        toggleNameField: false,
        newHillValidSinceDay: "",
        newHillValidSinceMonth: "",
        newHillValidSinceYear: "",
        newHillValidSinceFullDate: "",
        showAddingModal: false,
        showDeleteModal: false,
        showEditModal: false,
        showReadMoreModal: false
    }

    componentDidMount() {
        axios.all([
            axios.get('/api/countries/venues'),
            axios.get('/api/sizeOfHill')
        ])
            .then(axios.spread((countriesData, sizesData) => {
                this.setState({
                    countries: countriesData.data,
                    sizesOfHill: sizesData.data
                }, () => this.updateVenues())
            }))
            .catch(error => console.log(error))
    }

    updateVenues = (e) => {
        let eTargetValue

        if (e === undefined) {
            eTargetValue = this.state.currentCountry
        } else {
            eTargetValue = e.target.value
        }

        this.setState({
            currentCountry: eTargetValue,
            setVenuesLoading: true
        }, () => {

            axios.get('/api/venues/' + eTargetValue)
                .then(res => {
                    this.setState({
                        venues: res.data,
                        setVenuesLoading: false
                    }, () => this.updateHillsList())
                }).catch(error => console.log(error))
        })

    }

    updateHillsList = () => {
        if(this.state.selectedVenueId !== ""){
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

    handleDeleteButton = (e) => {
        this.setState({
            selectedHillName: e.target.name,
            selectedHillId: e.target.id,
            showDeleteModal: true
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

    addNewHill = (values) => {

        this.setDate(values.validSince, 0)
        this.setDate(values.validUntil, 1)


        let postSuccessful = true
        this.setState({
            showAddingModal: true
         }, () => {
            //TODO finish it tomorrow
        } )
        // () => axios.post("/api/hillVersion", {
        //     // hillId: this.state.selectedHillId,
        //     // name: values.name,
        //     // venueId: this.state.selectedVenueId,
        //     // sizeId: values.sizeOfHillId,
        //     // kPoint: values.kPoint,
        //     // hillSize: values.hs,
        //     // es: values.es,
        //     // e1: values.e1,
        //     // e2: values.e2,
        //     // gamma: values.gamma,
        //     // r1: values.r1,
        //     // t: values.t,
        //     // alpha: values.alpha,
        //     // s: values.s,
        //     // v0: values.v0,
        //     // h: values.h,
        //     // n: values.n,
        //     // p: values.p,
        //     // l1: values.l1,
        //     // l2: values.l2,
        //     // betaP: values.betap,
        //     // beta: values.beta,
        //     // betaL: values.betal,
        //     // l: values.l,
        //     // rl: values.rl,
        //     // r2l: values.r2l,
        //     // zu: values.zu,
        //     // r2: values.r2,
        //     // a: values.a,
        //     // b1: values.b1,
        //     // b2: values.b2,
        //     // bk: values.bk,
        //     // bu: values.bu,
        //     // d: values.d,
        //     // q: values.q,
        //     // certificate: values.certificate,
        //     // validSinceYear: this.state.newHillValidSinceDay,
        //     // validSinceMonth: this.state.newHillValidSinceMonth,
        //     // validSinceDay: this.state.newHillValidSinceDay,
        //     // validUntilYear: this.state.newHillValidUntilDay,
        //     // validUntilMonth: this.state.newHillValidUntilMonth,
        //     // validUntilDay: this.state.newHillValidUntilDay,
        //
        // }).then(function (response) {
        //     console.log(response.data);
        // })
        //     .catch(function (error) {
        //         console.log(error);
        //         postSuccessful = false
        //     })
        //     .finally(() => {
        //         this.setState({
        //             showAddingModal: false
        //         }, () => {
        //             if (postSuccessful) {
        //                 window.alert(values.name + " added!")
        //                 this.updateVenues();
        //             } else {
        //                 window.alert("Ups, something went wrong")
        //             }
        //             this.updateHillsList()
        //         })
        //     }))
    }

    editHill = (values) => {
        axios.put("/api/hills/" + parseInt(this.state.selectedHillId), {
            name: values.name,
            venue: this.state.venues.find(venue => venue.id === this.state.selectedVenueId),
            sizeOfHill: this.state.sizesOfHill[1]
        })
            .then(function (res) {
                console.log(res.data)
            })
            .catch(function (error) {
                console.log(error)
            })
            .finally(() => {
                this.setState({
                    showEditModal: false
                }, () => this.updateVenues())
            })
    }

    deleteHill = () => {
        window.alert("Delete Hill called")
        this.setState({
            showDeleteModal: false
        })
    }


    render() {

        console.log(this.state)

        return (
            <React.Fragment>

                <AddingModal
                    show={this.state.showAddingModal}
                    onHide={() => this.setState({
                        showAddingModal: false
                    })}
                />

                <DeleteModal
                    title={this.state.selectedHillName}
                    show={this.state.showDeleteModal}
                    onHide={() => this.setState({
                        showDeleteModal: false
                    })}
                    handleDelete={this.deleteHill}
                />

                <Header3>Hills</Header3>

                <StyledDivCentered1000>

                    {/*Country*/}
                    <TempCountryInputForm
                        title={"Show venues from:"}
                        valuesToShow={["name"]}
                        items={this.state.countries}
                        onChangeValue={e => {
                            this.setState({
                                selectedVenueId: "",
                                selectedHillName: "",
                                selectedHillId: "",
                                hills: [],
                                hillVersions: []
                            }, () => this.updateVenues(e))
                        }}/>

                    {this.state.setVenuesLoading ?
                        <Loader
                            type="ThreeDots"
                            color="#00BFFF"
                            height={80}
                            width={80}
                            style={{textAlign: 'center'}}
                        />
                        : null}

                    {/*Venue*/}
                    {this.state.venues.length > 0 ? <SelectInputForm
                        key={this.state.currentCountry}
                        title={"Venue"}
                        items={this.state.venues}
                        stringsToDisplay={["name", ", ", "city"]}
                        disabled={this.state.setVenuesLoading}
                        hintTextDown={!(this.state.selectedVenueId !== "") ?
                            <small>Select a venue to continue</small> : null}
                        onChangeValue={e =>
                            this.setState({
                                selectedVenueId: parseInt(e.target.value),
                                selectedHillName: "",
                                selectedHillId: "",
                            }, () => this.updateHillsList())}
                    /> : null}


                    {this.state.setHillsLoading ?
                        <Loader
                            type="ThreeDots"
                            color="#00BFFF"
                            height={80}
                            width={80}
                            style={{textAlign: 'center'}}
                        />
                        : null}

                    {/*Table*/}
                    {this.state.hills.length > 0 && !this.state.setHillsLoading ? <Table  bordered hover>
                            <thead>
                            <tr>
                                <th>Name</th>
                                <th>Latest version</th>
                                <th>Actions</th>
                            </tr>
                            </thead>
                            <tbody>
                            {this.state.hills.map(
                                hill => {
                                    const maxYear = Math.max.apply(Math, hill.hillVersions.map(function (o) {
                                        return o.last_year;
                                    }))

                                    if (hill.hillVersions.length > 0) {
                                        const latestVersion = hill.hillVersions.find(hillVersion => hillVersion.last_year === maxYear)
                                        const validUntil = new Date(latestVersion.validUntil)

                                        let validityError = null
                                        if (validUntil < new Date()) {
                                            validityError = <ErrorLabel>Certificate expired!</ErrorLabel>
                                        }

                                        return (<tr key={hill.name} id={hill.id}>
                                            <HillNameTd>{hill.name}</HillNameTd>
                                            <td>
                                                <ul>
                                                    <li>K: {latestVersion.kPoint} m</li>
                                                    <li>HS: {latestVersion.hillSize} m</li>
                                                    <li>Valid since: {latestVersion.validSince}</li>
                                                    <li>Valid until: {latestVersion.validUntil}</li>
                                                    {validityError}
                                                </ul>
                                                <Button
                                                    size={"sm"}
                                                    variant={"outline-dark"}
                                                    onClick={() => this.setState({
                                                        showReadMoreModal: true
                                                    })}
                                                >Read more</Button>
                                                <ReadMoreModal
                                                    hill={hill}
                                                    version={latestVersion}
                                                    show={this.state.showReadMoreModal}
                                                    onHide={() => this.setState({
                                                        showReadMoreModal: false
                                                    })}
                                                    handleDelete={this.deleteHill}
                                                />
                                            </td>
                                            <SmallTd>
                                                <TableButton id={hill.id} name={hill.name} size="sm"
                                                             onClick={e => this.handleAddVersionButton(e)}>
                                                    Add version
                                                </TableButton>
                                                <TableButton id={hill.id} name={hill.name} size="sm" variant={"info"}
                                                             onClick={e => this.handleEditButton(e)}>
                                                    Edit name
                                                </TableButton>
                                                <EditModal
                                                    hillName={this.state.selectedHillName}
                                                    show={this.state.showEditModal}
                                                    onHide={() => this.setState({
                                                        showEditModal: false
                                                    })}
                                                    onSubmit={this.editHill}
                                                />
                                                <TableButton id={hill.id} name={hill.name} variant={"danger"} size="sm"
                                                             onClick={e => this.handleDeleteButton(e)}>
                                                    Delete
                                                </TableButton></SmallTd>
                                        </tr>)
                                    } else {
                                        return (
                                            <tr>
                                                <HillNameTd>{hill.name}</HillNameTd>
                                                <td/>
                                                <SmallTd/>
                                            </tr>
                                        )
                                    }

                                }
                            )}
                            </tbody>
                        </Table>
                        :
                        null
                    }
                    {this.state.selectedVenueId !== "" && !this.state.hills.length > 0 ?
                        <Form.Text muted>no hills yet in this venue</Form.Text> : null
                    }

                    {/*Add Hill Button*/}
                    {this.state.selectedVenueId !== "" ? <StyledDiv2Right1000>
                        <Button onClick={() => this.setState({
                            selectedHillId: "",
                            selectedHillName: "",
                            showHillForm: !this.state.showHillForm,
                            formHeaderText: "Adding new hill"
                        })} variant={"success"}>New Hill</Button>
                    </StyledDiv2Right1000> : null}


                    {/*New Version Form*/}
                    {this.state.showHillForm && this.state.selectedVenueId !== "" ?
                        <React.Fragment>
                            <StyledDiv2Right1000>
                                <Button size={"sm"} onClick={() => this.setState({
                                    showHillForm: false
                                })} variant={"secondary"}>Hide</Button>
                            </StyledDiv2Right1000>
                            <HillForm
                                mainHeader={this.state.formHeaderText}
                                showNameField={this.state.selectedHillId === ""}
                                selectedVenueId={this.state.selectedVenueId}
                                initialName={this.state.selectedHillName}
                                sizesOfHill={this.state.sizesOfHill}
                                onSubmit={this.addNewHill}
                            /> </React.Fragment> : null}

                </StyledDivCentered1000>


            </React.Fragment>
        )
    }
}

export default Hills;