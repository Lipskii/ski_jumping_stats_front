import React, {Component} from "react";
import axios from "axios";
import Loader from "react-loader-spinner";
import {Accordion, Card, Col, Container, Row} from "react-bootstrap";
import {LinkContainer} from "react-router-bootstrap";
import {AccordionWithPadding, Header5} from "../../components/StyledComponents";
import {Table} from "antd";
import ShowHillVersionTable from "./ShowHillVersionTable";
import ShowHillCompetitionsTable from "./ShowHillCompetitionsTable";


class ShowHill extends Component {
    state = {
        competitions: [],
        hill: '',
        hillRecords: [],
        latestHillVersion: '',
        oldestHillVersion: '',
        pageLoading: true,
        photos: [],
    }


    componentDidMount() {
        axios.all([
            axios.get("/api/hills?id=" + this.props.match.params.hill),
            axios.get("/api/competitions?hillId" + this.props.match.params.hill + '&hasResults=true')
        ])
            .then(axios.spread((
                hillData,
                competitionsData
            ) => {
                this.setState({
                    competitions: competitionsData.data,
                    hill: hillData.data[0]
                }, () => {
                    const sortedHillVersions = this.state.hill.hillVersions.sort(function (a, b) {
                        return new Date(b.validSince) - new Date(a.validSince);
                    })
                    this.setHillRecord(sortedHillVersions)
                    this.loadPhoto('flags/' + this.state.hill.venue.city.region.country.code, 'hillFlag')
                    this.loadPhoto('athletes/blankProfile', 'hillPhoto')
                    for(const competition of this.state.competitions){
                        this.loadPhoto('flags/' + competition.results[0].skiJumper.person.country.code, competition.results[0].skiJumper.person.country.code)
                    }

                    const latestHillVersion = sortedHillVersions[0]

                    const oldestHillVersion = sortedHillVersions[sortedHillVersions.length - 1]

                    this.setState({
                        latestHillVersion: latestHillVersion,
                        oldestHillVersion: oldestHillVersion,
                        pageLoading: false
                    })
                })
            }))
            .catch(error => {
                console.log(error)
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

    setHillRecord = (hillVersions) => {
        let hillRecords = this.state.hillRecords
        axios.get("/api/results/hillRecords?hillVersionId=" + hillVersions[0].id)
            .then(res => {
                if (res.data.length > 0) {
                    hillRecords.push(...res.data)
                    this.setState({
                        hillRecords: hillRecords
                    }, () => {
                        for (const hillRecord of hillRecords) {
                            this.loadPhoto('flags/' + hillRecord.result.skiJumper.person.country.code, 'recordHolder_' + hillRecord.result.skiJumper.person.id)
                        }
                    })
                }
            })
            .catch(error => console.log(error))
    }


    render() {

        console.log(this.state)

        return (
            <div style={{marginLeft: "13%", marginRight: "13%", paddingBottom: "50px"}}>
                {this.state.pageLoading !== true ?
                    <Container fluid>
                        <Col>
                            <Row>
                                <h1 style={{marginBottom: "60px", width: "100%"}}>
                                    <img
                                        height={"100%"}
                                        className="mr-3"
                                        src={this.state.photos['hillFlag']}
                                        alt="Generic placeholder"
                                    /> {this.state.hill.name}</h1>
                            </Row>
                        </Col>

                        <Col>
                            <Row>
                                <img
                                    height={"250px"}
                                    className="mr-3"
                                    src={this.state.photos['hillPhoto']}
                                    alt="Generic placeholder"
                                />
                                <Col style={{marginBottom: "10px"}}>
                                    {this.state.latestHillVersion !== '' ?
                                        <div>

                                            {this.state.latestHillVersion.kPoint !== null ?
                                                <Row sm={1}>
                                                    <Col>
                                                        <strong>K
                                                            point: </strong> {this.state.latestHillVersion.kPoint} m
                                                    </Col>
                                                </Row>
                                                : null}

                                            {this.state.latestHillVersion.hillSize !== null ?
                                                <Row sm={1}>
                                                    <Col>
                                                        <strong>HS: </strong> {this.state.latestHillVersion.hillSize} m
                                                    </Col>
                                                </Row>
                                                : null}


                                        </div> : null}

                                    <Row sm={1}>
                                        <Col>
                                            <strong>City: </strong> {this.state.hill.venue.city.name}
                                        </Col>
                                    </Row>

                                    <Row sm={1}>
                                        <Col>
                                            <strong>Venue: </strong> {this.state.hill.venue.name}
                                        </Col>
                                    </Row>

                                    <Row sm={1}>
                                        <Col>
                                            <strong>Opened
                                                in: </strong> {this.state.oldestHillVersion.validSince.substring(0, 4)}
                                        </Col>
                                    </Row>

                                    {this.state.hill.venue.capacity !== null && this.state.hill.venue.capacity !== 0 ?
                                        <Row sm={1}>
                                            <Col>
                                                <strong>Capacity: </strong> {this.state.hill.venue.capacity}
                                            </Col>
                                        </Row>
                                        : null}


                                    {this.state.hillRecords.length > 0 ?
                                        <div>
                                            <Row sm={1}>
                                                <Col>
                                                    <strong>Official Record:</strong> {this.state
                                                    .hillRecords[0].hillRecord} m
                                                </Col>
                                            </Row>
                                            {this.state.hillRecords.map(hillRecord => (
                                                <LinkContainer
                                                    to={'/skiJumper/' + hillRecord.result.skiJumper.id}
                                                    style={{cursor: "pointer"}}>
                                                    <Col>
                                                        <img
                                                            height={"100%"}
                                                            className="mr-3"
                                                            src={this.state.photos['recordHolder_' + hillRecord.result.skiJumper.person.id]}
                                                            alt="Generic placeholder"
                                                        />
                                                        {hillRecord.result.skiJumper.person.firstName} {hillRecord.result.skiJumper
                                                        .person.lastName} ({hillRecord.result.competition.date1})
                                                    </Col>
                                                </LinkContainer>
                                            ))}
                                        </div> : null}
                                </Col>
                                <Col>
                                </Col>
                            </Row>
                        </Col>

                        <ShowHillVersionTable
                            hillVersions={this.state.hill.hillVersions}
                        />

                        <ShowHillCompetitionsTable
                            competitions={this.state.competitions}
                            photos={this.state.photos}
                        />

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


export default ShowHill

