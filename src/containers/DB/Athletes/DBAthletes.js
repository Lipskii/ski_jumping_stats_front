import React, {Component} from 'react'
import axios from "axios";
import {Button, Pagination, Table} from "react-bootstrap";
import AddingModal from "../../../components/Modals/AddingModal";
import CompletedModal from "../../../components/Modals/CompletedModal";
import DeleteModal from "../../../components/Modals/DeleteModal";
import {Header3, StyledDiv2Right1200, StyledDivCentered1200, TableButton} from "../../../components/StyledComponents";
import SelectInputForm from "../../../components/CommonForms/SelectInputForm";
import Loader from "react-loader-spinner";
import AthletesForm from "./AthletesForm";
import moment from "moment";



class DBAthletes extends Component {

    state = {
        activePage: 1,
        athletes: [],
        athletesLoading: true,
        athleteToEdit: '',
        athleteToDelete: '',
        clubs: [],
        clubsForForm: [],
        citiesForForm: [],
        cities: [],
        citiesWithAthletes: [],
        completedModalStatus: false,
        completedModalText: "",
        countries: [],
        countriesWithAthletes: [],
        currentCountry: '',
        editAthlete: false,
        filterClubId: '',
        filterCityId: '',
        filterCountryId: '',
        filterGenderId: '',
        filterIsActive: '',
        filterSkisId: '',
        filterSkiClubId: '',
        genders: [],
        newAthlete: false,
        showAddingModal: false,
        showDeleteModal: false,
        showCompletedModal: false,
        skis: [],
    }

    componentDidMount() {
        axios.all([
            axios.get('/api/cities'),
            axios.get('/api/cities?hasPeople=true'),
            axios.get('/api/countries'),
            axios.get('/api/countries?hasPeople=true'),
            axios.get('/api/genders'),
            axios.get('/api/skiClubs'),
            axios.get('/api/skiJumpers'),
            axios.get('api/skis'),

        ])
            .then(axios.spread((citiesData, citiesWithAthletesData, countriesData,
                                countriesWithAthletesData, gendersData, clubsData, athletesData,
                                skisData) => {
                this.setState({
                    athletes: athletesData.data,
                    athletesLoading: false,
                    cities: citiesData.data,
                    citiesForForm: citiesData.data,
                    citiesWithAthletes: citiesWithAthletesData.data,
                    countries: countriesData.data,
                    countriesWithAthletes: countriesWithAthletesData.data,
                    clubs: clubsData.data,
                    clubsForForm: clubsData.data,
                    genders: gendersData.data,
                    skis: skisData.data,
                })
            }))
            .catch(error => console.log(error))
    }

    editAthlete = (values) => {
        console.log(values)
        let successful = true
        const person = {
            firstName: values.firstName,
            lastName: values.lastName,
            gender: this.state.genders.find(gender => gender.id === parseInt(values.genderId)),
            birthdate: values.birthdate,
            country: this.state.countries.find(country => country.id === parseInt(values.countryId)),
            city: this.state.cities.find(city => city.id === parseInt(values.cityId))
        }
        axios.put('api/people/' + this.state.athleteToEdit.person.id, {...person})
            .then(res => {
                console.log(res)
                axios.put('api/skiJumpers/' + this.state.athleteToEdit.id, {
                    person: person,
                    isActive: values.active,
                    fisCode: values.fisCode,
                    skis: this.state.skis.find(skis => skis.id === parseInt(values.skisId)),
                    skiClub: this.state.clubsForForm.find(club => club.id === parseInt(values.clubId))
                })
                    .then(() => this.filter())
                    .catch(error => {
                        console.log(error)
                        successful = false
                    })
            })
            .catch(error => {
                successful = false
                console.log(error)
            })
            .finally(() => {
                let modalText
                if (successful) {
                    modalText = values.firstName + " " + values.lastName + " updated."
                } else {
                    modalText = "Ups, there was a problem. Try again."
                }
                this.setState({
                    showCompletedModal: true,
                    completedModalText: modalText,
                    completedModalStatus: successful,
                    showAddingModal: false,
                    editAthlete: false,
                })
            })
    }

    deleteAthlete = () => {
        axios.delete("/api/skiJumpers/" + this.state.athleteToDelete.id)
            .then(res => console.log(res))
            .catch(error => console.log(error))
            .finally(() => {
                this.setState({
                    showDeleteModal: false,
                }, () => this.filter())
            })
    }

