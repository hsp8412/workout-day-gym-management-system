import React, { Component } from "react";
import ATable from "../components/atable";
import { Container } from "react-bootstrap";
import NewAppointment from "../components/newAppointment";

class Appointment extends React.Component {
  state = {
    modalVisibility: false,
  };

  handleNewAppointment = () => {
    this.setState({
      modalVisibility: true,
    });
  };

  handleClose = () => {
    this.setState({
      modalVisibility: true,
    });
  };

  render() {
    return (
      <div>
        <Container className="d-flex flex-column justify-content-center">
          <ATable />
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
          show={this.state.modalVisibility}
          handleClose={this.handleClose}
        />
      </div>
    );
  }
}

export default Appointment;
