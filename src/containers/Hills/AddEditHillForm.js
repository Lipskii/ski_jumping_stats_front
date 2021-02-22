import React from "react";
import {Formik} from "formik";
import {Header5, StyledDiv2Right1000, StyledForm} from "../../components/StyledComponents";
import * as Yup from 'yup';
import FormikTextInputForm from "../../components/CommonForms/FormikTextInputForm";
import {Button, Col, Form, Row} from "react-bootstrap";
import FormikSelectInputForm from "../../components/CommonForms/FormikSelectInputForm";
import {DatePickerField} from "../../components/CommonForms/FormikDatePicker";


const AddEditHillForm = (props) => (

    <Formik
        initialValues={{
            name: '',
            sizeOfHillId: '',
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
        }}
        validationSchema={Yup.object({
            name: Yup.string()
                .required('Required'),
            sizeOfHillId: Yup.number()
                .required('Required'),
            kPoint: Yup.number()
                .max(250, 'Too large')    //check this in FIS rules
                .min(0, 'Cannot be negative')
                .required('Required'),
            hs: Yup.number()
                .max(250, 'Too large')
                .min(0, 'Cannot be negative')
                .required('Required'),
            e1: Yup.number()
                .positive('Must be a positive number')
                .max(999.99, 'Too large')
                .required('Required'),
            e2: Yup.number()
                .positive('Must be a positive number')
                .max(99.99, 'Too large'),
            es: Yup.number()
                .positive('Must be a positive number')
                .max(99.99, 'Too large')
                .required('Required'),
            t: Yup.number()
                .positive('Must be a positive number')
                .max(99.99, 'Too large')
                .required('Required'),
            gamma: Yup.number()
                .positive('Must be a positive number')
                .max(99.99, 'Too large')
                .required('Required'),
            alpha: Yup.number()
                .positive('Must be a positive number')
                .max(99.99, 'Too large')
                .required('Required'),
            r1: Yup.number()
                .positive('Must be a positive number')
                .max(999.99, 'Too large')
                .required('Required'),
            vo: Yup.number()
                .positive('Must be a positive number')
                .max(99.99, 'Too large')
                .required('Required'),
            h: Yup.number()
                .positive('Must be a positive number')
                .max(999.99, 'Too large')
                .required('Required'),
            n: Yup.number()
                .positive('Must be a positive number')
                .max(999.99, 'Too large')
                .required('Required'),
            s: Yup.number()
                .positive('Must be a positive number')
                .max(9.99, 'Too large')
                .required('Required'),
            l1: Yup.number()
                .positive('Must be a positive number')
                .max(999.99, 'Too large')
                .required('Required'),
            l2: Yup.number()
                .positive('Must be a positive number')
                .max(999.99, 'Too large')
                .required('Required'),
            a: Yup.number()
                .positive('Must be a positive number')
                .max(999.99, 'Too large')
                .required('Required'),
            betap: Yup.number()
                .positive('Must be a positive number')
                .max(99.99, 'Too large')
                .required('Required'),
            beta: Yup.number()
                .positive('Must be a positive number')
                .max(99.99, 'Too large')
                .required('Required'),
            betal: Yup.number()
                .positive('Must be a positive number')
                .max(99.99, 'Too large')
                .required('Required'),
            rl: Yup.number()
                .positive('Must be a positive number')
                .max(999.99, 'Too large')
                .required('Required'),
            r2l: Yup.number()
                .positive('Must be a positive number')
                .max(999.99, 'Too large'),
            r2: Yup.number()
                .positive('Must be a positive number')
                .max(999.99, 'Too large')
                .required('Required'),
            zu: Yup.number()
                .positive('Must be a positive number')
                .max(999.99, 'Too large')
                .required('Required'),
            P: Yup.number()
                .positive('Must be a positive number')
                .max(250, 'Too large')
                .required('Required'),
            L: Yup.number()
                .positive('Must be a positive number')
                .max(260, 'Too large')
                .required('Required'),
            b1: Yup.number()
                .positive('Must be a positive number')
                .max(99.99, 'Too large')
                .required('Required'),
            b2: Yup.number()
                .positive('Must be a positive number')
                .max(99.99, 'Too large')
                .required('Required'),
            bk: Yup.number()
                .positive('Must be a positive number')
                .max(99.99, 'Too large')
                .required('Required'),
            bu: Yup.number()
                .positive('Must be a positive number')
                .max(99.99, 'Too large')
                .required('Required'),
            d: Yup.number()
                .positive('Must be a positive number')
                .max(999.99, 'Too large')
                .required('Required'),
            q: Yup.number()
                .positive('Must be a positive number')
                .max(999.99, 'Too large')
                .required('Required'),
            validSince: Yup.date()
                .required('Required'),
            validUntil: Yup.date()
                .required('Required'),
            certificate: Yup.string()
                .url('Must be an URL')
                .required('Required')
        })}
        onSubmit={(values) => {
            console.log(values)
            props.onSubmit(values)
        }}
    >
        {({
              handleSubmit,
          }) => (
            <StyledForm onSubmit={(e) => {
                e.preventDefault()
                handleSubmit()
            }}>

                {props.mainHeader}

                <Header5>Basic Parameters</Header5>
                <small>Fields with (*) are mandatory</small>

                {/*Name*/}
                {props.showNameField ? <FormikTextInputForm
                    name="name"
                    label="Name*:"
                /> : null}


                {/*Size of hill*/}
                <FormikSelectInputForm
                    name="sizeOfHillId"
                    label="Size of hill*:">
                    <option value={""} disabled>Choose...</option>
                    {props.sizesOfHill.map(size => (
                        <option key={size.id} value={size.id}>{size.designation}</option>
                    ))}
                </FormikSelectInputForm>

                {/*K*/}
                <FormikTextInputForm
                    name="kPoint"
                    label="K-Point*:"
                    placeholder="K"
                />

                {/*HS*/}
                <FormikTextInputForm
                    name="hs"
                    label="Hill Size*:"
                    placeholder="HS"
                />

                {/*e1*/}
                <FormikTextInputForm
                    name="e1"
                    label="e1 (m)*:"
                    placeholder="Length of the inrun from the highest start"
                />

                {/*e2*/}
                <FormikTextInputForm
                    name="e2"
                    label="e2 (m):"
                    placeholder="Length of the inrun from the lowest start to takeoff"
                />

                {/*es*/}
                <FormikTextInputForm
                    name="es"
                    label="es* (m):"
                    placeholder="Length of the inrun from the lowest to the highest start"
                />

                {/*t*/}
                <FormikTextInputForm
                    name="t"
                    label="t* (m):"
                    placeholder="Length of the table"
                />

                {/*gamma*/}
                <FormikTextInputForm
                    name="gamma"
                    label={"\u03B3 (\u00B0)*:"}
                    placeholder={"Angle of the straight part of the inrun"}
                />

                {/*alpha*/}
                <FormikTextInputForm
                    name="alpha"
                    label={"\u03B1 (\u00B0)*:"}
                    placeholder={"Angle of the straight part of the inrun"}
                />

                {/*r1*/}
                <FormikTextInputForm
                    name="r1"
                    label={"r1 (m)*:"}
                    placeholder={"Radius of the transition curve in E2 (End of the transition curve; beginning of the table)"}
                />

                {/*v0*/}
                <FormikTextInputForm
                    name="v0"
                    label={"v0 (m/s)*:"}
                    placeholder={"Speed at the end of the inrun"}
                />

                <Header5>Landing Profile</Header5>

                {/*h*/}
                <FormikTextInputForm
                    name="h"
                    label={"h (m)*:"}
                    placeholder={"Difference in height between the takeoff and K-Point"}
                />

                {/*n*/}
                <FormikTextInputForm
                    name="n"
                    label={"n (m)*:"}
                    placeholder={"Horizontal distance between the takeoff and K-Point"}
                />

                {/*TODO h/n*/}

                {/*s*/}
                <FormikTextInputForm
                    name="s"
                    label={"s (m)*:"}
                    placeholder={"Height of the table"}
                />

                {/*l1*/}
                <FormikTextInputForm
                    name="l1"
                    label={"l1 (m)*:"}
                    placeholder={"Length of the curve between beginning of the landing area (P) and K"}
                />

                {/*l2*/}
                <FormikTextInputForm
                    name="l2"
                    label={"l2 (m)*:"}
                    placeholder={"Length of the curve between K and end of the landing area (L)"}
                />

                {/*a*/}
                <FormikTextInputForm
                    name="a"
                    label={"a (m)*:"}
                    placeholder={"Length of the outrun after the end of the transition curve to the outrun"}
                />

                {/*beta p*/}
                <FormikTextInputForm
                    name="betap"
                    label={"\u03B2p (\u00B0)*:"}
                    placeholder={"Angle f the tangent at the beginning of the landing area (P)"}
                />

                {/*beta*/}
                <FormikTextInputForm
                    name="beta"
                    label={"\u03B2 (\u00B0)*:"}
                    placeholder={"Angle of the tangent at K"}
                />

                {/*beta l*/}
                <FormikTextInputForm
                    name="betal"
                    label={"\u03B2l (\u00B0)*:"}
                    placeholder={"Angle of the tangent at the end of the landing area (L)"}
                />

                {/*rl*/}
                <FormikTextInputForm
                    name="rl"
                    label={"rl (m)*:"}
                    placeholder={"Radius of the circular landing area"}
                />

                {/*r2l*/}
                <FormikTextInputForm
                    name="r2l"
                    label={"r2l (m):"}
                    placeholder={"Radius of the transition curve from L to U at L"}
                />

                {/*r2*/}
                <FormikTextInputForm
                    name="r2"
                    label={"r2 (m)*:"}
                    placeholder={"Radius of the transition curve from L to U at U (end of the transition curve to the outrun)"}
                />

                {/*zu*/}
                <FormikTextInputForm
                    name="zu"
                    label={"zu (m)*:"}
                    placeholder={"Difference in Height between the takeoff and the lowest point U"}
                />

                {/*P*/}
                <FormikTextInputForm
                    name="P"
                    label={"P (m)*:"}
                    placeholder={"Beginning of the landing area"}
                />

                {/*L*/}
                <FormikTextInputForm
                    name="L"
                    label={"L (m)*:"}
                    placeholder={"End of the landing area"}
                />

                {/*b1*/}
                <FormikTextInputForm
                    name="b1"
                    label={"b1 (m)*:"}
                    placeholder={"Prepared width of the inrun"}
                />

                {/*b2*/}
                <FormikTextInputForm
                    name="b2"
                    label={"b2 (m):"}
                    placeholder={"Width of the knoll at the base of the takeoff"}
                />

                {/*bk*/}
                <FormikTextInputForm
                    name="bk"
                    label={"bk (m)*:"}
                    placeholder={"Width at K"}
                />

                {/*bu*/}
                <FormikTextInputForm
                    name="bu"
                    label={"bu (m)*:"}
                    placeholder={"Width at the end of the transition curve to the outrun"}
                />

                <Header5>Judge Tower</Header5>

                {/*d*/}
                <FormikTextInputForm
                    name="d"
                    label={"d (m)*:"}
                    placeholder={"Horizontal distance between the takeoff and the projected middle of the lowest\n" +
                    "judge cabin along the jumping hill axis line"}
                />

                {/*q*/}
                <FormikTextInputForm
                    name="q"
                    label={"q (m)*:"}
                    placeholder={"Horizontal distance between the front of the judge tower and the jumping hill\n" +
                    "axis line"}
                />

                {/*valid since*/}
                <DatePickerField
                    name="validSince"
                    label={"Valid since*:"}
                />

                {/*valid until*/}
                <DatePickerField
                    name="validUntil"
                    label={"Valid until*:"}
                />

                {/*fis certificate*/}
                <FormikTextInputForm
                    name="certificate"
                    label={"Certificate link*:"}
                    placeholder={"URL"}
                />


                {/*Submit*/}
                <StyledDiv2Right1000>
                    <Button type={"submit"}>Submit</Button>
                </StyledDiv2Right1000>

            </StyledForm>

        )}


    </Formik>
)


export default AddEditHillForm