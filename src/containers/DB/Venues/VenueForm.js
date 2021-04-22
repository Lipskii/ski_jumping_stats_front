import React, {useState} from "react";
import {Formik} from "formik";
import {VenuesValidationSchema} from "./VenuesValidationSchema";
import {
    Header3,
    StyledDiv2Right1200, StyledForm,
} from "../../../components/StyledComponents";
import {Button,  Modal} from "react-bootstrap";
import FormikTextInputForm from "../../../components/CommonForms/FormikTextInputForm";
import FormikSelectInputForm from "../../../components/CommonForms/FormikSelectInputForm";
import SelectInputForm from "../../../components/CommonForms/SelectInputForm";
import NewCityModal from "../../../components/Modals/NewCityModal";
import axios from "axios";


const VenueForm = (props) => {

    const [showModal, setShowModal] = useState(false);
    const [currentCountry, setCurrentCountry] = useState("")
    const [cities, setCities] = useState(props.cities)

    const updateCities = () => {
        axios.get("/api/cities")
            .then(res => {
                setCities(res.data)
            })
            .catch(e => console.log(e))
    }

    return (
        <React.Fragment>

            {/*to prevent premature component did mount in NewCityModal*/}
            {showModal ? <NewCityModal
                show={showModal}
                onHide={() => {
                    setShowModal(false)
                    updateCities()
                }}
                country={currentCountry}
                countries={props.countries}
                cities={cities}
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
                <Modal show={props.show} size={"m"} scrollable={true} onHide={props.onHide}>
                    <StyledForm onSubmit={(e) => {
                        e.preventDefault()
                        handleSubmit()
                    }}>


                        <Modal.Header>
                            <Header3>{props.mainHeader}</Header3>
                        </Modal.Header>

                        <Modal.Body>
                            <small>Fields with (*) are mandatory</small>

                            <FormikTextInputForm
                                name="name"
                                label="Name*:"
                            />

                            <SelectInputForm
                                title={"Country:"}
                                defaultValue={props.initialCountry}
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
                                hintTextDown={
                                    <a href="javascript:void(0)" onClick={() => {
                                        setShowModal(true)
                                    }
                                    }>Create new city</a>
                                }
                            >
                                <option value={""} disabled>Choose...</option>
                                {cities.map(city => (
                                    <option key={city.id} value={city.id}>{city.name}</option>
                                ))}
                            </FormikSelectInputForm>


                            <FormikSelectInputForm
                                name="skiClubId"
                                label="Club*:"
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

                            <StyledDiv2Right1200>
                                <Button type={"submit"}>Submit</Button>
                            </StyledDiv2Right1200>
                        </Modal.Body>
                    </StyledForm>
                </Modal>
            )}

            </Formik>
        </React.Fragment>
    )
}

export default VenueForm