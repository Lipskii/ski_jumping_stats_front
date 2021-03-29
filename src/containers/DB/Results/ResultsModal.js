import React, {useEffect} from "react";
import {Modal, Table} from "react-bootstrap";


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
                            {props.results[0].firstRoundDistance !== null || props.results[0].firstRoundTotal !== null ?
                                <th>1. Round</th>
                                : null
                            }
                            {props.results[0].secondRoundDistance !== null || props.results[0].secondRoundTotal !== null ?
                                <th>2. Round</th>
                                : null
                            }
                            {props.results[0].thirdRoundDistance !== null || props.results[0].thirdRoundTotal !== null ?
                                <th>3. Round</th>
                                : null
                            }
                            {props.results[0].fourthRoundDistance !== null || props.results[0].fourthRoundTotal !== null ?
                                <th>4. Round</th>
                                : null
                            }
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
                                    {result.firstRoundDistance !== null && result.firstRoundTotal !== null ?
                                        <td>
                                            <tr>
                                                {<div>{result.firstRoundDistance} m</div>}
                                            </tr>
                                            <tr>
                                                {<div>{result.firstRoundTotal} p.</div>}
                                            </tr>
                                        </td>
                                        : null}
                                    {result.secondRoundDistance !== null && result.secondRoundTotal !== null ?
                                        <td>
                                            <tr>
                                                {<div>{result.secondRoundDistance} m</div>}
                                            </tr>
                                            <tr>
                                                {<div>{result.secondRoundTotal} p.</div>}
                                            </tr>
                                        </td>
                                    : null}

                                    {result.thirdRoundDistance !== null && result.thirdRoundTotal !== null ?
                                        <td>
                                            <tr>
                                                {<div>{result.thirdRoundDistance} m</div>}
                                            </tr>
                                            <tr>
                                                {<div>{result.thirdRoundTotal} p.</div>}
                                            </tr>
                                        </td>
                                        : null}
                                    {result.fourthRoundDistance !== null && result.fourthRoundTotal !== null ?
                                        <td>
                                            <tr>
                                                {<div>{result.fourthRoundDistance} m</div>}
                                            </tr>
                                            <tr>
                                                {<div>{result.fourthRoundTotal} p.</div>}
                                            </tr>
                                        </td>
                                        : null}
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