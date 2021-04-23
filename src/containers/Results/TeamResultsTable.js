import {Table} from "react-bootstrap";
import React from "react";
import ResultsTableAthleteRow from "./ResultsTableAthleteRow";
import TeamResultsTableCountryRow from "./TeamResultsTableCountryRow";
import {LinkContainer} from "react-router-bootstrap";

const TeamResultsTable = (props) => {

    const bestScore = props.results[0].totalPoints

    return (
        <div style={{marginTop: "20px", width: "100%"}}>

            <Table bordered hover striped size={"sm"}>
                <th style={{width: "15px", textAlign: "center"}}>Rank</th>
                <th/>
                <th>Jumpers</th>
                <th>Total Score</th>
                <th>Difference</th>
                <tbody>
                {props.results.map(result => (
                        <tr key={result.id} id={result.id}>
                            <td style={{textAlign: "center"}}>
                                <div>{result.totalRank}.</div>
                            </td>
                            <TeamResultsTableCountryRow country={result.country}/>
                            <td>
                                <ul>
                                    {result.skiJumper1 !== null ?
                                        <LinkContainer to={"/skiJumper/" + result.skiJumper1.id}
                                                       style={{cursor: "pointer"}}>
                                            <li>
                                                {result.skiJumper1.person.firstName} {result.skiJumper1.person.lastName}
                                            </li>
                                        </LinkContainer> : null}
                                    {result.skiJumper2 !== null ?
                                        <LinkContainer to={"/skiJumper/" + result.skiJumper2.id}
                                                       style={{cursor: "pointer"}}>
                                            <li>
                                                {result.skiJumper2.person.firstName} {result.skiJumper2.person.lastName}
                                            </li>
                                        </LinkContainer> : null}
                                    {result.skiJumper3 !== null ?
                                        <LinkContainer to={"/skiJumper/" + result.skiJumper3.id}
                                                       style={{cursor: "pointer"}}>
                                            <li>
                                                {result.skiJumper3.person.firstName} {result.skiJumper3.person.lastName}
                                            </li>
                                        </LinkContainer> : null}
                                    {result.skiJumper4 !== null ?
                                        <LinkContainer to={"/skiJumper/" + result.skiJumper4.id}
                                                       style={{cursor: "pointer"}}>
                                            <li>
                                                {result.skiJumper4.person.firstName} {result.skiJumper4.person.lastName}
                                            </li>
                                        </LinkContainer> : null}
                                </ul>
                            </td>
                            <td><b>{result.totalPoints !== 0 ? <div>{result.totalPoints} p.</div> : <div>DSQ</div>}</b></td>
                            <td>{result.totalPoints === bestScore ? <div/> :
                                <div>-{(bestScore - result.totalPoints).toFixed(1)}</div>}</td>
                        </tr>
                    )
                )}
                </tbody>
            </Table>


        </div>


    )
}

export default TeamResultsTable

