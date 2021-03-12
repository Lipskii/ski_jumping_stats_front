import React from "react";
import {Button, Modal} from "react-bootstrap";

const DeleteModal = (props) => {

    return (
        <Modal show={props.show} onHide={props.onHide}>
            <Modal.Header closeButton>
                <Modal.Title>Deleting {props.title}</Modal.Title>
            </Modal.Header>
            <Modal.Body>This will remove {props.title} from database permanently. Are you sure you want to continue?</Modal.Body>
            <Modal.Footer>
                <Button variant="danger" onClick={props.handleDelete}>
                    Delete
                </Button>
                <Button variant="secondary" onClick={props.onHide}>
                    Cancel
                </Button>
            </Modal.Footer>
        </Modal>
    )

}

export default DeleteModal