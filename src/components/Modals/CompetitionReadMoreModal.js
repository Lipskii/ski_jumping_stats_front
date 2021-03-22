import React from "react";
import {Modal} from "react-bootstrap";


const CompetitionReadMoreModal = (props) => {

    return (
        <Modal show={props.show} onHide={props.onHide} size={"lg"}>
            <Modal.Header closeButton>
                <Modal.Title>{props.competition.date1}: {props.competition.seriesMajor.name} {props.competition.seriesMinor !== null ?
                    <small>({props.competition.seriesMinor.name})</small> : null}</Modal.Title>
                <br/>
            </Modal.Header>
            <Modal.Body>
                <ul>
                    <h5>Basic Info:</h5>
                    <li>Major series: {props.competition.seriesMajor.name}</li>
                    <li>Hill: {props.competition.hillVersion.hill.name} (HS: {props.competition.hillVersion.hillSize} m)</li>
                    {props.competition.seriesMinor !== null ? <li>Minor series: {props.competition.seriesMinor.name}</li> : null}
                    <li>Date 1: {props.competition.date1}</li>
                    {props.competition.date2 !== null ? <li>Date 2: {props.competition.date2}</li> : null}

                    <br/>
                    <h5>Jury:</h5>
                    {/*{props.competition.raceDirector !== null ? <li>Race director: {props.competition.raceDirector.name}</li> : null}*/}

                </ul>
            </Modal.Body>
        </Modal>
    )

}

export default CompetitionReadMoreModal