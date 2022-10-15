import React, { Component } from "react";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import {
  solid,
  regular,
  brands,
} from "@fortawesome/fontawesome-svg-core/import.macro"; // <-- import styles to be used

<FontAwesomeIcon icon={solid("user-secret")} />;

class TableHeader extends Component {
  raiseSort = (path) => {
    const sortColumn = { ...this.props.sortColumn };
    sortColumn.path = path;
    if (sortColumn.order == "asc") {
      sortColumn.order = "desc";
    } else {
      sortColumn.order = "asc";
    }
    this.props.onSort(sortColumn);
  };

  renderSortIcon = (column) => {
    const { sortColumn } = this.props;
    if (column.path == sortColumn.path) {
      if (sortColumn.order === "asc") {
        return <FontAwesomeIcon icon={solid("sort-up")} />;
      } else return <FontAwesomeIcon icon={solid("sort-down")} />;
    }
  };

  render() {
    return (
      <thead>
        <tr>
          {this.props.columns.map((column) => (
            <th
              className="clickable"
              key={column.path || column.key}
              onClick={column.path ? () => this.raiseSort(column.path) : null}
            >
              {column.label}
              {this.renderSortIcon(column)}
            </th>
          ))}
        </tr>
      </thead>
    );
  }
}

export default TableHeader;
