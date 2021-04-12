import React from "react";
import {Header5} from "../../components/StyledComponents";
import {Table} from "antd";

const ShowHillCompetitionsTable = (props) => {

    const columns = [
        {
            title: 'Date',
            dataIndex: 'date1',
            width: 110,
            textWrap: 'word-break',
            fixed: 'left'
        },
        {
            title: 'Series',
            dataIndex: 'seriesMajorName',
            textWrap: 'word-break',
            fixed: 'left'
        },
        {
            dataIndex: 'photoCode',
            width: '50px',
            render: photoCode => <img alt={photoCode} src={props.photos[photoCode]} />,
            textWrap: 'word-break'
        },
        {
            title: '1. place',
            dataIndex: 'resultsFirst',
            textWrap: 'word-break',
        },
        {
            title: '',
            dataIndex: '',
            textWrap: 'word-break',
        },
    ];

    const data = [];
    for(const competition of props.competitions){
        const resultsFirst = competition.results[0].skiJumper.person.firstName + ' ' + competition.results[0].skiJumper.person.lastName

        data.push({
            key: competition.id,
            photoCode: competition.results[0].skiJumper.person.country.code,
            resultsFirst: resultsFirst,
            seriesMajorName: competition.seriesMajor.name,
            ...competition
        })
    }
    console.log(data)

    return (
        <div>
            <Header5 style={{marginTop: "20px"}}>Competitions</Header5>
            <Table columns={columns} dataSource={data} scroll={{y: 240}}/>
        </div>
    )
}

export default ShowHillCompetitionsTable

