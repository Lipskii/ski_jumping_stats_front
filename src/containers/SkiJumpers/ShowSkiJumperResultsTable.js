import { Table} from "react-bootstrap";
import React from "react";


const ShowSkiJumperTable = (props) => {

    return (
        <div style={{marginTop: "20px", width: "100%"}}>
            <Table borderless striped>
                <th>Rank</th>
                <th>Series</th>
                <th>Date</th>
                <th>Location</th>
                <th></th>
                <tbody>
                {props.results.map(result => (
                    <tr>
                        <td><b>{result.totalRank}.</b></td>
                        <td>{result.competition.seriesMajor.name}</td>
                        <td>{result.competition.date1}</td>
                        <td>{result.competition.hillVersion.hill.venue.city.name}, {result.competition.hillVersion.hill.venue.city.region.country.code}</td>
                    </tr>
                ))}
                </tbody>

            </Table>
        </div>


    )
}

export default ShowSkiJumperTable

