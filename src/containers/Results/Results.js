import React, {Component} from "react";
import axios from "axios";
import {Col, Container, Media, Row} from "react-bootstrap";
import {StyledDivCentered1200} from "../../components/StyledComponents";
import fisLogo from "../../assets/fis_logo.png"

class Results extends Component {
    state = {

    }

    componentDidMount() {

    }


    render() {
        return (
            <StyledDivCentered1200>
                <Media style={{width: "800px"}}>
                    <img
                        width={64}
                        height={64}
                        className="mr-3"
                        src={fisLogo}
                        alt="Generic placeholder"
                    />
                    <Media.Body>
                        <h5>Media Heading</h5>
                        <p>
                            Cras sit amet nibh libero, in gravida nulla. Nulla vel metus scelerisque
                            ante sollicitudin commodo. Cras purus odio, vestibulum in vulputate at,
                            tempus viverra turpis. Fusce condimentum nunc ac nisi vulputate fringilla.
                            Donec lacinia congue felis in faucibus.
                        </p>
                    </Media.Body>
                </Media>
            </StyledDivCentered1200>
        )
    }
}


export default Results