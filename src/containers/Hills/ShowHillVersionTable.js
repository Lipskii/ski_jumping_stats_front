import React from "react";
import {Header5} from "../../components/StyledComponents";
import {Table} from "antd";

const ShowHillVersionTable = (props) => {

    const columns = [
        {
            title: 'Valid since',
            dataIndex: 'validSince',
            width: 110,
            textWrap: 'word-break',
            fixed: 'left'
        },
        {
            title: 'Valid until',
            dataIndex: 'validUntil',
            width: 110,
            textWrap: 'word-break',
            fixed: 'left'
        },
        {
            title: 'K (m)',
            dataIndex: 'kPoint',
            width: 150,
            textWrap: 'word-break',
        },
        {
            title: 'HS (m)',
            dataIndex: 'hillSize',
            width: 150,
            textWrap: 'word-break',
        },
        {
            title: 'Inrun length (m)',
            dataIndex: 'd',
            width: 150,
            textWrap: 'word-break',
        },
        {
            title: 'Inrun width (m)',
            dataIndex: 'b1',
            width: 150,
            textWrap: 'word-break',
        },
        {
            title: 'Inrun angle (\u00B0)',
            dataIndex: 'gamma',
            width: 150,
            textWrap: 'word-break',
        },
        {
            title: 'Table length (m)',
            dataIndex: 't',
            width: 150,
            textWrap: 'word-break',
        },
        {
            title: 'Table angle (\u00B0)',
            dataIndex: 'alpha',
            width: 150,
            textWrap: 'word-break',
        },
        {
            title: 'Table height (m)',
            dataIndex: 's',
            width: 150,
            textWrap: 'word-break',
        },
        {
            title: 'Table speed (m/s)',
            dataIndex: 'v0',
            width: 150,
            textWrap: 'word-break',
        },
        {
            title: 'Difference in height (table and K) (m)',
            dataIndex: 'h',
            width: 180,
            textWrap: 'word-break',
        },
        {
            title: 'Horizontal distance (table and K) (m)',
            dataIndex: 'n',
            width: 180,
            textWrap: 'word-break',
        },
        {
            title: 'Width of the knoll at takeoff (m)',
            dataIndex: 'b2',
            width: 150,
            textWrap: 'word-break',
        },
        {
            title: 'Beginning of the landing area (m)',
            dataIndex: 'p',
            width: 180,
            textWrap: 'word-break',
        },
        {
            title: 'Curve length (beginning of the landing area and K) (m)',
            dataIndex: 'l1',
            width: 220,
            textWrap: 'word-break',
        },
        {
            title: 'Curve length (K and end of the landing area) (m)',
            dataIndex: 'l2',
            width: 220,
            textWrap: 'word-break',
        },
        {
            title: 'Angle at the beginning of the landing area (\u00B0)',
            dataIndex: 'betaP',
            width: 220,
            textWrap: 'word-break',
        },
        {
            title: 'Angle at the K (\u00B0)',
            dataIndex: 'beta',
            width: 150,
            textWrap: 'word-break',
        },
        {
            title: 'Width at K (m)',
            dataIndex: 'bk',
            width: 150,
            textWrap: 'word-break',
        },
        {
            title: 'End of the landing area (m)',
            dataIndex: 'l',
            width: 180,
            textWrap: 'word-break',
        },
        {
            title: 'Angle at the end of the landing area (\u00B0)',
            dataIndex: 'betaL',
            width: 220,
            textWrap: 'word-break',
        },
        {
            title: 'Width at the outrun start (m)',
            dataIndex: 'bu',
            width: 150,
            textWrap: 'word-break',
        },
        {
            title: 'Outrun length (m)',
            dataIndex: 'a',
            width: 150,
            textWrap: 'word-break',
        },
        {
            title: 'Distance between judge tower and the jumping hill axis line (m)',
            dataIndex: 'q',
            width: 250,
            textWrap: 'word-break',
        },
        {
            title: '',
            dataIndex: '',
            textWrap: 'word-break',
        },
    ];

    const data = [];
    for(const hillVersion of props.hillVersions){
        data.push({
            key: hillVersion.id,
            ...hillVersion
        })
    }

    return (
        <div>
            <Header5 style={{marginTop: "20px"}}>Versions Of The Hill</Header5>
            <Table columns={columns} dataSource={data} scroll={{y: 240}}/>
        </div>
    )
}

export default ShowHillVersionTable

