import {Card, ListGroup, Modal} from "react-bootstrap";
import React from "react";


const WinsModal = (props) => {

    return(
        <Modal show={props.show} size={"sm"} scrollable={true} onHide={props.onHide}>
            <ListGroup variant="flush">
                Elo
            </ListGroup>
        </Modal>
    )

}

export default WinsModal