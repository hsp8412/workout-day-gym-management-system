import React, { Component } from "react";
import { Link } from "react-router-dom";
import { Button } from "react-bootstrap";
import MyTable from "./table";

class BranchTable extends React.Component {
  columns = [
    {
      path: "name",
      label: "Name ",
      content: (branch) => (
        <Link to={`/branches/${branch.id}`} className="clickable">
          {branch.name}
        </Link>
      ),
    },
    { path: "yearlyProfit", label: "Yearly Profit" },
    { path: "location", label: "Location " },
    {
      key: "edit",
      content: (branch) => (
        <Button
          variant="danger"
          size="sm"
          onClick={() => this.props.onEdit(branch)}
        >
          Edit
        </Button>
      ),
    },
    {
      key: "delete",
      content: (branch) => (
        <Button
          variant="danger"
          size="sm"
          onClick={() => this.props.onDelete(branch)}
        >
          Delete
        </Button>
      ),
    },
  ];

  render() {
    const { branchesToDisplay, totalCount, onSort, sortColumn } = this.props;

    if (totalCount === 0)
      return <p className="text">There is no branch to be shown.</p>;
    return (
      <React.Fragment>
        <p className="text">Showing {totalCount} branch(es). </p>
        <MyTable
          columns={this.columns}
          onSort={onSort}
          sortColumn={sortColumn}
          items={branchesToDisplay}
        />
      </React.Fragment>
    );
  }
}

export default BranchTable;
