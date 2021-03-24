import React from "react";
import {Modal} from "react-bootstrap";


const HillVersionReadMoreModal = (props) => {

    return (
        <Modal show={props.show} onHide={props.onHide} scrollable={true}>
            <Modal.Header closeButton>
                <Modal.Title>{props.hill.name} (latest version)</Modal.Title>
                <br/>
            </Modal.Header>
            <Modal.Body>
                <ul>
                    <h5>Basic Parameters</h5>
                    <li>K-point: {props.version.kPoint} m</li>
                    <li>HS: {props.version.hillSize} m</li>
                    <br/>

                    <h5>Inrun</h5>
                    <li>e1: {props.version.e1} m</li>
                    <li>e2: {props.version.e2} m</li>
                    <li>es: {props.version.es} m</li>
                    <li>t: {props.version.t} m</li>
                    <li>{"\u03B3"}: {props.version.gamma}{"\u00B0"}</li>
                    <li>{"\u03B1"}: {props.version.alpha}{"\u00B0"}</li>
                    <li>r1: {props.version.r1} m</li>
                    <li>v0: {props.version.v0} m</li>
                    <br/>

                    <h5>Landing Profile</h5>
                    <li>h: {props.version.h} m</li>
                    <li>n: {props.version.n} m</li>
                    <li>s: {props.version.s} m</li>
                    <li>l1: {props.version.l1} m</li>
                    <li>l2: {props.version.l2} m</li>
                    <li>a: {props.version.a} m</li>
                    <li>{"\u03B2p"}: {props.version.betaP}{"\u00B0"}</li>
                    <li>{"\u03B2"}: {props.version.beta}{"\u00B0"}</li>
                    <li>{"\u03B2l"}: {props.version.betaL}{"\u00B0"}</li>
                    <li>rl: {props.version.rl} m</li>
                    {props.version.r2l !== null ? <li>r2l: {props.version.r2l} m</li> : null}
                    <li>r2: {props.version.r2} m</li>
                    <li>zu: {props.version.zu} m</li>
                    <li>p: {props.version.p} m</li>
                    <li>l: {props.version.l} m</li>
                    <li>b1: {props.version.b1} m</li>
                    {props.version.b2 !== null ? <li>b2: {props.version.b2} m</li> : null}
                    <li>bk: {props.version.bk} m</li>
                    <li>bu: {props.version.bu} m</li>
                    <br/>

                    <h5>Judge Tower</h5>
                    <li>d: {props.version.d} m</li>
                    <li>q: {props.version.q} m</li>
                    <br/>

                    <h5>Certificate</h5>
                    <li>Valid since: {props.version.validSince}</li>
                    <li>Valid until: {props.version.validUntil}</li>
                    <li>URL: <a href={props.version.fisCertificate} target="_blank" rel="noreferrer">click</a></li>
                </ul>
            </Modal.Body>
        </Modal>
    )

}

export default HillVersionReadMoreModal