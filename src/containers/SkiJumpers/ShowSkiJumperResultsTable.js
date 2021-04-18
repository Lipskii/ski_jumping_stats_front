import {Table} from "react-bootstrap";
import React from "react";


const ShowSkiJumperTable = (props) => {

    return (
        <div style={{marginTop: "20px", width: "100%"}}>
            <Table borderless striped hover size={"sm"}>
                <th>Rank</th>
                <th>Series</th>
                <th>Date</th>
                <th>Location</th>
                <tbody>
                {props.results.sort(
                    function compareResultsSeasons(a, b) {

                        return Date.parse(b.competition.date1) - Date.parse(a.competition.date1)
                    })
                    .map(result => (
                        <tr>
                            <td>{result.totalRank > 3 ?
                                <div>
                                    {result.totalRank !== 999 ? <div>{result.totalRank}.</div>  : <div>DSQ</div>}
                                </div>
                                : <b>{result.totalRank}.</b>
                                }</td>
                            <td>{result.competition.date1}</td>
                            <td><a href={"/showResults/" + result.competition.id}
                                   style={{color: "black"}}> {result.competition
                                .seriesMajor.name} {result.competition.seriesMinor !== null ? <small>
                                ({result.competition.seriesMinor.name})</small> : null}
                            </a></td>
                            <td><img
                                height={24}
                                className="mr-3"
                                src={props.photos['result_' + result.id]}
                                alt="Generic placeholder"/>{result.competition.hillVersion.hill.venue.city.name} (HS: {result.competition.hillVersion.hillSize} m)
                            </td>
                            {result.firstRoundDistance !== null ?
                                <td>
                                    {result.firstRoundDistance !== 0 ? <div>{result.firstRoundDistance} m</div> : null}
                                </td> : null}
                            {result.secondRoundDistance !== null ?
                                <td>
                                    {result.secondRoundDistance !== 0 ?
                                        <div>{result.secondRoundDistance} m</div> : null}
                                </td> : null}
                            {result.thirdRoundDistance !== null ? <td>{result.thirdRoundDistance} m</td> : null}
                            {result.fourthRoundDistance !== null ? <td>{result.fourthRoundDistance} m</td> : null}
                            {result.totalPoints !== null ?
                                <td>
                                    <b>
                                        {result.totalPoints !== 0 ? <div>{result.totalPoints} p.</div> : <div>DSQ</div>}
                                    </b>
                                </td> : null}
                        </tr>
                    ))}
                </tbody>

            </Table>
        </div>


    )
}

export default ShowSkiJumperTable

