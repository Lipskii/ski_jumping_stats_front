import React from "react";
import {useFormik} from "formik";
import {Header5, StyledForm} from "../../components/StyledComponents";
import * as Yup from 'yup';


//REMEMBER ABOUT H/N, e2 not mandatory
const AddEditHillForm = (props) => {

    const formik = useFormik({
        initialValues: {
            name: '',
            sizesOfHill: '',
            kPoint: '',
            hs: '',
            e1: '',
            e2: '',
            es: '',
            t: '',
            gamma: '',
            alpha: '',
            r1: '',
            v0: '',
            h: '',
            n: '',
            s: '',
            l1: '',
            l2: '',
            a: '',
            betap: '',
            beta: '',
            betal: '',
            rl: '',
            r2l: '',
            r2: '',
            zu: '',
            P: '',
            L: '',
            b1: '',
            b2: '',
            bk: '',
            bu: '',
            d: '',
            q: '',
            validSince: '',
            validUntil: '',
            certificate: ''
        },
        validationSchema: Yup.object(

        ),
        onSubmit: values => {
            props.onSubmit(values)
        }
    })
    return (
        <StyledForm onSubmit={formik.handleSubmit}>

            {props.mainHeader}

            <Header5>Basic Parameters</Header5>
            <small>Fields with (*) are mandatory</small>

            {/*Name*/}
            {/*TODO new Name Field and condition to show it*/}

            {/*Size of hill*/}
            {/*TODO add formik to custom components*/}

        </StyledForm>
    )
}

export default AddEditHillForm