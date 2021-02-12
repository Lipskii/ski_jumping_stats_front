import React, {Component} from "react";
import {Header3, List, ListItem, StyledForm} from "../components/StyledComponents";
import {Col, Form, Row} from "react-bootstrap";
import axios from "axios";

class AddHill extends Component {

    state = {
        countries: [],
        currentCountry: null,
        newHillVenueId: "",
        venues: []
    }

    componentDidMount() {
        axios.get('/api/countries')
            .then(res => {
                this.setState({
                    countries: res.data
                })
            }).catch(error => console.log(error))
    }

    updateListsToCurrentCountry = (e) => {
        let eTargetValue

        if (e === undefined) {
            eTargetValue = this.state.currentCountry
        } else {
            eTargetValue = e.target.value
        }

        this.setState({
            currentCountry: eTargetValue
        }, () => {

            axios.get('/api/venue/' + this.state.currentCountry)
                .then(res => {
                    this.setState({
                        venues: res.data
                    })
                }).catch(error => console.log(error))
        })

    }


    render() {

        let listItems = null
        if (this.state.venues.length > 0) {
            listItems = this.state.venues.map(venue =>
                <ListItem key={venue.id} id={venue.id}  onDoubleClick={e =>
                    this.setState({
                        selectedVenueName: e.target.innerText,
                        selectedVenueId: e.target.id,
                        showEditModal: true
                    })}

                >
                    {venue.name}, {venue.city}
                </ListItem>)
        }


        return (
            <React.Fragment>
                <Header3>Register a Hill</Header3>

                <StyledForm>

                    {/*Country*/}
                    <Form.Group as={Row}>
                        <Form.Label column sm={2}>Country:</Form.Label>
                        <Col sm={10}>
                            <Form.Control as="select" defaultValue={""} onChange={e => {
                                this.setState({
                                    newHillVenueId: ""
                                }, () => this.updateListsToCurrentCountry(e))
                            }}>
                                <option value={""} disabled>Choose...</option>
                                {this.state.countries.map(country =>
                                    <option key={country.id}>
                                        {country.name}
                                    </option>)}
                            </Form.Control>
                        </Col>
                    </Form.Group>

                    <List>
                        {listItems}
                    </List>


                </StyledForm>
            </React.Fragment>
        )
    }
}

export default AddHill;