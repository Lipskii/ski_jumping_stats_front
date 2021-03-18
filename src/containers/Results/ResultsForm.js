import React, {useState} from "react";
import {Formik} from "formik";
import {
    AccordionWithPadding, ErrorLabel,
    Header3,
    Header5,
    StyledDiv2Right1200,
    StyledForm
} from "../../components/StyledComponents";
import {Accordion, Button, Card, Col, Form, Row} from "react-bootstrap";
import SelectInputForm from "../../components/CommonForms/SelectInputForm";
import {ResultsValidationSchema} from "./ResultsValidationSchema";
import FormikSelectInputForm from "../../components/CommonForms/FormikSelectInputForm";
import {FormikDatePicker} from "../../components/CommonForms/FormikDatePicker";



const ResultsForm = (props) => {

    const [showModal, setShowModal] = useState(false)
    const [venues, setVenues] = useState(props.venues)
    const [hills, setHills] = useState([])
    const [hillVersions, setHillVersions] = useState([])
    const [isTwoDayCompetition, setIsTwoDayCompetition] = useState()


    const updateToCountry = (e) => {
        if (e.target.value !== "") {
            const filteredVenues = props.venues.filter(venue => venue.country.id === parseInt(e.target.value))
            setVenues(filteredVenues)
        } else {
            setVenues(props.venues)
        }
        setHills([])
        setHillVersions([])
    }

    const updateToHill = (e) => {
        const hill = hills.find(hill => hill.id === parseInt(e.target.value))
        setHillVersions(hill.hillVersions)
    }

    const updateToVenue = (e) => {
        const venue = venues.find(venue => venue.id === parseInt(e.target.value))
        setHills(venue.hills)
        setHillVersions([])
    }


    return (

        <Formik
            isInitialValid={false}
            initialValues={{
                date1: '',
                hillVersionId: ''
            }}
            validationSchema={ResultsValidationSchema}
            onSubmit={(values) => {
                props.onSubmit(values)
            }}
        >
            {({
                  handleSubmit,
                  errors,
                  touched

              }) => (
                <StyledForm onSubmit={(e) => {
                    e.preventDefault()
                    handleSubmit()
                }}>
                    <Header3>Add new results</Header3>

                    <small>Fields with (*) are mandatory</small>
                    <AccordionWithPadding defaultActiveKey="0">

                        {/*Basic Parameters*/}
                        <Card style={{borderRadius: '10px'}}>
                            <Accordion.Toggle as={Card.Header} eventKey="0">
                                <Header5>Basic info</Header5>
                                {
                                    (errors['name'] !== undefined && touched['name']) ||
                                    (errors['sizeOfHillId'] !== undefined && touched['sizeOfHillId']) ||
                                    (errors['kPoint'] !== undefined && touched['kPoint']) ||
                                    (errors['hs'] !== undefined && touched['hs']) ?
                                        <text style={{marginRight: "2px"}}>errors</text> : null
                                }
                            </Accordion.Toggle>
                            <Accordion.Collapse eventKey="0">
                                <Card.Body>
                                    <SelectInputForm
                                        title={"Country:"}
                                        defaultValue={""}
                                        onChange={e => updateToCountry(e)}
                                    >
                                        <option value={""}>All Countries...</option>
                                        {props.countries.map(country =>
                                            <option key={country.id} value={country.id}>
                                                {country.name}
                                            </option>)}
                                    </SelectInputForm>

                                    <SelectInputForm
                                        title={"Venue*:"}
                                        defaultValue={""}
                                        onChange={e => updateToVenue(e)}
                                    >
                                        <option value={""}>Choose...</option>
                                        {venues.map(venue =>
                                            <option key={venue.id} value={venue.id}>
                                                {venue.name}
                                            </option>)}
                                    </SelectInputForm>

                                    <SelectInputForm
                                        title={"Hill*:"}
                                        defaultValue={""}
                                        disabled={hills.length < 1}
                                        onChange={e => updateToHill(e)}
                                    >
                                        <option value={""}>Choose...</option>
                                        {hills.map(hill =>
                                            <option key={hill.id} value={hill.id}>
                                                {hill.name}
                                            </option>)}
                                    </SelectInputForm>

                                    <FormikSelectInputForm
                                        name="hillVersionId"
                                        label="Hill version*:"
                                        disabled={hillVersions.length < 1}
                                    >
                                        <option value={""}>Choose...</option>
                                        {hillVersions.map(hillVersion =>
                                            <option key={hillVersion.id} value={hillVersion.id}>
                                                {hillVersion.validSince}/{hillVersion.validUntil} (K: {hillVersion.kPoint} m,
                                                HS: {hillVersion.hillSize} m)
                                            </option>)}

                                    </FormikSelectInputForm>

                                    <FormikDatePicker
                                        name="date1"
                                        label={"Date*:"}
                                    />

                                    <SelectInputForm
                                        title={"Second day?*:"}
                                        onChange={e => {
                                            console.log(e.target.value)
                                            setIsTwoDayCompetition(e.target.value)
                                            console.log(isTwoDayCompetition)
                                        }}
                                    >
                                        <option value={false}>No</option>
                                        <option value={true}>Yes</option>
                                    </SelectInputForm>

                                    {isTwoDayCompetition === true ? <FormikDatePicker
                                        name="date1"
                                        label={"2. day*:"}
                                    />  :null}


                                </Card.Body>
                            </Accordion.Collapse>
                        </Card>


                    </AccordionWithPadding>

                    {/*Submit*/}
                    <StyledDiv2Right1200>
                        <Button type={"submit"}>Submit</Button>
                    </StyledDiv2Right1200>

                </StyledForm>


            )}

        </Formik>

    )
}

export default ResultsForm