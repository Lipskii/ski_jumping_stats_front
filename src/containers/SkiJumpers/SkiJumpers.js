import React, {Component} from "react";
import axios from "axios";
import {Container} from "react-bootstrap";
import Loader from "react-loader-spinner";
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
        skiClubs: [],
        skiJumpers: [],
        skis: [],
        upcomingCompetitions: [],
    }

    componentDidMount() {
        axios.all([
            axios.get('/api/cities?hasPeople=true'),
            axios.get('/api/countries?hasPeople=true'),
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
                pageLoading: false,
            }))
    }


    render() {
        console.log(this.state)
        return (
            <div style={{marginRight: "10%", marginLeft: "10%", paddingBottom: "10px"}}>
                {!this.state.pageLoading ? <Container fluid>
                        <SearchSkiJumpers
                            countries={this.state.countries}
                            competitions={this.state.competitions}
                            cities={this.state.cities}
                            genders={this.state.genders}
                            skiClubs={this.state.skiClubs}
                            skiJumpers={this.state.skiJumpers}
                            skis={this.state.skis}
                        />
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