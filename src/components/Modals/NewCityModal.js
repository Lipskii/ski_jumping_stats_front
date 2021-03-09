import React, {Component} from "react";
import {Form, Formik} from "formik";
import axios from "axios";
import * as Yup from 'yup';
import {Button, Card, Modal} from "react-bootstrap";
import SelectInputForm from "../CommonForms/SelectInputForm";
import FormikSelectInputForm from "../CommonForms/FormikSelectInputForm";
import {Header3, StyledDiv2Right1000} from "../StyledComponents";
import FormikTextInputForm from "../CommonForms/FormikTextInputForm";

class NewCityModal extends Component {

    state = {
        countries: this.props.countries,
        country: "",
        regions: [],
    }


    componentDidMount() {
        this.updateRegions()
    }

    updateRegions = () => {
        let urlString
        if(this.state.country === "" || this.state.country === undefined){
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
        axios.post("/api/city",{
            name: values.name,
            region: this.state.regions.find(region => region.id = values.regionId)
        })
            .then(res => {
                if(res.status === 200){
                    this.props.afterAdding()
                    window.alert(values.name + " added!")
                } else{
                    window.alert("Something went wrong")
                }
                }
            )
            .catch(error => console.log(error))

    }


    render() {

        console.log(this.state)

        return (
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
                onSubmit={values => this.onSubmit(values)}>
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

                                <StyledDiv2Right1000>
                                    <Button type={"submit"}>Submit</Button>
                                </StyledDiv2Right1000>

                            </Form>
                        </Modal.Body>
                    </Modal>
                )}
            </Formik>
        )
    }

}

export default NewCityModal