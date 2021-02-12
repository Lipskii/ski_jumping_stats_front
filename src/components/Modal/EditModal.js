import React from "react";
import {Button, Modal} from "react-bootstrap";

const EditModal = (props) => {

    return (
        <Modal show={props.show} onHide={props.handleClose}>
            <Modal.Header closeButton>
                <Modal.Title>{props.selectedName}</Modal.Title>
            </Modal.Header>
            <Modal.Body>Do you want to delete it?</Modal.Body>
            <Modal.Footer>
                <Button variant="danger" onClick={props.handleClose}>
                    Delete
                </Button>
                <Button variant="secondary" onClick={props.handleCloseNoAction}>
                    Close
                </Button>
            </Modal.Footer>
        </Modal>
        )

}

export default EditModal