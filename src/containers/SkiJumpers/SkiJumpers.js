import React, {Component} from "react";
import axios from "axios";
import {Col, Container, Row} from "react-bootstrap";
import Loader from "react-loader-spinner";
import UpcomingCompetitions from "../Results/UpcomingCompetitions";
import LatestResults from "../Results/LatestResults";
import SearchResults from "../Results/SearchResults";
import SearchSkiJumpers from "./SearchSkiJumpers";




class SkiJumpers extends Component {
    state = {
        activePage: 1,
        cities: [],
        competitions: [],
        competitionsWithResults: [],
        competitionsLoading: true,
        countries: [],
        filterSeriesId: '',
        genders: [],
        hills: [],
        pageLoading: true,
        seasons: [],
        series: [],
        sizesOfHill: [],
        skiClubs: [],
        skis: [],
        upcomingCompetitions: [],
        venues: []
    }

    componentDidMount() {
        axios.all([
            axios.get('/api/cities?hasPeople=true'),
            axios.get('/api/countries'),
            axios.get('/api/genders'),
            axios.get('/api/skiClubs?hasJumpers=true'),
            axios.get('/api/skiJumpers'),
            axios.get('/api/skis')

        ])
            .then(axios.spread((
                citiesData,
                countriesData,
                gendersData,
                skiClubsData,
                skiJumpersData,
                skisData
            ) => {
                this.setState({
                    cities: citiesData.data,
                    countries: countriesData.data,
                    genders: gendersData.data,
                    skiClubs: skiClubsData.data,
                    skiJumpers: skiJumpersData.data,
                    skis: skisData.data
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
                        <SearchSkiJumpers
                            countries={this.state.countries}
                            competitions={this.state.competitions}
                            cities={this.state.cities}
                            genders={this.state.genders}
                            skiClubs={this.state.skiClubs}
                            skiJumpers={this.state.skiJumpers}
                            skis={this.state.skis}
                        />
                        <Col sm={4}>
                            {/*<UpcomingCompetitions competitions={this.state.upcomingCompetitions}/>*/}
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


export default SkiJumpers