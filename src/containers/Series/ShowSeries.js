import React, {Component} from "react";
import axios from "axios";
import {Col, Container, Row, Tab, Tabs} from "react-bootstrap";
import Loader from "react-loader-spinner";
import fisLogo from "../../assets/fis_logo.png";
import {Select} from "antd";
import SearchingField from "../Results/SearchingField";
import SeriesOverallStandingsTable from "./SeriesOverallStandingsTable";
import SeriesScheduleTable from "./SeriesScheduleTable";
import SeriesPodiumTable from "./SeriesPodiumTable";

class ShowSeries extends Component {
    state = {
        competitions: [],
        filterSeason: 2021,
        overallStandings: [],
        overallStandingsPodiums: [],
        filterLoading: false,
        pageLoading: true,
        photos: [],
        seasons: [],
        series: ''
    }


    componentDidMount() {
       this.fetchData()
    }

    fetchData = () =>{
        let seriesGet = this.getSeriesGetUrl()
        axios.all([
            axios.get(seriesGet),
            axios.get("/api/overallStandings?seriesId=" + this.props.match.params.series + "&season=" + 2021),
            axios.get("/api/overallStandings?seriesId=" + this.props.match.params.series + "&rankingLessThan=4"
                + "&rankingGreaterThan=0"),
            axios.get("/api/series?id=" + this.props.match.params.series),
            axios.get("/api/seasons"),
        ]).then(axios.spread((
            competitionsData,
            overallStandingsData,
            overallStandingsPodiumsData,
            seriesData,
            seasonsData,
        ) => {
            let overallStandingsPodiumsDataSorted =  overallStandingsPodiumsData.data.sort((a,b) => parseInt(b.season.season) - parseInt(a.season.season))
            this.setState({
                competitions: competitionsData.data.reverse(),
                overallStandings: overallStandingsData.data,
                overallStandingsPodiums: overallStandingsPodiumsDataSorted,
                seasons: seasonsData.data,
                series: seriesData.data[0],
            }, () => {
                for (const overallStanding of this.state.overallStandings) {
                    this.loadPhoto('flags/' + overallStanding.skiJumper.person.country.code, "flag_" + overallStanding.skiJumper.person.country.code)
                }
                for (const overallStanding of this.state.overallStandingsPodiums) {
                    this.loadPhoto('flags/' + overallStanding.skiJumper.person.country.code, "flag_" + overallStanding.skiJumper.person.country.code)
                }
                for (const competition of this.state.competitions) {
                    this.loadPhoto('flags/' + competition.hillVersion.hill.venue.city.region.country.code,
                        "flag_" + competition.hillVersion.hill.venue.city.region.country.code)
                }
                this.setState({
                    pageLoading: false
                })
            })
        }))
            .catch(error => {
                console.log(error)
            })
    }

    componentDidUpdate(prevProps, prevState, snapshot) {
        if(this.props.match.params.series !== prevProps.match.params.series){
            this.setState({
                pageLoading: true
            }, () =>  this.fetchData() )
        }
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

    getSeriesGetUrl = () =>{
        let seriesGet = "/api/competitions?seriesMajorId=" + this.props.match.params.series + "&season=" + this.state.filterSeason
        if(parseInt(this.props.match.params.series) === 12 || parseInt(this.props.match.params.series) === 18 || parseInt(this.props.match.params.series) === 10){
            seriesGet = "/api/competitions?seriesMinorId=" + this.props.match.params.series + "&season=" + this.state.filterSeason
        }
        return seriesGet
    }

    filter = () => {
        let seriesGet = this.getSeriesGetUrl()
        axios.all([
            axios.get(seriesGet),
            axios.get("/api/overallStandings?seriesId=" + this.props.match.params.series + "&season=" + this.state.filterSeason),
        ]).then(axios.spread((
            competitionsData,
            overallStandingsData
            ) => {
                this.setState({
                    competitions: competitionsData.data.reverse(),
                    filterLoading: false,
                    overallStandings: overallStandingsData.data,
                })
            }
        ))
            .catch(error => {
                console.log(error)
            })
    }


    render() {

        console.log(this.state)

        return (
            <div style={{marginLeft: "5%", marginRight: "5%", paddingBottom: "50px"}}>
                {this.state.pageLoading !== true ?
                    <Container fluid>
                        <Col>
                            <Row>
                                <h1 style={{marginBottom: "60px", width: "100%", textAlign: "center"}}>
                                    <img
                                        width={"50px"}
                                        className="mr-3"
                                        src={fisLogo}
                                        alt="Generic placeholder"
                                    />
                                    {this.state.series.name}
                                </h1>
                            </Row>
                            <SearchingField
                                label={"Select season:"}
                                defaultValue={this.state.seasons[2].season}
                                placeholder={"Select season"}
                                onChange={(id) => {
                                    this.setState({
                                        filterLoading: true,
                                        filterSeason: id
                                    }, () => this.filter())
                                }}
                            >
                                {this.state.seasons.map(season =>
                                    <Select.Option key={season.id} value={season.season}>
                                        {season.season - 1}/{(season.season).toString().slice(2, 4)}
                                    </Select.Option>)}
                            </SearchingField>

                            <div style={{marginTop: "20px"}}>
                            <Tabs defaultActiveKey={1}>
                                <Tab eventKey={1} title={"Standings"}>
                                    <SeriesOverallStandingsTable
                                        filterLoading={this.state.filterLoading}
                                        overallStandings={this.state.overallStandings}
                                        photos={this.state.photos}
                                    />
                                </Tab>
                                <Tab eventKey={2} title={"Schedule"}>
                                    <SeriesScheduleTable
                                        filterLoading={this.state.filterLoading}
                                        competitions={this.state.competitions}
                                        photos={this.state.photos}
                                    />
                                </Tab>
                                <Tab eventKey={3} title={"Past podiums"}>
                                    <SeriesPodiumTable
                                        filterLoading={this.state.filterLoading}
                                        overallStandings={this.state.overallStandingsPodiums}
                                        photos={this.state.photos}
                                    />
                                </Tab>
                            </Tabs>
                            </div>
                        </Col>

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

export default ShowSeries