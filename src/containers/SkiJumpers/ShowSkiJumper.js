import React, {Component} from "react";
import axios from "axios";
import Loader from "react-loader-spinner";
import {Col, Container, Row, Tab, Table, Tabs} from "react-bootstrap";
import ShowSkiJumperResultsTable from "./ShowSkiJumperResultsTable";


class ShowSkiJumper extends Component {
    state = {
        raceDirectorFlag: '',
        results: [],
        resultsSeasons: [],
        seasons: [],
        skiJumper: '',
        skiJumperAge: '',
        photos: []
    }


    componentDidMount() {
        axios.get("/api/skiJumpers?id=" + this.props.match.params.skiJumper)
            .then(res => {
                this.setState({
                    skiJumper: res.data[0],
                }, () => {
                    this.loadComponent('flags/' + this.state.skiJumper.person.country.code, 'jumperFlag')
                    this.loadComponent('athletes/blankProfile', 'jumperPhoto')
                    this.setResultsSeasons()
                    this.filterResults(this.state.resultsSeasons[0])
                    let today = new Date(),
                        yearNow = today.getFullYear()
                    let yearBorn = this.state.skiJumper.person.birthdate.slice(0, 4)
                    this.setState({
                        skiJumperAge: yearNow - yearBorn
                    })
                })
            })
            .catch(error => {
                console.log(error)
            })
    }

    filterResults = (season) => {
        const array = this.state.skiJumper.results.filter(result => result.competition.season.season === season)
        this.setState({
            results: array
        })
    }

    loadComponent = (code, element) => {
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
                    resultsSeasons: array.sort(function compareNumbers(a, b) {
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

                {this.state.skiJumper !== '' ?
                    <Container fluid>
                        <Row>
                            <h1 style={{marginBottom: "30px", width: "100%"}}><img
                                height={"100%"}
                                className="mr-3"
                                src={this.state.photos['jumperFlag']}
                                alt="Generic placeholder"
                            /> {this.state.skiJumper.person.firstName} {this.state.skiJumper.person.lastName}</h1>
                        </Row>
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
                                            <>Active</> : <>Retired</>}
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
                            </Col>

                        </Row>

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
                                        <ShowSkiJumperResultsTable results={this.state.results}/>
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

