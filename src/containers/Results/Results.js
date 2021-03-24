import React, {Component} from 'react'
import axios from "axios";
import AddingModal from "../../components/Modals/AddingModal";
import CompletedModal from "../../components/Modals/CompletedModal";
import DeleteModal from "../../components/Modals/DeleteModal";
import {Header3, Header5, StyledDivCentered1200, TableButton} from "../../components/StyledComponents";
import ResultsForm from "./ResultsForm";
import Loader from "react-loader-spinner";
import {Pagination, Table} from "react-bootstrap";
import CompetitionReadMoreModal from "./CompetitionReadMoreModal";
import SelectInputForm from "../../components/CommonForms/SelectInputForm";
import ResultsModal from "./ResultsModal";


class Results extends Component {

    state = {
        activePage: 1,
        assistantsRD: [],
        assistantsTD: [],
        chiefsOfCompetition: [],
        competitions: [],
        competitionsLoading: true,
        competitionToDelete: '',
        competitionToEdit: {
            assistantRD: {
                id: ''
            }
        },
        competitionToResults: '',
        countries: [],
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
        showReadMoreModal: false,
        showResultsModal: false,
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
                })
            }))
            .catch(error => console.log(error))
            .finally(() => this.setState({
                competitionsLoading: false,
                seriesLoading: false,
            }))
    }

    handleResultsButton = (competition) => {
        axios.get('/api/results/' + competition.id)
            .then(res => this.setState({
                results: res.data,
                competitionToResults: competition,
                showResultsModal: true
            }))
            .catch(error => console.log(error))
    }
    postResults = (values) => {
        console.log(values)
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
            fourthRoundAvgWind: values.fourthRoundAvgWind
        }
        axios.post("/api/competitions", {...dataValues})
            .then(res => {
                console.log(res)
                const formData = new FormData();
                formData.append('csv', values.resultsCsv)
                const formDataPdf = new FormData()
                formData.append('pdf', values.resultsPdf)
                console.log(formDataPdf)
                axios.post('/api/results/files/' + res.data.id, formData)
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
                        })
                    })
            })
            .catch(error => {
                console.log(error)
                successful = false
            })
            .finally(() => {
                this.setState({
                    showCompletedModal: true,
                    completedModalStatus: successful,
                    showAddingModal: false,
                }, () => this.updateToSeries())
            })

    }

    updateToSeries = (e) => {
        let urlString

        if (e === undefined || e.target.value === "") {
            urlString = '/api/competitions'
        } else {
            urlString = '/api/competitions/series/' + e.target.value
        }

        axios.get(urlString)
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
                        competitionToDelete: ''
                    })}
                    title={"the jury"}
                    handleDelete={this.deleteAthlete}
                />

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

                <Header3>Results</Header3>

                <StyledDivCentered1200>

                    {/*Select Country*/}
                    <strong>Filter</strong>
                    <SelectInputForm
                        title={"Series"}
                        defaultValue={""}
                        disabled={this.state.seriesLoading}
                        onChange={e => {
                            this.setState({
                                activePage: 1,
                                competitionsLoading: true
                            }, () => this.updateToSeries(e))
                        }}
                    >
                        <option value={""}>All series</option>
                        {this.state.series.map(series =>
                            <option key={series.id} value={series.id}>
                                {series.name}
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
                                                            <TableButton id={competition.id + "tbEdit"}
                                                                         name={competition.name}
                                                                         size="sm"
                                                                         variant={"outline-info"}
                                                                         onClick={() => this.handleResultsButton(competition)}>
                                                                results
                                                            </TableButton>

                                                        </td>
                                                        <td>{competition.hillVersion.hill.name}</td>
                                                        <td style={{width: "250px"}}>
                                                            <TableButton id={competition.id + "tbEdit"}
                                                                         name={competition.name}
                                                                         size="sm"
                                                                         variant={"info"}
                                                                         onClick={() => {
                                                                             this.setState({
                                                                                 competitionToEdit: competition,
                                                                                 editCompetition: true,
                                                                             })
                                                                         }
                                                                         }>
                                                                Edit
                                                            </TableButton>
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

                    {this.state.venues.length > 0 ?
                        <ResultsForm
                            aRDs={this.state.assistantsRD}
                            aTDs={this.state.assistantsTD}
                            chiefsOfCompetition={this.state.chiefsOfCompetition}
                            countries={this.state.countries}
                            equipmentControllers={this.state.equipmentControllers}
                            judges={this.state.judges}
                            onSubmit={this.postResults}
                            raceDirectors={this.state.raceDirectors}
                            seasons={this.state.seasons}
                            series={this.state.series}
                            technicalDelegates={this.state.technicalDelegates}
                            venues={this.state.venues}
                            weather={this.state.weather}
                        />
                        : null}


                </StyledDivCentered1200>


            </React.Fragment>
        )
    }
}


export default Results