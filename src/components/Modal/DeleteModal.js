import React from "react";
import {Button, Modal} from "react-bootstrap";

const DeleteModal = (props) => {

    return (
        <Modal show={props.show} onHide={props.onHide}>
            <Modal.Header closeButton>
                <Modal.Title>{props.title}</Modal.Title>
            </Modal.Header>
            <Modal.Body>Do you want to delete it?</Modal.Body>
            <Modal.Footer>
                <Button variant="danger" onClick={props.handleDelete}>
                    Yes
                </Button>
                <Button variant="secondary" onClick={props.onHide}>
                    No
                </Button>
            </Modal.Footer>
        </Modal>
    )

}

export default DeleteModal