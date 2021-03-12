import React, {Component} from "react";
import axios from "axios";
import {Button, Pagination, Table} from "react-bootstrap";
import CompletedModal from "../../components/Modals/CompletedModal";
import DeleteModal from "../../components/Modals/DeleteModal";
import AddingModal from "../../components/Modals/AddingModal";
import {Header3, StyledDiv2Right1200, StyledDivCentered1200, TableButton} from "../../components/StyledComponents";
import SelectInputForm from "../../components/CommonForms/SelectInputForm";
import Loader from "react-loader-spinner";
import SkiClubForm from "./SkiClubForm";
import EditNameModal from "../../components/Modals/EditNameModal";


class SkiClubs extends Component {

    state = {
        activePage: 1,
        citiesForForm: [],
        citiesWithClubs: [],
        clubs: [],
        clubsLoading: false,
        clubToEdit: '',
        clubToDelete: '',
        completedModalStatus: false,
        completedModalText: '',
        countries: [],
        countriesWithClubs: [],
        currentCountry: '',
        editClub: false,
        newClub: false,
        showAddingModal: false,
        showCompletedModal: false,
        showDeleteModal: false,
    }

    componentDidMount() {
        axios.all([
            axios.get('/api/countries'),
            axios.get('/api/countries/skiClubs'),
            axios.get('/api/skiClubs'),
            axios.get('/api/cities'),
            axios.get('/api/cities/skiClubs')

        ])
            .then(axios.spread((countriesData, countriesWithClubsData, clubsData, citiesData, citiesWithClubsData) => {
                this.setState({
                    countries: countriesData.data,
                    countriesWithClubs: countriesWithClubsData.data,
                    clubs: clubsData.data,
                    citiesForForm: citiesData.data,
                    cities: citiesData.data,
                    citiesWithClubs: citiesWithClubsData.data
                })
            }))
            .catch(error => console.log(error))
    }

    deleteClub = () => {
        window.alert("Delete club called " + this.state.clubToDelete.id)
        this.setState({
            showDeleteModal: false
        })
    }

