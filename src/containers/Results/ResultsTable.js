import {Table} from "react-bootstrap";
import React from "react";
import ResultsTableAthleteRow from "./ResultsTableAthleteRow";

const ResultsTable = (props) => {

    const bestScore = props.results[0].totalPoints

    return (
        <div style={{marginTop: "20px", width: "100%"}}>

            <Table bordered hover striped size={"sm"}>
                <th style={{width: "15px", textAlign: "center"}}>Rank</th>
                <th/>
                <th>1. Round</th>
                <th>2. Round</th>
                <th>Total Score</th>
                <th>Difference</th>
                <tbody>
                {props.results.map(result => (
                        <tr key={result.id} id={result.id}>
                            <td style={{textAlign: "center"}}>{result.totalRank !== 999 ? <div>{result.totalRank}.</div> : <div>DSQ</div> }</td>
                            <ResultsTableAthleteRow result={result}/>
                            <td>{result.firstRoundDistance !== 0 ? <div>{result.firstRoundDistance} m</div> : <div>-</div>}</td>
                            <td>{result.secondRoundDistance !== 0 ? <div>{result.secondRoundDistance} m</div> : <div>-</div>}</td>
                            <td><b>{result.totalPoints !== 0 ? <div>{result.totalPoints} p.</div> : <div>DSQ</div>}</b></td>
                            <td>{result.totalPoints === bestScore ? <div/> : <div>-{(bestScore - result.totalPoints).toFixed(1)}</div> }</td>
                        </tr>
                    )
                )}
                </tbody>
            </Table>


        </div>


    )
}

export default ResultsTable

