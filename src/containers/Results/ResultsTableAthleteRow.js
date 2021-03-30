import {Table} from "react-bootstrap";
import React, {useEffect, useState} from "react";
import fisLogo from "../../assets/fis_logo.png";

const ResultsTableAthleteRow = (props) => {

    const [flag, setFlag] = useState('')

    useEffect(() => {
        import(`../../assets/flags/${props.result.skiJumper.person.country.code}.png`)
            .then(res => {
                setFlag(res.default)
                console.log(flag)
            })
    })


    return (
        <td style={{textAlign: "left"}}>
            <img
                className="mr-3"
                src={flag}
                alt={props.result.skiJumper.person.country.code}
            /> {props.result.skiJumper.person.firstName} {props.result.skiJumper.person.lastName}
        </td>
    )
}

export default ResultsTableAthleteRow