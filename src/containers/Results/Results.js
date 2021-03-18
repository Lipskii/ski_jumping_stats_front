import React, {Component} from 'react'
import axios from "axios";
import AddingModal from "../../components/Modals/AddingModal";
import CompletedModal from "../../components/Modals/CompletedModal";
import DeleteModal from "../../components/Modals/DeleteModal";
import {Header3, Header5, StyledDivCentered1200} from "../../components/StyledComponents";
import ResultsForm from "./ResultsForm";
import Loader from "react-loader-spinner";

class Results extends Component {

    state = {
        assistantsRD: [],
        assistantsTD: [],
        chiefsOfCompetition: [],
        competitions: [],
        countries: [],
        equipmentControllers: [],
        hills: [],
        judges: [],
        raceDirectors: [],
        selectedFile: '',
        venues: [],
        technicalDelegates: [],
    }

    componentDidMount() {
        axios.all([
            axios.get('/api/cities'),
            axios.get('/api/countries/venues/hills'),
            axios.get('/api/hills'),
            axios.get('/api/jury/ard'),
            axios.get('/api/jury/atd'),
            axios.get('/api/jury/coc'),
            axios.get('/api/jury/ec'),
            axios.get('/api/jury/judges'),
            axios.get('/api/jury/rd'),
            axios.get('/api/jury/td'),
            // axios.get('/api/results'),
            axios.get('/api/venues/hills')

        ])
            .then(axios.spread((citiesData,
                                countriesData,
                                hillsData,
                                aRDsData,
                                aTDsData,
                                chiefsOfCompetitionData,
                                controllersData,
                                judgesData,
                                raceDirectorsData,
                                technicalDelegatesData,
                                venuesData
            ) => {
                this.setState({
                    assistantsRD: aRDsData.data,
                    assistantsTD: aTDsData.data,
                    chiefsOfCompetition: chiefsOfCompetitionData.data,
                    cities: citiesData.data,
                    countries: countriesData.data,
                    equipmentControllers: controllersData.data,
                    hills: hillsData.data,
                    judges: judgesData.data,
                    raceDirectors: raceDirectorsData.data,
                    technicalDelegates: technicalDelegatesData.data,
                    venues: venuesData.data
                })
            }))
            .catch(error => console.log(error))
    }

    render() {
        console.log(this.state)

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
                    handleDelete={this.deleteAthlete}
                />

                <Header3>Results</Header3>

                <StyledDivCentered1200>
                    <Header5>Recent results</Header5>

                    {this.state.venues.length > 0 ?
                        <ResultsForm
                            countries={this.state.countries}
                            venues={this.state.venues}
                        />
                        : <Loader
                            type="ThreeDots"
                            color="#00BFFF"
                            height={80}
                            width={80}
                            style={{textAlign: 'center'}}
                        />}


                </StyledDivCentered1200>


            </React.Fragment>
        )
    }

}


export default Results