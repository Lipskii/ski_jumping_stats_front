import React, {useEffect} from "react";
import {Modal, Table} from "react-bootstrap";
import {TableButton} from "../../components/StyledComponents";


const ResultsModal = (props) => {
    useEffect(() => console.log(props))

    return (
        <Modal show={props.show} onHide={props.onHide} size={"xl"} scrollable={true}>
            <Modal.Header closeButton>
                <Modal.Title>Results
                    of {props.results[0].competition.date1}: {props.results[0].competition.seriesMajor.name} {props.results[0].competition.seriesMinor !== null ?
                        <small>({props.results[0].competition.seriesMinor.name})</small> : null}</Modal.Title>
                <br/>
            </Modal.Header>
            <Modal.Body>
                <ul>
                    <h5>Results:</h5>
                    <Table bordered hover striped size={"sm"}>
                        <thead>
                        <tr>
                            <th>Rank</th>
                            <th>Jumper</th>
                            <th>Country</th>
                            <th>1. Round</th>
                            <th>2. Round</th>
                            <th>Total points</th>
                        </tr>
                        </thead>
                        <tbody>
                        {/* eslint-disable-next-line array-callback-return */}
                        {props.results.map(result =>
                            (
                                <tr key={result.id} id={result.id}>
                                    <td style={{width: "20px", textAlign: "center"}}>{result.totalRank}.</td>
                                    <td>{result.skiJumper.person.firstName} {result.skiJumper.person.lastName}</td>
                                    <td style={{
                                        width: "20px",
                                        textAlign: "center"
                                    }}>{result.skiJumper.person.country.code}</td>
                                    <td>
                                        <tr>
                                            {result.firstRoundDistance}m
                                        </tr>
                                        <tr>
                                            {result.firstRoundTotal} p.
                                        </tr>
                                    </td>
                                    <td>
                                        <tr>
                                            {result.secondRoundDistance}m
                                        </tr>
                                        <tr>
                                            {result.secondRoundTotal} p.
                                        </tr>
                                    </td>
                                    <td><b>{result.totalPoints} p.</b></td>
                                </tr>
                            ))}
                        </tbody>
                    </Table>
                </ul>
            </Modal.Body>
        </Modal>
    )
}

export default ResultsModal