import React, { Component } from "react"
import Modal from 'react-bootstrap/Navbar';
import { Link, Button, ButtonToolbar } from "gatsby";

const MyVerticallyCenteredModal = (props) => {
  return (
    <Modal>

      <Modal.Body>

      </Modal.Body>
      <Modal.Footer>
        <Button onClick={props.onHide}>Close</Button>
      </Modal.Footer>
    </Modal>
  );
}

export default MyVerticallyCenteredModal;
