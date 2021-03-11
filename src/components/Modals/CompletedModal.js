import {Modal} from "react-bootstrap";
import React from "react";
import iconCompleted from "../../assets/icon-completed.gif"
import iconFailed from "../../assets/alert.png"

const CompletedModal = (props) => {

    return (
        <Modal show={props.show} onHide={props.onHide} size={"m"}>
            <Modal.Header>
                <Modal.Title>{props.text} <small>(Click anywhere to continue)</small></Modal.Title>
            </Modal.Header>
            <Modal.Body>
                {props.status ? <img
                    style={{display: "block", marginLeft: "auto", marginRight: "auto", width: "50%"}}
                    src={iconCompleted}
                    alt={"Completed!"}/>
                    :
                    <img style={{display: "block", marginLeft: "auto", marginRight: "auto", width: "50%"}}
                    src={iconFailed}
                    alt={"Failed!"}/>
                }

            </Modal.Body>
        </Modal>
    )

}

export default CompletedModal;