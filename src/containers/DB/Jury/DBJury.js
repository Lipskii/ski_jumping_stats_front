import React, {Component} from 'react'
import axios from "axios";
import {Button, Pagination, Table} from "react-bootstrap";
import bsCustomFileInput from "bs-custom-file-input";
import AddingModal from "../../../components/Modals/AddingModal";
import CompletedModal from "../../../components/Modals/CompletedModal";
import DeleteModal from "../../../components/Modals/DeleteModal";
import {Header3, StyledDiv2Right1200, StyledDivCentered1200, TableButton} from "../../../components/StyledComponents";
import SelectInputForm from "../../../components/CommonForms/SelectInputForm";
import Loader from "react-loader-spinner";
import JuryForm from "./JuryForm";


class Jury extends Component {

    state = {
        activePage: 1,
        cities: [],
        completedModalStatus: false,
        completedModalText: '',
        countries: [],
        countriesWithJury: [],
        countriesWithPeople: [],
        currentCountry: '',
        filterCountryId: '',
        filterGenderId: '',
        genders: [],
        jury: [],
        juryFullList: [],
        juryLoading: true,
        juryToDelete: '',
        juryTypes: [],
        newJury: false,
        people: [],
        showAddingModal: false,
        showCompletedModal: false,
        showDeleteModal: false,
    }

    componentDidMount() {
        bsCustomFileInput.init()
        axios.all([
            axios.get('/api/cities'),
            axios.get('/api/countries'),
            axios.get('/api/countries/jury'),
            axios.get('/api/countries?hasPeople=true'),
            axios.get('/api/jury'),
            axios.get('/api/juryTypes'),
            axios.get('/api/people'),
            axios.get('/api/genders')

        ])
            .then(axios.spread((citiesData,
                                countriesData,
                                countriesWithJuryData,
                                countriesWithPeopleData,
                                juryData,
                                juryTypeData,
                                peopleData,
                                gendersData
            ) => {
                this.setState({
                    cities: citiesData.data,
                    countries: countriesData.data,
                    countriesWithJury: countriesWithJuryData.data,
                    countriesWithPeople: countriesWithPeopleData.data,
                    jury: juryData.data,
                    juryFullList: juryData.data,
                    juryTypes: juryTypeData.data,
                    people: peopleData.data,
                    juryLoading: false,
                    genders: gendersData.data
                })
            }))
            .catch(error => console.log(error))
    }

    deleteJury = () => {
        axios.delete("/api/jury/" + this.state.juryToDelete.id)
            .then(res => console.log(res))
            .catch(error => console.log(error))
            .finally(() => {
                this.setState({
                    showDeleteModal: false,
                }, () => this.filter())
            })
    }

    filterFormPeople = (e) => {
        axios.get('/api/people?countryId=' + e.target.value)
            .then(res => {
                this.setState({
                    people: res.data
                })
            })
            .catch(error => console.log(error))
    }

    postJury = (values) => {
        let successful = true
        axios.post('/api/jury', {
            juryType: this.state.juryTypes.find(juryType => juryType.id === parseInt(values.juryTypeId)),
            person: this.state.people.find(person => person.id === parseInt(values.personId))
        })
            .then(() => this.filter())
            .catch(error => {
                console.log(error)
                successful = false
            }).finally(() => {
            let modalText
            if (successful) {
                modalText = "Jury added."
            } else {
                modalText = "Ups, there was a problem. Try again."
            }
            this.setState({
                showCompletedModal: true,
                completedModalText: modalText,
                completedModalStatus: successful,
                showAddingModal: false,
            }, () => axios.get('/api/countries/jury')
                .then(res => this.setState({
                        countriesWithJury: res.data
                    })
                )
                .catch(error => console.log(error)))
        })
    }

    filter = () => {
        axios.get('/api/jury?countryId=' + this.state.filterCountryId
        + '&genderId=' + this.state.filterGenderId)
            .then(res => {
                this.setState({
                    jury: res.data,
                    juryFullList: res.data,
                    juryLoading: false
                })
            }).catch(error => console.log(error))
    }

    filterToRole = (e) => {
        if (e.target.value !== "") {
            let juryList = this.state.jury.filter(jury => jury.juryType.id === parseInt(e.target.value))
            this.setState({
                jury: juryList
            })
        } else {
            this.setState({
                jury: this.state.juryFullList
            })
        }
    }


