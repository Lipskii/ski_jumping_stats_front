import React, {Component} from "react"
import {Button, Col, Form, Row} from "react-bootstrap";
import axios from "axios";

class NewCityForm extends Component {

    state = {
        newCityName: "",
        newCityRegion: "",
        regions: [],
    }

    componentDidMount() {
        axios.get('/api/regions/' + this.props.currentCountry)
            .then(res => {
                this.setState({
                    regions: res.data,
                })
            }).catch(error => console.log(error))
    }

    addNewCity = () => {

        let postSuccessful = true

        axios.post('/api/cities', {name: this.state.newCityName, region: this.state.newCityRegion})
            .then(function (response) {
                console.log(response.data);

            })
            .catch(function (error) {
                console.log(error);
                postSuccessful = false
            }).finally(() => {

            if (postSuccessful) {
                window.alert(this.state.newCityName + " added!")
             //   this.props.updateLists()
            } else {
                window.alert("Ups, something went wrong")
            }


        });
    }


    render() {

        return (
            <div>
                <Form.Group>
                    <Form.Label>New city in {this.props.currentCountry}:</Form.Label>
                    <Form.Control type="text" placeholder="New city name"
                                  onChange={e => this.setState({newCityName: e.target.value})}/>
                    <br/>
                    <Form.Group as={Row}>
                        <Form.Label column sm={2}>Region:</Form.Label>
                        <Col sm={10}>
                            <Form.Control as="select" defaultValue={""}
                                          onChange={e => this.setState({newCityRegion: e.target.value})}>

                                <option value={""}>Choose...</option>
                                {this.state.regions.map(region =>
                                    <option key={region.id} value={region.name}>{region.name}</option>)}
                            </Form.Control>
                        </Col>
                    </Form.Group>

                    <Button variant="secondary" onClick={this.addNewCity}
                            disabled={this.state.newCityName.length < 1 || this.state.regions.length < 1}>
                        Add City
                    </Button>
                </Form.Group>
            </div>
        )

    }
}


