import React, {Component} from 'react'
import axios from "axios";
import AddingModal from "../../../components/Modals/AddingModal";
import CompletedModal from "../../../components/Modals/CompletedModal";
import DeleteModal from "../../../components/Modals/DeleteModal";
import {Header3, Header5, StyledDivCentered1200, TableButton} from "../../../components/StyledComponents";
import Loader from "react-loader-spinner";
import {Button, Pagination, Table} from "react-bootstrap";
import CompetitionReadMoreModal from "./CompetitionReadMoreModal";
import SelectInputForm from "../../../components/CommonForms/SelectInputForm";
import ResultsModal from "./ResultsModal";
import AddResultsModal from "./AddResultsModal";
import AddQualificationsModal from "./AddQualificationsModal";
import ResultsFormModal from "./ResultsFormModal";
import TeamResultsModal from "./TeamResultsModal";


class DBResults extends Component {

    state = {
        activePage: 1,
        addResultsCompetition: '',
        assistantsRD: [],
        assistantsTD: [],
        chiefsOfCompetition: [],
        competitions: [],
        competitionsLoading: true,
        competitionToForm: '',
        competitionToDelete: '',
        competitionToResults: '',
        countries: [],
        editing: false,
        equipmentControllers: [],
        hills: [],
        hillVersions: [],
        judges: [],
        raceDirectors: [],
        results: [],
        seasons: [],
        selectedFile: '',
        series: [],
        seriesLoading: true,
        showFormModal: false,
        filterHillId: '',
        filterSeasonId: '',
        filterSeriesMajorId: '',
        filterSeriesMinorId: '',
        filterVenueId: '',
        showAddResultsModal: false,
        showDeleteModal: false,
        showReadMoreModal: false,
        showResultsModal: false,
        showTeamResultsModal: false,
        showQualificationsModal: false,
        qualificationsCompetition: '',
        venues: [],
        technicalDelegates: [],
        weather: []
    }

