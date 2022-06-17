import React, { Component } from "react";
import _ from "lodash";
class TableBody extends Component {
  renderCell(item, column) {
    if (!column.content) return _.get(item, column.path);
    return column.content(item);
  }

  createKey(item, column) {
    const key = item._id.toString() + (column.path || column.key);
    return key;
  }

  render() {
    const { items, columns } = this.props;
    return (
      <tbody>
        {items.map((item) => (
          <tr key={item._id}>
            {columns.map((column) => (
              <td key={this.createKey(item, column)}>
                {this.renderCell(item, column)}
              </td>
            ))}
          </tr>
        ))}
      </tbody>
    );
  }
}

export default TableBody;
