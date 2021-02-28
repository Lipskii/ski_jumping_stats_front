import React from "react";
import {Button, Form, Modal} from "react-bootstrap";
import {Formik} from "formik"
import * as Yup from 'yup';
import FormikTextInputForm from "../CommonForms/FormikTextInputForm";

//TODO finish it tomorrow
const EditModal = (props) => {

    return (
        <Modal show={props.show} onHide={props.handleClose}>
            <Modal.Header closeButton>
                <Modal.Title>New name for: {props.hillName}</Modal.Title>
            </Modal.Header>
            <Modal.Body>
                <Formik
                    initialValues={{
                        name: props.hillName
                    }}
                    validationSchema={Yup.object({
                            name: Yup.string()
                                .required
                    }
                    )}
                    onSubmit={(values) => {
                        props.onSubmit(values)
                    }}
                >
                    {({
                          handleSubmit,
                      }) => (
                          <Form>
                              <FormikTextInputForm
                                name="name"
                              />
                          </Form>
                        )}

                </Formik>

            </Modal.Body>

        </Modal>
        )

}

export default EditModal