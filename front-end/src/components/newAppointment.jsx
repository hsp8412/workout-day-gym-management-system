import React, { useState } from "react";
import { Modal, Col, Button, Row } from "react-bootstrap";
import DateCalendar from "./dateCalendar";
import AvailableSlotCard from "./availableSlotCard";
import { useFormik } from "formik";
import * as Yup from "yup";

const NewAppointment = ({ show, handleClose, onSubmit }) => {
  const [dateSelected, setDateSelected] = useState(new Date());
  const [slotSelected, setSlotSelected] = useState(null);
  const handleSubmit = () => {
    console.log(slotSelected);
    onSubmit(slotSelected);
  };

  return (
    <Modal show={show} onHide={handleClose}>
      <Modal.Header closeButton>
        <Modal.Title>New appointment</Modal.Title>
      </Modal.Header>
      <Modal.Body className="d-flex flex-column">
        <DateCalendar
          className="align-self-center"
          onChange={setDateSelected}
          value={dateSelected}
        />
        <AvailableSlotCard
          dateSelected={dateSelected}
          slotSelected={slotSelected}
          setSlotSelected={setSlotSelected}
        />
      </Modal.Body>
      <Modal.Footer>
        <Button variant="secondary" onClick={handleClose}>
          Cancel
        </Button>
        <Button variant="primary" onClick={handleSubmit}>
          Make the appointment
        </Button>
      </Modal.Footer>
    </Modal>
  );
};

export default NewAppointment;
