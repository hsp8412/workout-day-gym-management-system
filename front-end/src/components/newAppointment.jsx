import React from "react";
import { Modal, Col, Button, Row } from "react-bootstrap";
import DateCalendar from "./dateCalendar";
import AvailableSlotCard from "./availableSlotCard";

const NewAppointment = (props) => {
  return (
    <Modal show={props.show} onHide={props.handleClose}>
      <Modal.Header closeButton>
        <Modal.Title>New appointment</Modal.Title>
      </Modal.Header>
      <Modal.Body className="d-flex flex-column">
        <DateCalendar className="align-self-center" />
        <AvailableSlotCard />
      </Modal.Body>
      <Modal.Footer>
        <Button variant="secondary" onClick={props.handleClose}>
          Cancel
        </Button>
        <Button variant="primary" onClick={props.handleClose}>
          Make the appointment
        </Button>
      </Modal.Footer>
    </Modal>
  );
};

export default NewAppointment;
