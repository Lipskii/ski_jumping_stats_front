import {Header5, StyledDiv2Right1000} from "../../components/StyledComponents";
import SelectInputForm from "../../components/CommonForms/SelectInputForm";
import TextInputForm from "../../components/CommonForms/TextInputForm";
import {Button, Col, Form, Row} from "react-bootstrap";
import DatePicker from "react-datepicker";
import React from "react";


export const TempFileToDelete = () => (
    <div>
        {hillFormHeader}

        <Header5>Basic Parameters</Header5>
        <small>Fields with (*) are mandatory</small>
        {/*Name*/}
        {nameField}

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
        <TextInputForm title={"K-Point (m)*"} placeholder={"K"}
                       disabled={!this.state.selectedVenueId.length > 0} onChangeValue={e => {
            this.setState({
                newHillKPoint: e.target.value
            })
        }}/>

        {/*HS*/}
        <TextInputForm title={"Hill Size (m)*"} placeholder={"HS"}
                       disabled={!this.state.selectedVenueId.length > 0} onChangeValue={e => {
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
        <TextInputForm title={"\u03B3 (\u00B0)*"} disabled={!this.state.selectedVenueId.length > 0}
                       placeholder={"Angle of the straight part of the inrun"}
                       onChangeValue={e => {
                           this.setState({
                               newHillGamma: e.target.value
                           })
                       }}/>

        {/*alpha*/}
        <TextInputForm title={"\u03B1 (\u00B0)*"} placeholder={"Angle of the table"}
                       disabled={!this.state.selectedVenueId.length > 0} onChangeValue={e => {
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

        {/*v0*/}
        <TextInputForm title={"Vo (m/s)*"}
                       placeholder={"Speed at the end of the inrun"}
                       disabled={!this.state.selectedVenueId.length > 0}
                       onChangeValue={e => {
                           this.setState({
                               newHillv0: e.target.value
                           })
                       }}/>


        <Header5>Landing Profile</Header5>

        {/*h*/}
        <TextInputForm title={"h (m)*"}
                       placeholder={"Difference in height between the takeoff and K-Point"}
                       disabled={!this.state.selectedVenueId.length > 0}
                       onChangeValue={e => {
                           this.setState({
                               newHillh: e.target.value
                           })
                       }}/>

        {/*n*/}
        <TextInputForm title={"n (m)*"}
                       placeholder={"Horizontal distance between the takeoff and K-Point"}
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
                <Form.Control type="text" disabled
                              placeholder={this.state.newHillh / this.state.newHilln}
                              readOnly/>
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
                    selected={this.state.newHillValidSinceFullDate}
                    onChange={date => this.setDate(date, 0)}
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
                    selected={this.state.newHillValidUntilFullDate}
                    onChange={date => this.setDate(date, 1)}
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
            <StyledDiv2Right1000>
                <Button type="submit" variant="primary"
                        disabled={
                            this.state.selectedVenueId.length < 1
                            || this.state.newHillName.length < 1
                            || this.state.newHillSizeOfHillId.length < 1
                            || this.state.newHillKPoint.length < 1
                            || this.state.newHillHS.length < 1
                            || this.state.newHille1.length < 1
                            || this.state.newHille2.length < 1
                            || this.state.newHilles.length < 1
                            || this.state.newHillt.length < 1
                            || this.state.newHillGamma.length < 1
                            || this.state.newHillAlpha.length < 1
                            || this.state.newHillr1.length < 1
                            || this.state.newHillv0.length < 1
                            || this.state.newHillh.length < 1
                            || this.state.newHilln.length < 1
                            || this.state.newHills.length < 1
                            || this.state.newHilll1.length < 1
                            || this.state.newHilll2.length < 1
                            || this.state.newHilla.length < 1
                            || this.state.newHillBetap.length < 1
                            || this.state.newHillBeta.length < 1
                            || this.state.newHillBetal.length < 1
                            || this.state.newHillrl.length < 1
                            || this.state.newHillr2.length < 1
                            || this.state.newHillzu.length < 1
                            || this.state.newHillP.length < 1
                            || this.state.newHillL.length < 1
                            || this.state.newHillb1.length < 1
                            || this.state.newHillbk.length < 1
                            || this.state.newHillbu.length < 1
                            || this.state.newHilld.length < 1
                            || this.state.newHillq.length < 1
                            || this.state.newHillValidSinceDay.length < 1
                            || this.state.newHillValidSinceMonth.length < 1
                            || this.state.newHillValidSinceYear.length < 1
                            || this.state.newHillValidUntilDay.length < 1
                            || this.state.newHillValidUntilMonth.length < 1
                            || this.state.newHillValidUntilYear.length < 1
                            || this.state.newHillCertificateLink.length < 1
                        }
                >
                    Add new hill
                </Button>
            </StyledDiv2Right1000>
        </Form.Group>
    </div>
)