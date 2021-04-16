import React from "react";
import {Button, Form, FormControl, Nav, Navbar, NavDropdown} from "react-bootstrap";
import {LinkContainer} from 'react-router-bootstrap'

const Toolbar = () => {
    return (
        <Navbar collapseOnSelect expand="lg" bg="dark" variant="dark" fixed="top">
            <Navbar.Brand href="/">Ski Jumping Stats</Navbar.Brand>
            <Navbar.Toggle aria-controls="responsive-navbar-nav"/>
            <Navbar.Collapse id="responsive-navbar-nav">
                <Nav className="mr-auto">
                    <LinkContainer to="/results">
                        <Nav.Link>Results</Nav.Link>
                    </LinkContainer>
                    <LinkContainer to="/skiJumpers">
                        <Nav.Link>Ski Jumpers</Nav.Link>
                    </LinkContainer>
                    <LinkContainer to="/hills">
                        <Nav.Link>Hills</Nav.Link>
                    </LinkContainer>
                    <NavDropdown title="Series" id="collasible-nav-dropdown">
                        <NavDropdown.Item>Olympic Games</NavDropdown.Item>
                        <NavDropdown.Item>World Championships</NavDropdown.Item>
                        <NavDropdown.Item>Ski Flying World Championships</NavDropdown.Item>
                        <NavDropdown.Item>World Cup</NavDropdown.Item>
                        <NavDropdown.Item>Four Hills Tournament</NavDropdown.Item>
                        <NavDropdown.Divider/>
                        <NavDropdown.Item>Other Series</NavDropdown.Item>
                    </NavDropdown>
                    <Nav.Link>SJS All Time Ranking</Nav.Link>
                    <Nav.Link>Stats</Nav.Link>
                    <Form inline>
                        <FormControl type="text" placeholder="Search" className="mx-sm-2"/>
                        <Button variant="secondary">Search</Button>
                    </Form>
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