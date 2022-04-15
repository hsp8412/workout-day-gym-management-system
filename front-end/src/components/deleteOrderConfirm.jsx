import React from "react";
import { Button, Modal } from "react-bootstrap";

const DeleteOrderConfirm = ({ order, ifVisible, onClose, onConfirm }) => {
  if (order == null) return <div />;
  if (order.ifFulfilled == true) {
    return (
      <div>
        <Modal show={ifVisible} onHide={onClose}>
          <Modal.Header closeButton>
            <Modal.Title>Cancel Order</Modal.Title>
          </Modal.Header>
          <Modal.Body>
            This order is already fulfilled and cannot be canceled.
          </Modal.Body>
          <Modal.Footer>
            <Button variant="primary" onClick={onClose}>
              Close
            </Button>
          </Modal.Footer>
        </Modal>
      </div>
    );
  } else {
    return (
      <div>
        <Modal show={ifVisible} onHide={onClose}>
          <Modal.Header closeButton>
            <Modal.Title>Cancel Order</Modal.Title>
          </Modal.Header>
          <Modal.Body>Are you sure you want to cancel this order?</Modal.Body>
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
  }
};

export default DeleteOrderConfirm;
