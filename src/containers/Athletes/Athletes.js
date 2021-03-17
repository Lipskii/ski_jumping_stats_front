import React, {Component} from 'react'
import axios from "axios";
import {Button, Pagination, Table} from "react-bootstrap";
import AddingModal from "../../components/Modals/AddingModal";
import CompletedModal from "../../components/Modals/CompletedModal";
import DeleteModal from "../../components/Modals/DeleteModal";
import {Header3, StyledDiv2Right1200, StyledDivCentered1200, TableButton} from "../../components/StyledComponents";
import SelectInputForm from "../../components/CommonForms/SelectInputForm";
import Loader from "react-loader-spinner";
import AthletesForm from "./AthletesForm";
import bsCustomFileInput from "bs-custom-file-input";


class Athletes extends Component {

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
        genders: [],
        newAthlete: false,
        showAddingModal: false,
        showDeleteModal: false,
        showCompletedModal: false,
        skis: [],
        photo: ''
    }


    componentDidMount() {
        axios.all([
            axios.get('/api/cities'),
            axios.get('/api/cities/skiJumpers'),
            axios.get('/api/countries'),
            axios.get('/api/countries/skiJumpers'),
            axios.get('/api/genders'),
            axios.get('/api/skiClubs'),
            axios.get('/api/skiJumpers'),
            axios.get('api/skis'),
            axios.get('/api/people/photo')

        ])
            .then(axios.spread((citiesData, citiesWithAthletesData, countriesData,
                                countriesWithAthletesData, gendersData, clubsData, athletesData,
                                skisData,photo) => {
                console.log(photo)
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
                    photo: photo.data
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
                    .then(() => this.updateToCountry())
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
                })
            })
    }

    deleteAthlete = () => {
        window.alert("Delete athlete called " + this.state.athleteToDelete.id)
        this.setState({
            showDeleteModal: false
        })
    }

    filterFormCities = (e) => {

        let urlStringCities
        let urlStringClubs

        if (e === undefined || e.target.value === "") {
            urlStringCities = '/api/cities'
            urlStringClubs = '/api/skiClubs'
        } else {
            urlStringCities = '/api/cities/country/' + e.target.value
            urlStringClubs = '/api/skiClubs/country/' + e.target.value
        }


        axios.all([
            axios.get(urlStringCities),
            axios.get(urlStringClubs)
        ])
            .then(axios.spread((citiesData, skiClubsData) => {
                this.setState({
                    clubsForForm: skiClubsData.data,
                    citiesForForm: citiesData.data,
                })
            }))
            .catch(error => console.log(error))
    }

    postAthlete = (values) => {
        console.log(values)
        let successful = true
        let modalText = values.firstName + " " + values.lastName + " added."
        axios.post('api/skiJumpers', {
            person: {
                firstName: values.firstName,
                lastName: values.lastName,
                gender: this.state.genders.find(gender => gender.id === parseInt(values.genderId)),
                birthdate: values.birthdate,
                country: this.state.countries.find(country => country.id === parseInt(values.countryId)),
                city: this.state.cities.find(city => city.id === parseInt(values.cityId))
            },
            isActive: values.active,
            fisCode: values.fisCode,
            skis: this.state.skis.find(skis => skis.id === parseInt(values.skisId)),
            skiClub: this.state.clubsForForm.find(club => club.id === parseInt(values.clubId))
        })
            .then(res => {
                const formData = new FormData();
                formData.append('file', values.file)
                axios.post('/api/people/photo/' + res.data.person.id, formData)
                    .then((res) => {
                        this.updateToCountry()
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
            .finally(() => {
                this.setState({
                    showCompletedModal: true,
                    completedModalText: modalText,
                    completedModalStatus: successful,
                    showAddingModal: false,
                })
            })
    }

    updateToCity = (e) => {
        let urlStringAthletes


        if (e === undefined || e.target.value === "") {
            urlStringAthletes = '/api/skiJumpers/country/' + this.state.currentCountry
        } else {
            urlStringAthletes = '/api/skiJumpers/city/' + e.target.value
        }

        this.setState({
            athletesLoading: true
        }, () => {
            axios.get(urlStringAthletes)
                .then(res => {
                    this.setState({
                        athletes: res.data,
                        athletesLoading: false
                    })
                })
                .catch(error => console.log(error))
        })
    }

    updateToCountry = (e) => {
        let eTargetValue
        let urlStringCities
        let urlStringClubs
        let urlStringAthletes

        if (e === undefined || e.target.value === "") {
            eTargetValue = this.state.currentCountry
            urlStringCities = '/api/cities'
            urlStringClubs = '/api/skiClubs'
            urlStringAthletes = '/api/skiJumpers'
        } else {
            eTargetValue = e.target.value
            urlStringCities = '/api/cities/country/' + e.target.value
            urlStringClubs = '/api/skiClubs/country/' + e.target.value
            urlStringAthletes = '/api/skiJumpers/country/' + e.target.value
        }

        this.setState({
            currentCountry: eTargetValue,
            athletesLoading: true
        }, () => {
            axios.all([
                axios.get(urlStringClubs),
                axios.get(urlStringCities),
                axios.get(urlStringAthletes)

            ])
                .then(axios.spread((skiClubsData, citiesData, athletesData) => {
                    this.setState({
                        clubs: skiClubsData.data,
                        citiesWithAthletes: citiesData.data,
                        athletesLoading: false,
                        athletes: athletesData.data
                    })
                }))
                .catch(error => console.log(error))
        })
    }


    render() {
        console.log(this.state)

        let items = [];
        let numberOfPages = this.state.athletes.length / 8
        if (this.state.athletes.length % 8 !== 0) {
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
                        athleteToDelete: ''
                    })}
                    title={this.state.athleteToDelete.firstName + " " + this.state.athleteToDelete.lastName}
                    handleDelete={this.deleteAthlete}
                />

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
                                athletesLoading: true
                            }, () => this.updateToCountry(e))
                        }}
                    >
                        <option value={""}>All countries</option>
                        {this.state.countriesWithAthletes.map(country =>
                            <option key={country.id} value={country.id}>
                                {country.name}
                            </option>)}
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
                                //clubsLoading: true
                            }, () => this.updateToCity(e))
                        }}
                    >
                        <option value={""}>All cities</option>
                        {this.state.citiesWithAthletes.map(city => (
                            <option key={city.id} value={city.id} name={city.name}>{city.name}</option>
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
                                    if (((this.state.activePage - 1) * 8 <= this.state.athletes.indexOf(athlete)) && (this.state.athletes.indexOf(athlete) < this.state.activePage * 8)) {
                                        return (
                                            <tr key={athlete.id} id={athlete.id}>
                                                <td>{athlete.firstName} {athlete.lastName}</td>
                                                <td style={{textAlign: "center"}}>{athlete.gender.gender.charAt(0)}</td>
                                                <td>{athlete.birthdate}</td>
                                                <td>{athlete.city.name}</td>
                                                <td>{athlete.country.code}</td>
                                                <td>{athlete.skiClub.name}</td>
                                                <td>{athlete.skis.brand}</td>
                                                <td>{athlete.active ? "Yes" : "No"}</td>
                                                <td>
                                                    <TableButton id={athlete.id} name={athlete.name} size="sm"
                                                                 variant={"info"}
                                                                 onClick={() =>
                                                                     this.setState({
                                                                         athleteToEdit: athlete,
                                                                         editAthlete: false,
                                                                         newAthlete: false
                                                                     }, () => {
                                                                         this.setState({
                                                                             editAthlete: true
                                                                         })
                                                                     })}>
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
                        newAthlete: !this.state.newAthlete,
                        editAthlete: false,
                    })} variant={"success"}>New Athlete</Button>
                </StyledDiv2Right1200>

                {this.state.newAthlete ?
                    <AthletesForm
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
                        filterByCountry={this.filterFormCities}
                        genders={this.state.genders}
                        skis={this.state.skis}
                        updateCities={this.updateToCountry}
                        isEdit={false}
                        onSubmit={(values) => {
                            this.setState({
                                showAddingModal: true
                            }, () => this.postAthlete(values))
                        }}
                    />
                    : null}


                {this.state.editAthlete ? <AthletesForm
                        initialActive={this.state.athleteToEdit.active}
                        initialBirthdate={this.state.athleteToEdit.birthdate}
                        initialClubId={this.state.athleteToEdit.skiClub.id}
                        initialCountryId={this.state.athleteToEdit.country.id}
                        initialCityId={this.state.athleteToEdit.city.id}
                        initialGenderId={this.state.athleteToEdit.gender.id}
                        initialFisCode={this.state.athleteToEdit.fisCode}
                        initialFirstName={this.state.athleteToEdit.firstName}
                        initialLastName={this.state.athleteToEdit.lastName}
                        initialSkisId={this.state.athleteToEdit.skisId}
                        mainHeader={"Editing " + this.state.athleteToEdit.firstName + " " + this.state.athleteToEdit.lastName}
                        cities={this.state.citiesForForm}
                        clubs={this.state.clubsForForm}
                        countries={this.state.countries}
                        currentCountry={this.state.currentCountry}
                        filterByCountry={this.filterFormCities}
                        genders={this.state.genders}
                        skis={this.state.skis}
                        updateCities={this.updateToCountry}
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


export default Athletes