    postAthlete = (values) => {
        console.log(values)
        let successful = true
        let modalText = values.firstName + " " + values.lastName + " added."
        axios.post('/api/people', {
            firstName: values.firstName,
            lastName: values.lastName,
            gender: this.state.genders.find(gender => gender.id === parseInt(values.genderId)),
            birthdate: values.birthdate,
            country: this.state.countries.find(country => country.id === parseInt(values.countryId)),
            city: this.state.cities.find(city => city.id === parseInt(values.cityId))
        })
            .then(res => {
                console.log(res)
                axios.post('api/skiJumpers', {
                    person: res.data,
                    isActive: values.active,
                    fisCode: values.fisCode,
                    skis: this.state.skis.find(skis => skis.id === parseInt(values.skisId)),
                    skiClub: this.state.clubsForForm.find(club => club.id === parseInt(values.clubId))
                })
                    .then(res => {
                        const formData = new FormData();
                        formData.append('file', values.file)
                        axios.post('/api/people/photo/' + res.data.person.id, formData,)
                            .then(() => {
                                this.filter()
                            })
                            .catch(error => {
                                console.log(error)
                                successful = false
                                modalText = "Athlete added, but there was a problem with photo."
                            })
                    })
                    .catch(error => {
                        console.log(error)
                        successful = false
                        modalText = "Ups, there was a problem. Try again."
                    })
            })
            .finally(() => {
                this.setState({
                    showCompletedModal: true,
                    completedModalText: modalText,
                    completedModalStatus: successful,
                    showAddingModal: false,
                }, () => this.filter())
            })
    }

    filter = () => {
        axios.all([
            axios.get('/api/skiJumpers?skisId=' + this.state.filterSkisId
                + '&skiClubId=' + this.state.filterSkiClubId
                + '&countryId=' + this.state.filterCountryId
                + '&cityId=' + this.state.filterCityId
                + '&skiClubId=' + this.state.filterClubId
                + '&genderId=' + this.state.filterGenderId
                + '&isActive=' + this.state.filterIsActive),
            axios.get('/api/cities?&countryId=' + this.state.filterCountryId
                + '&hasPeople=true'
                 ),
            axios.get('/api/skiClubs?&countryId=' + this.state.filterCountryId
               ),
        ])
            .then(axios.spread((athletesData, citiesData, skiClubsData) => {
                this.setState({
                    athletes: athletesData.data,
                    citiesWithAthletes: citiesData.data,
                    clubs: skiClubsData.data,
                    athletesLoading: false
                })
            }))
            .catch(error => console.log(error))
    }

