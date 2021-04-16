import {Modal, Table} from "react-bootstrap";
import React from "react";


const WinsModal = (props) => {

    let winsCount = -1
    return (
        <Modal show={props.show} size={"m"} scrollable={true} onHide={props.onHide}>
            <Modal.Header closeButton>
                <h3 style={{textAlign: "center"}}>{props.title} podiums</h3>
            </Modal.Header>
           <Table striped hover>
                {props.results.length > 0 ? <th>Rank</th> : null}
                <tbody>
                {props.results.length > 0 ? <> {props.results.map(result => {
                    winsCount++
                    return (
                        <tr>
                            {/**/}
                            <td>
                                <b>{result.totalRank}.</b>
                            </td>
                            <td>
                                {result.competition.date1}
                            </td>
                            <td>
                                <img
                                    height={24}
                                    className="mr-3"
                                    src={props.photos['result_' + result.id]}
                                    alt="Generic placeholder"/> <a href={"/showResults/" + result.competition.id}
                                                                   style={{color: "black"}}>{result.competition.hillVersion.hill.venue.city.name}</a>
                            </td>
                            <td>
                                {result.competition.hillVersion.hillSize !== null ?
                                    <div> HS: {result.competition.hillVersion.hillSize} m</div>
                                    :
                                    <div> K: {result.competition.hillVersion.kPoint} m</div>
                                }
                            </td>
                            {/*</a>*/}
                        </tr>
                    )
                })} </> : <p style={{textAlign: "center"}}>0 podiums</p>}
                </tbody>


            </Table>

            {/*<ol style={{marginTop: "10px"}}>*/}
            {/*        {props.wins.map( win => (*/}
            {/*            <li>*/}
            {/*                <img*/}
            {/*                    height={24}*/}
            {/*                    className="mr-3"*/}
            {/*                    src={props.photos['result_' + win.id]}*/}
            {/*                    alt="Generic placeholder"/> {win.competition.date1}*/}
            {/*            </li>*/}
            {/*            )*/}
            {/*        )}*/}
            {/*</ol>*/}
            {/*<ListGroup variant="flush">*/}
            {/*    {props.wins.map( win => (*/}
            {/*        <ListGroup.Item>*/}
            {/*            {win.competition.date1}*/}
            {/*        </ListGroup.Item>*/}
            {/*        )*/}
            {/*    )}*/}
            {/*</ListGroup>*/}
        </Modal>
    )

}

export default WinsModal