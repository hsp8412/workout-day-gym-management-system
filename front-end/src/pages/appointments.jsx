import React, { Component } from "react";
import ATable from "../components/atable";
import { Container } from "react-bootstrap";
import NewAppointment from "../components/newAppointment";
import CancelAppointmentConfirm from "../components/cancelAppointmentConfirm";
import NoAppSelection from "../components/newAppNoSelectionModal";
import axios from "axios";
import data from "bootstrap/js/src/dom/data";

class Appointment extends React.Component {
  state = {
    allAppointments: [],
    allTimeslots: [],
    newAppVisibility: false,
    cancelAppVisibility: false,
    appointmentDeleting: null,
    noSelectionVisibility: false,
  };

  async componentDidMount() {
    const userId = localStorage.getItem("id");
    let res = await axios.get("http://localhost:4000/timeslot");
    const timeslots = res.data;
    const filtered = timeslots.filter((timeslot) => {
      if (timeslot.customerId == null) {
        return false;
      }
      return timeslot.customerId == userId;
    });
    console.log(filtered);
    let allAppointments = [];
    for (const appointment of filtered) {
      const _id = appointment._id;
      const time = this.getAppointmentTime(appointment);
      const date = this.getAppointmentDate(appointment);
      let coach;
      let branch;
      let res = await axios.get(
        `http://localhost:4000/branch/${appointment.branchId}`
      );
      branch = res.data.name;
      res = await axios.get(
        `http://localhost:4000/branch_staff/${appointment.coachId}`
      );
      coach = res.data.firstName + " " + res.data.lastName;
      const app = { _id, time, date, branch, coach };
      allAppointments.push(app);
    }
    console.log(allAppointments);
    this.setState({
      allAppointments,
    });

    let allTimeslots = [];
    for (const timeslot of timeslots) {
      const _id = timeslot._id;
      const startTime = timeslot.startTime;
      const endTime = timeslot.endTime;
      const isBooked = timeslot.isBooked;
      let coach;
      let branch;
      let res = await axios.get(
        `http://localhost:4000/branch/${timeslot.branchId}`
      );
      branch = res.data.name;
      res = await axios.get(
        `http://localhost:4000/branch_staff/${timeslot.coachId}`
      );
      coach = res.data.firstName + " " + res.data.lastName;
      const app = { _id, isBooked, startTime, endTime, branch, coach };
      allTimeslots.push(app);
    }
    console.log(allTimeslots);
    this.setState({
      allTimeslots,
    });
  }

  getAppointmentTime(appointment) {
    const startTime = new Date(appointment.startTime);
    const endTime = new Date(appointment.endTime);
    let startHour = startTime.getHours().toString();
    let startMinute = startTime.getMinutes().toString();
    let endHour = endTime.getHours().toString();
    let endMinute = endTime.getMinutes().toString();
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

  getAppointmentDate(appointment) {
    let date = new Date(appointment.startTime);
    return date.getFullYear() + "-" + date.getMonth() + "-" + date.getDate();
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

  handleMakeNewApp = async (timeSlot) => {
    if (timeSlot === null) {
      this.setState({ noSelectionVisibility: true });
    } else {
      //console.log(timeSlot);
      const id = timeSlot._id;
      let res = await axios.get(
        `http://localhost:4000/timeslot/${timeSlot._id}`
      );
      const { branchId, coachId, startTime, endTime } = res.data;
      const customerId = localStorage.getItem("id");
      const isBooked = true;
      const result = await axios.put(
        `http://localhost:4000/timeslot/${timeSlot._id}`,
        {
          branchId,
          coachId,
          startTime,
          endTime,
          customerId,
          isBooked,
        }
      );
      console.log(result);
      this.setState({ newAppVisibility: false });
    }
  };

  handleNoSelectionClose = () => {
    this.setState({ noSelectionVisibility: false });
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
          onSubmit={this.handleMakeNewApp}
          timeslots={this.state.allTimeslots}
        />
        <CancelAppointmentConfirm
          onClose={this.handleCloseCancelApp}
          ifVisible={this.state.cancelAppVisibility}
          onConfirmDelete={this.handleConfirmDelete}
        />
        <NoAppSelection
          ifVisible={this.state.noSelectionVisibility}
          onClose={this.handleNoSelectionClose}
        />
      </div>
    );
  }
}

export default Appointment;
