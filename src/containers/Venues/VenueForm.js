import React from "react";
import {Formik} from "formik";
import {VenuesValidationSchema} from "./VenuesValidationSchema";
import {Header3, StyledForm} from "../../components/StyledComponents";


const VenueForm = (props) => (

    <Formik
        isInitialValid={false}
        initialValues={{
            name: props.initialName,
            capacity: '',
            cityId: '',
            skiClubId: '',
            yearOfOpening: ''
        }}
        validationSchema={VenuesValidationSchema}
        onSubmit={(values) => {
            props.onSubmit(values)
        }}
    > {({
            handleSubmit,
            errors,
            touched,
            values

        }) => (

            <StyledForm onSubmit={(e) => {
                e.preventDefault()
                handleSubmit()
            }}>
                <Header3>{props.mainHeader}</Header3>
                <small>Fields with (*) are mandatory</small>

            </StyledForm>

    )}

    </Formik>
)

export default VenueForm