import React, {Component} from "react";
import axios from "axios";
import {Container} from "react-bootstrap";
import Loader from "react-loader-spinner";
import SearchHills from "./SearchHills";



class Hills extends Component {
    state = {
        activePage: 1,
        cities: [],
        countries: [],
        hills: [],
        hillRecords: [],
        pageLoading: true,
        sizes: [],
        venues: [],

    }

    componentDidMount() {

        axios.all([
            axios.get("/api/hills"),
            axios.get('/api/cities' ),
            axios.get('/api/countries/venues'),
            axios.get('/api/sizeOfHill'),
            axios.get('/api/venues?hasHills=true'),

        ])
            .then(axios.spread((
                hillsData,
                citiesData,
                countriesData,
                sizesData,
                venuesData,
            ) => {
                this.setState({
                    hills: hillsData.data,
                    cities: citiesData.data,
                    countries: countriesData.data,
                    sizes: sizesData.data,
                    venues: venuesData.data,
                }, () => {
                            for (const hill of this.state.hills) {
                                this.setHillRecords(hill)
                            }
                })
            }))
            .catch(error => console.log(error))
            .finally(() => this.setState({
                competitionsLoading: false,
                pageLoading: false,
            }))
    }

    setHillRecords = (hill) => {
        if (hill.hillVersions.length > 0) {
            let hillRecords = this.state.hillRecords
            axios.get("/api/results/hillRecords?hillVersionId=" + hill.hillVersions[0].id)
                .then(res => {
                    if (res.data.length > 0) {
                        hillRecords.push(...res.data)
                        this.setState({
                            hillRecords: hillRecords
                        })
                    }
                })
                .catch(error => console.log(error))
        }
    }

    render() {
        console.log(this.state)
        return (
            <div style={{marginRight: "10%", marginLeft: "10%", paddingBottom: "10px"}}>
                {!this.state.pageLoading ? <Container fluid>
                    <SearchHills
                        cities={this.state.cities}
                        countries={this.state.countries}
                        hills={this.state.hills}
                        hillRecords={this.state.hillRecords}
                        sizes={this.state.sizes}
                        venues={this.state.venues}
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


export default Hills