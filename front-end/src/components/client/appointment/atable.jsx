import React, { Component } from "react";
import { paginate } from "../../../utils/paginate";
import Pagi from "../../executive/pagination";
import { Button, Table, Col, Row, Container } from "react-bootstrap";
import _ from "lodash";
import AppointmentTable from "./appointmentTable";

class ATable extends React.Component {
  state = {
    pageSize: 4,
    currentPage: 1,
    sortColumn: { path: "name", order: "asc" },
  };

  handlePageChange = (page) => {
    this.setState({ currentPage: page });
  };

  handleSort = (sortColumn) => {
    this.setState({ sortColumn });
  };

  render() {
    const { pageSize, currentPage, sortColumn } = this.state;
    let allAppointments = this.props.allAppointments;

    const sorted = _.orderBy(
      allAppointments,
      sortColumn.path,
      sortColumn.order
    );

    const appointmentsToDisplay = paginate(sorted, pageSize, currentPage);

    return (
      <div style={{ marginTop: "20px" }}>
        <Container className="d-flex flex-column">
          <Row className="align-self-center">
            <AppointmentTable
              appointmentsToDisplay={appointmentsToDisplay}
              totalCount={allAppointments.length}
              onDelete={this.props.onDelete}
              onSort={this.handleSort}
              sortColumn={sortColumn}
            />
            <Pagi
              itemsCount={allAppointments.length}
              pageSize={pageSize}
              onPageChange={this.handlePageChange}
              currentPage={currentPage}
            />
          </Row>
        </Container>
      </div>
    );
  }
}

export default ATable;
