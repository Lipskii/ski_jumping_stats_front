import React from "react";
import {Header5} from "../../components/StyledComponents";
import {Table} from "antd";
import {LinkContainer} from "react-router-bootstrap";

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
            dataIndex: 'competition',
            textWrap: 'word-break',
            render: competition => <LinkContainer to={'/showResults/' + competition.id} style={{cursor: "pointer"}}>
                <div>{competition.seriesMajor.name}</div>
            </LinkContainer>,
            fixed: 'left'
        },
        {
            title: 'Winner',
            dataIndex: 'winners',
            render: winners => winners.map(winner => (
                <LinkContainer to={'/skiJumper/' + winner.skiJumper.id}
                               style={{cursor: "pointer"}}>
                    <div>
                        <img alt={winner.skiJumper.person.country.code}
                             src={props.photos[winner.skiJumper.person.country.code]}/> {winner.skiJumper.person.firstName} {winner.skiJumper
                        .person.lastName}
                    </div>
                </LinkContainer>
            )),
            textWrap: 'word-break',
        },
        {
            title: '',
            dataIndex: 'winners',
            width: '100px',
            render: winners => winners.map(winner => (
                <LinkContainer to={'/skiJumper/' + winner.skiJumper.id}
                               style={{cursor: "pointer"}}>
                    <div>
                        {winner.firstRoundDistance} m
                    </div>
                </LinkContainer>
            )),
            textWrap: 'word-break',
        },
        {
            title: '',
            dataIndex: 'winners',
            width: '100px',
            render: winners => winners.map(winner => (
                <LinkContainer to={'/skiJumper/' + winner.skiJumper.id}
                               style={{cursor: "pointer"}}>
                    <div>
                        {winner.secondRoundDistance !== null ? <div>{winner.secondRoundDistance} m</div> : null }
                    </div>
                </LinkContainer>
            )),
            textWrap: 'word-break',
        },
        {
            title: '',
            dataIndex: '',
            textWrap: 'word-break',
        },
    ];

    const data = [];
    for (const competition of props.competitions) {

        let winners = []
        for (const result of competition.results) {
            if (result.totalRank === 1) {
                winners.push(result)
            }
        }

        data.push({
            key: competition.id,
            competition: competition,
            winners: winners,
            ...competition
        })
    }
    console.log(data)

    return (
        <div>
            <Header5 style={{marginTop: "20px"}}>Competitions</Header5>
            <Table columns={columns} dataSource={data} pag scroll={{y: 500}}/>
        </div>
    )
}

export default ShowHillCompetitionsTable

