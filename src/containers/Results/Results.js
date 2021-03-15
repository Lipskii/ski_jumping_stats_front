import React, {Component} from 'react'
import axios from "axios";
import {Button, Pagination, Table} from "react-bootstrap";
import AddingModal from "../../components/Modals/AddingModal";
import CompletedModal from "../../components/Modals/CompletedModal";
import DeleteModal from "../../components/Modals/DeleteModal";
import {Header3, Header5, StyledDivCentered1200} from "../../components/StyledComponents";

//TODO finish it tommorrow
class Results extends Component {

    state = {
        competitions: [],
        countries: [],
        equipmentControllers: [],
        hills: [],
        venues: [],
    }

    componentDidMount() {
        axios.all([
            axios.get('/api/cities'),
            axios.get('/api/countries'),
            axios.get('/api/hills'),
            axios.get('/api/jury/ec'),
            axios.get('/api/venues')

        ])
            .then(axios.spread((citiesData,
                                countriesData,
                                hillsData,
                                controllersData,
                                venuesData

            ) => {
                this.setState({
                    cities: citiesData.data,
                    countries: countriesData.data,
                    equipmentControllers: controllersData.data,
                    hills: hillsData.data,
                    venues: venuesData.data
                })
            }))
            .catch(error => console.log(error))
    }


    render() {
        console.log(this.state)

        return (
            <React.Fragment>
                <AddingModal show={this.state.showAddingModal}/>
                <CompletedModal
                    show={this.state.showCompletedModal}
                    text={this.state.completedModalText}
                    onHide={() => this.setState({
                        showCompletedModal: false,
                        completedModalText: ""
                    })}
                    status={this.state.completedModalStatus}
                />

                <DeleteModal
                    show={this.state.showDeleteModal}
                    onHide={() => this.setState({
                        showDeleteModal: false,
                        juryToDelete: ''
                    })}
                    title={"the jury"}
                    handleDelete={this.deleteAthlete}
                />

                <Header3>Results</Header3>

                <StyledDivCentered1200>
                    <Header5>Recent results</Header5>


                </StyledDivCentered1200>


            </React.Fragment>
        )
    }

}


export default Results