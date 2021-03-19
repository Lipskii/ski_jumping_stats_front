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
        seasons: [],
        selectedFile: '',
        series: [],
        venues: [],
        technicalDelegates: [],
        weather: []
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
            axios.get('/api/seasons'),
            axios.get('/api/series'),
            axios.get('/api/venues/hills'),
            axios.get('/api/weather')

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
                                seasonsData,
                                seriesData,
                                venuesData,
                                weatherData
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
                    seasons: seasonsData.data,
                    series: seriesData.data,
                    technicalDelegates: technicalDelegatesData.data,
                    venues: venuesData.data,
                    weather: weatherData.data
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
                            aRDs={this.state.assistantsRD}
                            aTDs={this.state.assistantsTD}
                            chiefsOfCompetition={this.state.chiefsOfCompetition}
                            countries={this.state.countries}
                            equipmentControllers={this.state.equipmentControllers}
                            judges={this.state.judges}
                            raceDirectors={this.state.raceDirectors}
                            seasons={this.state.seasons}
                            series={this.state.series}
                            technicalDelegates={this.state.technicalDelegates}
                            venues={this.state.venues}
                            weather={this.state.weather}
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