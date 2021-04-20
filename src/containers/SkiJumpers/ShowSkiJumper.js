import React, {Component} from "react";
import axios from "axios";
import Loader from "react-loader-spinner";
import {Col, Container, Row, Tab, Table, Tabs} from "react-bootstrap";
import ShowSkiJumperResultsTable from "./ShowSkiJumperResultsTable";
import WinsModal from "./WinsModal";
import OverallStandingsTable from "./OverallStandingsTable";



class ShowSkiJumper extends Component {
    state = {
        competitionsForModal: [],
        fourHillsOverallStandings: [],
        fourHillsTournamentStarts: 0,
        fourHillsTournamentPodiums: [0, 0, 0],
        modalTitle: '',
        olympicGamesStarts: 0,
        olympicGamesPodiums: [0, 0, 0],
        overallStandings: [],
        overallWorldCupPodiums: [0, 0, 0],
        overallWorldCupStarts: 0,
        raceDirectorFlag: '',
        results: [],
        resultsSeasons: [],
        seasons: [],
        showModal: false,
        skiFlyingWorldChampionshipsStarts: 0,
        skiFlyingWorldChampionshipsPodiums: [0, 0, 0],
        skiJumper: '',
        skiJumperAge: '',
        pageLoading: true,
        photos: [],
        worldChampionshipsStarts: 0,
        worldChampionshipsPodiums: [0, 0, 0],
        worldCupPodiums: [0, 0, 0],
        worldCupDebut: [],
        worldCupStarts: 0,
        worldCupOverallPodiums: [0, 0, 0],
        worldCupOverallDebut: [],
        worldCupOverallStarts: 0,
    }


    componentDidMount() {
        axios.all([
            axios.get("/api/skiJumpers?id=" + this.props.match.params.skiJumper),
            axios.get('/api/overallStandings?skiJumperId='+ this.props.match.params.skiJumper + "&seriesId=9"),
            axios.get('/api/overallStandings?skiJumperId='+ this.props.match.params.skiJumper + "&seriesId=12")
        ]).then(axios.spread((
            skiJumperData,
            overallStandingsData,
            fourHillsOverallStandingsData
        ) => {
            this.setState({
                skiJumper: skiJumperData.data[0],
                overallStandings: overallStandingsData.data,
                fourHillsOverallStandings: fourHillsOverallStandingsData.data,
            }, () => {
                this.loadPhoto('flags/' + this.state.skiJumper.person.country.code, 'jumperFlag')
                this.loadPhoto('athletes/blankProfile', 'jumperPhoto')

                let fourHillsTournamentStarts = 0
                let olympicGamesStarts = 0
                let skiFlyingWorldChampionshipsStarts = 0
                let worldCupStarts = 0
                let worldChampionshipsStarts = 0
                let worldCupOverallStarts = 0
                let worldCupDebut

                for(const fourHillsStart of this.state.fourHillsOverallStandings){
                    fourHillsTournamentStarts++
                    this.setOverallPodiums(fourHillsStart, 'fourHillsTournamentPodiums')
                }

                for(const overallStanding of this.state.overallStandings){
                    worldCupOverallStarts++
                    this.setOverallPodiums(overallStanding, 'worldCupOverallPodiums')
                }

                //set flags and world cup starts
                for (const result of this.state.skiJumper.results) {
                    this.loadPhoto('flags/' + result.competition.hillVersion.hill.venue.city.region.country.code, 'result_' + result.id)
                    if (result.competition.seriesMajor.id === 9) {
                        worldCupDebut = this.state.skiJumper.results.filter(result => result.competition.seriesMajor.id === 9)[0].competition
                        this.setPodiums(result, 'worldCupPodiums')
                        worldCupStarts++
                    }
                    if (result.competition.seriesMajor.id === 3 || result.competition.seriesMajor.id === 4) {
                        this.setPodiums(result, 'worldChampionshipsPodiums')
                        worldChampionshipsStarts++
                    }
                    // if (result.competition.seriesMajor.id === 12) {
                    //     this.setPodiums(result, 'fourHillsTournamentPodiums')
                    //     fourHillsTournamentStarts++
                    // }
                    if (result.competition.seriesMajor.id === 1) {
                        this.setPodiums(result, 'olympicGamesPodiums')
                        olympicGamesStarts++
                    }
                    if (result.competition.seriesMajor.id === 5) {
                        this.setPodiums(result, 'skiFlyingWorldChampionshipsPodiums')
                        skiFlyingWorldChampionshipsStarts++
                    }
                    if(result.competition.seriesMinor !== null){
                        // if(result.competition.seriesMinor.id === 12){
                        //     this.setPodiums(result, 'fourHillsTournamentPodiums')
                        //     fourHillsTournamentStarts++
                        // }
                        if (result.competition.seriesMinor.id === 9) {
                            worldCupDebut = this.state.skiJumper.results.filter(result => result.competition.seriesMajor.id === 9)[0].competition
                            this.setPodiums(result, 'worldCupPodiums')
                            worldCupStarts++
                        }
                    }
                }

                this.setResultsSeasons()
                this.filterResults(this.state.resultsSeasons[0])

                //Calculate age
                let today = new Date(),
                    yearNow = today.getFullYear()
                let yearBorn = this.state.skiJumper.person.birthdate.slice(0, 4)

                this.setState({
                    fourHillsTournamentStarts: fourHillsTournamentStarts,
                    pageLoading: false,
                    skiFlyingWorldChampionshipsStarts:  skiFlyingWorldChampionshipsStarts,
                    skiJumperAge: yearNow - yearBorn,
                    worldChampionshipsStarts: worldChampionshipsStarts,
                    worldCupDebut: worldCupDebut,
                    worldCupStarts: worldCupStarts,
                    worldCupOverallStarts: worldCupOverallStarts
                })
            })
        }))
            .catch(error => {
                console.log(error)
            })
    }

