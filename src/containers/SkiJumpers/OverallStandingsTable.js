import React from "react";
import {Header5} from "../../components/StyledComponents";
import {Table} from "react-bootstrap";


const OverallStandingsTable = (props) => {

    return (
        <div>
            <Header5 style={{marginTop: "3px", textAlign: "left"}}>World Cup Standings</Header5>
            <Table striped size={"sm"} style={{width: "100px"}}>
                <th width={"100px"}/>

                {props.overallStandings.map(overallStanding => (
                    <th>{overallStanding.season.season}</th>
                ))}

                <tr>
                    <td>
                        <strong>Ranking</strong>
                    </td>
                    {props.overallStandings.map(overallStanding => (
                        <td>
                            {overallStanding.ranking}.
                        </td>
                    ))}
                </tr>

                <tr>
                    <td>
                        <strong>Points</strong>
                    </td>
                    {props.overallStandings.map(overallStanding => (
                        <td>
                            {overallStanding.points}
                        </td>
                    ))}
                </tr>
            </Table>
        </div>
    )
}

export default OverallStandingsTable