import React, {useEffect, useState} from "react";
import NewCityModal from "../../../components/Modals/NewCityModal";
import {Formik, Field} from "formik";
import {ErrorLabel, Header3, StyledDiv2Right1200} from "../../../components/StyledComponents";
import {Button, Col, Form, Modal, Row} from "react-bootstrap";
import FormikTextInputForm from "../../../components/CommonForms/FormikTextInputForm";
import FormikSelectInputForm from "../../../components/CommonForms/FormikSelectInputForm";
import {AthletesValidationSchema} from "./AthletesValidationSchema";
import {FormikDatePicker} from "../../../components/CommonForms/FormikDatePicker";
import bsCustomFileInput from 'bs-custom-file-input';
import axios from "axios";

const AthletesForm = (props) => {

    const [showModal, setShowModal] = useState(false);
    const [currentCountry, setCurrentCountry] = useState("")
    const [cities, setCities] = useState(props.cities)
    useEffect(() => {
        bsCustomFileInput.init()
    })

    const updateCities = () => {
        console.log("UPDATE CITIES")
        axios.get("/api/cities")
            .then(res => {
                setCities(res.data)
            })
            .catch(e => console.log(e))
    }

    return (
        <React.Fragment>


            <Formik
                isInitialValid={false}
                initialValues={{
                    active: props.initialActive,
                    birthdate: props.initialBirthdate,
                    cityId: props.initialCityId,
                    clubId: props.initialClubId,
                    countryId: props.initialCountryId,
                    fisCode: props.initialFisCode,
                    genderId: props.initialGenderId,
                    firstName: props.initialFirstName,
                    lastName: props.initialLastName,
                    skisId: props.initialSkisId,
                    customFile: '',
                    file: ''
                }}
                validationSchema={AthletesValidationSchema}
                onSubmit={(values) => {
                    console.log("formik on submit")
                    props.onSubmit(values)
                }}
            >{({
                   handleSubmit,
                   setFieldValue,
                   touched,
                   errors
               }) => (
                <Modal show={props.show} size={"xl"} scrollable={true} onHide={props.onHide}>

                    {/*to prevent premature component did mount in NewCityModal*/}
                    {showModal ?
                        <NewCityModal
                            show={showModal}
                            onHide={() => {
                                setShowModal(false)
                                updateCities()
                            }}
                            country={currentCountry}
                            countries={props.countries}
                            cities={cities}
                        /> : null}

                    <Modal.Header closeButton>
                        <Header3>{props.mainHeader}</Header3>
                    </Modal.Header>
                    <Modal.Body>
                        <Form
                            style={{marginTop: "10px"}}
                            onSubmit={(e) => {
                                e.preventDefault()
                                handleSubmit()
                            }}
                        >

                            <small>Fields with (*) are mandatory</small>
                            <FormikTextInputForm
                                name="firstName"
                                label="First name*:"
                            />

                            <FormikTextInputForm
                                name="lastName"
                                label="Last name*:"
                            />

                            <FormikSelectInputForm
                                key={props.genders}
                                name="genderId"
                                label="Gender*:"

                            >
                                <option value={""} disabled>Choose...</option>
                                {props.genders.map(gender => (
                                    <option key={gender.id} value={gender.id}>{gender.gender}</option>
                                ))}
                            </FormikSelectInputForm>

                            <FormikDatePicker
                                name="birthdate"
                                label={"Birthdate*:"}
                            />

                            <FormikSelectInputForm
                                name="countryId"
                                label="Country*:"
                                onChange={e => {
                                    setFieldValue("countryId", e.target.value)
                                    setCurrentCountry(e.target.value)
                                }}
                            >
                                <option value={""} disabled>Choose...</option>
                                {props.countries.map(country => (
                                    <option key={country.id} value={country.id}>{country.name}</option>
                                ))}
                            </FormikSelectInputForm>


                            <FormikSelectInputForm
                                name="cityId"
                                label="City:"
                                hintTextDown={
                                    <a href="javascript:void(0)" onClick={() => {
                                        setShowModal(true)
                                    }
                                    }>Create new city</a>
                                }
                            >
                                <option value={""}>No info</option>
                                {cities.map(city => (
                                    <option key={city.id}
                                            value={city.id}>{city.name}, {city.region.country.code}</option>
                                ))}
                            </FormikSelectInputForm>

                            <FormikSelectInputForm
                                key={props.clubs}
                                name="clubId"
                                label="Club:"
                            >
                                <option value={""}>No info</option>
                                {props.clubs.map(club => (
                                    <option key={club.id} value={club.id}>{club.name}</option>
                                ))}
                            </FormikSelectInputForm>

                            <FormikSelectInputForm
                                name="skisId"
                                label="Skis:"
                            >
                                <option value={""}>No info</option>
                                {props.skis.map(skis => (
                                    <option key={skis.id} value={skis.id}>{skis.brand}</option>
                                ))}
                            </FormikSelectInputForm>


                            <Form.Group as={Row}>
                                <Form.Label column sm={2}>Active:</Form.Label>
                                <Col sm={10}>
                                    <Field style={{marginTop: "15px"}} type="checkbox" name="active"/>
                                </Col>
                            </Form.Group>

                            <FormikTextInputForm
                                name="fisCode"
                                label="FIS code:"
                            />


                            <Form.Group as={Row}>
                                <Form.Label column sm={2}>Photo:</Form.Label>
                                <Col sm={10}>
                                    <input id="file" name="file" type="file" onChange={(event) => {
                                        setFieldValue("file", event.currentTarget.files[0]);
                                    }}/>
                                    {touched.file && errors.file ? (
                                        <ErrorLabel>{errors.file}</ErrorLabel>
                                    ) : null}
                                </Col>
                            </Form.Group>

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

export default AthletesForm