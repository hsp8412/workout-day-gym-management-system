import React, { Component } from "react";
import ATable from "../components/atable";
import { Container } from "react-bootstrap";
import NewAppointment from "../components/newAppointment";
import CancelAppointmentConfirm from "../components/cancelAppointmentConfirm";
import app from "../App";
import { getAppointments } from "../services/appointments";

class Appointment extends React.Component {
  state = {
    allAppointments: [],
    newAppVisibility: false,
    cancelAppVisibility: false,
    appointmentDeleting: null,
  };

  componentDidMount() {
    this.setState({
      allAppointments: getAppointments(),
    });
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
