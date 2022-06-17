import React from "react";
import { Button, Modal } from "react-bootstrap";

const InvalidCredential = ({ ifVisible, onClose }) => {
  return (
    <div>
      <Modal show={ifVisible} onHide={onClose}>
        <Modal.Header closeButton>
          <Modal.Title>Invalid Credential</Modal.Title>
        </Modal.Header>
        <Modal.Body>Invalid email or password.</Modal.Body>
        <Modal.Footer>
          <Button variant="secondary" onClick={onClose}>
            Close
          </Button>
        </Modal.Footer>
      </Modal>
    </div>
  );
};

export default InvalidCredential;
