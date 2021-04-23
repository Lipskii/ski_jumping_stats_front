import React, {Component} from "react";
import axios from "axios";
import {AccordionWithPadding} from "../../components/StyledComponents";
import Loader from "react-loader-spinner";
import fisLogo from "../../assets/fis_logo.png";
import {Accordion, Card, Col, Container, ListGroup, Row} from "react-bootstrap";
import ResultsTable from "./ResultsTable";
import TeamResultsTable from "./TeamResultsTable";


class ShowResults extends Component {
    state = {
        competition: '',
        locationFlag: '',
        raceDirectorFlag: '',
    }


    componentDidMount() {
        axios.get("/api/competitions?id=" + this.props.match.params.competition)
            .then(res => {
                this.setState({
                    competition: res.data[0],
                }, () => {
                    this.loadFlag(this.state.competition.hillVersion.hill.venue.city.region.country.code)
                })
            })
            .catch(error => {
                console.log(error)
            })

    }

    loadFlag = (code) => {
        if (code !== undefined) {
            import(`../../assets/flags/${code}.png`)
                .then(res => {
                    this.setState({
                        locationFlag: res.default
                    })
                })
        }
    }


    render() {

        console.log(this.state)

        return (
            <div style={{marginLeft: "30px", paddingBottom: "10px"}}>

                {this.state.competition !== '' ?

                    <Container fluid>
                        <Row>
                            <Col sm={8}>
                                <Row>
                                    <h3 style={{margin: "auto", marginBottom: "10px"}}>
                                        <img
                                            width={64}
                                            height={64}
                                            className="mr-3"
                                            src={fisLogo}
                                            alt="Generic placeholder"
                                        /> {this.state.competition.seriesMajor.name} </h3>
                                </Row>
                                {this.state.competition.seriesMinor !== null ?
                                    <Row>
                                        <small style={{margin: "auto", marginBottom: "10px"}}>
                                            ({this.state.competition.seriesMinor.name})
                                        </small>
                                    </Row> : null}
                                <Row>
                                    {this.state.competition.team ?
                                        <TeamResultsTable results={this.state.competition.teamResults}/>
                                        : <ResultsTable results={this.state.competition.results}/>}
                                </Row>
                            </Col>

                            <Col sm={4}>
                                <div style={{
                                    borderRadius: "10px",
                                    paddingLeft: "10px",
                                }}>
                                    <div style={{marginBottom: "20px", height: "20%"}}>
                                        <AccordionWithPadding defaultActiveKey="0">
                                            <Card>
                                                <Accordion.Toggle as={Card.Header} eventKey="0">
                                                    Basic info
                                                </Accordion.Toggle>
                                                <Accordion.Collapse eventKey="0">
                                                    <ListGroup variant="flush">
                                                        <ListGroup.Item style={{fontSize: "13px"}}>
                                                            <label style={{marginRight: "5px"}}>Date:</label>
                                                            <b>{this.state.competition.date1}</b>
                                                        </ListGroup.Item>
                                                        <ListGroup.Item style={{fontSize: "13px"}}>
                                                            <label style={{marginRight: "5px"}}>City:</label>
                                                            <img
                                                                alt={this.state.competition.hillVersion.hill.venue.city.region.country.code}
                                                                src={this.state.locationFlag}
                                                                style={{height: "15px", marginRight: "2px"}}/>
                                                            <b>  {this.state.competition.hillVersion.hill.venue.city.name}</b>
                                                        </ListGroup.Item>
                                                        <ListGroup.Item style={{fontSize: "13px"}}>
                                                            <label style={{marginRight: "5px"}}>Hill:</label>
                                                            <b>{this.state.competition.hillVersion.hill.name}</b>
                                                        </ListGroup.Item>
                                                        <ListGroup.Item style={{fontSize: "13px"}}>
                                                            <label style={{marginRight: "5px"}}>K:</label>
                                                            <b>{this.state.competition.hillVersion.kPoint} m</b>
                                                        </ListGroup.Item>
                                                        {this.state.competition.hillVersion.hillSize !== null ?
                                                            <ListGroup.Item style={{fontSize: "13px"}}>
                                                                <label style={{marginRight: "5px"}}>HS:</label>
                                                                <b>{this.state.competition.hillVersion.hillSize} m</b>
                                                            </ListGroup.Item>
                                                            : null}
                                                    </ListGroup>
                                                </Accordion.Collapse>
                                            </Card>
                                            <Card>
                                                <Accordion.Toggle as={Card.Header} eventKey="1">
                                                    Jury
                                                </Accordion.Toggle>
                                                <Accordion.Collapse eventKey="1">
                                                    <ListGroup variant="flush">
                                                        <ListGroup.Item style={{fontSize: "13px"}}>
                                                            {this.state.competition.raceDirector != null ? <div>
                                                                <label style={{marginRight: "5px"}}>Race
                                                                    director:</label>
                                                                <b>
                                                                    {this.state.competition.raceDirector.person.firstName} {this.state
                                                                    .competition.raceDirector.person.lastName}
                                                                </b>
                                                            </div> : <div>no info</div>}
                                                        </ListGroup.Item>
                                                    </ListGroup>
                                                </Accordion.Collapse>
                                            </Card>
                                            <Card>
                                                <Accordion.Toggle as={Card.Header} eventKey="2">
                                                    Judges
                                                </Accordion.Toggle>
                                                <Accordion.Collapse eventKey="2">
                                                    <ListGroup variant="flush">
                                                        <ListGroup.Item style={{fontSize: "13px"}}>
                                                            <label style={{marginRight: "5px"}}>Date:</label>
                                                            <b>{this.state.competition.date1}</b>
                                                        </ListGroup.Item>
                                                    </ListGroup>
                                                </Accordion.Collapse>
                                            </Card>
                                            <Card>
                                                <Accordion.Toggle as={Card.Header} eventKey="3">
                                                    Weather info
                                                </Accordion.Toggle>
                                                <Accordion.Collapse eventKey="3">
                                                    <ListGroup variant="flush">
                                                        <ListGroup.Item style={{fontSize: "13px"}}>
                                                            <label style={{marginRight: "5px"}}>Date:</label>
                                                            <b>{this.state.competition.date1}</b>
                                                        </ListGroup.Item>
                                                    </ListGroup>
                                                </Accordion.Collapse>
                                            </Card>
                                        </AccordionWithPadding>
                                    </div>
                                </div>
                            </Col>
                        </Row>

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


export default ShowResults

