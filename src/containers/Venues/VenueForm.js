import React from "react";
import {Formik} from "formik";
import {VenuesValidationSchema} from "./VenuesValidationSchema";
import {
    ErrorLabel,
    Header3,
    StyledDiv2Right1000,
    StyledDivCentered1000,
    StyledForm
} from "../../components/StyledComponents";
import {Button, Card, Col, Form, Row} from "react-bootstrap";
import FormikTextInputForm from "../../components/CommonForms/FormikTextInputForm";
import FormikSelectInputForm from "../../components/CommonForms/FormikSelectInputForm";
import SelectInputForm from "../../components/CommonForms/SelectInputForm";


const VenueForm = (props) =>{

    return (
    <Formik
        isInitialValid={false}
        initialValues={{
            name: props.initialName,
            capacity: '',
            cityId: '',
            skiClubId: '',
            yearOfOpening: '',
        }}
        validationSchema={VenuesValidationSchema}
        onSubmit={(values) => {
            props.onSubmit(values)
        }}
    >{({
           handleSubmit,
           errors,
           touched,
        values

       }) => (
        <StyledForm onSubmit={(e) => {
            e.preventDefault()
            handleSubmit()
        }}>


            <Card style={{borderRadius: '10px'}}>
                <Card.Header>
                    <Header3>{props.mainHeader}</Header3>
                    <small>Fields with (*) are mandatory</small>
                </Card.Header>
                <Card.Body>
                    <FormikTextInputForm
                        name="name"
                        label="Name*:"
                    />

                    <SelectInputForm
                        title={"Country*:"}
                        defaultValue={""}
                        onChange={e => props.filterByCountry(e)}
                    >
                        <option value={""} disabled>Choose...</option>
                        {props.countries.map(country =>
                            <option key={country.id} value={country.id}>
                                {country.name}
                            </option>)}
                    </SelectInputForm>

                    <FormikSelectInputForm
                        name="cityId"
                        label="City*:"
                        disabled={props.cities.length < 1}
                        // TODO
                        hintTextDown={ <a href={""} onClick={console.log("SIEMA")}>Create new city</a>}
                    >
                        <option value={""} disabled>Choose...</option>
                        {props.cities.map(city => (
                            <option key={city.id} value={city.id}>{city.name}</option>
                        ))}
                    </FormikSelectInputForm>






                    <FormikSelectInputForm
                        name="skiClubId"
                        label="Club*:"
                        disabled={props.clubs.length < 1}
                    >
                        <option value={""} disabled>Choose...</option>
                        {props.clubs.map(club => (
                            <option key={club.id} value={club.id}>{club.name}</option>
                        ))}
                    </FormikSelectInputForm>

                    <FormikTextInputForm
                        name="yearOfOpening"
                        label="Opened in*:"
                    />

                    <FormikTextInputForm
                        name="capacity"
                        label="Capacity*:"
                    />

                    <StyledDiv2Right1000>
                        <Button type={"submit"}>Submit</Button>
                    </StyledDiv2Right1000>
                </Card.Body>
            </Card>
        </StyledForm>
    )}

    </Formik>

)}

export default VenueForm