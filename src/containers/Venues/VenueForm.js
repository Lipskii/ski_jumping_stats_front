import React, {useState} from "react";
import {Formik} from "formik";
import {VenuesValidationSchema} from "./VenuesValidationSchema";
import {
    Header3,
    StyledDiv2Right1200,
    StyledForm
} from "../../components/StyledComponents";
import {Button, Card} from "react-bootstrap";
import FormikTextInputForm from "../../components/CommonForms/FormikTextInputForm";
import FormikSelectInputForm from "../../components/CommonForms/FormikSelectInputForm";
import SelectInputForm from "../../components/CommonForms/SelectInputForm";
import NewCityModal from "../../components/Modals/NewCityModal";


const VenueForm = (props) => {

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
                    capacity: props.initialCapacity,
                    cityId: props.initialCityId,
                    skiClubId: props.initialClubId,
                    yearOfOpening: props.initialYearOfOpening,
                }}
                validationSchema={VenuesValidationSchema}
                onSubmit={(values) => {
                    props.onSubmit(values)
                }}
            >{({
                   handleSubmit

               }) => (
                <StyledForm onSubmit={(e) => {
                    e.preventDefault()
                    handleSubmit()
                }}>


                    <Card style={{borderRadius: '10px', marginBottom:'30px'}}>
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
                                disabled={props.isEdit}
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
                                key={props.cities}
                                name="cityId"
                                label="City*:"
                                disabled={props.cities.length < 1 || props.isEdit}
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
                                disabled={props.isEdit}
                            />

                            <FormikTextInputForm
                                name="capacity"
                                label="Capacity*:"
                            />

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

export default VenueForm