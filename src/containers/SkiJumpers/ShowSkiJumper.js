import React, {Component} from "react";
import axios from "axios";
import Loader from "react-loader-spinner";
import {Button, Col, Container, Row, Tab, Table, Tabs} from "react-bootstrap";
import ShowSkiJumperResultsTable from "./ShowSkiJumperResultsTable";


class ShowSkiJumper extends Component {
    state = {
        raceDirectorFlag: '',
        results: [],
        resultsSeasons: [],
        seasons: [],
        skiJumper: '',
        skiJumperAge: '',
        pageLoading: true,
        photos: [],
        wins: [],
    }


    componentDidMount() {
        axios.get("/api/skiJumpers?id=" + this.props.match.params.skiJumper)
            .then(res => {
                this.setState({
                    skiJumper: res.data[0],
                }, () => {
                    this.loadPhoto('flags/' + this.state.skiJumper.person.country.code, 'jumperFlag')
                    this.loadPhoto('athletes/blankProfile', 'jumperPhoto')
                    this.setResultsSeasons()
                    this.filterResults(this.state.resultsSeasons[0])
                    for (const result of this.state.skiJumper.results) {
                        this.loadPhoto('flags/' + result.competition.hillVersion.hill.venue.city.region.country.code, 'result_' + result.id)
                        this.setWins(result)
                    }

                    //Calculate age
                    let today = new Date(),
                        yearNow = today.getFullYear()
                    let yearBorn = this.state.skiJumper.person.birthdate.slice(0, 4)
                    this.setState({
                        skiJumperAge: yearNow - yearBorn,
                        pageLoading: false,
                    })
                })
            })
            .catch(error => {
                console.log(error)
            })
    }

    setWins = (result) => {
        if (result.totalRank === 1) {
            let winsUpdated = this.state.wins
            winsUpdated.push(result)
            this.setState({
                wins: winsUpdated
            })
        }
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
            <div style={{marginLeft: "15%", marginRight: "15%"}}>

                {this.state.pageLoading !== true ?
                    <Container fluid>
                        <Col>
                            <Row>
                                <h1 style={{marginBottom: "30px", width: "100%"}}><img
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
                                <Col>
                                    <Row m={1}>
                                        <Col>
                                            <b>Born: </b>
                                            {this.state.skiJumper.person.birthdate}, {this.state.skiJumper.person.city !== null ?
                                            <> {this.state.skiJumper.person.city.name}</> : null}
                                        </Col>
                                    </Row>
                                    {this.state.skiJumperAge !== '' ?
                                        <Row m={1}>
                                            <Col>
                                                <b>Age: </b> {this.state.skiJumperAge}
                                            </Col>
                                        </Row> : null}
                                    <Row m={1}>
                                        <Col>
                                            <b>Gender: </b>
                                            {this.state.skiJumper.person.gender !== null ?
                                                <> {this.state.skiJumper.person.gender.gender}</> : null}
                                        </Col>
                                    </Row>
                                    <Row m={1}>
                                        <Col>
                                            <b>Status: </b>
                                            {this.state.skiJumper.active === true ?
                                                <>Active</> : <>Retired ({this.state.resultsSeasons[0]})</>}
                                        </Col>
                                    </Row>
                                    <Row m={1}>
                                        <Col>
                                            <b>Club: </b>
                                            {this.state.skiJumper.skiClub !== null ?
                                                <> {this.state.skiJumper.skiClub.name}</> : null}
                                        </Col>
                                    </Row>
                                    <Row m={1}>
                                        <Col>
                                            <b>Skis: </b>
                                            {this.state.skiJumper.skis !== null ?
                                                <> {this.state.skiJumper.skis.brand}</> : null}
                                        </Col>
                                    </Row>


                                    <Button block variant={"outline-success"} size={"sm"}><b>World Cup
                                        wins: </b>{this.state.wins.length}</Button>


                                </Col>
                            </Row>
                        </Col>

                        <div style={{paddingTop: "30px"}}>
                            <Tabs
                                defaultActiveKey={this.state.resultsSeasons[0]}
                                onSelect={season => {
                                    console.log(season)
                                    this.filterResults(parseInt(season))
                                }
                                }

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