    setPodiums = (result, stateParamName) => {
        if (result.totalRank < 4) {
            let podiums = this.state[stateParamName]
            podiums[result.totalRank - 1]++
            this.setState({
                stateParamName: podiums,
            })
        }
    }

    setOverallPodiums = (overallResults, stateParamName) => {
        if (overallResults.ranking < 4) {
            let podiums = this.state[stateParamName]
            podiums[overallResults.ranking - 1]++
            this.setState({
                stateParamName: podiums,
            })
        }
    }

    showModal = (seriesMajorId, title) => {
        axios.get("/api/results?skiJumperId=" + this.state.skiJumper.id
        + '&seriesMajorId=' + seriesMajorId
        + '&minRank=3')
            .then(res => {
                this.setState({
                    competitionsForModal: res.data,
                    modalTitle: title,
                    showModal: true
                })
            })
            .catch(error => console.log(error))
    }


    filterResults = (season) => {
        const array = this.state.skiJumper.results.filter(result => result.competition.season.season === season)
        this.setState({
            results: array
        })
    }

    loadPhoto = (code, element) => {
        if (code !== undefined) {
            import(`../../assets/${code}.png`)
                .then(res => {
                    let array = this.state.photos
                    array[element] = res.default
                    this.setState({
                        photos: array
                    })
                })
        }
    }

    setResultsSeasons = () => {
        for (const result of this.state.skiJumper.results) {
            let array = this.state.resultsSeasons
            if (array.indexOf(result.competition.season.season) === -1) {
                array.push(result.competition.season.season)
                this.setState({
                    resultsSeasons: array.sort(function compareSeasons(a, b) {
                        return b - a
                    })
                })
            }
        }
    }


