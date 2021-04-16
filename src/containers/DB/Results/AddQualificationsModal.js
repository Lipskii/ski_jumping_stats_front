import React from "react";
import {Formik} from "formik";
import {
    Header3,
    StyledDiv2Right1200,
    StyledForm
} from "../../../components/StyledComponents";
import {Button, Modal} from "react-bootstrap";
import FormikSelectInputForm from "../../../components/CommonForms/FormikSelectInputForm";
import {FormikDatePicker} from "../../../components/CommonForms/FormikDatePicker";
import FormikTextInputForm from "../../../components/CommonForms/FormikTextInputForm";
import FormikTimePicker from "../../../components/CommonForms/FormikTimePicker";
import {QualificationsValidationSchema} from "./QualificationsValidationSchema";


const AddQualificationsModal = (props) => {

    return (
        <Formik
            isInitialValid={false}
            initialValues={{
                date1: '',
                airTempStart: '',
                airTempFinish: '',
                avgWind: '',
                baseGate: '',
                humidityStart: '',
                humidityFinish: '',
                maxWind: '',
                minWind: '',
                snowTempStart: '',
                snowTempFinish: '',
                startTime: '',
                weatherId: '',
                judgeAId: '',
                judgeBId: '',
                judgeCId: '',
                judgeDId: '',
                judgeEId: '',
                judgeSCId: '',
                resultsLink: '',
            }}
            validationSchema={QualificationsValidationSchema}
            onSubmit={(values) => {
                props.onSubmit(values)
            }}
        >
            {({
                  handleSubmit,
              }) => (
                <Modal show={props.show} size={"xl"} scrollable={true} onHide={props.onHide} >
                    <Modal.Header closeButton>
                        <Header3>Adding new Qualis for</Header3>
                    </Modal.Header>
                    <Modal.Body>
                        <StyledForm onSubmit={(e) => {
                            e.preventDefault()
                            handleSubmit()
                        }}>
                            <small>Fields with (*) are mandatory</small>


                            <FormikDatePicker
                                name="date1"
                                label={"Date*:"}
                            />

                            <FormikTimePicker
                                name="startTime"
                                label={"Start time"}
                            />

                            <FormikTextInputForm
                                name="resultsLink"
                                label="Link to results:"
                            />

                            <FormikSelectInputForm
                                name="judgeAId"
                                label="Judge A:"
                            >
                                <option value={""}>No info</option>
                                {props.judges.map(judge =>
                                    <option key={judge.id} value={judge.id}>
                                        {judge.person.firstName} {judge.person.lastName}
                                    </option>)}
                            </FormikSelectInputForm>

                            <FormikSelectInputForm
                                name="judgeBId"
                                label="Judge B:"
                            >
                                <option value={""}>No info</option>
                                {props.judges.map(judge =>
                                    <option key={judge.id} value={judge.id}>
                                        {judge.person.firstName} {judge.person.lastName}
                                    </option>)}
                            </FormikSelectInputForm>
                            <FormikSelectInputForm
                                name="judgeCId"
                                label="Judge C:"
                            >
                                <option value={""}>No info</option>
                                {props.judges.map(judge =>
                                    <option key={judge.id} value={judge.id}>
                                        {judge.person.firstName} {judge.person.lastName}
                                    </option>)}
                            </FormikSelectInputForm>
                            <FormikSelectInputForm
                                name="judgeDId"
                                label="Judge D:"
                            >
                                <option value={""}>No info</option>
                                {props.judges.map(judge =>
                                    <option key={judge.id} value={judge.id}>
                                        {judge.person.firstName} {judge.person.lastName}
                                    </option>)}
                            </FormikSelectInputForm>
                            <FormikSelectInputForm
                                name="judgeEId"
                                label="Judge E:"
                            >
                                <option value={""}>No info</option>
                                {props.judges.map(judge =>
                                    <option key={judge.id} value={judge.id}>
                                        {judge.person.firstName} {judge.person.lastName}
                                    </option>)}
                            </FormikSelectInputForm>
                            <FormikSelectInputForm
                                name="judgeSCId"
                                label="Judge SC:"
                            >
                                <option value={""}>No info</option>
                                {props.judges.map(judge =>
                                    <option key={judge.id} value={judge.id}>
                                        {judge.person.firstName} {judge.person.lastName}
                                    </option>)}
                            </FormikSelectInputForm>

                            <FormikTextInputForm
                                name="baseGate"
                                label="Base gate:"
                                style={{width: "100px"}}
                            />

                            <FormikSelectInputForm
                                name="weatherId"
                                label="Weather:"
                            >
                                <option value={""}>No info</option>
                                {props.weather.map(weather =>
                                    <option key={weather.id} value={weather.id}>
                                        {weather.weather}
                                    </option>)}
                            </FormikSelectInputForm>

                            <FormikTextInputForm
                                name="airTempStart"
                                label="Air temperature start:"
                                style={{width: "100px"}}
                            />

                            <FormikTextInputForm
                                name="airTempFinish"
                                label="Air temperature end:"
                                style={{width: "100px"}}
                            />

                            <FormikTextInputForm
                                name="snowTempStart"
                                label="Snow temp. start:"
                                style={{width: "100px"}}
                            />

                            <FormikTextInputForm
                                name="snowTempFinish"
                                label="Snow temp. end:"
                                style={{width: "100px"}}
                            />

                            <FormikTextInputForm
                                name="humidityStart"
                                label="Humidity start:"
                                style={{width: "100px"}}
                            />

                            <FormikTextInputForm
                                name="humidityFinish"
                                label="Humidity finish:"
                                style={{width: "100px"}}
                            />

                            <FormikTextInputForm
                                name="minWind"
                                label="Minimal wind:"
                                style={{width: "100px"}}
                            />

                            <FormikTextInputForm
                                name="maxWind"
                                label="Maximal wind:"
                                style={{width: "100px"}}
                            />

                            <FormikTextInputForm
                                name="avgWind"
                                label="Average wind:"
                                style={{width: "100px"}}
                            />


                            {/*Submit*/}
                            <StyledDiv2Right1200>
                                <Button type={"submit"}>Submit</Button>
                            </StyledDiv2Right1200>

                        </StyledForm>
                    </Modal.Body>
                </Modal>


            )}

        </Formik>

    )
}

export default AddQualificationsModal