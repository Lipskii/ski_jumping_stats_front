import {Table} from "react-bootstrap";
import React from "react";
import {LinkContainer} from "react-router-bootstrap";
import Loader from "react-loader-spinner";

const SeriesOverallStandingsTable = (props) => {

    let bestScore = 0

    if (props.overallStandings.length > 0) {
        bestScore = props.overallStandings[0].points
    }


    return (
        <div>
            {!props.filterLoading ?
                <div>
                    <h3>
                        Standings
                    </h3>
                    {props.overallStandings.length > 0 ? <Table borderless hover striped size={"sm"}>
                            <th style={{textAlign: "center"}}>Rank</th>
                            <th/>
                            <th/>
                            <th/>
                            <tbody>
                            {props.overallStandings.map(overallStanding => (
                                    <LinkContainer to={"/skiJumper/" + overallStanding.skiJumper.id}
                                                   style={{cursor: "pointer"}}>
                                        <tr key={overallStanding.id} id={overallStanding.id}>
                                            <td >{overallStanding.ranking !== 0 ? <div style={{textAlign: "center"}}>{overallStanding.ranking}.</div> :
                                                <div style={{textAlign: "center"}}>-</div>}</td>
                                            <td>
                                                <img
                                                    className="mr-3"
                                                    src={props.photos['flag_' + overallStanding.skiJumper.person.country.code]}
                                                    alt={overallStanding.skiJumper.person.country.code}
                                                />
                                            </td>
                                            <td>{overallStanding.skiJumper.person.firstName} {overallStanding.skiJumper.person.lastName}</td>
                                            <td>{overallStanding.points}</td>
                                            <td>{overallStanding.points !== bestScore ?
                                                <small>- {(bestScore - overallStanding.points).toFixed(1)}</small> : null}</td>

                                        </tr>
                                    </LinkContainer>
                                )
                            )}
                            </tbody>
                        </Table>
                        :
                        <p>No standings yet</p>}
                </div>
                : <Loader
                    type="ThreeDots"
                    color="#00BFFF"
                    height={80}
                    width={80}
                    style={{textAlign: 'center'}}
                />}


        </div>


    )
}

export default SeriesOverallStandingsTable