    render() {
        console.log(this.state)

        let items = [];
        let numberOfPages = this.state.athletes.length / 15
        if (this.state.athletes.length % 15 !== 0) {
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
                    }, () => this.filter())}
                    status={this.state.completedModalStatus}
                />
                {this.state.showDeleteModal ?
                    <DeleteModal
                        show={this.state.showDeleteModal}
                        onHide={() => this.setState({
                            showDeleteModal: false,
                            athleteToDelete: ''
                        })}
                        title={this.state.athleteToDelete.person.firstName + " " + this.state.athleteToDelete.person.lastName}
                        handleDelete={this.deleteAthlete}
                    /> : null}


                <Header3>Athletes</Header3>

                <StyledDivCentered1200>

                    {/*Select Country*/}
                    <strong>Filter</strong>
                    <SelectInputForm
                        title={"Country"}
                        defaultValue={""}
                        onChange={e => {
                            this.setState({
                                activePage: 1,
                                athletesLoading: true,
                                filterCityId: '',
                                filterClubId: '',
                                filterCountryId: e.target.value
                            }, () => this.filter())
                        }}
                    >
                        <option value={""}>All countries</option>
                        {this.state.countriesWithAthletes.map(country =>
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

                    {/*City*/}
                    <SelectInputForm
                        key={this.state.citiesWithAthletes}
                        title={"City:"}
                        disabled={this.state.citiesWithAthletes.length < 1}
                        defaultValue={""}
                        onChange={e => {
                            this.setState({
                                activePage: 1,
                                filterCityId: e.target.value
                            }, () => this.filter())
                        }}
                    >
                        <option value={""}>All cities</option>
                        {this.state.citiesWithAthletes.map(city => (
                            <option key={city.id} value={city.id} name={city.name}>{city.name}</option>
                        ))}
                    </SelectInputForm>

                    {/*Clubs*/}
                    <SelectInputForm
                        title={"Club:"}
                        disabled={this.state.clubs.length < 1}
                        defaultValue={""}
                        onChange={e => {
                            this.setState({
                                activePage: 1,
                                filterClubId: e.target.value
                            }, () => this.filter())
                        }}
                    >
                        <option value={""}>All clubs</option>
                        {this.state.clubs.map(club => (
                            <option key={club.id} value={club.id} name={club.name}>{club.name}</option>
                        ))}
                    </SelectInputForm>

                    {/*skis*/}
                    <SelectInputForm
                        title={"Skis:"}
                        disabled={this.state.skis.length < 1}
                        defaultValue={""}
                        onChange={e => {
                            this.setState({
                                activePage: 1,
                                filterSkisId: e.target.value
                            }, () => this.filter())
                        }}
                    >
                        <option value={""}>All skis brands</option>
                        {this.state.skis.map(skis => (
                            <option key={skis.id} value={skis.id} name={skis.brand}>{skis.brand}</option>
                        ))}
                    </SelectInputForm>

                    {/*athletes*/}
                    {this.state.athletesLoading ?
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
                                    <th>Athlete</th>
                                    <th>Code</th>
                                    <th>Gender</th>
                                    <th>Birthdate</th>
                                    <th>City</th>
                                    <th>Country</th>
                                    <th>Club</th>
                                    <th>Skis</th>
                                    <th>Active</th>
                                    <th>Actions</th>
                                </tr>
                                </thead>
                                <tbody>
                                {this.state.athletes.map(athlete => {
                                    if (((this.state.activePage - 1) * 15 <= this.state.athletes.indexOf(athlete)) && (this.state.athletes.indexOf(athlete) < this.state.activePage * 15)) {
                                        return (
                                            <tr key={athlete.id} id={athlete.id}>
                                                <td>{athlete.person.firstName} {athlete.person.lastName}</td>
                                                <td>{athlete.fisCode}</td>
                                                <td style={{textAlign: "center"}}>{athlete.person.gender.gender.charAt(0)}</td>
                                                <td>{athlete.person.birthdate}</td>
                                                <td>{athlete.person.city !== null ?
                                                    <div>{athlete.person.city.name}</div> : <div>no info</div>}</td>
                                                <td>{athlete.person.country.code}</td>
                                                <td>{athlete.skiClub !== null ? <div>{athlete.skiClub.name}</div> :
                                                    <div>no info</div>}</td>
                                                <td>{athlete.skis !== null ? <div>{athlete.skis.brand}</div> :
                                                    <div>no info</div>}</td>
                                                <td>{athlete.active ? "Yes" : "No"}</td>
                                                <td>
                                                    <TableButton id={athlete.id} name={athlete.name} size="sm"
                                                                 variant={"info"}
                                                                 onClick={() => {
                                                                     let o = {...athlete}
                                                                     Object.keys(o)
                                                                         .forEach(key => {
                                                                             if (o[key] === null) {
                                                                                 o[key] = ''
                                                                             }
                                                                         })
                                                                     console.log(o)
                                                                     this.setState({
                                                                         athleteToEdit: o,
                                                                         editAthlete: true,
                                                                     })
                                                                 }}>
                                                        Edit
                                                    </TableButton>
                                                    <TableButton id={athlete.id} name={athlete.name} size="sm"
                                                                 variant={"danger"}
                                                                 onClick={() => this.setState({
                                                                     showDeleteModal: true,
                                                                     athleteToDelete: athlete
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
                        newAthlete: true,
                    })} variant={"success"}>New Athlete</Button>
                </StyledDiv2Right1200>

                {this.state.newAthlete ?
                    <AthletesForm
                        show={this.state.newAthlete}
                        onHide={() => this.setState({
                            newAthlete: false
                        })}
                        initialActive={true}
                        initialBirthdate={''}
                        initialClubId={''}
                        initialCountryId={''}
                        initialCityId={''}
                        initialFisCode={''}
                        initialFirstName={''}
                        initialGenderId={''}
                        initialLastName={''}
                        initialSkisId={''}
                        mainHeader={"Adding new athlete"}
                        cities={this.state.citiesForForm}
                        clubs={this.state.clubsForForm}
                        countries={this.state.countries}
                        currentCountry={this.state.currentCountry}
                        genders={this.state.genders}
                        skis={this.state.skis}
                        isEdit={false}
                        onSubmit={(values) => {
                            this.setState({
                                showAddingModal: true
                            }, () => this.postAthlete(values))
                        }}
                    />
                    : null}


                {this.state.editAthlete ? <AthletesForm
                        show={this.state.editAthlete}
                        onHide={() => this.setState({
                            editAthlete: false
                        })}
                        initialActive={this.state.athleteToEdit.isActive}
                        initialBirthdate={moment(this.state.athleteToEdit.person.birthdate)}
                        initialClubId={this.state.athleteToEdit.skiClub.id}
                        initialCountryId={this.state.athleteToEdit.person.country.id}
                        initialCityId={this.state.athleteToEdit.person.city.id}
                        initialGenderId={this.state.athleteToEdit.person.gender.id}
                        initialFisCode={this.state.athleteToEdit.fisCode}
                        initialFirstName={this.state.athleteToEdit.person.firstName}
                        initialLastName={this.state.athleteToEdit.person.lastName}
                        initialSkisId={this.state.athleteToEdit.skis.id}
                        mainHeader={"Editing " + this.state.athleteToEdit.person.firstName + " " + this.state.athleteToEdit.person.lastName}
                        cities={this.state.citiesForForm}
                        clubs={this.state.clubsForForm}
                        countries={this.state.countries}
                        currentCountry={this.state.currentCountry}
                        genders={this.state.genders}
                        skis={this.state.skis}
                        isEdit={true}
                        onSubmit={(values) => {
                            this.setState({
                                showAddingModal: true
                            }, () => this.editAthlete(values))
                        }}
                    />
                    : null}

            </React.Fragment>
        )
    }

}


export default DBAthletes