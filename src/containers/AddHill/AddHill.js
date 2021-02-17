import React, {Component} from "react";
import {
    Header3, Header5,
    Header6,
    List,
    ListInForm,
    ListItem, StyledDiv2Right800,
    StyledForm
} from "../../components/StyledComponents";
import {Button, Col, Form, Row} from "react-bootstrap";
import axios from "axios";
import TempCountryInputForm from "../../components/CommonForms/TempCountryInputForm";
import SelectInputForm from "../../components/CommonForms/SelectInputForm";
import TextInputForm from "../../components/CommonForms/TextInputForm";
import DatePicker from "react-datepicker";

//TODO add v0 field
class AddHill extends Component {

    state = {
        countries: [],
        currentCountry: null,
        newHillName: "",
        venues: [],
        selectedVenueId: "",
        hills: [],
        selectedHillName: "",
        selectedHillId: "",
        hillVersions: [],
        showHillVersionsList: false,
        sizesOfHill: [],
        newHillSizeOfHillId: "",
        newHillKPoint: "",
        newHillHS: "",
        newHille1: "",
        newHille2: "",
        newHilles: "",
        newHillt: "",
        newHillGamma: "",
        newHillAlpha: "",
        newHillr1: "",
        newHillh: "",
        newHilln: "",
        newHills: "",
        newHilll1: "",
        newHilll2: "",
        newHilla: "",
        newHillBetap: "",
        newHillBeta: "",
        newHillBetal: "",
        newHillrl: "",
        newHillr2l: "",
        newHillr2: "",
        newHillzu: "",
        newHillP: "",
        newHillL: "",
        newHillb1: "",
        newHillb2: "",
        newHillbk: "",
        newHillbu: "",
        newHilld: "",
        newHillq: "",
        newHillV0: "",
      //  selectedDate1: new Date(),
      //  selectedDate2: new Date(),
        newHillValidSinceDay: "",
        newHillValidSinceMonth: "",
        newHillValidSinceYear: "",
        newHillValidUntilDay: "",
        newHillValidUntilMonth: "",
        newHillValidUntilYear: "",
        newHillCertificateLink: ""

    }

