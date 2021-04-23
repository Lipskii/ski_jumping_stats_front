import React, {useEffect, useState} from "react";

const TeamResultsTableAthleteRow = (props) => {

    const [flag, setFlag] = useState('')

    useEffect(() => {
        import(`../../assets/flags/${props.country.code}.png`)
            .then(res => {
                setFlag(res.default)
            })
    })


    return (
        <td style={{textAlign: "left"}}>
            <img
                className="mr-3"
                src={flag}
                alt={props.country.code}
            /> {props.country.name}
        </td>
    )
}

export default TeamResultsTableAthleteRow