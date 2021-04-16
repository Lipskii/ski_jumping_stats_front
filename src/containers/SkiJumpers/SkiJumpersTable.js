import {Pagination, Table} from "react-bootstrap";
import React, {useState} from "react";
import {TableButton} from "../../components/StyledComponents";
import Loader from "react-loader-spinner";
import {LinkContainer} from "react-router-bootstrap";

const SkiJumpersTable = (props) => {
    const [activePage, setActivePage] = useState(1);

    const numOfSkiJumpers = 30

    let items = [];
    let numberOfPages = props.skiJumpers.length / numOfSkiJumpers
    if (props.skiJumpers.length % numOfSkiJumpers !== 0) {
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
            {props.skiJumpersLoading ?
                <Loader
                    type="ThreeDots"
                    color="#00BFFF"
                    height={80}
                    width={80}
                    style={{textAlign: 'center'}}
                /> :
                <div>
                    <h6>Found Ski Jumpers</h6>
                    <Table borderless hover striped size={"sm"} style={{textAlign: 'center'}}>
                        <th/>
                        <th/>
                        <th>Gender</th>
                        <th>Active</th>
                        <th>Birthdate</th>
                        <th>City</th>
                        <th>Club</th>
                        <th>Skis</th>
                        <tbody>
                        {props.skiJumpers.map(skiJumper => {
                            if (((activePage - 1) * numOfSkiJumpers <= props.skiJumpers.indexOf(skiJumper)) && (props.skiJumpers.indexOf(skiJumper) < activePage * numOfSkiJumpers)) {
                                return (
                                    <LinkContainer to={'/skiJumper/' + skiJumper.id} style={{cursor: "pointer"}}>
                                    <tr key={skiJumper.id} id={skiJumper.id}>
                                        <td width={"10px"}><img
                                            alt={skiJumper.person.country.code}
                                            src={'./flags/' + skiJumper.person.country.code + '.png'}
                                            style={{
                                                height: "15px",
                                                marginRight: "5px"
                                            }}/></td>
                                        <td style={{textAlign: 'left'}}>{skiJumper.person.firstName} {skiJumper.person.lastName}</td>
                                        <td>{skiJumper.person.gender.gender.charAt(0)}</td>
                                        <td>{skiJumper.active ? <div><b>Yes</b></div> : <div>No</div>}</td>
                                        <td>{skiJumper.person.birthdate}</td>
                                        <td>{skiJumper.person.city.name}</td>
                                        <td>{skiJumper.skiClub !== null ?
                                            <div>{skiJumper.skiClub.name}</div> : null}</td>
                                        <td>{skiJumper.skis !== null ? <div>{skiJumper.skis.brand}</div> : null}</td>
                                        <td>

                                            <TableButton id={skiJumper.id + "tbEdit"}
                                                         name={skiJumper.name}
                                                         size="sm"
                                                         variant={"outline-info"}
                                            >
                                                Read more
                                            </TableButton>


                                        </td>
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

export default SkiJumpersTable

