import {Card, Pagination, Table} from "react-bootstrap";
import React, {useState} from "react";
import {TableButton} from "../../components/StyledComponents";
import fisLogo from "../../assets/fis_logo.png";
import Loader from "react-loader-spinner";
import {Link} from "react-router-dom";
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
                        <th/>
                        <tbody>
                        {props.hills.map(hill => {
                            if (((activePage - 1) * numOfHills <= props.hills.indexOf(hill)) && (props.hills.indexOf(hill) < activePage * numOfHills)) {
                                return (
                                  <tr>
                                      <td></td>
                                      <td>{hill.name}</td>
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

export default SearchHillsTable

