import { Modal} from "react-bootstrap";
import React from "react";
import Loader from "react-loader-spinner";

const AddingModal = (props) => {

    return (
        <Modal show={props.show} onHide={props.onHide} size={"m"}>
            <Modal.Header>
                <Modal.Title>Saving...</Modal.Title>
            </Modal.Header>
            <Modal.Body>
                <Loader
                    type="Oval"
                    color="#00BFFF"
                    height={100}
                    width={100}
                    style={{textAlign: 'center'}}
                />
            </Modal.Body>
        </Modal>
    )

}

export default AddingModal