import React, {Component} from "react";
import axios from "axios";
import {Button, Col, Container, Media, Row} from "react-bootstrap";
import {Header3, Header31, Header6, StyledDivCentered1200} from "../../components/StyledComponents";
import fisLogo from "../../assets/fis_logo.png"
import SelectInputForm from "../../components/CommonForms/SelectInputForm";
import {Select} from "antd";
import {Option} from "antd/es/mentions";
import Loader from "react-loader-spinner";
import LatestResults from "./LatestResults";
import SearchResults from "./SearchResults";


class Results extends Component {
    state = {
        activePage: 1,
        cities: [],
        competitions: [],
        competitionsLoading: true,
        countries: [],
        filterSeriesId: '',
        hills: [],
        pageLoading: true,
        seasons: [],
        series: [],
        sizesOfHill: [],
        venues: []
    }

    componentDidMount() {
        axios.all([
            axios.get('/api/cities'),
            axios.get('/api/competitions?hasResults=true'),
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
                countriesData,
                hillsData,
                seasonsData,
                seriesData,
                sizesData,
                venuesData,
            ) => {
                this.setState({
                    cities: citiesData.data,
                    competitions: competitionsData.data,
                    countries: countriesData.data,
                    hills: hillsData.data,
                    seasons: seasonsData.data,
                    series: seriesData.data,
                    sizesOfHill: sizesData.data,
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
                            countries={this.state.countries}
                            series={this.state.series}
                            sizes={this.state.sizesOfHill}
                            venues={this.state.venues}
                        />
                        <LatestResults competitions={this.state.competitions}/>
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