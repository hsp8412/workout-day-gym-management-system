import React from "react";
import { Button, Modal } from "react-bootstrap";

const BranchDeleteConfirm = ({ ifVisible, onClose, onConfirm }) => {
  return (
    <div>
      <Modal show={ifVisible} onHide={onClose}>
        <Modal.Header closeButton>
          <Modal.Title>Deleting Branch...</Modal.Title>
        </Modal.Header>
        <Modal.Body>Are you sure you want to delete this branch?</Modal.Body>
        <Modal.Footer>
          <Button variant="primary" onClick={onConfirm}>
            Confirm
          </Button>
          <Button variant="secondary" onClick={onClose}>
            Close
          </Button>
        </Modal.Footer>
      </Modal>
    </div>
  );
};

export default BranchDeleteConfirm;
