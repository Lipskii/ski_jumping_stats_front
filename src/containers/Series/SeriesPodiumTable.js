import {Table} from "react-bootstrap";
import {LinkContainer} from "react-router-bootstrap";
import Loader from "react-loader-spinner";
import React from "react";

const SeriesPodiumTable = (props) => {

    let seasons = []
    for (const overallStanding of props.overallStandings) {
        if (seasons.findIndex(x => x === overallStanding.season.season) === -1) {
            seasons.push(overallStanding.season.season)
        }
    }
    console.log(seasons)

    return (
        <div>
            {!props.filterLoading ?
                <div>
                    <h3>
                        Podiums
                    </h3>
                    {props.overallStandings.length > 0 ?
                        <Table hover bordered striped size={"md"}>
                            <th>Season</th>
                            <th style={{textAlign: "center"}} colSpan={2}>Winner</th>
                            <th style={{textAlign: "center"}} colSpan={2}>2. place</th>
                            <th style={{textAlign: "center"}} colSpan={2}>3. place</th>
                            <tbody>
                            {seasons.map(season => {
                                const podiums = props.overallStandings.filter(overallStanding => overallStanding.season.season === season)
                                console.log(podiums)
                                return (
                                    <tr>
                                        <td>{season}</td>
                                        {podiums.map(podium => (
                                                <>
                                                    <LinkContainer to={"/skiJumper/" + podium.skiJumper.id}
                                                                   style={{cursor: "pointer"}}>
                                                        <td>
                                                            <img
                                                                className="mr-3"
                                                                src={props.photos['flag_' + podium.skiJumper.person.country.code]}
                                                                alt={podium.skiJumper.person.country.code}
                                                            />
                                                            {podium.skiJumper.person.firstName} {podium.skiJumper.person.lastName}
                                                        </td>
                                                    </LinkContainer>
                                                    <td style={{textAlign: "left"}}>
                                                        {podium.points}
                                                    </td>
                                                </>
                                            )
                                        )
                                        }
                                    </tr>
                                )
                            })}
                            </tbody>
                        </Table>
                        :
                        <p>No data yet</p>}
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

export default SeriesPodiumTable