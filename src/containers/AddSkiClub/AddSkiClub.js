import React, {Component} from "react";
import axios from "axios";
import {ListGroup, ListGroupItem} from "react-bootstrap";

class AddSkiClub extends Component {

    state = {
        skiClubs: []
    }

    componentDidMount() {
        axios.get('/api/skiClubs')
            .then(res => {
                this.setState({
                    skiClubs: res.data
                })
            })
    }

    render() {
        return (<ListGroup variant="flush">
                {this.state.skiClubs.map(skiClub => <ListGroupItem
                    key={skiClub.id}>{skiClub.name}, {skiClub.city}</ListGroupItem>)}
            </ListGroup>
        )
    }

}

export default AddSkiClub