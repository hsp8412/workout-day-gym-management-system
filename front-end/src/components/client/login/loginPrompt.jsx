import React from "react";
import { Button, Modal } from "react-bootstrap";
import { useHistory } from "react-router-dom";

const LoginPrompt = ({ ifVisible, onClose }) => {
  return (
    <div>
      <Modal show={ifVisible} onHide={onClose}>
        <Modal.Header closeButton>
          <Modal.Title>Login required</Modal.Title>
        </Modal.Header>
        <Modal.Body>Please login to continue purchasing.</Modal.Body>
        <Modal.Footer>
          <Button variant="secondary" onClick={onClose}>
            Close
          </Button>
        </Modal.Footer>
      </Modal>
    </div>
  );
};

export default LoginPrompt;
