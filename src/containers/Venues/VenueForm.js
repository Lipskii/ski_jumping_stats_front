import React from "react";
import {Formik} from "formik";
import {VenuesValidationSchema} from "./VenuesValidationSchema";
import {Header3, StyledDiv2Right1000, StyledForm} from "../../components/StyledComponents";
import {Button} from "react-bootstrap";
import FormikTextInputForm from "../../components/CommonForms/FormikTextInputForm";


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

            <Header3>{props.mainHeader}</Header3>

            <small>Fields with (*) are mandatory</small>

            <FormikTextInputForm
                name="name"
                label="Name*:"
                placeholder="name"
            />

            <StyledDiv2Right1000>
                <Button type={"submit"}>Submit</Button>
            </StyledDiv2Right1000>
        </StyledForm>
    )}

        {/*> {({*/}
        {/*        handleSubmit*/}
        {/*    }) => (*/}
        {/*        <StyledForm onSubmit={(e) => {*/}
        {/*            e.preventDefault()*/}
        {/*            handleSubmit()*/}
        {/*        }}*/}
        {/*        >*/}
        {/*            <Header3>{props.mainHeader}</Header3>*/}
        {/*            <small>Fields with (*) are mandatory</small>*/}

        {/*            <FormikTextInputForm*/}
        {/*                name="name"*/}
        {/*                label={"l2 (m)*:"}*/}
        {/*                placeholder={"Length of the curve between K and end of the landing area (L)"}*/}
        {/*            />*/}

        {/*            <FormikTextInputForm*/}
        {/*                name="capacity"*/}
        {/*                label={"l2 (m)*:"}*/}
        {/*                placeholder={"Length of the curve between K and end of the landing area (L)"}*/}
        {/*            />*/}

        {/*            <FormikTextInputForm*/}
        {/*                name="cityId"*/}
        {/*                label={"l2 (m)*:"}*/}
        {/*                placeholder={"Length of the curve between K and end of the landing area (L)"}*/}
        {/*            />*/}

        {/*            <FormikTextInputForm*/}
        {/*                name="skiClubId"*/}
        {/*                label={"l2 (m)*:"}*/}
        {/*                placeholder={"Length of the curve between K and end of the landing area (L)"}*/}
        {/*            />*/}

        {/*            <FormikTextInputForm*/}
        {/*                name="yearOfOpening"*/}
        {/*                label={"l2 (m)*:"}*/}
        {/*                placeholder={"Length of the curve between K and end of the landing area (L)"}*/}
        {/*            />*/}

        {/*            /!*Submit*!/*/}
        {/*            <StyledDiv2Right1000>*/}
        {/*                <Button type={"submit"}>Submit</Button>*/}
        {/*            </StyledDiv2Right1000>*/}
        {/*        </StyledForm>*/}
        {/*)}*/}
    </Formik>

)

export default VenueForm