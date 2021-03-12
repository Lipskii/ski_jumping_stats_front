import React from "react";
import {Button, Form, Modal} from "react-bootstrap";
import {Formik} from "formik"
import * as Yup from 'yup';
import FormikTextInputForm from "../CommonForms/FormikTextInputForm";


const EditNameModal = (props) => {

    return (
        <Modal show={props.show} onHide={props.onHide} size={"lg"} centered>
            <Modal.Header closeButton>
                <Modal.Title>Edit name of {props.name}</Modal.Title>
            </Modal.Header>
            <Modal.Body>
                <Formik
                    initialValues={{
                        name: props.name
                    }}
                    validationSchema={Yup.object({
                        name: Yup.string().required('Required')
                        }
                    )}

                    onSubmit={(values) => {
                        props.onSubmit(values)
                    }}
                >
                    {({
                          handleSubmit,
                      }) => (
                          <Form onSubmit={(e) => {
                              e.preventDefault()
                              handleSubmit()
                          }}>
                              <FormikTextInputForm
                                name="name"
                                label={"New name:"}
                              />
                              <div style={{textAlign: "right"}}>
                              <Button type={"submit"}>Update</Button>
                              </div>
                          </Form>
                        )}

                </Formik>

            </Modal.Body>

        </Modal>
        )

}

export default EditNameModal