import React, {Component} from "react";
import axios from "axios";
import {Pagination} from "react-bootstrap";
import CompletedModal from "../../components/Modals/CompletedModal";
import DeleteModal from "../../components/Modals/DeleteModal";
import AddingModal from "../../components/Modals/AddingModal";
import {Header3, StyledDivCentered1000} from "../../components/StyledComponents";
import SelectInputForm from "../../components/CommonForms/SelectInputForm";


class SkiClubs extends Component {

    state = {
        activePage: 1,
        citiesForForm: [],
        citiesWithClubs: [],
        clubs: [],
        clubsLoading: false,
        clubToDelete: '',
        completedModalStatus: false,
        completedModalText: '',
        countriesWithClubs: [],
        currentCountry: '',
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
                .then(axios.spread(( skiClubsData, citiesData) => {
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
        //TODO fix duplicate code later
        console.log(this.state)

        let items = [];
        let numberOfPages = this.state.clubs.length / 7
        if (this.state.clubs.length % 7 !== 0) {
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
                <AddingModal show={this.state.showAddingModal}/>

                <Header3>Clubs</Header3>

                <StyledDivCentered1000>

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


                </StyledDivCentered1000>
            </React.Fragment>

        )
    }

}

export default SkiClubs