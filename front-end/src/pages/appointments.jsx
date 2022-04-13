import React, { Component } from "react";
import ATable from "../components/atable";
import { Container } from "react-bootstrap";
import NewAppointment from "../components/newAppointment";
import CancelAppointmentConfirm from "../components/cancelAppointmentConfirm";
import app from "../App";
import { getAppointments } from "../services/appointments";
import { getCoachById } from "../services/coach";
import appointmentTable from "../components/appointmentTable";
import { getBranchById } from "../services/branch";

class Appointment extends React.Component {
  state = {
    allAppointments: [],
    newAppVisibility: false,
    cancelAppVisibility: false,
    appointmentDeleting: null,
  };

  componentDidMount() {
    let appointments = getAppointments();
    let allAppointments = appointments.map((appointment) => ({
      _id: appointment._id,
      coach: getCoachById(appointment.coachId).name,
      branch: getBranchById(appointment.branchId).name,
      time: this.getAppointmentTime(appointment),
      date:
        appointment.startTime.getFullYear() +
        "-" +
        appointment.startTime.getMonth() +
        "-" +
        appointment.startTime.getDate(),
    }));
    this.setState({
      allAppointments,
    });
    console.log(allAppointments);
  }

  getAppointmentTime(appointment) {
    let startHour = appointment.startTime.getHours().toString();
    let startMinute = appointment.startTime.getMinutes().toString();
    let endHour = appointment.endTime.getHours().toString();
    let endMinute = appointment.endTime.getMinutes().toString();
    if (startHour === "0") {
      startHour = "00";
    }
    if (startMinute === "0") {
      startMinute = "00";
    }
    if (endHour === "0") {
      endHour = "00";
    }
    if (endMinute === "0") {
      endMinute = "00";
    }
    return startHour + ":" + startMinute + "-" + endHour + ":" + endMinute;
  }

  handleNewAppointment = () => {
    this.setState({
      newAppVisibility: true,
    });
  };

  handleCloseNewApp = () => {
    this.setState({
      newAppVisibility: false,
    });
  };

  handleCloseCancelApp = () => {
    this.setState({ cancelAppVisibility: false });
  };

  handleDelete = (appointment) => {
    this.setState({
      appointmentDeleting: appointment,
      cancelAppVisibility: true,
    });
  };

  handleConfirmDelete = () => {
    const appointments = this.state.allAppointments.filter(
      (appointment) => appointment._id !== this.state.appointmentDeleting._id
    );
    this.setState({
      allAppointments: appointments,
      cancelAppVisibility: false,
    });
  };

  render() {
    return (
      <div>
        <Container className="d-flex flex-column justify-content-center">
          <ATable
            allAppointments={this.state.allAppointments}
            onDelete={this.handleDelete}
          />
          <button
            type="button"
            className="btn btn-primary btn-sm align-self-center"
            style={{ width: "10rem" }}
            onClick={this.handleNewAppointment}
          >
            New appointment
          </button>
        </Container>
        <NewAppointment
          show={this.state.newAppVisibility}
          handleClose={this.handleCloseNewApp}
        />
        <CancelAppointmentConfirm
          onClose={this.handleCloseCancelApp}
          ifVisible={this.state.cancelAppVisibility}
          onConfirmDelete={this.handleConfirmDelete}
        />
      </div>
    );
  }
}

export default Appointment;