    editClub = (values) => {
        let successful = false
        this.setState({
            showAddingModal: true
        }, () => {
            axios.put('/api/skiClubs/' + this.state.clubToEdit.id, {
                name: values.name,
                city: this.state.clubToEdit.city
            })
                .then(res => {
                    successful = true
                    this.updateToCountry()
                })
                .catch(error => console.log(error))
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
                        showAddingModal: false,
                        editClub: !successful
                    })
                })
        })
    }

    filterFormCities = (e) => {
        let urlStringCities

        if (e === undefined || e.target.value === "") {
            urlStringCities = '/api/cities'

        } else {
            urlStringCities = '/api/cities/country/' + e.target.value
        }

        axios.get(urlStringCities)
            .then(res => {
                this.setState({
                    citiesForForm: res.data,
                })
            })
            .catch(error => console.log(error))
    }

    postClub = (values) => {
        let successful = false
        axios.post('/api/skiClubs', {
            name: values.name,
            city: this.state.citiesForForm.find(city => city.id === parseInt(values.cityId))
        }).then(res => {
            successful = true
            console.log(res)
            this.updateToCountry()
        })
            .catch(error => console.log(error))
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
                })
            })
    }
    updateToCity = (e) => {
        let urlStringClubs


        if (e === undefined || e.target.value === "") {
            urlStringClubs = '/api/skiClubs/country/' + this.state.currentCountry
        } else {
            urlStringClubs = '/api/skiClubs/city/' + e.target.value
        }

        console.log(urlStringClubs)
        this.setState({
            clubsLoading: true
        }, () => {

            axios.get(urlStringClubs)
                .then(res => {
                    this.setState({
                        clubs: res.data,
                        clubsLoading: false
                    })
                })
                .catch(error => console.log(error))
        })
    }

    updateToCountry = (e) => {
        let eTargetValue
        let urlStringCities
        let urlStringClubs

        if (e === undefined || e.target.value === "") {
            eTargetValue = this.state.currentCountry
            urlStringCities = '/api/cities'
            urlStringClubs = '/api/skiClubs'
        } else {
            eTargetValue = e.target.value
            urlStringCities = '/api/cities/country/' + e.target.value
            urlStringClubs = '/api/skiClubs/country/' + e.target.value
        }

        this.setState({
            currentCountry: eTargetValue,
            clubsLoading: true
        }, () => {
            axios.all([
                axios.get(urlStringClubs),
                axios.get(urlStringCities)
            ])
                .then(axios.spread((skiClubsData, citiesData) => {
                    this.setState({
                        clubs: skiClubsData.data,
                        citiesWithClubs: citiesData.data,
                        clubsLoading: false
                    })
                }))
                .catch(error => console.log(error))
        })
    }

    render() {
        console.log(this.state)

        let items = [];
        let numberOfPages = this.state.clubs.length / 8
        if (this.state.clubs.length % 8 !== 0) {
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
                        clubToDelete: ''
                    })}
                    title={this.state.clubToDelete.name}
                    handleDelete={this.deleteClub}
                />

                <EditNameModal
                    name={this.state.clubToEdit.name}
                    show={this.state.editClub}
                    onHide={() => this.setState({
                        editClub: false
                    })}
                    onSubmit={this.editClub}
                />


                <Header3>Clubs</Header3>

                <StyledDivCentered1200>

                    {/*Select Country*/}
                    <strong>Filter</strong>
                    <SelectInputForm
                        title={"Country"}
                        defaultValue={""}
                        onChange={e => {
                            this.setState({
                                activePage: 1,
                                clubsLoading: true
                            }, () => this.updateToCountry(e))
                        }}
                    >
                        <option value={""}>All countries</option>
                        {this.state.countriesWithClubs.map(country =>
                            <option key={country.id} value={country.id}>
                                {country.name}
                            </option>)}
                    </SelectInputForm>

                    {/*City*/}
                    <SelectInputForm
                        key={this.state.citiesWithClubs}
                        title={"City:"}
                        disabled={this.state.citiesWithClubs.length < 1}
                        defaultValue={""}
                        onChange={e => {
                            this.setState({
                                activePage: 1,
                                //clubsLoading: true
                            }, () => this.updateToCity(e))
                        }}
                    >
                        <option value={""}>All cities</option>
                        {this.state.citiesWithClubs.map(city => (
                            <option key={city.id} value={city.id} name={city.name}>{city.name}</option>
                        ))}
                    </SelectInputForm>

                    {/*Clubs*/}
                    {this.state.clubsLoading ?
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
                                    <th>Club</th>
                                    <th>City</th>
                                    <th>Actions</th>
                                </tr>
                                </thead>
                                <tbody>
                                {this.state.clubs.map(club => {
                                    if (((this.state.activePage - 1) * 8 <= this.state.clubs.indexOf(club)) && (this.state.clubs.indexOf(club) < this.state.activePage * 8)) {
                                        return (
                                            <tr key={club.id} id={club.id}>
                                                <td>{club.name}</td>
                                                <td>{club.city.name}</td>
                                                <td style={{width: "250px"}}>
                                                    <TableButton id={club.id} name={club.name} size="sm"
                                                                 variant={"info"}
                                                                 onClick={() =>
                                                                     this.setState({
                                                                         clubToEdit: club,
                                                                         editClub: true,
                                                                         newClub: false
                                                                     })}>
                                                        Edit name
                                                    </TableButton>
                                                    <TableButton id={club.id} name={club.name} size="sm"
                                                                 variant={"danger"}
                                                                 onClick={() => this.setState({
                                                                     showDeleteModal: true,
                                                                     clubToDelete: club
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

                    <StyledDiv2Right1200>
                        <Button onClick={() => this.setState({
                            newClub: !this.state.newClub,
                            editClub: false,
                        })} variant={"success"}>New Club</Button>
                    </StyledDiv2Right1200>

                </StyledDivCentered1200>

                {this.state.newClub ?
                    <SkiClubForm
                        initialName={''}
                        initialClubId={''}
                        initialCapacity={''}
                        initialCityId={''}
                        initialYearOfOpening={''}
                        mainHeader={"Adding new club"}
                        cities={this.state.citiesForForm}
                        countries={this.state.countries}
                        currentCountry={this.state.currentCountry}
                        filterByCountry={this.filterFormCities}
                        updateCities={this.updateToCountry}
                        isEdit={false}
                        onSubmit={() => {
                            this.setState({
                                showAddingModal: true
                            }, () => this.postClub)
                        }}
                    />
                    : null}
            </React.Fragment>

        )
    }

}

export default SkiClubs