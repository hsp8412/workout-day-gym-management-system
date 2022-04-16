import React from "react";
import { Button, Modal } from "react-bootstrap";

const DeleteTimeslotConfirm = ({ ifVisible, onClose, onConfirmDelete }) => {
  return (
    <div>
      <Modal show={ifVisible} onHide={onClose}>
        <Modal.Header closeButton>
          <Modal.Title>Delete Timeslot</Modal.Title>
        </Modal.Header>
        <Modal.Body>Are you sure you want to delete this timeslot?</Modal.Body>
        <Modal.Footer>
          <Button variant="primary" onClick={onConfirmDelete}>
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

export default DeleteTimeslotConfirm;
