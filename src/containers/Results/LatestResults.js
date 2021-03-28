import {Button, Col, Media} from "react-bootstrap";
import fisLogo from "../../assets/fis_logo.png";
import React from "react";

const LatestResults = (props) => {

    return (
        <Col sm={4}>
            <div style={{
                margin: 'auto',
                backgroundColor: "#dfe0ed",
                borderRadius: "10px",
                paddingLeft: "10px",
            }}>
                <h6 style={{marginBottom: "30px"}}>Latest results</h6>
                {props.competitions.slice(0, 6).map(competition => (
                        <div key={competition.id} style={{marginBottom: "20px", height: "20%"}}>
                            <Media style={{width: "450px"}}>
                                <img
                                    width={64}
                                    height={64}
                                    className="mr-3"
                                    src={fisLogo}
                                    alt="Generic placeholder"
                                />
                                <Media.Body style={{marginRight: "10vh"}}>
                                    <h6>{competition.seriesMajor.name} ({competition.date1})</h6>
                                    <p><img
                                        alt={competition.hillVersion.hill.venue.city.region.country.code}
                                        src={'./flags/' + competition.hillVersion.hill.venue.city.region.country.code + '.png'}
                                        style={{height: "15px", marginRight: "5px"}}/>
                                        {competition.hillVersion.hill.venue.city.name}, {competition.hillVersion.hill.venue.city.region.country.code} (HS: {competition.hillVersion.hillSize} m)
                                    </p>
                                    <p>
                                        <ul style={{listStyleType: "none"}}>
                                            {competition.results.slice(0, 3).map(result => (
                                                <li>{result.totalRank}. <img
                                                    alt={result.skiJumper.person.country.code}
                                                    src={'./flags/' + result.skiJumper.person.country.code + '.png'}
                                                    style={{
                                                        height: "15px",
                                                        marginRight: "5px"
                                                    }}/> {result.skiJumper.person.firstName} {result.skiJumper.person.lastName} <b>{result.totalPoints} p.</b>
                                                </li>
                                            ))}
                                            <Button variant={"link"} size={"sm"} >Read more</Button>
                                        </ul>
                                    </p>
                                </Media.Body>
                            </Media>
                        </div>
                    )
                )
                }
            </div>
        </Col>
    )
}

export default LatestResults

