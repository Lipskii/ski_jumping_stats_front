import {Table} from "react-bootstrap";
import React from "react";
import {LinkContainer} from "react-router-bootstrap";
import Loader from "react-loader-spinner";

const SeriesScheduleTable = (props) => {

    return (
        <div>
            {!props.filterLoading ?
                <div>
                    <h3>
                        Schedule
                    </h3>
                    {props.competitions.length > 0 ? <Table borderless hover striped size={"sm"}>
                            <th>Date</th>
                            <th>Type</th>
                            <th>Location</th>
                            <th>K</th>
                            <th>HS</th>
                        <th/>
                        <th>Winner</th>
                            <tbody>
                            {props.competitions.map(competition => (
                                    <LinkContainer to={"/showResults/" + competition.id}
                                                   style={{cursor: "pointer"}}>
                                        <tr key={competition.id} id={competition.id}>
                                            <td>{competition.date1}</td>
                                            <td>Ind</td>
                                            <td>
                                                <img
                                                    className="mr-3"
                                                    src={props.photos['flag_' + competition.hillVersion.hill.venue.city.region.country.code]}
                                                    alt={competition.hillVersion.hill.venue.city.region.country.code}
                                                /> {competition.hillVersion.hill.venue.city.name}
                                            </td>
                                            <td>
                                                {competition.hillVersion.kPoint !== null ?
                                                    <div>{competition.hillVersion.kPoint} m</div> : null}
                                            </td>
                                            <td>
                                                {competition.hillVersion.hillSize !== null ?
                                                    <div>{competition.hillVersion.hillSize} m</div> : null}
                                            </td>
                                            <td/>
                                            <td>
                                                {competition.results.length > 0 ?
                                                    <div>
                                                        <img
                                                            className="mr-3"
                                                            src={props.photos['flag_' + competition.results[0].skiJumper.person.country.code]}
                                                            alt={competition.results[0].skiJumper.person.country.code}
                                                        />
                                                        {competition.results[0].skiJumper.person.firstName} {competition.results[0]
                                                        .skiJumper.person.lastName}
                                                    </div>
                                                    : <div>-</div>}
                                            </td>

                                        </tr>
                                    </LinkContainer>
                                )
                            )}
                            </tbody>
                        </Table>
                        :
                        <p>No schedule yet</p>}
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

export default SeriesScheduleTable