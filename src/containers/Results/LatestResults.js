import {Button, Card, Media} from "react-bootstrap";
import fisLogo from "../../assets/fis_logo.png";
import React from "react";
import {LinkContainer} from "react-router-bootstrap";

const LatestResults = (props) => {

    return (
            <div style={{
                marginTop: '20px',
                borderRadius: "10px",
                //paddingLeft: "10px",
            }}>
                <h6 style={{marginBottom: "10px"}}>Latest results</h6>
                {props.competitions.slice(0, 6).map(competition => (
                        <div key={competition.id + "_lr"} style={{marginBottom: "20px", height: "20%"}}>
                            <Card>
                                <Card.Header>{competition.seriesMajor.name} ({competition.date1})</Card.Header>
                                <Card.Subtitle className="mb-2 text-muted" style={{marginTop: "5px", marginLeft: "10px"}}><img
                                    alt={competition.hillVersion.hill.venue.city.region.country.code}
                                    src={'./flags/' + competition.hillVersion.hill.venue.city.region.country.code + '.png'}
                                    style={{height: "15px", marginRight: "5px"}}/>
                                    {competition.hillVersion.hill.venue.city.name} (HS: {competition.hillVersion.hillSize} m)
                                </Card.Subtitle>
                            <Media style={{marginLeft: "5px", marginTop: "10px"}}>
                                <img
                                    width={64}
                                    height={64}
                                    className="mr-3"
                                    src={fisLogo}
                                    alt="Generic placeholder"
                                    style={{
                                        marginLeft: "5px"
                                    }}
                                />
                                <Media.Body>
                                        <ul style={{listStyleType: "none"}}>
                                            {competition.results.slice(0, 3).map(result => (
                                                <li key={result.id}>{result.totalRank}. <img
                                                    alt={result.skiJumper.person.country.code}
                                                    src={'./flags/' + result.skiJumper.person.country.code + '.png'}
                                                    style={{
                                                        height: "15px",
                                                        marginRight: "5px",
                                                       // marginLeft: "5px"
                                                    }}/> <a
                                                    href={'/skiJumper/' + result.skiJumper.id}
                                                    style={{color: "black"}}
                                                > {result.skiJumper.person.firstName} {result.skiJumper.person.lastName}  </a>  <b>{result.totalPoints} p.</b>
                                                </li>
                                            ))}
                                            <LinkContainer to={'/showResults/' + competition.id}>
                                            <Button variant={"link"} size={"sm"} >Read more</Button>
                                            </LinkContainer>
                                        </ul>
                                </Media.Body>
                            </Media>
                            </Card>
                        </div>
                    )
                )
                }
            </div>
    )
}

export default LatestResults

