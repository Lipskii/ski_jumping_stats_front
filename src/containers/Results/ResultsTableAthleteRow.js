import React, {useEffect, useState} from "react";

const ResultsTableAthleteRow = (props) => {

    const [flag, setFlag] = useState('')

    useEffect(() => {
        import(`../../assets/flags/${props.result.skiJumper.person.country.code}.png`)
            .then(res => {
                setFlag(res.default)
            })
    })


    return (
        <td style={{textAlign: "left"}}>
            <img
                className="mr-3"
                src={flag}
                alt={props.result.skiJumper.person.country.code}
            /> <a
            href={'/skiJumper/' + props.result.skiJumper.id}
            style={{color: "black"}}
        > {props.result.skiJumper.person.firstName} {props.result.skiJumper.person.lastName} </a>
        </td>
    )
}

export default ResultsTableAthleteRow