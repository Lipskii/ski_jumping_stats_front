import React from "react";
import {Button, Form, FormControl, Nav, Navbar, NavDropdown} from "react-bootstrap";
import {LinkContainer} from 'react-router-bootstrap'

const Toolbar = () => {
    return (
        <Navbar collapseOnSelect expand="lg" bg="dark" variant="dark" fixed="top">
            <LinkContainer to="/results">
                <Navbar.Brand href="/">Ski Jumping Stats</Navbar.Brand>
            </LinkContainer>
            <Navbar.Toggle aria-controls="responsive-navbar-nav"/>
            <Navbar.Collapse id="responsive-navbar-nav">
                <Nav className="mr-auto">
                    <LinkContainer to="/skiJumpers">
                        <Nav.Link>Ski Jumpers</Nav.Link>
                    </LinkContainer>
                    <LinkContainer to="/hills">
                        <Nav.Link>Hills</Nav.Link>
                    </LinkContainer>
                    <NavDropdown title="Series" id="collasible-nav-dropdown">
                        <LinkContainer to="/showSeries/9">
                            <NavDropdown.Item>World Cup</NavDropdown.Item>
                        </LinkContainer>
                        <LinkContainer to="/showSeries/10">
                            <NavDropdown.Item>Ski Flying World Cup</NavDropdown.Item>
                        </LinkContainer>
                        <LinkContainer to="/showSeries/12">
                            <NavDropdown.Item>Four Hills Tournament</NavDropdown.Item>
                        </LinkContainer>
                        <LinkContainer to="/showSeries/18">
                            <NavDropdown.Item>Raw Air</NavDropdown.Item>
                        </LinkContainer>
                        <LinkContainer to="/showSeries/26">
                            <NavDropdown.Item>Continental Cup</NavDropdown.Item>
                        </LinkContainer>
                        <LinkContainer to="/showSeries/28">
                            <NavDropdown.Item>FIS Cup</NavDropdown.Item>
                        </LinkContainer>
                        <NavDropdown.Divider/>
                        <LinkContainer to="/showSeries/22">
                            <NavDropdown.Item>Summer Grand Prix</NavDropdown.Item>
                        </LinkContainer>
                        <LinkContainer to="/showSeries/27">
                            <NavDropdown.Item>Summer Continental Cup</NavDropdown.Item>
                        </LinkContainer>
                    </NavDropdown>
                    <NavDropdown title="Championships" id="collasible-nav-dropdown">
                        <LinkContainer to="/showChampionships/1">
                            <NavDropdown.Item>Olympic Games</NavDropdown.Item>
                        </LinkContainer>
                        <LinkContainer to="/showChampionships/3">
                            <NavDropdown.Item>World Championships</NavDropdown.Item>
                        </LinkContainer>
                        <LinkContainer to="/showChampionships/5">
                            <NavDropdown.Item>Ski Flying World Championships</NavDropdown.Item>
                        </LinkContainer>
                    </NavDropdown>
                    <Nav.Link>SJS All Time Ranking</Nav.Link>
                    <Nav.Link>Stats</Nav.Link>
                    {/*<Form inline>*/}
                    {/*    <FormControl type="text" placeholder="Search" className="mx-sm-2"/>*/}
                    {/*    <Button variant="secondary">Search</Button>*/}
                    {/*</Form>*/}
                </Nav>
                <Nav className="mr-1">
                    <NavDropdown id="collasible-nav-dropdown_two" title="DB Tools">
                        <LinkContainer to='/dbAthletes'>
                            <NavDropdown.Item>Athletes</NavDropdown.Item>
                        </LinkContainer>
                        <LinkContainer to='/dbHills'>
                            <NavDropdown.Item>Hills</NavDropdown.Item>
                        </LinkContainer>
                        <LinkContainer to='/dbJury'>
                            <NavDropdown.Item>Jury</NavDropdown.Item>
                        </LinkContainer>
                        <LinkContainer to='/dbResults'>
                            <NavDropdown.Item>Results</NavDropdown.Item>
                        </LinkContainer>
                        <LinkContainer to='/dbClubs'>
                            <NavDropdown.Item>Ski clubs</NavDropdown.Item>
                        </LinkContainer>
                        <LinkContainer to='/dbVenues'>
                            <NavDropdown.Item>Venues</NavDropdown.Item>
                        </LinkContainer>
                    </NavDropdown>
                    <Nav.Link>About</Nav.Link>
                </Nav>
            </Navbar.Collapse>
        </Navbar>
    )
}


export default Toolbar