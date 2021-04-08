import React, {Component} from "react";
import axios from "axios";
import {Col, Container, Row} from "react-bootstrap";
import Loader from "react-loader-spinner";
import LatestResults from "./LatestResults";
import SearchResults from "./SearchResults";
import UpcomingCompetitions from "./UpcomingCompetitions";



class Results extends Component {
    state = {
        activePage: 1,
        cities: [],
        competitions: [],
        competitionsWithResults: [],
        competitionsLoading: true,
        countries: [],
        filterSeriesId: '',
        hills: [],
        pageLoading: true,
        seasons: [],
        series: [],
        sizesOfHill: [],
        upcomingCompetitions: [],
        venues: []
    }

    componentDidMount() {
        console.log(Date())
        let today = new Date(),
            date = today.getFullYear() + '-' + ("0" + (today.getMonth() + 1)).slice(-2) + '-' + ("0" + today.getDate()).slice(-2);
        console.log(date)

        axios.all([
            axios.get('/api/cities'),
            axios.get('/api/competitions?seriesMajorId=9&season=2021'),
            axios.get('/api/competitions?hasResults=true'),
            axios.get('/api/competitions?hasResults=false&after=' + date),
            axios.get('/api/countries'),
            axios.get('/api/hills'),
            axios.get('/api/seasons'),
            axios.get('/api/series'),
            axios.get('/api/sizeOfHill'),
            axios.get('/api/venues?hasHills=true'),

        ])
            .then(axios.spread((
                citiesData,
                competitionsData,
                competitionsWithResultsData,
                upcomingCompetitionsData,
                countriesData,
                hillsData,
                seasonsData,
                seriesData,
                sizesData,
                venuesData,
            ) => {
                this.setState({
                    cities: citiesData.data,
                    competitions: competitionsData.data.slice(0,20),
                    competitionsWithResults: competitionsWithResultsData.data,
                    countries: countriesData.data,
                    hills: hillsData.data,
                    seasons: seasonsData.data,
                    series: seriesData.data,
                    sizesOfHill: sizesData.data,
                    upcomingCompetitions: upcomingCompetitionsData.data,
                    venues: venuesData.data,
                })
            }))
            .catch(error => console.log(error))
            .finally(() => this.setState({
                competitionsLoading: false,
                pageLoading: false,
            }))
    }


    render() {
        console.log(this.state)
        return (
            <div style={{marginLeft: "30px", paddingBottom: "10px"}}>
                {!this.state.pageLoading ? <Container fluid>
                    <Row>
                        <SearchResults
                            competitions={this.state.competitions}
                            countries={this.state.countries}
                            series={this.state.series}
                            sizes={this.state.sizesOfHill}
                            venues={this.state.venues}
                        />
                        <Col sm={4}>
                            <UpcomingCompetitions competitions={this.state.upcomingCompetitions}/>
                            <LatestResults competitions={this.state.competitionsWithResults}/>
                        </Col>
                    </Row>
                </Container> : <Loader
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


export default Results