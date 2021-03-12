import React, {useState} from "react";
import {Formik} from "formik";
import NewCityModal from "../../components/Modals/NewCityModal";
import {Header3, StyledDiv2Right1000, StyledForm} from "../../components/StyledComponents";
import {Button, Card} from "react-bootstrap";
import {SkiClubsValidationSchema} from "./SkiClubsValidationSchema";
import FormikTextInputForm from "../../components/CommonForms/FormikTextInputForm";
import FormikSelectInputForm from "../../components/CommonForms/FormikSelectInputForm";
import SelectInputForm from "../../components/CommonForms/SelectInputForm";


const SkiClubForm = (props) => {

    const [showModal, setShowModal] = useState(false);
    const [currentCountry, setCurrentCountry] = useState("")
    const [cities, setCities] = useState(props.cities)

    return (
        <React.Fragment>
            {/*to prevent premature component did mount in NewCityModal*/}
            {showModal ? <NewCityModal
                show={showModal}
                onHide={() => {
                    setShowModal(false)
                    setCities(props.cities)
                }}
                country={currentCountry}
                countries={props.countries}
                cities={cities}
                afterAdding={() => {
                    setCurrentCountry("")
                    props.updateCities()   //TODO change it, so the citiesForForm would be updated
                }}
            /> : null}

            <Formik
                isInitialValid={false}
                initialValues={{
                    name: props.initialName,
                    cityId: props.initialCityId,
                }}
                validationSchema={SkiClubsValidationSchema}
                onSubmit={(values) => {
                    props.onSubmit(values)
                }}
            >{({
                   handleSubmit

               }) => (
                <StyledForm
                    onSubmit={(e) => {
                        e.preventDefault()
                        handleSubmit()
                    }}
                >
                    <Card style={{borderRadius: '10px', marginBottom: '30px'}}>
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
                                key={cities}
                                name="cityId"
                                label="City*:"
                                disabled={props.cities.length < 1}
                                hintTextDown={
                                    <a href="javascript:void(0)" onClick={() => {
                                        setShowModal(true)
                                    }
                                    }>Create new city</a>
                                }
                            >
                                <option value={""} disabled>Choose...</option>
                                {props.cities.map(city => (
                                    <option key={city.id} value={city.id}>{city.name}</option>
                                ))}
                            </FormikSelectInputForm>

                            <StyledDiv2Right1000>
                                <Button type={"submit"}>Submit</Button>
                            </StyledDiv2Right1000>
                        </Card.Body>
                    </Card>

                </StyledForm>
            )}
            </Formik>
        </React.Fragment>
    )
}

export default SkiClubForm