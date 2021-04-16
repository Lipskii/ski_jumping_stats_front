import React, {useEffect} from "react";
import bsCustomFileInput from "bs-custom-file-input";
import {Formik} from "formik";
import {Button, Form, Modal} from "react-bootstrap";
import {Header3, StyledDiv2Right1200} from "../../../components/StyledComponents";
import * as Yup from 'yup'
import FormikTextInputForm from "../../../components/CommonForms/FormikTextInputForm";

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
                    resultsLink: ''
                }}
                validationSchema={Yup.object({
                    resultsLink: Yup.string()
                        .url('Must be an URL')
                })}
                onSubmit={(values) => {
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
                            <FormikTextInputForm
                                name="resultsLink"
                                label="Link to results:"
                            />

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