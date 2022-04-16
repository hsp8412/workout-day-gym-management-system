import React, { Component } from "react";
import _ from "lodash";
import { paginate } from "../utils/paginate";
import { Container, Row } from "react-bootstrap";
import Pagi from "../components/pagination";
import BranchTable from "../components/branchTable";
import BranchDeleteConfirm from "../components/branchDeleteConfirm";
import EditBranch from "../components/editBranchModal";
import http from "../services/httpService";

class ExecutiveManager extends Component {
  state = {
    branches: [],
    pageSize: 4,
    currentPage: 1,
    sortColumn: { path: "name", order: "asc" },
    branchDeleting: null,
    deleteBranchVisibility: false,
    branchEditing: {
      name: "",
      yearlyProfit: 0,
      numberOfMembers: 0,
      location: " ",
    },
    editBranchVisibility: false,
  };

  async componentDidMount() {
    const req = await http.get(`http://localhost:4000/branch`);
    console.log(req.data);
    this.setState({ branches: req.data });
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

  handleDeleteClose = () => {
    this.setState({ branchDeleting: null, deleteBranchVisibility: false });
  };

  handleDeleteConfirm = () => {
    const deletingBranchId = this.state.branchDeleting._id;
    http.delete(`http://localhost:4000/branch/${deletingBranchId}`).then(() => {
      this.setState({ deleteBranchVisibility: false, branchDeleting: null });
      window.location.reload();
    });
  };

  handleEdit = (branch) => {
    console.log(branch);
    this.setState({ branchEditing: branch, editBranchVisibility: true });
  };

  handleEditClose = () => {
    this.setState({ editBranchVisibility: false });
  };

  handleSubmitUpdate = async (values) => {
    const id = this.state.branchEditing._id;
    const { name, yearlyProfit, numberOfMembers, location } = values;
    const data = { name, yearlyProfit, numberOfMembers, location };
    const req = await http.patch(`http://localhost:4000/branch/${id}`, data);
    this.setState({
      branchEditing: {
        name: "",
        yearlyProfit: 0,
        numberOfMembers: 0,
        location: " ",
      },
      editBranchVisibility: false,
    });
    window.location.reload();
  };

  render() {
    const {
      pageSize,
      currentPage,
      sortColumn,
      branches,
      deleteBranchVisibility,
    } = this.state;
    let allBranches = branches;

    const sorted = _.orderBy(allBranches, sortColumn.path, sortColumn.order);

    const branchesToDisplay = paginate(sorted, pageSize, currentPage);

    return (
      <div style={{ marginTop: "20px" }}>
        <Container>
          <BranchTable
            branchesToDisplay={branchesToDisplay}
            totalCount={allBranches.length}
            onDelete={this.handleDelete}
            onSort={this.handleSort}
            sortColumn={sortColumn}
            onEdit={this.handleEdit}
          />
          <Pagi
            itemsCount={allBranches.length}
            pageSize={pageSize}
            onPageChange={this.handlePageChange}
            currentPage={currentPage}
          />
          <div className="d-flex justify-content-center">
            <button
              type="button"
              className="btn btn-primary btn-lg"
              onClick={() => {
                localStorage.clear();
                window.location.reload();
              }}
            >
              Log out
            </button>
          </div>
        </Container>
        <BranchDeleteConfirm
          ifVisible={deleteBranchVisibility}
          onConfirm={this.handleDeleteConfirm}
          onClose={this.handleDeleteClose}
        />
        <EditBranch
          onClose={this.handleEditClose}
          isVisible={this.state.editBranchVisibility}
          branchEditing={this.state.branchEditing}
          onSubmitUpdate={this.handleSubmitUpdate}
        />
      </div>
    );
  }
}

export default ExecutiveManager;
