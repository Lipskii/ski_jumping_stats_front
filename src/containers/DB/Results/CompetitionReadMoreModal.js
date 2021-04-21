import React from "react";
import {Modal} from "react-bootstrap";


const CompetitionReadMoreModal = (props) => {
    let raceDirector = null
    if (props.competition.raceDirector !== null && props.competition.raceDirector !== '') {
        let jury = props.raceDirectors.find(jury => jury.id === props.competition.raceDirector.id)
        raceDirector = <li>Race director: <b>{jury.person.firstName} {jury.person.lastName}</b></li>
    }
    let technicalDelegate = null
    if (props.competition.technicalDelegate !== null && props.competition.technicalDelegate !== '') {
        let jury = props.technicalDelegates.find(jury => jury.id === props.competition.technicalDelegate.id)
        technicalDelegate = <li>Technical delegate: <b>{jury.person.firstName} {jury.person.lastName}</b></li>
    }
    let chiefOfCompetition = null
    if (props.competition.chiefOfCompetition !== null && props.competition.chiefOfCompetition !== '') {
        let jury = props.chiefsOfCompetition.find(jury => jury.id === props.competition.chiefOfCompetition.id)
        chiefOfCompetition = <li>Chief of competition: <b>{jury.person.firstName} {jury.person.lastName}</b></li>
    }
    let assistantTD = null
    if (props.competition.assistantTD !== null && props.competition.assistantTD !== '') {
        let jury = props.asistantsTD.find(jury => jury.id === props.competition.assistantTD.id)
        assistantTD = <li>Assistant TD: <b>{jury.person.firstName} {jury.person.lastName}</b></li>
    }
    let assistantRD = null
    if (props.competition.assistantRD !== null && props.competition.assistantRD !== '') {
        let jury = props.asistantsRD.find(jury => jury.id === props.competition.assistantRD.id)
        assistantRD = <li>Assistant RD: <b>{jury.person.firstName} {jury.person.lastName}</b></li>
    }
    let equipmentController1 = null
    if (props.competition.equipmentController1 !== null && props.competition.equipmentController1 !== '') {
        let jury = props.equipmentControllers.find(jury => jury.id === props.competition.equipmentController1.id)
        equipmentController1 = <li>Equipment controller: <b>{jury.person.firstName} {jury.person.lastName}</b></li>
    }
    let equipmentController2 = null
    if (props.competition.equipmentController2 !== null && props.competition.equipmentController2 !== '') {
        let jury = props.equipmentControllers.find(jury => jury.id === props.competition.equipmentController2.id)
        equipmentController2 = <li>2.Equipment controller: <b>{jury.person.firstName} {jury.person.lastName}</b></li>
    }
    let judgeA = null
    if (props.competition.judgeA !== null && props.competition.judgeA !== '') {
        let jury = props.judges.find(jury => jury.id === props.competition.judgeA.id)
        judgeA = <li>Judge A: <b>{jury.person.firstName} {jury.person.lastName}</b></li>
    }
    let judgeB = null
    if (props.competition.judgeB !== null && props.competition.judgeB !== '') {
        let jury = props.judges.find(jury => jury.id === props.competition.judgeB.id)
        judgeB = <li>Judge B: <b>{jury.person.firstName} {jury.person.lastName}</b></li>
    }
    let judgeC = null
    if (props.competition.judgeC !== null && props.competition.judgeC !== '') {
        let jury = props.judges.find(jury => jury.id === props.competition.judgeC.id)
        judgeC = <li>Judge C: <b>{jury.person.firstName} {jury.person.lastName}</b></li>
    }
    let judgeD = null
    if (props.competition.judgeD !== null && props.competition.judgeD !== '') {
        let jury = props.judges.find(jury => jury.id === props.competition.judgeD.id)
        judgeD = <li>Judge D: <b>{jury.person.firstName} {jury.person.lastName}</b></li>
    }
    let judgeE = null
    if (props.competition.judgeE !== null && props.competition.judgeE !== '') {
        let jury = props.judges.find(jury => jury.id === props.competition.judgeE.id)
        judgeE = <li>Judge E: <b>{jury.person.firstName} {jury.person.lastName}</b></li>
    }
    let judgeSC = null
    if (props.competition.judgeSC !== null && props.competition.judgeSC !== '') {
        let jury = props.judges.find(jury => jury.id === props.competition.judgeSC.id)
        judgeSC = <li>Judge SC: <b>{jury.person.firstName} {jury.person.lastName}</b></li>
    }


    return (
        <Modal show={props.show} onHide={props.onHide} size={"lg"} scrollable={true}>
            <Modal.Header closeButton>
                <Modal.Title>{props.competition.date1}: {props.competition.seriesMajor.name} {props.competition.seriesMinor !== null && props.competition.seriesMinor !== '' ?
                    <small>({props.competition.seriesMinor.name})</small> : null}</Modal.Title>
                <br/>
            </Modal.Header>
            <Modal.Body>
                <ul>
                    <h5>Basic Info:</h5>
                    <li>Major series: <b>{props.competition.seriesMajor.name}</b></li>
                    <li>Hill: <b>{props.competition.hillVersion.hill.name} (HS: {props.competition.hillVersion.hillSize} m)</b>
                    </li>
                    {props.competition.seriesMinor !== null && props.competition.seriesMinor !== '' ?
                        <li>Minor series: <b>{props.competition.seriesMinor.name}</b></li> : null}
                    <li>Date 1: <b>{props.competition.date1}</b></li>
                    {props.competition.date2 !== null && props.competition.date2 !== '' ? <li>Date 2: <b>{props.competition.date2}</b></li> : null}

                    {raceDirector === null && technicalDelegate === null &&
                    chiefOfCompetition === null && assistantTD === null &&
                    assistantRD === null && equipmentController1 === null &&
                    equipmentController2 === null ? null : <div><br/> <h5>Jury:</h5></div>}
                    {raceDirector}
                    {technicalDelegate}
                    {chiefOfCompetition}
                    {assistantTD}
                    {assistantRD}
                    {equipmentController1}
                    {equipmentController2}

                    {judgeA === null && judgeB === null &&
                    judgeC === null && judgeD === null &&
                    judgeE === null && judgeSC === null ? null : <div><br/> <h5>Judges:</h5></div>}
                    {judgeA}
                    {judgeB}
                    {judgeC}
                    {judgeD}
                    {judgeE}
                    {judgeSC}


                    {props.competition.meterValue === null && props.competition.gateFactor === null
                    && props.competition.windFactorTail === null && props.competition.windFactorFront === null
                    && (props.competition.firstRoundBaseGate === null || props.competition.firstRoundBaseGate === 0)
                    && props.competition.firstRoundWeather === null && props.competition.firstRoundAirTempStart === null
                    && props.competition.firstRoundAirTempFinish === null && props.competition.firstRoundSnowTempStart === null
                    && props.competition.firstRoundSnowTempFinish === null && props.competition.firstRoundHumidityStart === null
                    && props.competition.firstRoundHumidityFinish === null && props.competition.firstRoundMinWind === null
                    && props.competition.firstRoundMaxWind === null && props.competition.firstRoundAvgWind === null
                    && (props.competition.secondRoundBaseGate === null || props.competition.secondRoundBaseGate === 0)
                    && props.competition.secondRoundWeather === null && props.competition.secondRoundAirTempStart === null
                    && props.competition.secondRoundAirTempFinish === null && props.competition.secondRoundSnowTempStart === null
                    && props.competition.secondRoundSnowTempFinish === null && props.competition.secondRoundHumidityStart === null
                    && props.competition.secondRoundHumidityFinish === null && props.competition.secondRoundMinWind === null
                    && props.competition.secondRoundMaxWind === null && props.competition.secondRoundAvgWind === null
                    && (props.competition.thirdRoundBaseGate === null || props.competition.thirdRoundBaseGate === 0)
                    && props.competition.thirdRoundWeather === null && props.competition.thirdRoundAirTempStart === null
                    && props.competition.thirdRoundAirTempFinish === null && props.competition.thirdRoundSnowTempStart === null
                    && props.competition.thirdRoundSnowTempFinish === null && props.competition.thirdRoundHumidityStart === null
                    && props.competition.thirdRoundHumidityFinish === null && props.competition.thirdRoundMinWind === null
                    && props.competition.thirdRoundMaxWind === null && props.competition.thirdRoundAvgWind === null
                    && (props.competition.fourthRoundBaseGate === null || props.competition.fourthRoundBaseGate === 0)
                    && props.competition.fourthRoundWeather === null && props.competition.fourthRoundAirTempStart === null
                    && props.competition.fourthRoundAirTempFinish === null && props.competition.fourthRoundSnowTempStart === null
                    && props.competition.fourthRoundSnowTempFinish === null && props.competition.fourthRoundHumidityStart === null
                    && props.competition.fourthRoundHumidityFinish === null && props.competition.fourthRoundMinWind === null
                    && props.competition.fourthRoundMaxWind === null && props.competition.fourthRoundAvgWind === null
                        ? null : <div><br/><h5>Details:</h5></div>}
                    {props.competition.meterValue !== null &&  props.competition.meterValue !== '' ?
                        <li>Meter value: <b>{props.competition.meterValue} points/m</b></li> : null}
                    {props.competition.gateFactor !== null ?
                        <li>Gate factor: <b>{props.competition.gateFactor} points/gate</b></li> : null}
                    {props.competition.windFactorTail !== null ?
                        <li>Wind factor tail: <b>{props.competition.windFactorTail} points/(m/s)</b></li> : null}
                    {props.competition.windFactorFront !== null ?
                        <li>Wind factor front: <b>{props.competition.windFactorFront} points/(m/s)</b></li> : null}
                    {props.competition.firstRoundBaseGate !== null && props.competition.firstRoundBaseGate !== 0 ?
                        <li>First round base gate: <b>{props.competition.firstRoundBaseGate}</b></li> : null}
                    {props.competition.firstRoundWeather !== null ?
                        <li>First round weather: <b>{props.competition.firstRoundWeather.weather}</b></li> : null}
                    {props.competition.firstRoundAirTempStart !== null ? <li>First round air temperature at
                        start: <b>{props.competition.firstRoundAirTempStart} {"\u2103"}</b></li> : null}
                    {props.competition.firstRoundAirTempFinish !== null ? <li>First round air temperature at
                        finish: <b>{props.competition.firstRoundAirTempFinish} {"\u2103"}</b></li> : null}
                    {props.competition.firstRoundSnowTempStart !== null ? <li>First round snow temperature at
                        start: <b>{props.competition.firstRoundSnowTempStart} {"\u2103"}</b></li> : null}
                    {props.competition.firstRoundSnowTempFinish !== null ? <li>First round snow temperature at
                        finish: <b>{props.competition.firstRoundSnowTempFinish} {"\u2103"}</b></li> : null}
                    {props.competition.firstRoundHumidityStart !== null ?
                        <li>First round humidity at start: <b>{props.competition.firstRoundHumidityStart} %</b>
                        </li> : null}
                    {props.competition.firstRoundHumidityFinish !== null ?
                        <li>First round humidity at finish: <b>{props.competition.firstRoundHumidityFinish} %</b>
                        </li> : null}
                    {props.competition.firstRoundMinWind !== null ?
                        <li>First round minimal wind: <b>{props.competition.firstRoundMinWind} m/s</b></li> : null}
                    {props.competition.firstRoundMaxWind !== null ?
                        <li>First round maximal wind: <b>{props.competition.firstRoundMaxWind} m/s</b></li> : null}
                    {props.competition.firstRoundAvgWind !== null ?
                        <li>First round average wind: <b>{props.competition.firstRoundAvgWind} m/s</b></li> : null}
                    {props.competition.secondRoundBaseGate !== null && props.competition.secondRoundBaseGate !== 0 ?
                        <li>Second round base gate: <b>{props.competition.secondRoundBaseGate}</b></li> : null}
                    {props.competition.secondRoundWeather !== null ?
                        <li>Second round weather: <b>{props.competition.secondRoundWeather.weather}</b></li> : null}
                    {props.competition.secondRoundAirTempStart !== null ? <li>Second round air temperature at
                        start: <b>{props.competition.secondRoundAirTempStart} {"\u2103"}</b></li> : null}
                    {props.competition.secondRoundAirTempFinish !== null ? <li>Second round air temperature at
                        finish: <b>{props.competition.secondRoundAirTempFinish} {"\u2103"}</b></li> : null}
                    {props.competition.secondRoundSnowTempStart !== null ? <li>Second round snow temperature at
                        start: <b>{props.competition.secondRoundSnowTempStart} {"\u2103"}</b></li> : null}
                    {props.competition.secondRoundSnowTempFinish !== null ? <li>Second round snow temperature at
                        finish: <b>{props.competition.secondRoundSnowTempFinish} {"\u2103"}</b></li> : null}
                    {props.competition.secondRoundHumidityStart !== null ?
                        <li>Second round humidity at start: <b>{props.competition.secondRoundHumidityStart} %</b>
                        </li> : null}
                    {props.competition.secondRoundHumidityFinish !== null ?
                        <li>Second round humidity at finish: <b>{props.competition.secondRoundHumidityFinish} %</b>
                        </li> : null}
                    {props.competition.secondRoundMinWind !== null ?
                        <li>Second round minimal wind: <b>{props.competition.secondRoundMinWind} m/s</b></li> : null}
                    {props.competition.secondRoundMaxWind !== null ?
                        <li>Second round maximal wind: <b>{props.competition.secondRoundMaxWind} m/s</b></li> : null}
                    {props.competition.secondRoundAvgWind !== null ?
                        <li>Second round average wind: <b>{props.competition.secondRoundAvgWind} m/s</b></li> : null}
                    {props.competition.thirdRoundBaseGate !== null && props.competition.thirdRoundBaseGate !== 0 ?
                        <li>Third round base gate: <b>{props.competition.thirdRoundBaseGate}</b></li> : null}
                    {props.competition.thirdRoundWeather !== null ?
                        <li>Third round weather: <b>{props.competition.thirdRoundWeather.weather}</b></li> : null}
                    {props.competition.thirdRoundAirTempStart !== null ? <li>Third round air temperature at
                        start: <b>{props.competition.thirdRoundAirTempStart} {"\u2103"}</b></li> : null}
                    {props.competition.thirdRoundAirTempFinish !== null ? <li>Third round air temperature at
                        finish: <b>{props.competition.thirdRoundAirTempFinish} {"\u2103"}</b></li> : null}
                    {props.competition.thirdRoundSnowTempStart !== null ? <li>Third round snow temperature at
                        start: <b>{props.competition.thirdRoundSnowTempStart} {"\u2103"}</b></li> : null}
                    {props.competition.thirdRoundSnowTempFinish !== null ? <li>Third round snow temperature at
                        finish: <b>{props.competition.thirdRoundSnowTempFinish} {"\u2103"}</b></li> : null}
                    {props.competition.thirdRoundHumidityStart !== null ?
                        <li>Third round humidity at start: <b>{props.competition.thirdRoundHumidityStart} %</b>
                        </li> : null}
                    {props.competition.thirdRoundHumidityFinish !== null ?
                        <li>Third round humidity at finish: <b>{props.competition.thirdRoundHumidityFinish} %</b>
                        </li> : null}
                    {props.competition.thirdRoundMinWind !== null ?
                        <li>Third round minimal wind: <b>{props.competition.thirdRoundMinWind} m/s</b></li> : null}
                    {props.competition.thirdRoundMaxWind !== null ?
                        <li>Third round maximal wind: <b>{props.competition.thirdRoundMaxWind} m/s</b></li> : null}
                    {props.competition.thirdRoundAvgWind !== null ?
                        <li>Third round average wind: <b>{props.competition.thirdRoundAvgWind} m/s</b></li> : null}
                    {props.competition.fourthRoundBaseGate !== null && props.competition.fourthRoundBaseGate !== 0 ?
                        <li>Fourth round base gate: <b>{props.competition.fourthRoundBaseGate}</b></li> : null}
                    {props.competition.fourthRoundWeather !== null ?
                        <li>Fourth round weather: <b>{props.competition.fourthRoundWeather.weather}</b></li> : null}
                    {props.competition.fourthRoundAirTempStart !== null ? <li>Fourth round air temperature at
                        start: <b>{props.competition.fourthRoundAirTempStart} {"\u2103"}</b></li> : null}
                    {props.competition.fourthRoundAirTempFinish !== null ? <li>Fourth round air temperature at
                        finish: <b>{props.competition.fourthRoundAirTempFinish} {"\u2103"}</b></li> : null}
                    {props.competition.fourthRoundSnowTempStart !== null ? <li>Fourth round snow temperature at
                        start: <b>{props.competition.fourthRoundSnowTempStart} {"\u2103"}</b></li> : null}
                    {props.competition.fourthRoundSnowTempFinish !== null ? <li>Fourth round snow temperature at
                        finish: <b>{props.competition.fourthRoundSnowTempFinish} {"\u2103"}</b></li> : null}
                    {props.competition.fourthRoundHumidityStart !== null ?
                        <li>Fourth round humidity at start: <b>{props.competition.fourthRoundHumidityStart} %</b>
                        </li> : null}
                    {props.competition.fourthRoundHumidityFinish !== null ?
                        <li>Fourth round humidity at finish: <b>{props.competition.fourthRoundHumidityFinish} %</b>
                        </li> : null}
                    {props.competition.fourthRoundMinWind !== null ?
                        <li>Fourth round minimal wind: <b>{props.competition.fourthRoundMinWind} m/s</b></li> : null}
                    {props.competition.fourthRoundMaxWind !== null ?
                        <li>Fourth round maximal wind: <b>{props.competition.fourthRoundMaxWind} m/s</b></li> : null}
                    {props.competition.thirdRoundAvgWind !== null ?
                        <li>Fourth round average wind: <b>{props.competition.fourthRoundAvgWind} m/s</b></li> : null}


                </ul>
            </Modal.Body>
        </Modal>
    )
}

export default CompetitionReadMoreModal