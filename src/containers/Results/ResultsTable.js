import {Table} from "react-bootstrap";
import React, {useEffect} from "react";
import ResultsTableAthleteRow from "./ResultsTableAthleteRow";

const ResultsTable = (props) => {

    return (
        <div style={{marginTop: "20px", width: "100%"}}>

            <Table bordered hover striped size={"sm"}>
                <th style={{width: "15px", textAlign: "center"}}>Rank</th>
                <th/>
                <th>1. Round</th>
                <th>2. Round</th>
                <th>Total Score</th>

                <tbody>
                {props.results.map(result => (
                        <tr key={result.id} id={result.id}>
                            <td style={{textAlign: "center"}}>{result.totalRank}.</td>
                            <ResultsTableAthleteRow result={result}/>
                            <td>{result.firstRoundDistance} m</td>
                            <td>{result.secondRoundDistance} m</td>
                            <td><b>{result.totalPoints} p.</b></td>
                        </tr>
                    )
                )}
                </tbody>
            </Table>


        </div>


    )
}

export default ResultsTable

