import {Pagination, Table} from "react-bootstrap";
import React, {useState} from "react";
import {TableButton} from "../../components/StyledComponents";
import fisLogo from "../../assets/fis_logo.png";
import Loader from "react-loader-spinner";
import {LinkContainer} from "react-router-bootstrap";

const CompetitionsTable = (props) => {
    const [activePage, setActivePage] = useState(1);

    const numOfCompetitions = 20

    let items = [];
    let numberOfPages = props.competitions.length / numOfCompetitions
    if (props.competitions.length % numOfCompetitions !== 0) {
        numberOfPages++
    }

    for (let number = 1; number <= numberOfPages; number++) {
        items.push(
            <Pagination.Item key={number} id={number} active={number === activePage} onClick={e => {
                setActivePage(parseInt(e.target.id))
            }}>
                {number}
            </Pagination.Item>
        );
    }
    return (
        <div style={{marginTop: "20px", width: "100%"}}>
            {props.competitionsLoading ?
                <Loader
                    type="ThreeDots"
                    color="#00BFFF"
                    height={80}
                    width={80}
                    style={{textAlign: 'center'}}
                /> :
                <div>
                    <h6>Found Competitions</h6>
                    <Table borderless hover striped size={"sm"}>
                        <tbody>
                        {props.competitions.map(competition => {
                            if (((activePage - 1) * numOfCompetitions <= props.competitions.indexOf(competition)) && (props.competitions.indexOf(competition) < activePage * numOfCompetitions)) {
                                return (
                                    <tr key={competition.id} id={competition.id}>
                                        <td>{competition.date1}</td>

                                        <td><img
                                            width={32}
                                            height={32}
                                            className="mr-3"
                                            src={fisLogo}
                                            alt="Generic placeholder"
                                        />
                                        </td>
                                        <td>
                                            {competition.team ? <div>Team</div> : <div>Ind.</div>}
                                        </td>

                                        <td>{competition.seriesMajor.name} {competition.seriesMinor !== null ?
                                            <small>({competition.seriesMinor.name})</small> : null}
                                        </td>

                                        <td><img
                                            alt={competition.hillVersion.hill.venue.city.region.country.code}
                                            src={'./flags/' + competition.hillVersion.hill.venue.city.region.country.code + '.png'}
                                            style={{
                                                height: "15px",
                                                marginRight: "5px"
                                            }}/> {competition.hillVersion.hill.venue.city.name} (HS: {competition.hillVersion.hillSize} m)
                                        </td>

                                        <td>
                                            <LinkContainer to={'/showResults/' + competition.id}>
                                                <TableButton id={competition.id + "tbEdit"}
                                                             name={competition.name}
                                                             size="sm"
                                                             variant={"outline-info"}
                                                >
                                                    Read more
                                                </TableButton>
                                            </LinkContainer>
                                        </td>

                                    </tr>
                                )
                            }
                        })}
                        </tbody>
                    </Table>
                    <Pagination>{items}</Pagination>
                </div>
            }

        </div>


    )
}

export default CompetitionsTable