    componentDidMount() {
        axios.all([
            axios.get('/api/cities'),
            axios.get('/api/competitions'),
            axios.get('/api/countries/venues/hills'),
            axios.get('/api/hills'),
            axios.get('api/hillVersions'),
            axios.get('/api/jury?juryTypeId=5'),
            axios.get('/api/jury?juryTypeId=4'),
            axios.get('/api/jury?juryTypeId=3'),
            axios.get('/api/jury?juryTypeId=6'),
            axios.get('/api/jury?juryTypeId=7'),
            axios.get('/api/jury?juryTypeId=1'),
            axios.get('/api/jury?juryTypeId=2'),
            // axios.get('/api/results'),
            axios.get('/api/seasons'),
            axios.get('/api/series'),
            axios.get('/api/venues?hasHills=true'),
            axios.get('/api/weather')

        ])
            .then(axios.spread((citiesData,
                                competitionsData,
                                countriesData,
                                hillsData,
                                hillVersionsData,
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
                    competitions: competitionsData.data,
                    countries: countriesData.data,
                    equipmentControllers: controllersData.data,
                    hills: hillsData.data,
                    hillVersions: hillVersionsData.data,
                    judges: judgesData.data,
                    raceDirectors: raceDirectorsData.data,
                    seasons: seasonsData.data,
                    series: seriesData.data,
                    technicalDelegates: technicalDelegatesData.data,
                    venues: venuesData.data,
                    weather: weatherData.data
                }, () => {
                    let competitionToForm = {...this.state.competitions[0]}
                    this.setCompetitionToFormWithNull(competitionToForm)
                    this.setState({
                        competitionToForm: competitionToForm
                    })
                })
            }))
            .catch(error => console.log(error))
            .finally(() => this.setState({
                competitionsLoading: false,
                seriesLoading: false,
            }))
    }

    deleteCompetition = () => {
        axios.delete("/api/competitions/" + this.state.competitionToDelete.id)
            .then(res => console.log(res))
            .catch(error => console.log(error))
            .finally(() => {
                this.setState({
                    showDeleteModal: false,
                }, () => this.filter())
            })
    }

    handleResultsButton = (competition) => {
        if(competition.team){
            axios.get('/api/teamResults?competitionId=' + competition.id)
                .then(res => this.setState({
                    results: res.data,
                    competitionToResults: competition,
                    showTeamResultsModal: true
                }))
                .catch(error => console.log(error))
        } else {
            axios.get('/api/results?competitionId=' + competition.id)
                .then(res => this.setState({
                    results: res.data,
                    competitionToResults: competition,
                    showResultsModal: true
                }))
                .catch(error => console.log(error))
        }

    }

    setCompetitionToFormWithValues = (competition) => {
        Object.keys(competition).forEach((key, index) => {
                if (competition[key] === null) {
                    competition[key] = ''
                }
            }
        )
        return competition
    }

    setCompetitionToFormWithNull = (competition) => {
        Object.keys(competition).forEach((key, index) => {
                competition[key] = ''
            }
        )
        competition["team"] = false
        return competition
    }

    postCompetition = (values) => {
        let successful = true
        let dataValues = {
            season: this.state.seasons.find(season => season.id === parseInt(values.seasonId)),
            date1: values.date1,
            date2: values.date2,
            seriesMajor: this.state.series.find(series => series.id === parseInt(values.seriesMajorId)),
            seriesMinor: this.state.series.find(series => series.id === parseInt(values.seriesMinorId)),
            hillVersion: this.state.hillVersions.find(hillVersion => hillVersion.id === parseInt(values.hillVersionId)),
            judgeA: this.state.judges.find(judge => judge.id === parseInt(values.judgeAId)),
            judgeB: this.state.judges.find(judge => judge.id === parseInt(values.judgeBId)),
            judgeC: this.state.judges.find(judge => judge.id === parseInt(values.judgeCId)),
            judgeD: this.state.judges.find(judge => judge.id === parseInt(values.judgeDId)),
            judgeE: this.state.judges.find(judge => judge.id === parseInt(values.judgeEId)),
            judgeSC: this.state.judges.find(judge => judge.id === parseInt(values.judgeSCId)),
            raceDirector: this.state.raceDirectors.find(rd => rd.id === parseInt(values.raceDirectorId)),
            technicalDelegate: this.state.technicalDelegates.find(td => td.id === parseInt(values.technicalDelegateId)),
            chiefOfCompetition: this.state.chiefsOfCompetition.find(coc => coc.id === parseInt(values.chiefOfCompetitionId)),
            assistantTD: this.state.assistantsTD.find(aTd => aTd.id === parseInt(values.assistantTDId)),
            assistantRD: this.state.assistantsRD.find(aRD => aRD.id === parseInt(values.assistantRDId)),
            equipmentController1: this.state.equipmentControllers.find(ec => ec.id === parseInt(values.equipmentController1Id)),
            equipmentController2: this.state.equipmentControllers.find(ec => ec.id === parseInt(values.equipmentController2Id)),
            meterValue: values.meterValue,
            gateFactor: values.gateFactor,
            windFactorTail: values.windFactorTail,
            windFactorFront: values.windFactorFront,
            firstRoundBaseGate: values.firstRoundBaseGate,
            firstRoundWeather: this.state.weather.find(weather => weather.id === values.firstRoundWeatherId),
            firstRoundAirTempStart: values.firstRoundAirTempStart,
            firstRoundAirTempFinish: values.firstRoundAirTempFinish,
            firstRoundSnowTempStart: values.firstRoundSnowTempStart,
            firstRoundSnowTempFinish: values.firstRoundSnowTempFinish,
            firstRoundStartTime: values.firstRoundStartTime,
            firstRoundHumidityStart: values.firstRoundHumidityStart,
            firstRoundHumidityFinish: values.firstRoundHumidityFinish,
            firstRoundMinWind: values.firstRoundMinWind,
            firstRoundMaxWind: values.firstRoundMaxWind,
            firstRoundAvgWind: values.firstRoundAvgWind,
            secondRoundBaseGate: values.secondRoundBaseGate,
            secondRoundWeather: this.state.weather.find(weather => weather.id === values.secondRoundWeatherId),
            secondRoundAirTempStart: values.secondRoundAirTempStart,
            secondRoundAirTempFinish: values.secondRoundAirTempFinish,
            secondRoundSnowTempStart: values.secondRoundSnowTempStart,
            secondRoundSnowTempFinish: values.secondRoundSnowTempFinish,
            secondRoundHumidityStart: values.secondRoundHumidityStart,
            secondRoundHumidityFinish: values.secondRoundHumidityFinish,
            secondRoundMinWind: values.secondRoundMinWind,
            secondRoundMaxWind: values.secondRoundMaxWind,
            secondRoundAvgWind: values.secondRoundAvgWind,
            thirdRoundBaseGate: values.thirdRoundBaseGate,
            thirdRoundWeather: this.state.weather.find(weather => weather.id === values.thirdRoundWeatherId),
            thirdRoundAirTempStart: values.thirdRoundAirTempStart,
            thirdRoundAirTempFinish: values.thirdRoundAirTempFinish,
            thirdRoundSnowTempStart: values.thirdRoundSnowTempStart,
            thirdRoundSnowTempFinish: values.thirdRoundSnowTempFinish,
            thirdRoundHumidityStart: values.thirdRoundHumidityStart,
            thirdRoundHumidityFinish: values.thirdRoundHumidityFinish,
            thirdRoundMinWind: values.thirdRoundMinWind,
            thirdRoundMaxWind: values.thirdRoundMaxWind,
            thirdRoundAvgWind: values.thirdRoundAvgWind,
            fourthRoundBaseGate: values.fourthRoundBaseGate,
            fourthRoundWeather: this.state.weather.find(weather => weather.id === values.fourthRoundWeatherId),
            fourthRoundAirTempStart: values.fourthRoundAirTempStart,
            fourthRoundAirTempFinish: values.fourthRoundAirTempFinish,
            fourthRoundSnowTempStart: values.fourthRoundSnowTempStart,
            fourthRoundSnowTempFinish: values.fourthRoundSnowTempFinish,
            fourthRoundHumidityStart: values.fourthRoundHumidityStart,
            fourthRoundHumidityFinish: values.fourthRoundHumidityFinish,
            fourthRoundMinWind: values.fourthRoundMinWind,
            fourthRoundMaxWind: values.fourthRoundMaxWind,
            fourthRoundAvgWind: values.fourthRoundAvgWind,
            team: values.isTeam
        }
        axios.post("/api/competitions", {...dataValues})
            .then(res => {
                // if (values.resultsLink !== '') {
                //     axios.post('/api/results/link/' + res.data.id, values.resultsLink)
                //         .then(res => console.log(res))
                //         .catch(error => {
                //             console.log(error)
                //             successful = false
                //         })
                // }
                this.setState({
                    showCompletedModal: true,
                    completedModalStatus: successful,
                    showAddingModal: false,
                    showFormModal: false,
                    editing: false,
                }, () => {
                    this.filter()
                })
            })
            .catch(error => {
                console.log(error)
                successful = false
            })

    }

    updateCompetition = (values) => {
        let successful = true
        let dataValues = {
            season: this.state.seasons.find(season => season.id === parseInt(values.seasonId)),
            date1: values.date1,
            date2: values.date2,
            seriesMajor: this.state.series.find(series => series.id === parseInt(values.seriesMajorId)),
            seriesMinor: this.state.series.find(series => series.id === parseInt(values.seriesMinorId)),
            hillVersion: this.state.hillVersions.find(hillVersion => hillVersion.id === parseInt(values.hillVersionId)),
            judgeA: this.state.judges.find(judge => judge.id === parseInt(values.judgeAId)),
            judgeB: this.state.judges.find(judge => judge.id === parseInt(values.judgeBId)),
            judgeC: this.state.judges.find(judge => judge.id === parseInt(values.judgeCId)),
            judgeD: this.state.judges.find(judge => judge.id === parseInt(values.judgeDId)),
            judgeE: this.state.judges.find(judge => judge.id === parseInt(values.judgeEId)),
            judgeSC: this.state.judges.find(judge => judge.id === parseInt(values.judgeSCId)),
            raceDirector: this.state.raceDirectors.find(rd => rd.id === parseInt(values.raceDirectorId)),
            technicalDelegate: this.state.technicalDelegates.find(td => td.id === parseInt(values.technicalDelegateId)),
            chiefOfCompetition: this.state.chiefsOfCompetition.find(coc => coc.id === parseInt(values.chiefOfCompetitionId)),
            assistantTD: this.state.assistantsTD.find(aTd => aTd.id === parseInt(values.assistantTDId)),
            assistantRD: this.state.assistantsRD.find(aRD => aRD.id === parseInt(values.assistantRDId)),
            equipmentController1: this.state.equipmentControllers.find(ec => ec.id === parseInt(values.equipmentController1Id)),
            equipmentController2: this.state.equipmentControllers.find(ec => ec.id === parseInt(values.equipmentController2Id)),
            meterValue: values.meterValue,
            gateFactor: values.gateFactor,
            windFactorTail: values.windFactorTail,
            windFactorFront: values.windFactorFront,
            firstRoundBaseGate: values.firstRoundBaseGate,
            firstRoundWeather: this.state.weather.find(weather => weather.id === values.firstRoundWeatherId),
            firstRoundAirTempStart: values.firstRoundAirTempStart,
            firstRoundAirTempFinish: values.firstRoundAirTempFinish,
            firstRoundSnowTempStart: values.firstRoundSnowTempStart,
            firstRoundSnowTempFinish: values.firstRoundSnowTempFinish,
            firstRoundStartTime: values.firstRoundStartTime,
            firstRoundHumidityStart: values.firstRoundHumidityStart,
            firstRoundHumidityFinish: values.firstRoundHumidityFinish,
            firstRoundMinWind: values.firstRoundMinWind,
            firstRoundMaxWind: values.firstRoundMaxWind,
            firstRoundAvgWind: values.firstRoundAvgWind,
            secondRoundBaseGate: values.secondRoundBaseGate,
            secondRoundWeather: this.state.weather.find(weather => weather.id === values.secondRoundWeatherId),
            secondRoundAirTempStart: values.secondRoundAirTempStart,
            secondRoundAirTempFinish: values.secondRoundAirTempFinish,
            secondRoundSnowTempStart: values.secondRoundSnowTempStart,
            secondRoundSnowTempFinish: values.secondRoundSnowTempFinish,
            secondRoundHumidityStart: values.secondRoundHumidityStart,
            secondRoundHumidityFinish: values.secondRoundHumidityFinish,
            secondRoundMinWind: values.secondRoundMinWind,
            secondRoundMaxWind: values.secondRoundMaxWind,
            secondRoundAvgWind: values.secondRoundAvgWind,
            thirdRoundBaseGate: values.thirdRoundBaseGate,
            thirdRoundWeather: this.state.weather.find(weather => weather.id === values.thirdRoundWeatherId),
            thirdRoundAirTempStart: values.thirdRoundAirTempStart,
            thirdRoundAirTempFinish: values.thirdRoundAirTempFinish,
            thirdRoundSnowTempStart: values.thirdRoundSnowTempStart,
            thirdRoundSnowTempFinish: values.thirdRoundSnowTempFinish,
            thirdRoundHumidityStart: values.thirdRoundHumidityStart,
            thirdRoundHumidityFinish: values.thirdRoundHumidityFinish,
            thirdRoundMinWind: values.thirdRoundMinWind,
            thirdRoundMaxWind: values.thirdRoundMaxWind,
            thirdRoundAvgWind: values.thirdRoundAvgWind,
            fourthRoundBaseGate: values.fourthRoundBaseGate,
            fourthRoundWeather: this.state.weather.find(weather => weather.id === values.fourthRoundWeatherId),
            fourthRoundAirTempStart: values.fourthRoundAirTempStart,
            fourthRoundAirTempFinish: values.fourthRoundAirTempFinish,
            fourthRoundSnowTempStart: values.fourthRoundSnowTempStart,
            fourthRoundSnowTempFinish: values.fourthRoundSnowTempFinish,
            fourthRoundHumidityStart: values.fourthRoundHumidityStart,
            fourthRoundHumidityFinish: values.fourthRoundHumidityFinish,
            fourthRoundMinWind: values.fourthRoundMinWind,
            fourthRoundMaxWind: values.fourthRoundMaxWind,
            fourthRoundAvgWind: values.fourthRoundAvgWind,
            team: values.isTeam,
        }
        axios.put("/api/competitions/" + this.state.competitionToForm.id, {...dataValues})
            .then(res => {
                // if (values.resultsLink !== '') {
                //     axios.post('/api/results/link/' + res.data.id, values.resultsLink)
                //         .then(res => console.log(res))
                //         .catch(error => {
                //             console.log(error)
                //             successful = false
                //         })
                // }
                this.setState({
                    showCompletedModal: true,
                    completedModalStatus: successful,
                    showAddingModal: false,
                    showFormModal: false,
                    editing: false,
                }, () => {
                    this.filter()
                })
            })
            .catch(error => {
                console.log(error)
                successful = false
            })
    }

    postResults = (values) => {
        let successful = true
        if(this.state.addResultsCompetition.team === true){
            axios.post('/api/teamResults/link/' + this.state.addResultsCompetition.id, values.resultsLink)
                .then(res => console.log(res))
                .catch(error => {
                    console.log(error)
                    successful = false
                })
                .finally(() => {
                    this.setState({
                        showCompletedModal: true,
                        completedModalStatus: successful,
                        showAddingModal: false,
                        showAddResultsModal: false
                    }, () => this.filter())
                })
        } else {
            axios.post('/api/results/link/' + this.state.addResultsCompetition.id, values.resultsLink)
                .then(res => console.log(res))
                .catch(error => {
                    console.log(error)
                    successful = false
                })
                .finally(() => {
                    this.setState({
                        showCompletedModal: true,
                        completedModalStatus: successful,
                        showAddingModal: false,
                        showAddResultsModal: false
                    }, () => this.filter())
                })
        }


    }

    postQualifications = (values) => {
        let successful = true
        const data = {
            competition: this.state.qualificationsCompetition,
            ...values
        }
        axios.post("/api/qualifications", data)
            .then(res => console.log(res.data))
            .catch(e => {
                console.log(e)
                successful = false
            })
            .finally(() => {
                    this.setState({
                        completedModalStatus: successful,
                        showCompletedModal: true,
                        showAddingModal: false,
                        //    showQualificationsModal: false
                    }, () => this.filter())
                }
            )

    }

    filter = () => {
        axios.get('/api/competitions?seasonId=' + this.state.filterSeasonId
            + '&seriesMajorId=' + this.state.filterSeriesMajorId
            + '&hillId=' + this.state.filterHillId
            + '&venueId=' + this.state.filterVenueId
            + '&seriesMinorId=' + this.state.filterSeriesMinorId)
            .then(res => {
                this.setState({
                    competitions: res.data,
                    competitionsLoading: false
                })
            })
            .catch(error => console.log(error))
    }

    render() {
        console.log(this.state)
        let items = [];
        let numberOfPages = this.state.competitions.length / 10
        if (this.state.competitions.length % 10 !== 0) {
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

                {this.state.showAddResultsModal ?
                    <AddResultsModal
                        mainHeader={"Uploading results for " + this.state.addResultsCompetition.seriesMajor.name
                        + "( " + this.state.addResultsCompetition.date1 + " " + this.state.addResultsCompetition.hillVersion.hill.name
                        + " )"}
                        show={this.state.showAddResultsModal}
                        onSubmit={(values) => {
                            this.setState({
                                showAddingModal: true
                            }, () => this.postResults(values))
                        }}
                        onHide={() => this.setState({
                            showAddResultsModal: false
                        })}
                    /> : null}

                <CompletedModal
                    show={this.state.showCompletedModal}
                    text={this.state.completedModalText}
                    onHide={() => this.setState({
                        showCompletedModal: false,
                        completedModalText: ""
                    })}
                    status={this.state.completedModalStatus}
                />

                {this.state.showQualificationsModal ?
                    <AddQualificationsModal
                        show={this.state.showQualificationsModal}
                        judges={this.state.judges}
                        weather={this.state.weather}
                        onHide={() => this.setState({
                            showQualificationsModal: false,
                            qualificationsCompetition: ''
                        })}
                        onSubmit={(values) => {
                            this.setState({
                                showAddingModal: true
                            }, () => this.postQualifications(values))
                        }}
                    />
                    : null}

                {this.state.showDeleteModal ?
                    <DeleteModal
                        show={this.state.showDeleteModal}
                        onHide={() => this.setState({
                            showDeleteModal: false,
                            competitionToDelete: ''
                        })}
                        title={this.state.competitionToDelete.seriesMajor.name + "( " + this.state.competitionToDelete.date1 + " ) competition"}
                        handleDelete={this.deleteCompetition}
                    /> : null}


                {this.state.showReadMoreModal ? <CompetitionReadMoreModal
                    asistantsRD={this.state.assistantsRD}
                    asistantsTD={this.state.assistantsTD}
                    chiefsOfCompetition={this.state.chiefsOfCompetition}
                    competition={this.state.comp}
                    equipmentControllers={this.state.equipmentControllers}
                    judges={this.state.judges}
                    onHide={() => this.setState({
                        showReadMoreModal: false
                    })}
                    raceDirectors={this.state.raceDirectors}
                    show={this.state.showReadMoreModal}
                    technicalDelegates={this.state.technicalDelegates}
                /> : null}

                {this.state.showResultsModal ? <ResultsModal
                    competition={this.state.competitionToResults}
                    results={this.state.results}
                    show={this.state.showResultsModal}
                    onHide={() => this.setState({
                        showResultsModal: false
                    })}
                /> : null}

                {this.state.showTeamResultsModal ? <TeamResultsModal
                    competition={this.state.competitionToResults}
                    results={this.state.results}
                    show={this.state.showTeamResultsModal}
                    onHide={() => this.setState({
                        showTeamResultsModal: false
                    })}
                /> : null}

                <Header3>Results</Header3>

                <StyledDivCentered1200>
                    {/*Select Country*/}
                    <strong>Filter</strong>
                    <SelectInputForm
                        title={"Major series:"}
                        defaultValue={""}
                        disabled={this.state.seriesLoading}
                        onChange={e => {
                            this.setState({
                                activePage: 1,
                                competitionsLoading: true,
                                filterSeriesMajorId: e.target.value
                            }, () => this.filter())
                        }}
                    >
                        <option value={""}>All series</option>
                        {this.state.series.map(series =>
                            <option key={series.id} value={series.id}>
                                {series.name}
                            </option>)}
                    </SelectInputForm>

                    <SelectInputForm
                        title={"Minor series:"}
                        defaultValue={""}
                        disabled={this.state.seriesLoading}
                        onChange={e => {
                            this.setState({
                                activePage: 1,
                                competitionsLoading: true,
                                filterSeriesMinorId: e.target.value
                            }, () => this.filter())
                        }}
                    >
                        <option value={""}>No minor series</option>
                        {this.state.series.map(series =>
                            <option key={series.id} value={series.id}>
                                {series.name}
                            </option>)}
                    </SelectInputForm>

                    <SelectInputForm
                        title={"Hill:"}
                        defaultValue={""}
                        disabled={this.state.seriesLoading}
                        onChange={e => {
                            this.setState({
                                activePage: 1,
                                competitionsLoading: true,
                                filterHillId: e.target.value
                            }, () => this.filter())
                        }}
                    >
                        <option value={""}>All hills</option>
                        {this.state.hills.map(hill =>
                            <option key={hill.id} value={hill.id}>
                                {hill.name} ({hill.sizeOfHill.designation})
                            </option>)}
                    </SelectInputForm>

                    <SelectInputForm
                        title={"Venue:"}
                        defaultValue={""}
                        disabled={this.state.seriesLoading}
                        onChange={e => {
                            this.setState({
                                activePage: 1,
                                competitionsLoading: true,
                                filterVenueId: e.target.value
                            }, () => this.filter())
                        }}
                    >
                        <option value={""}>All venue</option>
                        {this.state.venues.map(venue =>
                            <option key={venue.id} value={venue.id}>
                                {venue.name}, {venue.city.name}
                            </option>)}
                    </SelectInputForm>


                    <SelectInputForm
                        title={"Season:"}
                        defaultValue={""}
                        disabled={this.state.seriesLoading}
                        onChange={e => {
                            this.setState({
                                activePage: 1,
                                competitionsLoading: true,
                                filterSeasonId: e.target.value
                            }, () => this.filter())
                        }}
                    >
                        <option value={""}>All seasons</option>
                        {this.state.seasons.map(season =>
                            <option key={season.id} value={season.id}>
                                {season.season}
                            </option>)}
                    </SelectInputForm>

                    <Header5>Recent competitions</Header5>

                    {this.state.competitionsLoading ?
                        <Loader
                            type="ThreeDots"
                            color="#00BFFF"
                            height={80}
                            width={80}
                            style={{textAlign: 'center'}}
                        />
                        :
                        <div>
                            {this.state.competitions.length > 0 ?
                                <div>
                                    <Table bordered hover striped size={"sm"}>
                                        <thead>
                                        <tr>
                                            <th>Date</th>
                                            <th>Series</th>
                                            <th>Hill</th>
                                            <th>Type</th>
                                            <th>Actions</th>
                                        </tr>
                                        </thead>
                                        <tbody>
                                        {/* eslint-disable-next-line array-callback-return */}
                                        {this.state.competitions.map(competition => {
                                            if (((this.state.activePage - 1) * 10 <= this.state.competitions.indexOf(competition)) && (this.state.competitions.indexOf(competition) < this.state.activePage * 10)) {
                                                return (
                                                    <tr key={competition.id} id={competition.id}>
                                                        <td>{competition.date1}</td>
                                                        <td>{competition.seriesMajor.name} {competition.seriesMinor !== null ?
                                                            <small>({competition.seriesMinor.name})</small> : null}
                                                            <TableButton id={competition.id + "tbEdit"}
                                                                         name={competition.name}
                                                                         size="sm"
                                                                         variant={"outline-secondary"}
                                                                         style={{marginLeft: "5px"}}
                                                                         onClick={() =>
                                                                             this.setState({
                                                                                 showReadMoreModal: true,
                                                                                 comp: competition
                                                                             })}>
                                                                details
                                                            </TableButton>
                                                            {competition.results.length > 0 || competition.teamResults.length > 0?
                                                                <TableButton id={competition.id + "tbEdit"}
                                                                             name={competition.name}
                                                                             size="sm"
                                                                             variant={"outline-info"}
                                                                             onClick={() => this.handleResultsButton(competition)}>
                                                                    results
                                                                </TableButton> : null
                                                            }


                                                        </td>
                                                        <td>{competition.hillVersion.hill.name}</td>
                                                        <td>{competition.team ? <div>Team</div> : <div>Ind.</div>}</td>
                                                        <td style={{textAlign: "center"}}>
                                                            <TableButton id={competition.id}
                                                                         name={competition.name}
                                                                         size="sm"
                                                                         variant={"outline-info"}
                                                                         onClick={() => {
                                                                             const competitionToForm = this.setCompetitionToFormWithValues(competition)
                                                                             this.setState({
                                                                                 competitionToForm: {...competitionToForm},
                                                                                 editing: true,
                                                                                 showFormModal: true
                                                                             })
                                                                         }
                                                                         }>
                                                                Edit
                                                            </TableButton>
                                                            {competition.results.length > 0 || competition.teamResults.length > 0 ?
                                                                <TableButton id={competition.id + "tbEdit"}
                                                                             name={competition.name}
                                                                             size="sm"
                                                                             variant={"info"}
                                                                             onClick={() => {
                                                                                 this.setState({
                                                                                     showAddResultsModal: true,
                                                                                     addResultsCompetition: competition,
                                                                                 })
                                                                             }
                                                                             }>
                                                                    Edit results
                                                                </TableButton> :
                                                                <TableButton id={competition.id + "tbEdit"}
                                                                             name={competition.name}
                                                                             size="sm"
                                                                             variant={"warning"}
                                                                             onClick={() => {
                                                                                 this.setState({
                                                                                     showAddResultsModal: true,
                                                                                     addResultsCompetition: competition,
                                                                                 })
                                                                             }
                                                                             }>
                                                                    Add results
                                                                </TableButton>}

                                                            {competition.qualification !== null ?
                                                                <TableButton id={competition.id}
                                                                             name={competition.name}
                                                                             size="sm"
                                                                             variant={"outline-info"}
                                                                             onClick={() => {
                                                                                 this.setState({
                                                                                     showQualificationsModal: true,
                                                                                     qualificationsCompetition: competition,
                                                                                 })
                                                                             }
                                                                             }>
                                                                    Edit qualifying
                                                                </TableButton> :
                                                                <TableButton id={competition.id}
                                                                             name={competition.name}
                                                                             size="sm"
                                                                             variant={"outline-warning"}
                                                                             onClick={() => {
                                                                                 this.setState({
                                                                                     showQualificationsModal: true,
                                                                                     qualificationsCompetition: competition,
                                                                                 })
                                                                             }
                                                                             }>
                                                                    Add qualifiying
                                                                </TableButton>}
                                                            <TableButton id={competition.id + "tbDelete"}
                                                                         name={competition.name} size="sm"
                                                                         variant={"danger"}
                                                                         onClick={() => this.setState({
                                                                             showDeleteModal: true,
                                                                             competitionToDelete: competition
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
                                : <p style={{textAlign: "center"}}>No competitions found</p>}

                        </div>
                    }

                    <div style={{textAlign: "right", paddingBottom: "15px"}}>
                        <Button

                            onClick={() => {
                                this.setState({
                                    showFormModal: true
                                })
                            }}
                        >
                            Add competition
                        </Button>
                    </div>


                    {this.state.showFormModal ? <ResultsFormModal showModal={this.state.showFormModal}
                                                                  aRDs={this.state.assistantsRD}
                                                                  aTDs={this.state.assistantsTD}
                                                                  chiefsOfCompetition={this.state.chiefsOfCompetition}
                                                                  countries={this.state.countries}
                                                                  equipmentControllers={this.state.equipmentControllers}
                                                                  judges={this.state.judges}
                                                                  hills={this.state.hills}
                                                                  onSubmit={(values) => {
                                                                      this.setState({
                                                                          showAddingModal: true
                                                                      }, () => {
                                                                          if (!this.state.editing) {
                                                                              this.postCompetition(values)
                                                                          } else {
                                                                              this.updateCompetition(values)
                                                                          }
                                                                      })
                                                                  }}
                                                                  raceDirectors={this.state.raceDirectors}
                                                                  seasons={this.state.seasons}
                                                                  series={this.state.series}
                                                                  technicalDelegates={this.state.technicalDelegates}
                                                                  venues={this.state.venues}
                                                                  weather={this.state.weather}
                                                                  {...this.state.competitionToForm}
                                                                  onHide={() => {
                                                                      let competitionNull = this.setCompetitionToFormWithNull(this.state.competitionToForm)
                                                                      this.setState({
                                                                          competitionToForm: competitionNull,
                                                                          showFormModal: false
                                                                      })
                                                                  }}
                    /> : null}


                </StyledDivCentered1200>


            </React.Fragment>
        )
    }
}


export default DBResults