    componentDidMount() {
        axios.get('/api/countries/venues')
            .then(res => {
                this.setState({
                    countries: res.data
                })
            }).catch(error => console.log(error))
        axios.get('/api/sizeOfHill')
            .then(res => {
                this.setState({
                    sizesOfHill: res.data
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

    updateHillsList = () => {
        axios.get('/api/hills/' + this.state.selectedVenueId)
            .then(res => {
                this.setState(
                    {
                        hills: res.data
                    }
                )
            })
    }

    handleHillsListOnClick = (e) => {

        let newSelectedHillName
        let newSelectedHillId

        if(this.state.selectedHillId.length > 0){
            newSelectedHillName = ""
            newSelectedHillId = ""
        } else {
            newSelectedHillName = e.target.innerText
            newSelectedHillId = e.target.id
        }

        this.setState({
            showHillVersionsList: !this.state.showHillVersionsList,
            selectedHillName:  newSelectedHillName,
            selectedHillId: newSelectedHillId
        }, () => {
            this.state.hills.map(hill => {
                this.setState({
                    hillVersions: hill.hillVersions
                })
            })
        })

    }

    setDate = (date, option) => {
        const convertedDate = this.convertDate(date)

        if(option === 0){
            this.setState({
                newHillValidSinceDay: convertedDate[0],
                newHillValidSinceMonth: convertedDate[1],
                newHillValidSinceYear: convertedDate[2],
             //   selectedDate1: date,
            })
        } else {
            this.setState({
                newHillValidUntilDay: convertedDate[0],
                newHillValidUntilMonth: convertedDate[1],
                newHillValidUntilYear: convertedDate[2],
             //   selectedDate2: date,
            })
        }


    }

    convertDate = str => {
        str = str.toString();
        let parts = str.split(" ");
        let months = {
            Jan: "01",
            Feb: "02",
            Mar: "03",
            Apr: "04",
            May: "05",
            Jun: "06",
            Jul: "07",
            Aug: "08",
            Sep: "09",
            Oct: "10",
            Nov: "11",
            Dec: "12"
        };

        return [parts[2],months[parts[1]],parts[3]]
    };

    addNewHill = () => {
        if(this.state.selectedHillId.length > 0){
            console.log("add new hill version")
        } else {
            console.log("add new hill")
        }


        let postSuccessful = true

        axios.post("/api/hillVersion", {
            id: "first",
            hill: 2,
            first_year: 2015
        }).then(function (response) {
            console.log(response.data);
        })
            .catch(function (error) {
                console.log(error);
                postSuccessful = false
            }).finally(() => {
                if (postSuccessful) {
                    window.alert(this.state.newAthleteFirstName + " " + this.state.newAthleteLastName + " added!")
                    this.updateListsToCurrentCountry();
                } else {
                    window.alert("Ups, something went wrong")
                }


            }
        )
    }

    render() {

        //console.log(this.state)

        let hillsListItems = <ListItem disabled>no hills yet in this venue</ListItem>
        if (this.state.hills.length > 0) {
            hillsListItems = this.state.hills.map(hill =>
                <ListItem key={hill.id} id={hill.id} className="list-group-item list-group-item-action"
                          onClick={e => this.handleHillsListOnClick(e)}>
                    {hill.name}
                </ListItem>
            )
        }

        let selectedHillHeader = null
        let hillVersionsListItems = null
        if (this.state.showHillVersionsList) {
            selectedHillHeader = <Header6>Current hill versions of {this.state.selectedHillName} </Header6>
            hillVersionsListItems = this.state.hillVersions.map(hillVersion =>
                <ListItem key={hillVersion.id} id={hillVersion.id}>
                    From: {hillVersion.first_year}, Until: {hillVersion.last_year}, K: {hillVersion.kPoint},
                    HS: {hillVersion.hillSize}
                </ListItem>
            )
        }

        let selectVenue = null
        if(!this.state.selectedVenueId.length > 0){
            selectVenue = <small>Select a venue to continue</small>
        }

        let selectHillHint = null
        let hillFormHeader

        if(!this.state.selectedHillId.length > 0){
            selectHillHint = <small>select hill to add a new version of the existing hill</small>
            hillFormHeader = <Header3>Adding a new hill</Header3>
        } else {
            hillFormHeader = <Header3>Adding new version of {this.state.selectedHillName}</Header3>
        }


        return (
            <React.Fragment>
                <Header3>Register a Hill</Header3>

                <StyledForm>

                    {/*Country*/}
                    <TempCountryInputForm
                        title={"Country"}
                        valuesToShow={["name"]}
                        items={this.state.countries}
                        onChangeValue={e => {
                            this.setState({
                                selectedVenueId: "",
                                selectedHillName: "",
                                selectedHillId: "",
                                hills: [],
                                hillVersions: []
                            }, () => this.updateListsToCurrentCountry(e))
                        }}/>

                    {/*Venue*/}
                    <SelectInputForm
                        key={this.state.currentCountry}
                        title={"Venue"}
                        items={this.state.venues}
                        valuesToShow={["name"]}
                        hintTextDown={selectVenue}
                        onChangeValue={e =>
                            this.setState({
                                selectedVenueId: e.target.value,
                                selectedHillName: "",
                                selectedHillId: "",
                            }, () => this.updateHillsList())}
                    />

                    {/*Hills*/}
                    <Form.Group as={Row}>
                        <Form.Label column sm={2}>Hills:</Form.Label>
                        <Col sm={10}>
                            <ListInForm>{hillsListItems}</ListInForm>
                            <Form.Text className="text-muted">
                                {selectHillHint}
                            </Form.Text>
                        </Col>

                    </Form.Group>


                    {selectedHillHeader}

                    <List>{hillVersionsListItems}</List>


                    {hillFormHeader}
                    <Header5>Basic Parameters</Header5>
                    <small>Fields with (*) are mandatory</small>
                    {/*Name*/}
                    <TextInputForm title={"Name*"} disabled={!this.state.selectedVenueId.length > 0} onChangeValue={e => {
                        this.setState({
                            newHillName: e.target.value
                        })
                    }}/>

                    {/*Size of hill*/}
                    <SelectInputForm
                        title={"Size of hill*"}
                        items={this.state.sizesOfHill}
                        valuesToShow={["designation", " ", "(", "minHS", "-", "maxHS", ")"]}
                        disabled={!this.state.selectedVenueId.length > 0}
                        onChangeValue={e => this.setState({
                            newHillSizeOfHillId: e.target.value
                        })}
                    />

                    {/*K*/}
                    <TextInputForm title={"K-Point (m)*"} placeholder={"K"} disabled={!this.state.selectedVenueId.length > 0} onChangeValue={e => {
                        this.setState({
                            newHillKPoint: e.target.value
                        })
                    }}/>

                    {/*HS*/}
                    <TextInputForm title={"Hill Size (m)*"} placeholder={"HS"} disabled={!this.state.selectedVenueId.length > 0} onChangeValue={e => {
                        this.setState({
                            newHillHS: e.target.value
                        })
                    }}/>

                    <Header5>Inrun</Header5>

                    {/*e1*/}
                    <TextInputForm title={"e1 (m)*"} placeholder={"Length of the inrun from the highest start"}
                                   disabled={!this.state.selectedVenueId.length > 0}
                                   onChangeValue={e => {
                                       this.setState({
                                           newHille1: e.target.value
                                       })
                                   }}/>

                    {/*e2*/}
                    <TextInputForm title={"e2 (m)*"}
                                   placeholder={"Length of the inrun from the lowest start to takeoff"}
                                   disabled={!this.state.selectedVenueId.length > 0}
                                   onChangeValue={e => {
                                       this.setState({
                                           newHille2: e.target.value
                                       })
                                   }}/>

                    {/*es*/}
                    <TextInputForm title={"es (m)*"}
                                   placeholder={"Length of the inrun from the lowest to the highest start"}
                                   disabled={!this.state.selectedVenueId.length > 0}
                                   onChangeValue={e => {
                                       this.setState({
                                           newHilles: e.target.value
                                       })
                                   }}/>

                    {/*t*/}
                    <TextInputForm title={"t (m)*"} placeholder={"Length of the table"}
                                   disabled={!this.state.selectedVenueId.length > 0}
                                   onChangeValue={e => {
                        this.setState({
                            newHillt: e.target.value
                        })
                    }}/>

                    {/*gamma*/}
                    <TextInputForm title={"\u03B3 (\u00B0)*"} disabled={!this.state.selectedVenueId.length > 0} placeholder={"Angle of the straight part of the inrun"}
                                   onChangeValue={e => {
                                       this.setState({
                                           newHillGamma: e.target.value
                                       })
                                   }}/>

                    {/*alpha*/}
                    <TextInputForm title={"\u03B1 (\u00B0)*"} placeholder={"Angle of the table"} disabled={!this.state.selectedVenueId.length > 0} onChangeValue={e => {
                        this.setState({
                            newHillAlpha: e.target.value
                        })
                    }}/>

                    {/*r1*/}
                    <TextInputForm title={"r1 (m)*"}
                                   placeholder={"Radius of the transition curve in E2 (End of the transition curve; beginning of the table)"}
                                   disabled={!this.state.selectedVenueId.length > 0}
                                   onChangeValue={e => {
                                       this.setState({
                                           newHillr1: e.target.value
                                       })
                                   }}/>

                    <TextInputForm title={"Vo (m/s)*"}
                                   placeholder={"Speed at the end of the inrun"}
                                   disabled={!this.state.selectedVenueId.length > 0}
                                   onChangeValue={e => {
                                       this.setState({
                                           newHillV0: e.target.value
                                       })
                                   }}/>


                    <Header5>Landing Profile</Header5>

                    {/*h*/}
                    <TextInputForm title={"h (m)*"} placeholder={"Difference in height between the takeoff and K-Point"}
                                   disabled={!this.state.selectedVenueId.length > 0}
                                   onChangeValue={e => {
                                       this.setState({
                                           newHillh: e.target.value
                                       })
                                   }}/>

                    {/*n*/}
                    <TextInputForm title={"n (m)*"} placeholder={"Horizontal distance between the takeoff and K-Point"}
                                   disabled={!this.state.selectedVenueId.length > 0}
                                   onChangeValue={e => {
                                       this.setState({
                                           newHilln: e.target.value
                                       })
                                   }}/>

                    {/*h/n*/}
                    <Form.Group as={Row}>
                        <Form.Label column sm={2}>h/n:</Form.Label>
                        <Col sm={10}>
                        <Form.Control type="text" placeholder={this.state.newHillh/this.state.newHilln} readOnly />
                        </Col>
                    </Form.Group>



                    {/*s*/}
                    <TextInputForm title={"s (m)*"} placeholder={"Height of the table"}
                                   disabled={!this.state.selectedVenueId.length > 0}
                                   onChangeValue={e => {
                        this.setState({
                            newHills: e.target.value
                        })
                    }}/>

                    {/*l1*/}
                    <TextInputForm title={"l1 (m)*"}
                                   placeholder={"Length of the curve between beginning of the landing area (P) and K"}
                                   disabled={!this.state.selectedVenueId.length > 0}
                                   onChangeValue={e => {
                                       this.setState({
                                           newHilll1: e.target.value
                                       })
                                   }}/>

                    {/*l2*/}
                    <TextInputForm title={"l2 (m)*"}
                                   placeholder={"Length of the curve between K and end of the landing area (L)"}
                                   disabled={!this.state.selectedVenueId.length > 0}
                                   onChangeValue={e => {
                                       this.setState({
                                           newHilll2: e.target.value
                                       })
                                   }}/>

                    {/*a*/}
                    <TextInputForm title={"a (m)*"}
                                   placeholder={"Length of the outrun after the end of the transition curve to the outrun"}
                                   disabled={!this.state.selectedVenueId.length > 0}
                                   onChangeValue={e => {
                                       this.setState({
                                           newHilla: e.target.value
                                       })
                                   }}/>

                    {/*beta p*/}
                    <TextInputForm title={"\u03B2p (\u00B0)*"}
                                   placeholder={"Angle f the tangent at the beginning of the landing area (P)"}
                                   disabled={!this.state.selectedVenueId.length > 0}
                                   onChangeValue={e => {
                                       this.setState({
                                           newHillBetap: e.target.value
                                       })
                                   }}/>

                    {/*beta*/}
                    <TextInputForm title={"\u03B2 (\u00B0)*"} placeholder={"Angle of the tangent at K"}
                                   disabled={!this.state.selectedVenueId.length > 0}
                                   onChangeValue={e => {
                                       this.setState({
                                           newHillBeta: e.target.value
                                       })
                                   }}/>

                    {/*beta l*/}
                    <TextInputForm title={"\u03B2l (\u00B0)*"}
                                   placeholder={"Angle of the tangent at the end of the landing area (L)"}
                                   disabled={!this.state.selectedVenueId.length > 0}
                                   onChangeValue={e => {
                                       this.setState({
                                           newHillBetal: e.target.value
                                       })
                                   }}/>

                    {/*rl*/}
                    <TextInputForm title={"rl (m)*"} placeholder={"Radius of the circular landing area"}
                                   disabled={!this.state.selectedVenueId.length > 0}
                                   onChangeValue={e => {
                                       this.setState({
                                           newHillrl: e.target.value
                                       })
                                   }}/>

                    {/*r2l*/}
                    <TextInputForm title={"r2l (m)"} placeholder={"Radius of the transition curve from L to U at L"}
                                   disabled={!this.state.selectedVenueId.length > 0}
                                   onChangeValue={e => {
                                       this.setState({
                                           newHillr2l: e.target.value
                                       })
                                   }}/>

                    {/*r2*/}
                    <TextInputForm title={"r2 (m)*"}
                                   placeholder={"Radius of the transition curve from L to U at U (end of the transition curve to the outrun)"}
                                   disabled={!this.state.selectedVenueId.length > 0}
                                   onChangeValue={e => {
                                       this.setState({
                                           newHillr2: e.target.value
                                       })
                                   }}/>

                    {/*zu*/}
                    <TextInputForm title={"zu (m)*"}
                                   placeholder={"Difference in Height between the takeoff and the lowest point U"}
                                   disabled={!this.state.selectedVenueId.length > 0}
                                   onChangeValue={e => {
                                       this.setState({
                                           newHillzu: e.target.value
                                       })
                                   }}/>

                    {/*P*/}
                    <TextInputForm title={"P (m)*"} placeholder={"Beginning of the landing area"}
                                   disabled={!this.state.selectedVenueId.length > 0}
                                   onChangeValue={e => {
                        this.setState({
                            newHillP: e.target.value
                        })
                    }}/>

                    {/*L*/}
                    <TextInputForm title={"L (m)*"} placeholder={"End of the landing area"}
                                   disabled={!this.state.selectedVenueId.length > 0}
                                   onChangeValue={e => {
                        this.setState({
                            newHillL: e.target.value
                        })
                    }}/>

                    {/*b1*/}
                    <TextInputForm title={"b1 (m)*"} placeholder={"Prepared width of the inrun"}
                                   disabled={!this.state.selectedVenueId.length > 0}
                                   onChangeValue={e => {
                        this.setState({
                            newHillb1: e.target.value
                        })
                    }}/>

                    {/*b2*/}
                    <TextInputForm title={"b2 (m)"} placeholder={"Width of the knoll at the base of the takeoff"}
                                   disabled={!this.state.selectedVenueId.length > 0}
                                   onChangeValue={e => {
                                       this.setState({
                                           newHillb2: e.target.value
                                       })
                                   }}/>

                    {/*bk*/}
                    <TextInputForm title={"bk (m)*"} placeholder={"Width at K"}
                                   disabled={!this.state.selectedVenueId.length > 0}
                                   onChangeValue={e => {
                                       this.setState({
                                           newHillbk: e.target.value
                                       })
                                   }}/>

                    {/*bu*/}
                    <TextInputForm title={"bu (m)*"}
                                   placeholder={"Width at the end of the transition curve to the outrun"}
                                   disabled={!this.state.selectedVenueId.length > 0}
                                   onChangeValue={e => {
                                       this.setState({
                                           newHillbu: e.target.value
                                       })
                                   }}/>

                    <Header5>Judge Tower</Header5>

                    {/*d*/}
                    <TextInputForm title={"d (m)*"}
                                   placeholder={"Horizontal distance between the takeoff and the projected middle of the lowest\n" +
                                   "judge cabin along the jumping hill axis line"}
                                   disabled={!this.state.selectedVenueId.length > 0}
                                   onChangeValue={e => {
                                       this.setState({
                                           newHilld: e.target.value
                                       })
                                   }}/>

                    {/*q*/}
                    <TextInputForm title={"q (m)*"}
                                   placeholder={"Horizontal distance between the front of the judge tower and the jumping hill\n" +
                                   "axis line"}
                                   disabled={!this.state.selectedVenueId.length > 0}
                                   onChangeValue={e => {
                                       this.setState({
                                           newHillq: e.target.value
                                       })
                                   }}/>

                    <Header5>Certificate</Header5>
                    {/*valid since*/}
                    <Form.Group as={Row}>
                        <Form.Label column sm={2}>
                            Valid since*:
                        </Form.Label>
                        <Col sm={10}>
                            <DatePicker
                                closeOnScroll={true}
                                disabled={!this.state.selectedVenueId.length > 0}
                              //  selected={this.state.selectedDate1}
                                onChange={date => this.setDate(date,0)}
                                placeholderText="dd/mm/yyyy"
                                dateFormat="dd/MM/yyyy"
                            />
                        </Col>
                    </Form.Group>

                    {/*valid until*/}
                    <Form.Group as={Row}>
                        <Form.Label column sm={2}>
                            Valid since*:
                        </Form.Label>
                        <Col sm={10}>
                            <DatePicker
                                closeOnScroll={true}
                                disabled={!this.state.selectedVenueId.length > 0}
                                //selected={this.state.selectedDate2}
                                onChange={date => this.setDate(date,1)}
                                placeholderText="dd/mm/yyyy"
                                dateFormat="dd/MM/yyyy"
                            />
                        </Col>
                    </Form.Group>

                    {/*fis certificate*/}
                    <TextInputForm title={"Certificate link*"}
                                   placeholder={""}
                                   disabled={!this.state.selectedVenueId.length > 0}
                                   onChangeValue={e => {
                                       this.setState({
                                           newHillCertificateLink: e.target.value
                                       })
                                   }}/>


                    <Form.Group>
                        <StyledDiv2Right800>
                            <Button variant="primary" onClick={this.addNewHill}
                                    // disabled={
                                    //     this.state.selectedVenueId.length < 1
                                    //     || this.state.newHillName.length < 1
                                    //     || this.state.newHillSizeOfHillId.length < 1
                                    //     || this.state.newHillKPoint.length < 1
                                    //     || this.state.newHillHS.length < 1
                                    //     || this.state.newHille1.length <1
                                    //     || this.state.newHille2.length < 1
                                    //     || this.state.newHilles.length < 1
                                    //     || this.state.newHillt.length < 1
                                    //     || this.state.newHillGamma.length < 1
                                    //     || this.state.newHillAlpha.length < 1
                                    //     || this.state.newHillr1.length < 1
                                    //     || this.state.newHillh.length < 1
                                    //     || this.state.newHilln.length < 1
                                    //     || this.state.newHills.length < 1
                                    //     || this.state.newHilll1.length < 1
                                    //     || this.state.newHilll2.length < 1
                                    //     || this.state.newHilla.length < 1
                                    //     || this.state.newHillBetap.length < 1
                                    //     || this.state.newHillBeta.length < 1
                                    //     || this.state.newHillBetal.length < 1
                                    //     || this.state.newHillrl.length < 1
                                    //     || this.state.newHillr2.length < 1
                                    //     || this.state.newHillzu.length < 1
                                    //     || this.state.newHillP.length < 1
                                    //     || this.state.newHillL.length < 1
                                    //     || this.state.newHillb1.length < 1
                                    //     || this.state.newHillb2.length < 1
                                    //     || this.state.newHillbk.length < 1
                                    //     || this.state.newHillbu.length < 1
                                    //     || this.state.newHilld.length < 1
                                    //     || this.state.newHillq.length < 1
                                    //     || this.state.newHillValidSinceDay.length < 1
                                    //     || this.state.newHillValidSinceMonth.length < 1
                                    //     || this.state.newHillValidSinceYear.length < 1
                                    //     || this.state.newHillValidUntilDay.length < 1
                                    //     || this.state.newHillValidUntilMonth.length < 1
                                    //     || this.state.newHillValidUntilYear.length < 1
                                    //     || this.state.newHillCertificateLink.length < 1
                                    // }
                            >
                                Add new hill
                            </Button>
                        </StyledDiv2Right800>
                    </Form.Group>


                </StyledForm>
            </React.Fragment>
        )
    }
}

export default AddHill;