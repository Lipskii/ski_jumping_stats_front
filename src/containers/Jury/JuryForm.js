import React, { useState} from "react";
import {Formik} from "formik";
import { Header3, StyledDiv2Right1200, StyledForm} from "../../components/StyledComponents";
import {Button, Card, Col, Form, Row} from "react-bootstrap";
import FormikSelectInputForm from "../../components/CommonForms/FormikSelectInputForm";

import {JuryValidationSchema} from "./JuryValidationSchema";
import SelectInputForm from "../../components/CommonForms/SelectInputForm";
import NewPersonModal from "../../components/Modals/NewPersonModal";



const JuryForm = (props) => {

    const [showModal, setShowModal] = useState(false);
    const [currentCountry, setCurrentCountry] = useState("")

    return (
        <React.Fragment>
            {/*to prevent premature component did mount in NewCityModal*/}
            {showModal ? <NewPersonModal
                show={showModal}
                onHide={() => {
                    setShowModal(false)
                  //  setPeople(props.cities)
                }}
                country={currentCountry}
                countries={props.allCountries}
                cities={props.cities}
                afterAdding={() => {
                    setCurrentCountry("")
                }}
            /> : null}


            <Formik
                isInitialValid={false}
                initialValues={{
                    personId: '',
                    juryTypeId: '',
                }}
                validationSchema={JuryValidationSchema}
                onSubmit={(values) => {
                    props.onSubmit(values)
                }}
            >{({
                   handleSubmit,
               }) => (
                <StyledForm
                    onSubmit={(e) => {
                        e.preventDefault()
                        handleSubmit()
                    }}
                >
                    <Card style={{borderRadius: '10px', marginBottom: '30px'}}>
                        <Card.Header>
                            <Header3>Adding new jury</Header3>
                            <small>Fields with (*) are mandatory</small>
                        </Card.Header>
                        <Card.Body>
                            <SelectInputForm
                                title={"Country:"}
                                defaultValue={currentCountry}
                                onChange={e => {
                                    props.filterByCountry(e)
                                    setCurrentCountry(e.target.value)
                                }}
                            >
                                <option value={""}>All Countries...</option>
                                {props.countries.map(country =>
                                    <option key={country.id} value={country.id}>
                                        {country.name}
                                    </option>)}
                            </SelectInputForm>

                            <FormikSelectInputForm
                                name="personId"
                                label="Person*:"
                                hintTextDown={
                                    <a href="javascript:void(0)" onClick={() => {
                                        setShowModal(true)
                                    }
                                    }>Add new person</a>
                                }
                            >
                                <option value={""} disabled>Choose...</option>
                                {props.people.map(person => (
                                    <option key={person.id} value={person.id}>{person.firstName} {person.lastName}</option>
                                ))}
                            </FormikSelectInputForm>

                            <FormikSelectInputForm
                                name="juryTypeId"
                                label="Role*:"
                            >
                                <option value={""} disabled>Choose...</option>
                                {props.juryTypes.map(juryType => (
                                    <option key={juryType.id} value={juryType.id}>{juryType.juryType}</option>
                                ))}
                            </FormikSelectInputForm>


                            <StyledDiv2Right1200>
                                <Button type={"submit"}>Submit</Button>
                            </StyledDiv2Right1200>
                        </Card.Body>
                    </Card>

                </StyledForm>
            )}
            </Formik>
        </React.Fragment>
    )
}

export default JuryForm