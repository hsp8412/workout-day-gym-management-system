import React from "react";
import { Button, Modal } from "react-bootstrap";

const NoAppSelection = ({ ifVisible, onClose }) => {
  return (
    <div>
      <Modal show={ifVisible} onHide={onClose}>
        <Modal.Header closeButton>
          <Modal.Title>No selection</Modal.Title>
        </Modal.Header>
        <Modal.Body>Please make a selection.</Modal.Body>
        <Modal.Footer>
          <Button variant="primary" onClick={onClose}>
            Close
          </Button>
        </Modal.Footer>
      </Modal>
    </div>
  );
};

export default NoAppSelection;
