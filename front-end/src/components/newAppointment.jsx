import React from "react";
import { Modal, Col } from "react-bootstrap";

const NewAppointment = (props) => {
  return (
    <Modal.Dialog>
      <Modal.Header closeButton>
        <Modal.Title>New Appointment</Modal.Title>
      </Modal.Header>

      <Modal.Body>
        <Col></Col>
      </Modal.Body>

      <Modal.Footer>
        <Button variant="secondary">Close</Button>
        <Button variant="primary">Save changes</Button>
      </Modal.Footer>
    </Modal.Dialog>
  );
};

export default NewAppointment;