    render() {
        console.log(this.state)

        let items = [];
        let numberOfPages = this.state.jury.length / 8
        if (this.state.jury.length % 8 !== 0) {
            numberOfPages++
        }

        for (let number = 1; number <= numberOfPages; number++) {
            items.push(
                <Pagination.Item key={number} id={number} active={number === this.state.activePage} onClick={e => {
                    this.setState({
                        activePage: parseInt(e.target.id)
                    })
                }}>
                    {number}
                </Pagination.Item>
            );
        }

        return (
            <React.Fragment>
                <AddingModal show={this.state.showAddingModal}/>
                <CompletedModal
                    show={this.state.showCompletedModal}
                    text={this.state.completedModalText}
                    onHide={() => this.setState({
                        showCompletedModal: false,
                        completedModalText: ""
                    })}
                    status={this.state.completedModalStatus}
                />

                <DeleteModal
                    show={this.state.showDeleteModal}
                    onHide={() => this.setState({
                        showDeleteModal: false,
                        juryToDelete: ''
                    })}
                    title={"the jury"}
                    handleDelete={this.deleteJury}
                />

                <Header3>Jury</Header3>

                <StyledDivCentered1200>

                    {/*Select Country*/}
                    <strong>Filter</strong>
                    <SelectInputForm
                        title={"Country:"}
                        defaultValue={""}
                        onChange={e => {
                            this.setState({
                                activePage: 1,
                                filterCountryId: e.target.value,
                                juryLoading: true
                            }, () => this.filter())
                        }}
                    >
                        <option value={""}>All countries</option>
                        {this.state.countriesWithJury.map(country =>
                            <option key={country.id} value={country.id}>
                                {country.name}
                            </option>)}
                    </SelectInputForm>

                    {/*gender*/}
                    <SelectInputForm
                        title={"Gender:"}
                        disabled={this.state.genders.length < 1}
                        defaultValue={""}
                        onChange={e => {
                            this.setState({
                                activePage: 1,
                                filterGenderId: e.target.value
                            }, () => this.filter())
                        }}
                    >
                        <option value={""}>All genders</option>
                        {this.state.genders.map(gender => (
                            <option key={gender.id} value={gender.id}>{gender.gender}</option>
                        ))}
                    </SelectInputForm>

                    <SelectInputForm
                        key={this.state.jury}
                        title={"Role:"}
                        defaultValue={""}
                        onChange={e => this.filterToRole(e)
                        }
                    >
                        <option value={""}>All roles</option>
                        {this.state.juryTypes.map(juryType =>
                            <option key={juryType.id} value={juryType.id}>
                                {juryType.juryType}
                            </option>)}
                    </SelectInputForm>

                    {/*jury*/}
                    {this.state.juryLoading ?
                        <Loader
                            type="ThreeDots"
                            color="#00BFFF"
                            height={80}
                            width={80}
                            style={{textAlign: 'center'}}
                        />
                        :
                        <div>
                            <Table bordered hover striped size={"sm"}>
                                <thead>
                                <tr>
                                    <th>Name</th>
                                    <th>Gender</th>
                                    <th>Country</th>
                                    <th>Role</th>
                                    <th>Actions</th>
                                </tr>
                                </thead>
                                <tbody>
                                {this.state.jury.map(jury => {
                                    if (((this.state.activePage - 1) * 8 <= this.state.jury.indexOf(jury)) && (this.state.jury.indexOf(jury) < this.state.activePage * 8)) {
                                        return (
                                            <tr key={jury.id} id={jury.id}>
                                                <td>{jury.person.firstName} {jury.person.lastName}</td>
                                                <td style={{
                                                    textAlign: "center",
                                                    width: "10px"
                                                }}>{jury.person.gender.gender.charAt(0)}</td>
                                                <td style={{
                                                    textAlign: "center",
                                                    width: "30px"
                                                }}>{jury.person.country.code}</td>
                                                <td>{jury.juryType.juryType}</td>
                                                <td>
                                                    <TableButton id={jury.id} name={jury.name} size="sm"
                                                                 variant={"danger"}
                                                                 onClick={() => this.setState({
                                                                     showDeleteModal: true,
                                                                     juryToDelete: jury
                                                                 })
                                                                 }>
                                                        Delete
                                                    </TableButton>
                                                </td>
                                            </tr>
                                        )
                                    }
                                })}
                                </tbody>
                            </Table>
                            <Pagination>{items}</Pagination>
                        </div>
                    }
                </StyledDivCentered1200>

                <StyledDiv2Right1200>
                    <Button onClick={() => this.setState({
                        newJury: !this.state.newJury
                    })} variant={"success"}>New Jury</Button>
                </StyledDiv2Right1200>

                {this.state.newJury ?
                    <JuryForm
                        showModal={this.state.newJury}
                        onHide={() => this.setState({
                            newJury: false
                        })}
                        allCountries={this.state.countries}
                        cities={this.state.cities}
                        countries={this.state.countriesWithPeople}
                        filterByCountry={this.filterFormPeople}
                        juryTypes={this.state.juryTypes}
                        onHidePersonModal={this.filter}
                        people={this.state.people}
                        updateCities={this.updateToCountry}
                        onSubmit={(values) => {
                            this.setState({
                                showAddingModal: true
                            }, () => this.postJury(values))
                        }}
                    >
                    </JuryForm>
                    : null}

            </React.Fragment>
        )
    }

}


export default Jury