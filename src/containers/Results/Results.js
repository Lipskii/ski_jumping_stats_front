import React, {Component} from 'react'
import axios from "axios";
import {Button, Col, Pagination, Table} from "react-bootstrap";
import AddingModal from "../../components/Modals/AddingModal";
import CompletedModal from "../../components/Modals/CompletedModal";
import DeleteModal from "../../components/Modals/DeleteModal";
import {Header3, Header5, StyledDivCentered1200} from "../../components/StyledComponents";

class Results extends Component {

    state = {
        competitions: [],
        countries: [],
        equipmentControllers: [],
        hills: [],
        venues: [],
        selectedFile: ''
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


   //FILE UPLOAD TO BE USED LATER
    // onFileChangeHandler = (e) => {
    //     e.preventDefault();
    //     const formData = new FormData();
    //     formData.append('file', e.target.files[0])
    //     axios.post("/api/results/upload",formData)
    //         .then(res => {
    //             console.log(res.data);
    //             alert("File uploaded successfully.")
    //         })
    //         .catch(error => console.log(error))
    // };


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
                    {/*<div className="container">*/}
                    {/*    <div className="row">*/}
                    {/*        <div className="col-md-6">*/}
                    {/*            <div className="form-group files color">*/}
                    {/*                <label>Upload Your File </label>*/}
                    {/*                <input type="file" className="form-control" name="file" onChange={this.onFileChangeHandler}/>*/}
                    {/*            </div>*/}
                    {/*        </div>*/}
                    {/*    </div>*/}
                    {/*</div>*/}
                </StyledDivCentered1200>


            </React.Fragment>
        )
    }

}


export default Results