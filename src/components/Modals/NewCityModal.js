import React, {Component} from "react";
import {Form, Formik} from "formik";
import axios from "axios";
import * as Yup from 'yup';
import {Button, Modal} from "react-bootstrap";
import SelectInputForm from "../CommonForms/SelectInputForm";
import FormikSelectInputForm from "../CommonForms/FormikSelectInputForm";
import {Header3, StyledDiv2Right1200} from "../StyledComponents";
import FormikTextInputForm from "../CommonForms/FormikTextInputForm";
import AddingModal from "./AddingModal";
import CompletedModal from "./CompletedModal";

class NewCityModal extends Component {

    state = {
        completedModalStatus: true,
        countries: this.props.countries,
        country: "",
        regions: [],
        showAddingModal: false,
        showCompletedModal: false,
    }


    componentDidMount() {

    }

    updateRegions = () => {
        let urlString
        if (this.state.country === "" || this.state.country === undefined) {
            urlString = '/api/regions'
        } else {
            urlString = "/api/regions/country/" + this.state.country
        }
        axios.get(urlString)
            .then(res => {
                this.setState({
                    regions: res.data
                })
            })
            .catch(error => console.log(error))
    }

    onSubmit = (values) => {
        axios.post("/api/cities", {
            name: values.name,
            region: this.state.regions.find(region => region.id = values.regionId)
        })
            .then(() => {
                this.setState({
                    showAddingModal: false,
                    showCompletedModal: true,
                    completedModalStatus: true,
                    completedModalText: values.name + " added!"
                })
            })
            .catch(error => {
                console.log(error)
                this.setState({
                    showAddingModal: false,
                    showCompletedModal: true,
                    completedModalStatus: false,
                    completedModalText: "Ups, something went wrong. Try again."
                })
            } )
    }


    render() {

        console.log(this.state)
        console.log(this)

        return (
            <React.Fragment>
                <AddingModal
                    show={this.state.showAddingModal}
                    onHide={() => this.setState({
                        showAddingModal: false
                    })}
                />
                <CompletedModal
                    show={this.state.showCompletedModal}
                    text={this.state.completedModalText}
                    onHide={() => this.setState({
                        showCompletedModal: false,
                        completedModalText: ""
                    })}
                    status={this.state.completedModalStatus}
                />
                <Formik
                    isInitialValid={false}
                    initialValues={{
                        name: '',
                        regionId: ''
                    }}
                    validationSchema={Yup.object({
                        name: Yup.string()
                            .required('Required'),
                        regionId: Yup.number()
                            .required('Required')
                    })}
                    onSubmit={values =>{
                        this.setState({
                            showAddingModal: true
                        }, () =>  this.onSubmit(values))
                    }}>
                    {({
                          handleSubmit

                      }) => (
                        <Modal show={this.props.show} onHide={this.props.onHide}>
                            <Modal.Header closeButton>
                                <Header3>New city</Header3>
                            </Modal.Header>
                            <Modal.Body>
                                <small>Fields with (*) are mandatory</small>
                                <Form style={{marginTop: "10px"}} onSubmit={e => {
                                    e.preventDefault()
                                    handleSubmit()
                                }}>

                                    <FormikTextInputForm
                                        name="name"
                                        label="Name*:"
                                    />

                                    <SelectInputForm
                                        title={"Country:"}
                                        defaultValue={""}
                                        onChange={e => {
                                            this.setState({
                                                country: e.target.value
                                            }, () => this.updateRegions())
                                        }}
                                    >
                                        <option value={""}>All Countries...</option>
                                        {this.state.countries.map(country =>
                                            <option key={country.id} value={country.id}>
                                                {country.name}
                                            </option>)}
                                    </SelectInputForm>

                                    <FormikSelectInputForm
                                        name="regionId"
                                        label="Region*:"
                                    >
                                        <option value={""} disabled>Choose...</option>
                                        {this.state.regions.map(region => (
                                            <option key={region.id} value={region.id}>{region.name}</option>
                                        ))}
                                    </FormikSelectInputForm>

                                    <StyledDiv2Right1200>
                                        <Button type={"submit"}>Submit</Button>
                                    </StyledDiv2Right1200>

                                </Form>
                            </Modal.Body>
                        </Modal>
                    )}
                </Formik>
            </React.Fragment>
        )
    }

}

export default NewCityModal