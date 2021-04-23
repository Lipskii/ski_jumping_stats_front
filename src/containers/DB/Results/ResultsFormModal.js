import React, {useEffect, useState} from "react";
import {Accordion, Button, Card, Form, Modal} from "react-bootstrap";
import {Formik} from "formik";
import {ResultsValidationSchema} from "./ResultsValidationSchema";
import {
    AccordionWithPadding,
    Header3,
    Header5,
    StyledDiv2Right1200,
} from "../../../components/StyledComponents";
import FormikSelectInputForm from "../../../components/CommonForms/FormikSelectInputForm";
import SelectInputForm from "../../../components/CommonForms/SelectInputForm";
import {FormikDatePicker} from "../../../components/CommonForms/FormikDatePicker";
import FormikTimePicker from "../../../components/CommonForms/FormikTimePicker";
import FormikTextInputForm from "../../../components/CommonForms/FormikTextInputForm";
import moment from "moment";


const ResultsFormModal = (props) => {
    const [showModal, setShowModal] = useState(false)
    const [venues, setVenues] = useState(props.venues)
    const [hills, setHills] = useState(props.hills)
    const [hillVersions, setHillVersions] = useState([])
    const [isTwoDayCompetition, setIsTwoDayCompetition] = useState(0)
    let hillId
    let venueId
    let date1
    let date2

    useEffect(() => console.log(props))

    const updateToCountry = (e) => {
        if (e.target.value !== "") {
            const filteredVenues = props.venues.filter(venue => venue.city.region.country.id === parseInt(e.target.value))
            setVenues(filteredVenues)
        } else {
            setVenues(props.venues)
        }
        setHills([])
        setHillVersions([])
    }

    const updateToHill = (e) => {
        const hill = hills.find(hill => hill.id === parseInt(e.target.value))
        setHillVersions(hill.hillVersions)
    }

    const updateToVenue = (e) => {
        const venue = venues.find(venue => venue.id === parseInt(e.target.value))
        setHills(venue.hills)
        setHillVersions([])
    }

    if(props["hillVersion"] === ""){
        hillId = ""
        venueId = ""
    } else {
        hillId = props["hillVersion"].hill.id
        venueId = props["hillVersion"].hill.venue.id
    }

    if(props["date1"] === ''){
      date1 = ''
    } else {
        date1 = moment(props.date1)
    }

    if(props["date2"] === ''){
        date2 = ''
    } else {
        date2 = moment(props.date2)
    }



    return (
        <Formik
            isInitialValid={false}
            initialValues={{
                assistantRDId: props.assistantRD.id,
                assistantTDId: props.assistantTD.id,
                cancelledAtRound: props.cancelledAtRound,
                chiefOfCompetitionId: props.chiefOfCompetition.id,
                date1: date1,
                date2: date2,
                equipmentController1Id: props.equipmentController1.id,
                equipmentController2Id: props.equipmentController2.id,
                firstRoundAirTempStart: props.firstRoundAirTempStart,
                firstRoundAirTempFinish: props.firstRoundAirTempFinish,
                firstRoundAvgWind: props.firstRoundAvgWind,
                firstRoundBaseGate: props.firstRoundBaseGate,
                firstRoundHumidityStart: props.firstRoundHumidityStart,
                firstRoundHumidityFinish: props.firstRoundHumidityFinish,
                firstRoundMaxWind: props.firstRoundMaxWind,
                firstRoundMinWind: props.firstRoundMinWind,
                firstRoundSnowTempStart: props.firstRoundSnowTempStart,
                firstRoundSnowTempFinish: props.firstRoundSnowTempFinish,
                firstRoundStartTime: '',//props.firstRoundStartTime,
                firstRoundWeatherId: props.firstRoundWeather.id,
                fourthRoundAirTempStart: props.fourthRoundAirTempStart,
                fourthRoundAirTempFinish: props.fourthRoundAirTempFinish,
                fourthRoundAvgWind: props.fourthRoundAvgWind,
                fourthRoundBaseGate: props.fourthRoundBaseGate,
                fourthRoundHumidityStart: props.fourthRoundHumidityStart,
                fourthRoundHumidityFinish: props.fourthRoundHumidityFinish,
                fourthRoundMaxWind: props.fourthRoundMaxWind,
                fourthRoundMinWind: props.fourthRoundMinWind,
                fourthRoundSnowTempStart: props.fourthRoundSnowTempStart,
                fourthRoundSnowTempFinish: props.fourthRoundSnowTempFinish,
                fourthRoundWeatherId: props.fourthRoundWeather.id,
                gateFactor: props.gateFactor,
                hillId: hillId,
                hillVersionId: props.hillVersion.id,
                isTeam: props.team,
                judgeAId: props.judgeA.id,
                judgeBId: props.judgeB.id,
                judgeCId: props.judgeC.id,
                judgeDId: props.judgeD.id,
                judgeEId: props.judgeE.id,
                judgeSCId: props.judgeSC.id,
                meterValue: props.meterValue,
                raceDirectorId: props.raceDirector.id,
              //  resultsLink: '',
                seasonId: props.season.id,
                secondRoundAirTempStart: props.secondRoundAirTempStart,
                secondRoundAirTempFinish: props.secondRoundAirTempFinish,
                secondRoundAvgWind: props.secondRoundAvgWind,
                secondRoundBaseGate: props.secondRoundBaseGate,
                secondRoundHumidityStart: props.secondRoundHumidityStart,
                secondRoundHumidityFinish: props.secondRoundHumidityFinish,
                secondRoundMaxWind: props.secondRoundMaxWind,
                secondRoundMinWind: props.secondRoundMinWind,
                secondRoundSnowTempStart: props.secondRoundSnowTempStart,
                secondRoundSnowTempFinish: props.secondRoundSnowTempFinish,
                secondRoundWeatherId: props.secondRoundWeather.id,
                seriesMajorId: props.seriesMajor.id,
                seriesMinorId: props.seriesMinor.id,
                technicalDelegateId: props.technicalDelegate.id,
                thirdRoundAirTempStart: props.thirdRoundAirTempStart,
                thirdRoundAirTempFinish: props.thirdRoundAirTempFinish,
                thirdRoundAvgWind: props.thirdRoundAvgWind,
                thirdRoundBaseGate: props.thirdRoundBaseGate,
                thirdRoundHumidityStart: props.thirdRoundHumidityStart,
                thirdRoundHumidityFinish: props.thirdRoundHumidityFinish,
                thirdRoundMaxWind: props.thirdRoundMaxWind,
                thirdRoundMinWind: props.thirdRoundMinWind,
                thirdRoundSnowTempStart: props.thirdRoundSnowTempStart,
                thirdRoundSnowTempFinish: props.thirdRoundSnowTempFinish,
                thirdRoundWeatherId: props. thirdRoundWeather.id,
                venueId: venueId,
                windFactorTail: props.windFactorTail,
                windFactorFront: props.windFactorFront,
            }}
            validationSchema={ResultsValidationSchema}
            onSubmit={(values) => {
                props.onSubmit(values)
            }}
        >
            {({
                  handleSubmit,
                  errors,
                  touched,
                  setFieldValue,

              }) => (
                <Modal size={"xl"} show={props.showModal} onHide={props.onHide} >
                    <Form onSubmit={(e) => {
                        e.preventDefault()
                        handleSubmit()
                    }}>
                        <Modal.Header closeButton>
                            <Header3>Adding new competition</Header3>
                        </Modal.Header>

                        <Modal.Body>

                        <small>Fields with (*) are mandatory</small>
                        <AccordionWithPadding defaultActiveKey="0">

                            {/*Basic Parameters*/}
                            <Card style={{borderRadius: '10px'}}>
                                <Accordion.Toggle as={Card.Header} eventKey="0">
                                    <Header5>Basic info</Header5>
                                    {
                                        (errors['seriesMajorId'] !== undefined && touched['seriesMajorId']) ||
                                        (errors['hillVersionId'] !== undefined && touched['hillVersionId']) ||
                                        (errors['seasonId'] !== undefined && touched['seasonId']) ||
                                        (errors['resultsLink'] !== undefined && touched['resultsLink']) ||
                                        (errors['cancelledAtRound'] !== undefined && touched['cancelledAtRound']) ||
                                        (errors['date1'] !== undefined && touched['date1']) ?
                                            <text style={{marginRight: "2px"}}>errors</text> : null
                                    }
                                </Accordion.Toggle>
                                <Accordion.Collapse eventKey="0">
                                    <Card.Body>

                                        <FormikSelectInputForm
                                            name="seriesMajorId"
                                            label="Series major*:"
                                        >
                                            <option value={""}>Choose...</option>
                                            {props.series.map(series =>
                                                <option key={series.id} value={series.id}>
                                                    {series.name}
                                                </option>)}
                                        </FormikSelectInputForm>

                                        <FormikSelectInputForm
                                            name="seriesMinorId"
                                            label="Series minor:"
                                        >
                                            <option value={""}>None...</option>
                                            {props.series.map(series =>
                                                <option key={series.id} value={series.id}>
                                                    {series.name}
                                                </option>)}
                                        </FormikSelectInputForm>

                                        <SelectInputForm
                                            title={"Country:"}
                                            defaultValue={""}
                                            onChange={e => updateToCountry(e)}
                                        >
                                            <option value={""}>All Countries...</option>
                                            {props.countries.map(country =>
                                                <option key={country.id} value={country.id}>
                                                    {country.name}
                                                </option>)}
                                        </SelectInputForm>

                                        <SelectInputForm
                                            title={"Venue:"}
                                            defaultValue={""}
                                            onChange={e => updateToVenue(e)}
                                        >
                                            <option value={""}>Choose...</option>
                                            {venues.map(venue =>
                                                <option key={venue.id} value={venue.id}>
                                                    {venue.name}
                                                </option>)}
                                        </SelectInputForm>


                                        <SelectInputForm
                                            title={"Hill:"}
                                            defaultValue={hillId}
                                            disabled={hills.length < 1}
                                            onChange={e => updateToHill(e)}
                                        >
                                            <option value={""}>Choose...</option>
                                            {hills.map(hill =>
                                                <option key={hill.id} value={hill.id}>
                                                    {hill.name}, {hill.sizeOfHill.designation}
                                                </option>)}
                                        </SelectInputForm>

                                        <FormikSelectInputForm
                                            name="hillVersionId"
                                            label="Hill version*:"
                                            disabled={props.hillVersion.id === ""}
                                            defaultValue={props.hillVersion.id}
                                            hintTextDown={"Select venue and hill beforehand"}
                                        >
                                            <option value={""}>Choose...</option>
                                            {hillVersions.map(hillVersion =>
                                                <option key={hillVersion.id} value={hillVersion.id}>
                                                    {hillVersion.validSince}/{hillVersion.validUntil} (K: {hillVersion.kPoint} m,
                                                    HS: {hillVersion.hillSize} m)
                                                </option>)}

                                        </FormikSelectInputForm>

                                        <FormikSelectInputForm
                                            name="seasonId"
                                            label="Season*:"
                                            style={{width: "100px"}}
                                            defaultValue={props.season.id}
                                        >
                                            <option value={""}>Choose...</option>
                                            {props.seasons.map(season =>
                                                <option key={season.id} value={season.id}>
                                                    {season.season}
                                                </option>)}
                                        </FormikSelectInputForm>

                                        <FormikDatePicker
                                            name="date1"
                                            label={"Date*:"}
                                        />
                                        <SelectInputForm
                                            title={"Second day?*:"}
                                            style={{width: "100px"}}
                                            onChange={e => {
                                                setIsTwoDayCompetition(parseInt(e.target.value))
                                            }}
                                        >
                                            <option value={0}>No</option>
                                            <option value={1}>Yes</option>
                                        </SelectInputForm>

                                        {isTwoDayCompetition === 1 ?
                                            <FormikDatePicker
                                                name="date2"
                                                label={"2. day:"}
                                            />
                                            : null}

                                        <FormikTimePicker
                                            name="firstRoundStartTime"
                                            label={"Start time"}
                                        />

                                        <FormikSelectInputForm
                                            name="isTeam"
                                            label="Team? :"
                                            style={{width: "100px"}}
                                            defaultValue={false}
                                        >
                                            <option value={false}>No</option>
                                            <option value={true}>Yes</option>
                                        </FormikSelectInputForm>

                                        <FormikTextInputForm
                                            name="cancelledAtRound"
                                            label="Cancelled at:"
                                            hintTextDown="If there was no cancellation don't enter number here."
                                            style={{width: "100px"}}
                                        />

                                        {/*<FormikTextInputForm*/}
                                        {/*    name="resultsLink"*/}
                                        {/*    label="Link to results:"*/}
                                        {/*/>*/}

                                    </Card.Body>
                                </Accordion.Collapse>
                            </Card>

                            {/*Jury*/}
                            <Card style={{borderRadius: '10px'}}>
                                <Accordion.Toggle as={Card.Header} eventKey="1">
                                    <Header5>Jury</Header5>
                                    {
                                        (errors['raceDirectorId'] !== undefined && touched['raceDirectorId\'']) ||
                                        (errors['technicalDelegateId'] !== undefined && touched['technicalDelegateId']) ||
                                        (errors['chiefOfCompetitionId'] !== undefined && touched['chiefOfCompetitionId\'']) ||
                                        (errors['assistantTDId'] !== undefined && touched['assistantTDId']) ||
                                        (errors['equipmentController1Id'] !== undefined && touched['equipmentController1Id']) ||
                                        (errors['equipmentController2Id'] !== undefined && touched['equipmentController2Id']) ||
                                        (errors['assistantRDId'] !== undefined && touched['assistantRDId']) ?
                                            <text style={{marginRight: "2px"}}>errors</text> : null
                                    }
                                </Accordion.Toggle>
                                <Accordion.Collapse eventKey="1">
                                    <Card.Body>
                                        <FormikSelectInputForm
                                            name="raceDirectorId"
                                            label="Race director:"
                                        >
                                            <option value={""}>No info</option>
                                            {props.raceDirectors.map(raceDirector =>
                                                <option key={raceDirector.id} value={raceDirector.id}>
                                                    {raceDirector.person.firstName} {raceDirector.person.lastName}
                                                </option>)}
                                        </FormikSelectInputForm>

                                        <FormikSelectInputForm
                                            name="technicalDelegateId"
                                            label="Technical delegate:"
                                        >
                                            <option value={""}>No info</option>
                                            {props.technicalDelegates.map(technicalDelegate =>
                                                <option key={technicalDelegate.id} value={technicalDelegate.id}>
                                                    {technicalDelegate.person.firstName} {technicalDelegate.person.lastName}
                                                </option>)}
                                        </FormikSelectInputForm>

                                        <FormikSelectInputForm
                                            name="chiefOfCompetitionId"
                                            label="Chief of competition:"
                                        >
                                            <option value={""}>No info</option>
                                            {props.chiefsOfCompetition.map(chiefOfCompetition =>
                                                <option key={chiefOfCompetition.id} value={chiefOfCompetition.id}>
                                                    {chiefOfCompetition.person.firstName} {chiefOfCompetition.person.lastName}
                                                </option>)}
                                        </FormikSelectInputForm>

                                        <FormikSelectInputForm
                                            name="assistantRDId"
                                            label="Assistant RD:"
                                            defaultValue={props.initialAssistantRDId}
                                        >
                                            <option value={''}>No info</option>
                                            {props.aRDs.map(aRD =>
                                                <option key={aRD.id} value={aRD.id}>
                                                    {aRD.person.firstName} {aRD.person.lastName}
                                                </option>)}
                                        </FormikSelectInputForm>

                                        <FormikSelectInputForm
                                            name="assistantTDId"
                                            label="Assistant TD:"
                                        >
                                            <option value={""}>No info</option>
                                            {props.aTDs.map(aTD =>
                                                <option key={aTD.id} value={aTD.id}>
                                                    {aTD.person.firstName} {aTD.person.lastName}
                                                </option>)}
                                        </FormikSelectInputForm>

                                        <FormikSelectInputForm
                                            name="equipmentController1Id"
                                            label="1. equipment controller:"
                                        >
                                            <option value={""}>No info</option>
                                            {props.equipmentControllers.map(ec =>
                                                <option key={ec.id} value={ec.id}>
                                                    {ec.person.firstName} {ec.person.lastName}
                                                </option>)}
                                        </FormikSelectInputForm>

                                        <FormikSelectInputForm
                                            name="equipmentController2Id"
                                            label="2. equipment controller:"
                                        >
                                            <option value={""}>No info</option>
                                            {props.equipmentControllers.map(ec =>
                                                <option key={ec.id} value={ec.id}>
                                                    {ec.person.firstName} {ec.person.lastName}
                                                </option>)}
                                        </FormikSelectInputForm>

                                    </Card.Body>
                                </Accordion.Collapse>
                            </Card>

                            {/*Judges*/}
                            <Card style={{borderRadius: '10px'}}>
                                <Accordion.Toggle as={Card.Header} eventKey="2">
                                    <Header5>Judges</Header5>
                                    {
                                        (errors['judgeAId'] !== undefined && touched['judgeAId']) ||
                                        (errors['judgeBId'] !== undefined && touched['judgeBId']) ||
                                        (errors['judgeCId'] !== undefined && touched['judgeCId']) ||
                                        (errors['judgeDId'] !== undefined && touched['judgeDId']) ||
                                        (errors['judgeEId'] !== undefined && touched['judgeEId']) ||
                                        (errors['judgeSCId'] !== undefined && touched['judgeSCId']) ?
                                            <text style={{marginRight: "2px"}}>errors</text> : null
                                    }
                                </Accordion.Toggle>
                                <Accordion.Collapse eventKey="2">
                                    <Card.Body>
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

                                    </Card.Body>
                                </Accordion.Collapse>
                            </Card>

                            {/*Point factors*/}
                            <Card style={{borderRadius: '10px'}}>
                                <Accordion.Toggle as={Card.Header} eventKey="3">
                                    <Header5>Point Factors</Header5>
                                    {
                                        (errors['meterValue'] !== undefined && touched['meterValue']) ||
                                        (errors['gateFactor'] !== undefined && touched['gateFactor']) ||
                                        (errors['windFactorTail'] !== undefined && touched['windFactorTail']) ||
                                        (errors['windFactorFront'] !== undefined && touched['windFactorFront'])
                                            ?
                                            <text style={{marginRight: "2px"}}>errors</text> : null
                                    }
                                </Accordion.Toggle>
                                <Accordion.Collapse eventKey="3">
                                    <Card.Body>
                                        <FormikSelectInputForm
                                            name="meterValue"
                                            label="Meter Value:"
                                            style={{width: "100px"}}
                                            defaultValue={props.meterValue}
                                        >
                                            <option value={""}>No info</option>
                                            <option value={1.2}>1.2</option>
                                            <option value={1.8}>1.8</option>
                                            <option value={2.0}>2.0</option>
                                            <option value={2.2}>2.2</option>
                                            <option value={2.4}>2.4</option>
                                            <option value={2.8}>2.8</option>
                                            <option value={3.2}>3.2</option>
                                            <option value={3.6}>3.6</option>
                                            <option value={4.0}>4.0</option>
                                            <option value={4.4}>4.4</option>
                                            <option value={4.8}>4.8</option>
                                        </FormikSelectInputForm>

                                        <FormikTextInputForm
                                            name="gateFactor"
                                            label="Gate factor:"
                                            style={{width: "100px"}}
                                        />

                                        <FormikTextInputForm
                                            name="windFactorTail"
                                            label="Wind factor tail:"
                                            style={{width: "100px"}}
                                        />

                                        <FormikTextInputForm
                                            name="windFactorFront"
                                            label="Wind factor front:"
                                            defaultValue={props.windFactorFront}
                                            style={{width: "100px"}}
                                        />

                                    </Card.Body>
                                </Accordion.Collapse>
                            </Card>

                            {/*First round official stats*/}
                            <Card style={{borderRadius: '10px'}}>
                                <Accordion.Toggle as={Card.Header} eventKey="4">
                                    <Header5>First Round official stats</Header5>
                                    {
                                        (errors['firstRoundBaseGate'] !== undefined && touched['firstRoundBaseGate']) ||
                                        (errors['firstRoundWeatherId'] !== undefined && touched['firstRoundWeatherId']) ||
                                        (errors['firstRoundAirTempStart'] !== undefined && touched['firstRoundAirTempStart']) ||
                                        (errors['firstRoundAirTempFinish'] !== undefined && touched['firstRoundAirTempFinish']) ||
                                        (errors['firstRoundSnowTempStart'] !== undefined && touched['firstRoundSnowTempStart']) ||
                                        (errors['firstRoundSnowTempFinish'] !== undefined && touched['firstRoundSnowTempFinish']) ||
                                        (errors['firstRoundHumidityStart'] !== undefined && touched['firstRoundHumidityStart']) ||
                                        (errors['firstRoundHumidityFinish'] !== undefined && touched['firstRoundHumidityFinish']) ||
                                        (errors['firstRoundMinWind'] !== undefined && touched['firstRoundMinWind']) ||
                                        (errors['firstRoundMaxWind'] !== undefined && touched['firstRoundMaxWind']) ||
                                        (errors['firstRoundAvgWind'] !== undefined && touched['firstRoundAvgWind']) ?
                                            <text style={{marginRight: "2px"}}>errors</text> : null
                                    }
                                </Accordion.Toggle>
                                <Accordion.Collapse eventKey="4">
                                    <Card.Body>
                                        {/*<FormikTextInputForm*/}
                                        {/*    name="firstRoundStartTime"*/}
                                        {/*    label="Start time:"*/}
                                        {/*    style={{width: "100px"}}*/}
                                        {/*/>*/}

                                        <FormikTextInputForm
                                            name="firstRoundBaseGate"
                                            label="Base gate:"
                                            style={{width: "100px"}}
                                        />

                                        <FormikSelectInputForm
                                            name="firstRoundWeatherId"
                                            label="Weather:"
                                        >
                                            <option value={""}>No info</option>
                                            {props.weather.map(weather =>
                                                <option key={weather.id} value={weather.id}>
                                                    {weather.weather}
                                                </option>)}
                                        </FormikSelectInputForm>

                                        <FormikTextInputForm
                                            name="firstRoundAirTempStart"
                                            label="Air temperature start:"
                                            style={{width: "100px"}}
                                        />

                                        <FormikTextInputForm
                                            name="firstRoundAirTempFinish"
                                            label="Air temperature end:"
                                            style={{width: "100px"}}
                                        />

                                        <FormikTextInputForm
                                            name="firstRoundSnowTempStart"
                                            label="Snow temp. start:"
                                            style={{width: "100px"}}
                                        />

                                        <FormikTextInputForm
                                            name="firstRoundSnowTempFinish"
                                            label="Snow temp. end:"
                                            style={{width: "100px"}}
                                        />

                                        <FormikTextInputForm
                                            name="firstRoundHumidityStart"
                                            label="Humidity start:"
                                            style={{width: "100px"}}
                                        />

                                        <FormikTextInputForm
                                            name="firstRoundHumidityFinish"
                                            label="Humidity finish:"
                                            style={{width: "100px"}}
                                        />

                                        <FormikTextInputForm
                                            name="firstRoundMinWind"
                                            label="Minimal wind:"
                                            style={{width: "100px"}}
                                        />

                                        <FormikTextInputForm
                                            name="firstRoundMaxWind"
                                            label="Maximal wind:"
                                            style={{width: "100px"}}
                                        />

                                        <FormikTextInputForm
                                            name="firstRoundAvgWind"
                                            label="Average wind:"
                                            style={{width: "100px"}}
                                        />

                                    </Card.Body>
                                </Accordion.Collapse>
                            </Card>

                            {/*Second round official stats*/}
                            <Card style={{borderRadius: '10px'}}>
                                <Accordion.Toggle as={Card.Header} eventKey="5">
                                    <Header5>Second Round official stats</Header5>
                                    {
                                        (errors['secondRoundBaseGate'] !== undefined && touched['secondRoundBaseGate']) ||
                                        (errors['secondRoundWeatherId'] !== undefined && touched['secondRoundWeatherId']) ||
                                        (errors['secondRoundAirTempStart'] !== undefined && touched['secondRoundAirTempStart']) ||
                                        (errors['secondRoundAirTempFinish'] !== undefined && touched['secondRoundAirTempFinish']) ||
                                        (errors['secondRoundSnowTempStart'] !== undefined && touched['secondRoundSnowTempStart']) ||
                                        (errors['secondRoundSnowTempFinish'] !== undefined && touched['secondRoundSnowTempFinish']) ||
                                        (errors['secondRoundHumidityStart'] !== undefined && touched['secondRoundHumidityStart']) ||
                                        (errors['secondRoundHumidityFinish'] !== undefined && touched['secondRoundHumidityFinish']) ||
                                        (errors['secondRoundMinWind'] !== undefined && touched['secondRoundMinWind']) ||
                                        (errors['secondRoundMaxWind'] !== undefined && touched['secondRoundMaxWind']) ||
                                        (errors['secondRoundAvgWind'] !== undefined && touched['secondRoundAvgWind']) ?
                                            <text style={{marginRight: "2px"}}>errors</text> : null
                                    }
                                </Accordion.Toggle>
                                <Accordion.Collapse eventKey="5">
                                    <Card.Body>
                                        {/*<FormikTextInputForm*/}
                                        {/*    name="secondRoundStartTime"*/}
                                        {/*    label="Start time:"*/}
                                        {/*    style={{width: "100px"}}*/}
                                        {/*/>*/}

                                        <FormikTextInputForm
                                            name="secondRoundBaseGate"
                                            label="Base gate:"
                                            style={{width: "100px"}}
                                        />

                                        <FormikSelectInputForm
                                            name="secondRoundWeatherId"
                                            label="Weather:"
                                        >
                                            <option value={""}>No info</option>
                                            {props.weather.map(weather =>
                                                <option key={weather.id} value={weather.id}>
                                                    {weather.weather}
                                                </option>)}

                                        </FormikSelectInputForm>

                                        <FormikTextInputForm
                                            name="secondRoundAirTempStart"
                                            label="Air temperature start:"
                                            style={{width: "100px"}}
                                        />

                                        <FormikTextInputForm
                                            name="secondRoundAirTempFinish"
                                            label="Air temperature end:"
                                            style={{width: "100px"}}
                                        />

                                        <FormikTextInputForm
                                            name="secondRoundSnowTempStart"
                                            label="Snow temp. start:"
                                            style={{width: "100px"}}
                                        />

                                        <FormikTextInputForm
                                            name="secondRoundSnowTempFinish"
                                            label="Snow temp. end:"
                                            style={{width: "100px"}}
                                        />

                                        <FormikTextInputForm
                                            name="secondRoundHumidityStart"
                                            label="Humidity start:"
                                            style={{width: "100px"}}
                                        />

                                        <FormikTextInputForm
                                            name="secondRoundHumidityFinish"
                                            label="Humidity finish:"
                                            style={{width: "100px"}}
                                        />

                                        <FormikTextInputForm
                                            name="secondRoundMinWind"
                                            label="Minimal wind:"
                                            style={{width: "100px"}}
                                        />

                                        <FormikTextInputForm
                                            name="secondRoundMaxWind"
                                            label="Maximal wind:"
                                            style={{width: "100px"}}
                                        />

                                        <FormikTextInputForm
                                            name="secondRoundAvgWind"
                                            label="Average wind:"
                                            style={{width: "100px"}}
                                        />

                                    </Card.Body>
                                </Accordion.Collapse>
                            </Card>

                            {/*Third round official stats*/}
                            <Card style={{borderRadius: '10px'}}>
                                <Accordion.Toggle as={Card.Header} eventKey="6">
                                    <Header5>Third Round official stats</Header5>
                                    {
                                        (errors['thirdRoundBaseGate'] !== undefined && touched['thirdRoundBaseGate']) ||
                                        (errors['thirdRoundWeatherId'] !== undefined && touched['thirdRoundWeatherId']) ||
                                        (errors['thirdRoundAirTempStart'] !== undefined && touched['thirdRoundAirTempStart']) ||
                                        (errors['thirdRoundAirTempFinish'] !== undefined && touched['thirdRoundAirTempFinish']) ||
                                        (errors['thirdRoundSnowTempStart'] !== undefined && touched['thirdRoundSnowTempStart']) ||
                                        (errors['thirdRoundSnowTempFinish'] !== undefined && touched['thirdRoundSnowTempFinish']) ||
                                        (errors['thirdRoundHumidityStart'] !== undefined && touched['thirdRoundHumidityStart']) ||
                                        (errors['thirdRoundHumidityFinish'] !== undefined && touched['thirdRoundHumidityFinish']) ||
                                        (errors['thirdRoundMinWind'] !== undefined && touched['thirdRoundMinWind']) ||
                                        (errors['thirdRoundMaxWind'] !== undefined && touched['thirdRoundMaxWind']) ||
                                        (errors['thirdRoundAvgWind'] !== undefined && touched['thirdRoundAvgWind']) ?
                                            <text style={{marginRight: "2px"}}>errors</text> : null
                                    }
                                </Accordion.Toggle>
                                <Accordion.Collapse eventKey="6">
                                    <Card.Body>
                                        {/*<FormikTextInputForm*/}
                                        {/*    name="thirdRoundStartTime"*/}
                                        {/*    label="Start time:"*/}
                                        {/*    style={{width: "100px"}}*/}
                                        {/*/>*/}

                                        <FormikTextInputForm
                                            name="thirdRoundBaseGate"
                                            label="Base gate:"
                                            style={{width: "100px"}}
                                        />

                                        <FormikSelectInputForm
                                            name="thirdRoundWeatherId"
                                            label="Weather:"
                                        >
                                            <option value={""}>No info</option>
                                            {props.weather.map(weather =>
                                                <option key={weather.id} value={weather.id}>
                                                    {weather.weather}
                                                </option>)}

                                        </FormikSelectInputForm>

                                        <FormikTextInputForm
                                            name="thirdRoundAirTempStart"
                                            label="Air temperature start:"
                                            style={{width: "100px"}}
                                        />

                                        <FormikTextInputForm
                                            name="thirdRoundAirTempFinish"
                                            label="Air temperature end:"
                                            style={{width: "100px"}}
                                        />

                                        <FormikTextInputForm
                                            name="thirdRoundSnowTempStart"
                                            label="Snow temp. start:"
                                            style={{width: "100px"}}
                                        />

                                        <FormikTextInputForm
                                            name="thirdRoundSnowTempFinish"
                                            label="Snow temp. end:"
                                            style={{width: "100px"}}
                                        />

                                        <FormikTextInputForm
                                            name="thirdRoundHumidityStart"
                                            label="Humidity start:"
                                            style={{width: "100px"}}
                                        />

                                        <FormikTextInputForm
                                            name="thirdRoundHumidityFinish"
                                            label="Humidity finish:"
                                            style={{width: "100px"}}
                                        />

                                        <FormikTextInputForm
                                            name="thirdRoundMinWind"
                                            label="Minimal wind:"
                                            style={{width: "100px"}}
                                        />

                                        <FormikTextInputForm
                                            name="thirdRoundMaxWind"
                                            label="Maximal wind:"
                                            style={{width: "100px"}}
                                        />

                                        <FormikTextInputForm
                                            name="thirdRoundAvgWind"
                                            label="Average wind:"
                                            style={{width: "100px"}}
                                        />

                                    </Card.Body>
                                </Accordion.Collapse>
                            </Card>

                            {/*Fourth round official stats*/}
                            <Card style={{borderRadius: '10px'}}>
                                <Accordion.Toggle as={Card.Header} eventKey="7">
                                    <Header5>Fourth Round official stats</Header5>
                                    {
                                        (errors['fourthRoundBaseGate'] !== undefined && touched['fourthRoundBaseGate']) ||
                                        (errors['fourthRoundWeatherId'] !== undefined && touched['fourthRoundWeatherId']) ||
                                        (errors['fourthRoundAirTempStart'] !== undefined && touched['fourthRoundAirTempStart']) ||
                                        (errors['fourthRoundAirTempFinish'] !== undefined && touched['fourthRoundAirTempFinish']) ||
                                        (errors['fourthRoundSnowTempStart'] !== undefined && touched['fourthRoundSnowTempStart']) ||
                                        (errors['fourthRoundSnowTempFinish'] !== undefined && touched['fourthRoundSnowTempFinish']) ||
                                        (errors['fourthRoundHumidityStart'] !== undefined && touched['fourthRoundHumidityStart']) ||
                                        (errors['fourthRoundHumidityFinish'] !== undefined && touched['fourthRoundHumidityFinish']) ||
                                        (errors['fourthRoundMinWind'] !== undefined && touched['fourthRoundMinWind']) ||
                                        (errors['fourthRoundMaxWind'] !== undefined && touched['fourthRoundMaxWind']) ||
                                        (errors['fourthRoundAvgWind'] !== undefined && touched['fourthRoundAvgWind']) ?
                                            <text style={{marginRight: "2px"}}>errors</text> : null
                                    }
                                </Accordion.Toggle>
                                <Accordion.Collapse eventKey="7">
                                    <Card.Body>
                                        {/*<FormikTextInputForm*/}
                                        {/*    name="fourthRoundStartTime"*/}
                                        {/*    label="Start time:"*/}
                                        {/*    style={{width: "100px"}}*/}
                                        {/*/>*/}

                                        <FormikTextInputForm
                                            name="fourthRoundBaseGate"
                                            label="Base gate:"
                                            style={{width: "100px"}}
                                        />

                                        <FormikSelectInputForm
                                            name="fourthRoundWeatherId"
                                            label="Weather:"
                                        >
                                            <option value={""}>No info</option>
                                            {props.weather.map(weather =>
                                                <option key={weather.id} value={weather.id}>
                                                    {weather.weather}
                                                </option>)}

                                        </FormikSelectInputForm>

                                        <FormikTextInputForm
                                            name="fourthRoundAirTempStart"
                                            label="Air temperature start:"
                                            style={{width: "100px"}}
                                        />

                                        <FormikTextInputForm
                                            name="fourthRoundAirTempFinish"
                                            label="Air temperature end:"
                                            style={{width: "100px"}}
                                        />

                                        <FormikTextInputForm
                                            name="fourthRoundSnowTempStart"
                                            label="Snow temp. start:"
                                            style={{width: "100px"}}
                                        />

                                        <FormikTextInputForm
                                            name="fourthRoundSnowTempFinish"
                                            label="Snow temp. end:"
                                            style={{width: "100px"}}
                                        />

                                        <FormikTextInputForm
                                            name="fourthRoundHumidityStart"
                                            label="Humidity start:"
                                            style={{width: "100px"}}
                                        />

                                        <FormikTextInputForm
                                            name="fourthRoundHumidityFinish"
                                            label="Humidity finish:"
                                            style={{width: "100px"}}
                                        />

                                        <FormikTextInputForm
                                            name="fourthRoundMinWind"
                                            label="Minimal wind:"
                                            style={{width: "100px"}}
                                        />

                                        <FormikTextInputForm
                                            name="fourthRoundMaxWind"
                                            label="Maximal wind:"
                                            style={{width: "100px"}}
                                        />

                                        <FormikTextInputForm
                                            name="fourthRoundAvgWind"
                                            label="Average wind:"
                                            style={{width: "100px"}}
                                        />
                                    </Card.Body>
                                </Accordion.Collapse>
                            </Card>

                        </AccordionWithPadding>

                        {/*Submit*/}
                        <StyledDiv2Right1200>
                            <Button type={"submit"}>Submit</Button>
                        </StyledDiv2Right1200>

                        </Modal.Body>
                    </Form>
                </Modal>


            )}

        </Formik>

    )
}

export default ResultsFormModal