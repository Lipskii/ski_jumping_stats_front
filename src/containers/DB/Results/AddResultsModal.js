import React, {useEffect, useState} from "react";
import bsCustomFileInput from "bs-custom-file-input";
import {Formik} from "formik";
import {Button, Col, Form, Modal, Row} from "react-bootstrap";
import {ErrorLabel, Header3, StyledDiv2Right1200} from "../../../components/StyledComponents";
import * as Yup from 'yup'

//TODO add on submit
const AddResultsModal = (props) => {

    useEffect(() => {
        bsCustomFileInput.init()
    })

    return (
        <React.Fragment>
            <Formik
                isInitialValid={false}
                initialValues={{
                    file: ''
                }}
                validationSchema={Yup.object({
                    file: Yup.mixed()
                        .required("A file is required")
                })}
                onSubmit={(values) => {
                    console.log("formik on submit")
                    props.onSubmit(values)
                }}
            >{({
                   handleSubmit,
                   setFieldValue,
                   touched,
                   errors
               }) => (
                <Modal show={props.show} size={"m"} scrollable={true} onHide={props.onHide}>
                    <Modal.Header closeButton>
                        <Header3>{props.mainHeader}</Header3>
                    </Modal.Header>
                    <Modal.Body>
                        <Form
                            style={{marginTop: "10px", textAlign: "center"}}
                            onSubmit={(e) => {
                                e.preventDefault()
                                handleSubmit()
                            }}
                        >
                            <Form.Group>
                                <input id="file" name="file" type="file" onChange={(event) => {
                                    setFieldValue("file", event.currentTarget.files[0]);
                                }}/>
                                {touched.file && errors.file ? (
                                    <ErrorLabel>{errors.file}</ErrorLabel>
                                ) : null}
                            </Form.Group>

                            <StyledDiv2Right1200>
                                <Button type={"submit"}>Submit</Button>
                            </StyledDiv2Right1200>

                        </Form>
                    </Modal.Body>
                </Modal>
            )}
            </Formik>

        </React.Fragment>
    )
}

export default AddResultsModal