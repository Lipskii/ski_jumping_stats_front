import React, {Component} from "react";
import axios from "axios";
import {Button, Form} from "react-bootstrap";
import {
    CheckButton,
    Header5, Header31,
    List,
    ListItem, StyledDiv1, StyledDiv2Right,
    StyledForm,
    StyledFormLabel,
    StyledFormSelect,
    StyledFormSmall
} from "../../components/StyledComponents";
import NewCityForm from "../../components/CommonForms/NewCityForm";
import TextInputForm from "../../components/CommonForms/TextInputForm";
import TempCountryInputForm from "../../components/CommonForms/TempCountryInputForm";
import SelectInputForm from "../../components/CommonForms/SelectInputForm";

//TODO add spinner during loading
//TODO place countries in global state (redux)
//TODO change this to be similar to other registration forms

//TODO This class will be rebuild completely later

class AddSkiClub extends Component {

    state = {
        countries: [],
        skiClubs: [],
        searchCountryCode: "",
        loading: true,
        clubListVisible: false,
        cities: [],
        regions: [],
        currentCountry: "",
        newClubName: "",
        newClubCity: "",
        showNewCityForm: false,
        newCityButtonText: "Do you want to add new city?"
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

    updateCitiesAndRegionsList = () => {
        axios.get('/api/cities/' + this.state.currentCountry)
            .then(res => {
                this.setState({
                    cities: res.data,
                    newClubCity: null
                })
            }).catch(error => console.log(error))

    }

    changeClubsListVisibility = () => {
        this.setState({
            clubListVisible: !this.state.clubListVisible
        })
    }


    handleNewCityButton = () => {
        this.setState({
            showNewCityForm: !this.state.showNewCityForm
        })

        if (!this.state.showNewCityForm) {
            this.setState({
                newCityButtonText: "hide"
            })
        } else {
            this.setState({
                newCityButtonText: "Do you want to add new city?"
            })
        }
    }

    onSubmitClubForm = () => {
        let postSuccessful = true

        axios.post("/api/skiClub", {
            name: this.state.newClubName,
            cityId: this.state.newClubCity
        })
            .then(function (response) {
                console.log(response.data);
            })
            .catch(function (error) {
                console.log(error);
                postSuccessful = false
            }).finally(() => {
            if(postSuccessful){
                window.alert(this.state.newClubName + " added!")
            }else{
                window.alert("Ups, something went wrong")
            }
        })

    }

    render() {

        let list = null
        let listItems = <ListItem>None</ListItem>
        let listForm = null
        let newCityForm = null

        if (this.state.showNewCityForm) {
            newCityForm = <NewCityForm currentCountry={this.state.currentCountry} updateLists={this.updateCitiesAndRegionsList}/>
        }


        if (this.state.clubListVisible) {
            listForm = <StyledFormSmall inline>
                <Form.Group>
                    <StyledFormLabel>Search by country: </StyledFormLabel>
                    <StyledFormSelect as="select" onChange={this.updateClubsList}>
                        <option disabled selected value/>
                        {this.state.countries.map(country =>
                            <option key={country.code}>
                                {country.name}
                            </option>)}
                    </StyledFormSelect>
                </Form.Group>
            </StyledFormSmall>

            if (this.state.skiClubs.length > 0) {
                listItems = this.state.skiClubs.map(skiClub =>
                    <ListItem key={skiClub.id}>
                        {skiClub.name}, {skiClub.city}, {skiClub.code}
                    </ListItem>)
            }

            list = <List variant="flush">
                {listItems}
            </List>
        }

        return (
            <React.Fragment>

                <StyledDiv1>
                    <Header5>Existing Ski Clubs</Header5>
                    <CheckButton size="sm" onClick={this.changeClubsListVisibility}>Toggle list</CheckButton>
                </StyledDiv1>


                {listForm}
                {list}

                <Header31>Insert new ski club</Header31>

                <StyledForm>
                    {/*Name*/}
                    <TextInputForm title={"Name"} onChangeValue={e => {
                        this.setState({
                            newClubName: e.target.value
                        })
                    }}/>

                    {/*Country*/}
                    <TempCountryInputForm title={"Country"} items={this.state.countries} valuesToShow={["name"]}
                                          onChangeValue={e => {
                                              //to be changed, don't worry
                                              this.state.currentCountry = e.target.value
                                              this.updateCitiesAndRegionsList()
                                          }}/>


                    {/*City*/}
                    <SelectInputForm title={"City"}
                                     key={this.state.currentCountry}
                                     items={this.state.cities}
                                     valuesToShow={["name", ",", "region"]}
                                     onChangeValue={e => {
                                         this.setState({
                                             newClubCity: e.target.value
                                         })
                                     }}/>

                    <Button onClick={this.handleNewCityButton}
                            variant={"secondary"}>{this.state.newCityButtonText}</Button>
                    {newCityForm}

                    <StyledDiv2Right>
                        <Button onClick={this.onSubmitClubForm}>Submit</Button>
                    </StyledDiv2Right>


                </StyledForm>
            </React.Fragment>

        )
    }

}

export default AddSkiClub