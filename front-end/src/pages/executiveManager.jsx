import React, { Component } from "react";
import _ from "lodash";
import { paginate } from "../utils/paginate";
import { Container, Row } from "react-bootstrap";
import Pagi from "../components/pagination";
import { getBranches } from "../services/branch";
import BranchTable from "../components/branchTable";

class ExecutiveManager extends Component {
  state = {
    branches: [],
    pageSize: 4,
    currentPage: 1,
    sortColumn: { path: "name", order: "asc" },
    branchDeleting: null,
    deleteBranchVisibility: false,
  };

  componentDidMount() {
    this.setState({ branches: getBranches() });
  }

  handlePageChange = (page) => {
    this.setState({ currentPage: page });
  };

  handleSort = (sortColumn) => {
    this.setState({ sortColumn });
  };

  handleDelete = (branch) => {
    this.setState({
      branchDeleting: branch,
      deleteBranchVisibility: true,
    });
  };

  render() {
    const { pageSize, currentPage, sortColumn, branches } = this.state;
    let allBranches = branches;

    const sorted = _.orderBy(allBranches, sortColumn.path, sortColumn.order);

    const branchesToDisplay = paginate(sorted, pageSize, currentPage);

    console.log(branchesToDisplay);
    return (
      <div style={{ marginTop: "20px" }}>
        <Container className="d-flex flex-column">
          <Row className="align-self-center">
            <BranchTable
              branchesToDisplay={branchesToDisplay}
              totalCount={allBranches.length}
              onDelete={this.handleDelete}
              onSort={this.handleSort}
              sortColumn={sortColumn}
            />
            <Pagi
              itemsCount={allBranches.length}
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

export default ExecutiveManager;
