import {Pagination, Table} from "react-bootstrap";
import React, {useState} from "react";
import Loader from "react-loader-spinner";
import {LinkContainer} from "react-router-bootstrap";

const SearchHillsTable = (props) => {
    const [activePage, setActivePage] = useState(1);

    const numOfHills = 30

    let items = [];
    let numberOfPages = props.hills.length / numOfHills
    if (props.hills.length % numOfHills !== 0) {
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
            {props.hillsLoading ?
                <Loader
                    type="ThreeDots"
                    color="#00BFFF"
                    height={80}
                    width={80}
                    style={{textAlign: 'center'}}
                /> :
                <div>
                    <h6>Found Hills</h6>
                    <Table borderless hover striped size={"sm"} style={{textAlign: 'center'}}>
                        <th/>
                        <th width={"30%"}/>
                        <th>Size</th>
                        <th>K</th>
                        <th>HS</th>
                        <th>Official Record</th>
                        <th>Opened in</th>
                        <tbody>
                        {props.hills.map(hill => {
                            const sortedHillVersions = hill.hillVersions.sort(function (a, b) {
                                return new Date(b.date) - new Date(a.date);
                            })

                            const latestHillVersion = sortedHillVersions[0]

                            const oldestHillVersion = sortedHillVersions[sortedHillVersions.length - 1]

                            const hillRecord = props.hillRecords.find(hillRecord => hillRecord.result.competition.hillVersion.hill.id === hill.id)

                            if (((activePage - 1) * numOfHills <= props.hills.indexOf(hill)) && (props.hills.indexOf(hill) < activePage * numOfHills)) {
                                return (
                                    <LinkContainer to={'/hill/' + hill.id} style={{cursor: "pointer"}}>
                                        <tr>
                                            <td width={"10px"}><img
                                                alt={hill.venue.city.region.country.code}
                                                src={'./flags/' + hill.venue.city.region.country.code + '.png'}
                                                style={{
                                                    height: "15px",
                                                    marginRight: "5px"
                                                }}/></td>
                                            <td>{hill.name}</td>

                                            <td>{hill.sizeOfHill.designation}</td>

                                            <td>{latestHillVersion.kPoint !== null ?
                                                <div>{latestHillVersion.kPoint} m</div> : null}</td>

                                            <td>{latestHillVersion.hillSize !== null ?
                                                <div>{latestHillVersion.hillSize} m</div> : null}</td>

                                            {hillRecord !== undefined ?
                                                <td>{hillRecord.hillRecord} m, {hillRecord.result.skiJumper
                                                    .person.firstName} {hillRecord.result.skiJumper.person.lastName} ({hillRecord.result.competition.date1})
                                                </td>
                                                :
                                                <td/>}

                                            <td>{oldestHillVersion.validSince !== null ? <div>{oldestHillVersion.validSince.slice(0, 4)}</div> : null}</td>
                                        </tr>
                                    </LinkContainer>
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

export default SearchHillsTable

