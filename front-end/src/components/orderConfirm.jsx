import React from "react";
import { Button, Modal } from "react-bootstrap";

const OrderConfirm = ({ ifVisible, onConfirm, onClose }) => {
  return (
    <div>
      <Modal show={ifVisible} onHide={onClose}>
        <Modal.Header closeButton>
          <Modal.Title>Order Confirm</Modal.Title>
        </Modal.Header>
        <Modal.Body>Are you sure you want to place the order?</Modal.Body>
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

export default OrderConfirm;
