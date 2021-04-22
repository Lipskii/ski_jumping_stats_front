import React, {Component} from "react";
import {Form, Formik} from "formik";
import axios from "axios";
import * as Yup from 'yup';
import {Button, Modal} from "react-bootstrap";
import FormikSelectInputForm from "../CommonForms/FormikSelectInputForm";
import {Header3, StyledDiv2Right1200} from "../StyledComponents";
import FormikTextInputForm from "../CommonForms/FormikTextInputForm";
import NewCityModal from "./NewCityModal";
import {FormikDatePicker} from "../CommonForms/FormikDatePicker";
import AddingModal from "./AddingModal";
import CompletedModal from "./CompletedModal";


class NewPersonModal extends Component {

    state = {
        countries: this.props.countries,
        country: "",
        cities: [],
        genders: [],
        showCityModal: false,
        showCompletedModal: false,
        completedModalText: '',
        completedModalStatus: false,
        showAddingModal: false,
    }


    componentDidMount() {
        axios.get("/api/genders")
            .then(res => this.setState({
                genders: res.data
            }))
            .catch(error => console.log(error))
            .finally(() => this.updateCities())
    }

    updateCities = () => {
        let urlString
        if(this.state.country === "" || this.state.country === undefined){
            urlString = '/api/cities'
        } else {
            urlString = "/api/cities/country/" + this.state.country
        }
        axios.get(urlString)
            .then(res => {
                this.setState({
                       cities: res.data
                })
            })
            .catch(error => console.log(error))
    }

    onSubmit = (values) => {

        let successful = true
        axios.post('api/people', {
            firstName: values.firstName,
            lastName: values.lastName,
            gender: this.state.genders.find(gender => gender.id === parseInt(values.genderId)),
            birthdate: values.birthdate,
            country: this.state.countries.find(country => country.id === parseInt(values.countryId)),
            city: this.state.cities.find(city => city.id === parseInt(values.cityId))
        })
            .then(res => {
                console.log(res)
            })
            .catch(error => {
                console.log(error)
                successful = false
            })
            .finally(() => {
                let modalText
                if (successful) {
                    modalText = values.firstName + " " + values.lastName + " added."
                } else {
                    modalText = "Ups, there was a problem. Try again."
                }
                this.setState({
                    showCompletedModal: true,
                    completedModalText: modalText,
                    completedModalStatus: successful,
                    showAddingModal: false,
                })
            })
    }


    render() {

        console.log(this.state)

        return (
            <React.Fragment>
                {this.state.showCityModal ?  <NewCityModal
                    show={this.state.showCityModal}
                    onHide={() => {
                        this.updateCities()
                        this.setState({
                            showCityModal: false
                        })
                    }}
                    countries={this.state.countries}
                    cities={this.state.cities}
                /> : null}

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

            <Formik
                isInitialValid={false}
                initialValues={{

                    birthdate: '',
                    cityId: '',
                    countryId: '',
                    firstName: '',
                    genderId: '',
                    lastName: ''
                }}
                validationSchema={Yup.object({
                    firstName: Yup.string()
                        .required('Required'),
                    lastName: Yup.string()
                        .required('Required'),
                    birthdate: Yup.date()
                        .required('Required'),
                    cityId: Yup.number()
                        .required('Required'),
                    countryId: Yup.number()
                        .required('Required'),
                    genderId: Yup.number()
                        .required('Required'),

                })}
                onSubmit={values => {
                    this.setState({
                        showAddingModal: true
                    },() =>   this.onSubmit(values))
                }}>
                {({
                      handleSubmit
                  }) => (
                    <Modal show={this.props.show} onHide={this.props.onHide} size={"xl"}>
                        <Modal.Header closeButton>
                            <Header3>New Person</Header3>
                        </Modal.Header>
                        <Modal.Body>
                            <small>Fields with (*) are mandatory</small>
                            <Form style={{marginTop: "10px"}} onSubmit={e => {
                                e.preventDefault()
                                handleSubmit()
                            }}>

                                <FormikTextInputForm
                                    name="firstName"
                                    label="First name*:"
                                />

                                <FormikTextInputForm
                                    name="lastName"
                                    label="Last name*:"
                                />

                                <FormikSelectInputForm
                                    name="countryId"
                                    label="Country*:"
                                >
                                    <option value={""} disabled>Choose...</option>
                                    {this.state.countries.map(country => (
                                        <option key={country.id} value={country.id}>{country.name}</option>
                                    ))}
                                </FormikSelectInputForm>

                                <FormikSelectInputForm
                                    name="cityId"
                                    label="City*:"
                                    hintTextDown={
                                        <a href="javascript:void(0)" onClick={() => {
                                            this.setState({
                                                showCityModal: true
                                            })
                                        }
                                        }>Create new city</a>
                                    }
                                >
                                    <option value={""} disabled>Choose...</option>
                                    {this.state.cities.map(city => (
                                        <option key={city.id} value={city.id}>{city.name}</option>
                                    ))}
                                </FormikSelectInputForm>

                                <FormikSelectInputForm
                                    name="genderId"
                                    label="Gender*:"
                                >
                                    <option value={""} disabled>Choose...</option>
                                    {this.state.genders.map(gender => (
                                        <option key={gender.id} value={gender.id}>{gender.gender}</option>
                                    ))}
                                </FormikSelectInputForm>

                                <FormikDatePicker
                                    name="birthdate"
                                    label={"Birthdate*:"}
                                />

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

export default NewPersonModal