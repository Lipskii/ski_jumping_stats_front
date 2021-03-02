import React, {Component} from "react";
import axios from "axios";
import {Header3, StyledDivCentered1000, TableButton} from "../../components/StyledComponents";
import TempCountryInputForm from "../../components/CommonForms/TempCountryInputForm";
import {forEach} from "react-bootstrap/ElementChildren";
import {Table, Pagination} from "react-bootstrap";


class Venues extends Component {
    state = {
        activePage: 1,
        countries: [],
        venues: [],
        selectedCountryId: '',

    }


    componentDidMount() {
        axios.get('/api/countries/venues')
            .then(res => {
                this.setState({
                    countries: res.data
                }, () => this.updateVenues(0))
            }).catch(error => console.log(error))
    }

    updateVenues = (x) => {

        let venuesList = []
        let countries = this.state.countries

        if (x !== 0) {
            const country = countries.find(country => country.id === x)
            for (const venue of country.venues) {
                venuesList.push(venue)
            }
        } else {
            for (const country of countries) {
                for (const venue of country.venues) {
                    venuesList.push(venue)
                }
            }
        }
        venuesList.sort((a, b) => a.name.localeCompare(b.name))
        this.setState({
            venues: venuesList
        })
    }

    handleEditButton = (e) => {

    }

    handleDeleteButton = (e) => {

    }

    render() {
        console.log(this.state)


        let items = [];
        let numberOfPages = this.state.venues.length/7
        if(this.state.venues.length%7 !== 0){
            numberOfPages++
        }

        for (let number = 1; number <= numberOfPages; number++) {
            items.push(
                <Pagination.Item key={number}  active={number === this.state.activePage} onClick={e => {
                    this.setState({
                        activePage: parseInt(e.target.text)
                    })
                }}>
                    {number}
                </Pagination.Item>,
            );
        }


        return (
            <React.Fragment>
                <Header3>Venues</Header3>

                <StyledDivCentered1000>

                    {/*Select Country*/}
                    <TempCountryInputForm
                        title={"Show venues from:"}
                        valuesToShow={["name"]}
                        items={this.state.countries}
                        onChangeValue={e => {
                            this.setState({
                                selectedCountryId: e.target.value
                            }, () => this.updateVenues(parseInt(this.state.selectedCountryId)))
                        }}/>

                    {/*Venues*/}
                    <Table bordered hover>
                        <thead>
                        <tr>
                            <th>Venue</th>
                            <th>City</th>
                            <th>Opened in</th>
                            <th>Capacity</th>
                            <th>Club</th>
                            <th>Actions</th>
                        </tr>
                        </thead>
                        <tbody>
                        {this.state.venues.map(venue => (
                            <tr key={venue.id} id={venue.id}>
                                <td>{venue.name}</td>
                                <td>{venue.city}</td>
                                <td>{venue.yearOfOpening}</td>
                                <td>{venue.capacity}</td>
                                <td>{venue.skiClub}</td>
                                <td>
                                    <TableButton id={venue.id} name={venue.name} size="sm" variant={"info"}
                                                 onClick={e => this.handleEditButton(e)}>
                                        Edit
                                    </TableButton>
                                    <TableButton id={venue.id} name={venue.name} size="sm" variant={"danger"}
                                                 onClick={e => this.handleDeleteButton(e)}>
                                        Delete
                                    </TableButton>
                                </td>
                            </tr>
                        ))}
                        </tbody>
                    </Table>
                    <Pagination>{items}</Pagination>


                </StyledDivCentered1000>


            </React.Fragment>
        )
    }
}


export default Venues