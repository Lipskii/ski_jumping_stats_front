import React, {Component} from "react";
import axios from "axios";
import {Form} from "react-bootstrap";
import {Header3, List, ListItem, StyledForm, StyledFormLabel, StyledFormSelect} from "./AddSkiClubStyledComponents";


//TODO add spinner during loading
//TODO place countries in global state (redux)
//TODO fetch from api only those countries that have ski clubs in db

class AddSkiClub extends Component {

    state = {
        countries: [],
        skiClubs: [],
        searchCountryCode: "",
        loading: true
    }

    componentDidMount() {
        axios.get('/api/countries')
            .then(res => {
                this.setState({
                    countries: res.data
                })
            }).catch(error => console.log(error))
    }

    updateClubsList = (e) => {
        axios.get('/api/skiClubs/' + e.target.value)
            .then(res => {
                this.setState({
                    skiClubs: res.data
                })
            })
            .catch(error => console.log(error))
    }

    render() {
        return (
            <React.Fragment>
                <Header3>Existing Ski Clubs</Header3>
                <StyledForm inline>
                    <Form.Group>
                        <StyledFormLabel>Search by country: </StyledFormLabel>
                        <StyledFormSelect as="select" onChange={this.updateClubsList}>
                            <option disabled selected value></option>
                            {this.state.countries.map(country =>
                                <option key={country.code}>
                                    {country.name}
                                </option>)}
                        </StyledFormSelect>
                    </Form.Group>
                </StyledForm>
                <List variant="flush">
                    {this.state.skiClubs.map(skiClub =>
                        <ListItem key={skiClub.id}>
                            {skiClub.name}, {skiClub.city}, {skiClub.code}
                        </ListItem>)}
                </List>
            </React.Fragment>

        )
    }

}

export default AddSkiClub