    render() {

        console.log(this.state)

        return (
            <div style={{marginLeft: "11%", marginRight: "11%", paddingBottom: "50px"}}>

                <WinsModal
                    show={this.state.showModal}
                    results={this.state.competitionsForModal}
                    modalLoading={this.state.modalLoading}
                    photos={this.state.photos}
                    title={this.state.modalTitle}
                    onHide={() => this.setState({
                        showModal: false
                    })}
                />

                {this.state.pageLoading !== true ?
                    <Container fluid>
                        <Col>
                            <Row>
                                <h1 style={{marginBottom: "60px", width: "100%"}}><img
                                    height={"100%"}
                                    className="mr-3"
                                    src={this.state.photos['jumperFlag']}
                                    alt="Generic placeholder"
                                /> {this.state.skiJumper.person.firstName} {this.state.skiJumper.person.lastName}</h1>
                            </Row>
                        </Col>

                        <Col>
                            <Row>
                                <img
                                    height={"150px"}
                                    className="mr-3"
                                    src={this.state.photos['jumperPhoto']}
                                    alt="Generic placeholder"
                                />
                                <Col style={{marginBottom: "10px"}}>
                                    <Row sm={1}>
                                        <Col>
                                            <b>Born: </b>
                                            {this.state.skiJumper.person.birthdate}, {this.state.skiJumper.person.city !== null ?
                                            <> {this.state.skiJumper.person.city.name}</> : null}
                                        </Col>
                                    </Row>
                                    {this.state.skiJumperAge !== '' ?
                                        <Row sm={1}>
                                            <Col>
                                                <b>Age: </b> {this.state.skiJumperAge}
                                            </Col>
                                        </Row> : null}
                                    <Row sm={1}>
                                        <Col>
                                            <b>Gender: </b>
                                            {this.state.skiJumper.person.gender !== null ?
                                                <> {this.state.skiJumper.person.gender.gender}</> : null}
                                        </Col>
                                    </Row>
                                    <Row sm={1}>
                                        <Col>
                                            <b>Status: </b>
                                            {this.state.skiJumper.active === true ?
                                                <>Active</> : <>Retired ({this.state.resultsSeasons[0]})</>}
                                        </Col>
                                    </Row>
                                    <Row sm={1}>
                                        <Col>
                                            <b>Club: </b>
                                            {this.state.skiJumper.skiClub !== null ?
                                                <> {this.state.skiJumper.skiClub.name}</> : null}
                                        </Col>
                                    </Row>
                                    <Row sm={1}>
                                        <Col>
                                            <b>Skis: </b>
                                            {this.state.skiJumper.skis !== null ?
                                                <> {this.state.skiJumper.skis.brand}</> : null}
                                        </Col>
                                    </Row>
                                    {this.state.worldCupStarts > 0 ? <Row m={1}>
                                        <Col>
                                            <b>World Cup debut: </b>
                                            <a href={"/showResults/" + this.state.worldCupDebut.id} style={{color: "black"}}><>{this.state.worldCupDebut.date1}, {this.state.worldCupDebut.hillVersion.hill.venue.city.name}</></a>
                                        </Col>
                                    </Row> : null}
                                </Col>

                                <Col>
                                    <Table striped size={"sm"} hover>
                                        <th><h6>Major Individual starts</h6></th>
                                        <th style={{textAlign: "center"}}>Starts</th>
                                        <th colSpan={3} style={{textAlign: "center"}}>Podiums</th>
                                        {/*<th/>*/}
                                        <tbody>
                                        <tr style={{cursor: "pointer"}}
                                            onClick={() =>{
                                                this.showModal(1, "Olympic Games")
                                            } }>
                                            <td><b>Olympic Games</b></td>
                                            <td style={{textAlign: "center"}}>0</td>
                                            <td style={{backgroundColor: "gold"}}>0</td>
                                            <td style={{backgroundColor: "silver"}}>0</td>
                                            <td style={{backgroundColor: "#cd7f32"}}>0</td>

                                        </tr>
                                        <tr style={{cursor: "pointer"}}
                                            onClick={() =>{
                                                this.showModal(3, "World Championships")
                                            } }>
                                            <td><b>World Championships</b></td>
                                            <td style={{textAlign: "center"}}>{this.state.worldChampionshipsStarts}</td>
                                            <td style={{backgroundColor: "gold"}}>
                                                {this.state.worldChampionshipsPodiums[0] > 0 ?
                                                    <b>{this.state.worldChampionshipsPodiums[0]}</b> : 0}
                                            </td>
                                            <td style={{backgroundColor: "silver"}}>{this.state.worldChampionshipsPodiums[1] > 0 ?
                                                <b>{this.state.worldChampionshipsPodiums[1]}</b> : 0}</td>
                                            <td style={{backgroundColor: "#cd7f32"}}>{this.state.worldChampionshipsPodiums[2] > 0 ?
                                                <b>{this.state.worldChampionshipsPodiums[2]}</b> : 0}</td>

                                        </tr>
                                        <tr style={{cursor: "pointer"}}
                                            onClick={() =>{
                                                this.showModal(5, "Ski Flying World Championships")
                                            } }>
                                            <td><b>Ski Flying World Championships</b></td>
                                            <td style={{textAlign: "center"}}>{this.state.skiFlyingWorldChampionshipsStarts}</td>
                                            <td style={{backgroundColor: "gold"}}>
                                                {this.state.skiFlyingWorldChampionshipsPodiums[0] > 0 ?
                                                    <b>{this.state.skiFlyingWorldChampionshipsPodiums[0]}</b> : 0}
                                            </td>
                                            <td style={{backgroundColor: "silver"}}>{this.state.skiFlyingWorldChampionshipsPodiums[1] > 0 ?
                                                <b>{this.state.skiFlyingWorldChampionshipsPodiums[1]}</b> : 0}</td>
                                            <td style={{backgroundColor: "#cd7f32"}}>{this.state.skiFlyingWorldChampionshipsPodiums[2] > 0 ?
                                                <b>{this.state.skiFlyingWorldChampionshipsPodiums[2]}</b> : 0}</td>
                                        </tr>

                                        <tr>
                                            <td><b>Four Hills Tournament</b></td>
                                            <td style={{textAlign: "center"}}>{this.state.fourHillsTournamentStarts}</td>
                                            <td style={{backgroundColor: "gold"}}>
                                                {this.state.fourHillsTournamentPodiums[0] > 0 ?
                                                    <b>{this.state.fourHillsTournamentPodiums[0]}</b> : 0}
                                            </td>
                                            <td style={{backgroundColor: "silver"}}>{this.state.fourHillsTournamentPodiums[1] > 0 ?
                                                <b>{this.state.fourHillsTournamentPodiums[1]}</b> : 0}</td>
                                            <td style={{backgroundColor: "#cd7f32"}}>{this.state.fourHillsTournamentPodiums[2] > 0 ?
                                                <b>{this.state.fourHillsTournamentPodiums[2]}</b> : 0}</td>
                                        </tr>

                                        <tr style={{cursor: "pointer"}}>
                                            <td><b>World Cup Overall</b></td>
                                            <td style={{textAlign: "center"}}>{this.state.worldCupOverallStarts}</td>
                                            <td style={{backgroundColor: "gold"}}>
                                                {this.state.worldCupOverallPodiums[0] > 0 ?
                                                    <b>{this.state.worldCupOverallPodiums[0]}</b> : 0}
                                            </td>
                                            <td style={{backgroundColor: "silver"}}>{this.state.worldCupOverallPodiums[1] > 0 ?
                                                <b>{this.state.worldCupOverallPodiums[1]}</b> : 0}</td>
                                            <td style={{backgroundColor: "#cd7f32"}}>{this.state.worldCupOverallPodiums[2] > 0 ?
                                                <b>{this.state.worldCupOverallPodiums[2]}</b> : 0}</td>
                                        </tr>

                                        <tr style={{cursor: "pointer"}}
                                            onClick={() =>{
                                                this.showModal(9, "World Cup")
                                            } }>
                                            <td><b>World Cup Competitions</b></td>
                                            <td style={{textAlign: "center"}}>{this.state.worldCupStarts}</td>
                                            <td style={{backgroundColor: "gold"}}>
                                                {this.state.worldCupPodiums[0] > 0 ?
                                                    <b>{this.state.worldCupPodiums[0]}</b> : 0}
                                            </td>
                                            <td style={{backgroundColor: "silver"}}>{this.state.worldCupPodiums[1] > 0 ?
                                                <b>{this.state.worldCupPodiums[1]}</b> : 0}</td>
                                            <td style={{backgroundColor: "#cd7f32"}}>{this.state.worldCupPodiums[2] > 0 ?
                                                <b>{this.state.worldCupPodiums[2]}</b> : 0}</td>
                                        </tr>
                                        </tbody>
                                    </Table>

                                </Col>

                            </Row>
                        </Col>

                        <Col>
                            <OverallStandingsTable overallStandings={this.state.overallStandings.sort((a,b) => a.season.season - b.season.season )}/>
                        </Col>

                        <div style={{paddingTop: "20px"}}>
                            <Tabs
                                defaultActiveKey={this.state.resultsSeasons[0]}
                                onSelect={season => {
                                    this.filterResults(parseInt(season))
                                }}
                            >
                                {this.state.resultsSeasons.map(season => (
                                    <Tab eventKey={season} title={season}>
                                        <ShowSkiJumperResultsTable
                                            results={this.state.results}
                                            photos={this.state.photos}
                                        />
                                    </Tab>
                                ))}
                            </Tabs>
                        </div>

                    </Container>
                    :
                    <Loader
                        type="ThreeDots"
                        color="#00BFFF"
                        height={80}
                        width={80}
                        style={{textAlign: 'center'}}
                    />}
            </div>
        )
    }

}

export default ShowSkiJumper

