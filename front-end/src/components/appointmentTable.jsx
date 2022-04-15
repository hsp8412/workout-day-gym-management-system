import React, { Component } from "react";
import { Table, Button, Col, Row } from "react-bootstrap";
import { Link } from "react-router-dom";
import MyTable from "./table";

class AppointmentTable extends React.Component {
  columns = [
    {
      path: "coach",
      label: "Coach ",
      content: (appointment) => (
        <Link to={`/products/${appointment.id}`} className="clickable">
          {appointment.coach}
        </Link>
      ),
    },
    { path: "branch", label: "Branch" },
    { path: "date", label: "Date " },
    {
      path: "time",
      label: "Time ",
    },
    {
      key: "delete",
      content: (appointment) => (
        <Button
          variant="danger"
          size="sm"
          onClick={() => this.props.onDelete(appointment)}
        >
          Cancel
        </Button>
      ),
    },
  ];

  render() {
    const { appointmentsToDisplay, totalCount, onSort, sortColumn } =
      this.props;

    if (totalCount === 0)
      return <h4 className="text">There is no appointment to be shown.</h4>;
    return (
      <React.Fragment>
        <p className="text">Showing {totalCount} appointment(s). </p>
        <MyTable
          columns={this.columns}
          onSort={onSort}
          sortColumn={sortColumn}
          items={appointmentsToDisplay}
        />
      </React.Fragment>
    );
  }
}

export default AppointmentTable;
