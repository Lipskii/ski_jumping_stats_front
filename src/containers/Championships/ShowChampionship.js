import React, {Component} from "react";
import axios from "axios";
import {Col, Container, Row} from "react-bootstrap";
import Loader from "react-loader-spinner";
import fisLogo from "../../assets/fis_logo.png";
import ChampionshipEditionsTable from "./ChampionshipEditionsTable";

class ShowChampionship extends Component {
    state = {
        competitions: [],
        editions: [],
        filterSeason: 2021,
        filterLoading: false,
        pageLoading: true,
        photos: [],
        seasons: [],
        series: ''
    }

    async componentDidMount() {
        await this.fetchData()
    }

    fetchData = () => {
        axios.all([
            axios.get("/api/competitions?seriesMajorId=" + this.props.match.params.championship),
            axios.get("/api/series?id=" + this.props.match.params.championship)
        ]).then(axios.spread((
            competitionsData,
            seriesData
        ) => {

            let editions = []
            if(competitionsData.data.length > 0){
                editions = this.setEditions(competitionsData)
            }
            this.setState({
                competitions: competitionsData.data.reverse(),
                editions: editions,
                series: seriesData.data[0]
            }, () => {
                for (const competition of this.state.competitions) {
                    this.loadPhoto('flags/' + competition.hillVersion.hill.venue.city.region.country.code,
                        "flag_" + competition.hillVersion.hill.venue.city.region.country.code)

                    for(const result of competition.results){
                        if(result.totalRank < 4 && result.totalRank > 0){
                            this.loadPhoto('flags/' + result.skiJumper.person.country.code,
                                "flag_" + result.skiJumper.person.country.code)
                        }
                    }
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
        if (this.props.match.params.championship !== prevProps.match.params.championship) {
            this.setState({
                pageLoading: true
            }, () => this.fetchData())
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

    setEditions = (competitionsData) => {
        let editions = []
        for(const competition of competitionsData.data){
            let edition = {
                id: competition.hillVersion.hill.venue.city.name + competition.date1.slice(0,4),
                city: competition.hillVersion.hill.venue.city,
                year: competition.date1.slice(0,4),
                competitions: [competition]
            }

            const index = editions.findIndex(x => x.id === edition.id)
            if(index !== -1){
                editions[index].competitions.push(edition.competitions[0])
            } else {
                editions.push(edition)
            }
        }
        return editions
    }

    filter = () => {

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

                            <div style={{marginTop: "15px"}}>
                                <ChampionshipEditionsTable
                                    editions={this.state.editions}
                                    photos={this.state.photos}
                                    />
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

export default ShowChampionship