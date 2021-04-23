import React, {useEffect, useState} from "react";

const TeamResultsTableAthleteRow = (props) => {

    const [flag, setFlag] = useState('')

    useEffect(() => {
        import(`../../assets/flags/${props.skiJumper.person.country.code}.png`)
            .then(res => {
                setFlag(res.default)
            })
    })


    return (
        <td style={{textAlign: "left"}}>
            <img
                className="mr-3"
                src={flag}
                alt={props.skiJumper.person.country.code}
            /> <a
            href={'/skiJumper/' + props.skiJumper.id}
            style={{color: "black"}}
        > {props.skiJumper.person.firstName} {props.skiJumper.person.lastName} </a>
        </td>
    )
}

export default TeamResultsTableAthleteRow