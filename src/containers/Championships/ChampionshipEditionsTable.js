import React from "react";
import {LinkContainer} from "react-router-bootstrap";
import {Table} from "antd";

const ChampionshipEditionsTable = (props) => {
    const columns = [
        {
            dataIndex: 'countryCode',
            textWrap: 'word-break',
            width: "50px",
            render: countryCode =>
                <div>
                    <img alt={countryCode} src={props.photos['flag_' + countryCode]}/>
                </div>,
            fixed: 'left'
        },
        {
            dataIndex: 'name',
            textWrap: 'word-break',
            render: name =>
                <div>
                    {name}
                </div>,
            fixed: 'left'
        },
        {
            dataIndex: 'competitions',
            textWrap: 'word-break',
            render: competitions => competitions.map(competition => (
                <LinkContainer to={'/showResults/' + competition.id}
                               style={{cursor: "pointer", marginTop: "10px", marginBottom: "10px"}}>
                    <div>
                        {competition.hillVersion.hill.sizeOfHill.designation}
                    </div>
                </LinkContainer>
            )),
        },
        {
            title: "Winner",
            dataIndex: 'winner',
            textWrap: 'word-break',
            render: winner => winner.map(winner => (
                <LinkContainer to={'/skiJumper/' + winner.skiJumper.id}
                               style={{cursor: "pointer", marginTop: "10px", marginBottom: "10px"}}>
                    <div><img alt={winner.skiJumper.person.country.code}
                              src={props.photos["flag_" + winner.skiJumper.person.country.code]}/> {winner.skiJumper.person.firstName} {winner.skiJumper.person.lastName}
                    </div>
                </LinkContainer>
            )),
        },
        {
            title: "2. place",
            dataIndex: 'silverMedalist',
            textWrap: 'word-break',
            render: silverMedalist => silverMedalist.map(silverMedalist => (
                <LinkContainer to={'/skiJumper/' + silverMedalist.skiJumper.id}
                               style={{cursor: "pointer", marginTop: "10px", marginBottom: "10px"}}>
                    <div><img alt={silverMedalist.skiJumper.person.country.code}
                              src={props.photos["flag_" + silverMedalist.skiJumper.person.country.code]}/> {silverMedalist.skiJumper.person.firstName} {silverMedalist.skiJumper.person.lastName}
                    </div>
                </LinkContainer>
            )),
        },
        {
            title: "3. place",
            dataIndex: 'bronzeMedalist',
            textWrap: 'word-break',
            render: bronzeMedalist => bronzeMedalist.map(bronzeMedalist => (
                <LinkContainer to={'/skiJumper/' + bronzeMedalist.skiJumper.id}
                               style={{cursor: "pointer", marginTop: "10px", marginBottom: "10px"}}>
                    <div><img alt={bronzeMedalist.skiJumper.person.country.code}
                              src={props.photos["flag_" + bronzeMedalist.skiJumper.person.country.code]}/> {bronzeMedalist.skiJumper.person.firstName} {bronzeMedalist.skiJumper.person.lastName}
                    </div>
                </LinkContainer>
            )),
        },
    ];

    const data = [];
    for (const edition of props.editions) {

        let winner = []
        let silverMedalist = []
        let bronzeMedalist = []
        for (const competition of edition.competitions) {
            for (const result of competition.results) {
                if (result.totalRank === 1) {
                    winner.push(result)
                }
                if (result.totalRank === 2) {
                    silverMedalist.push(result)
                }
                if (result.totalRank === 3) {
                    bronzeMedalist.push(result)
                }
            }
        }
        data.push({
            key: edition.id,
            winner: winner,
            silverMedalist: silverMedalist,
            bronzeMedalist: bronzeMedalist,
            name: edition.competitions[0].hillVersion.hill.venue.city.name + " " + edition.competitions[0].date1.slice(0, 4),
            countryCode: edition.city.region.country.code,
            competitions: edition.competitions,
            ...edition
        })
    }

    console.log(data)

    return (
        <div>
            <h3 style={{textAlign: "center"}}>
                Editions
            </h3>
            <Table columns={columns} dataSource={data} pagination={false}/>
        </div>

    )
}

export default ChampionshipEditionsTable