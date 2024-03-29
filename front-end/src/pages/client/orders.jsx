import React, { Component } from "react";
import OrderCard from "../../components/client/order/orderCard";
import DeleteOrderConfirm from "../../components/client/order/deleteOrderConfirm";
import http from "../../services/httpService";

class Orders extends Component {
  state = {
    orders: [],
    deleteVisible: false,
    orderDeleting: null,
  };

  async componentDidMount() {
    const userId = localStorage.getItem("id");
    const uri = process.env.REACT_APP_API_ENDPOINT + "/order/customer/";
    const res = await http.get(
      // `http://localhost:4000/order/customer/${userId}`
      uri + userId
    );
    const orders = res.data;
    this.setState({ orders });
  }

  handleDelete = (order) => {
    this.setState({ orderDeleting: order, deleteVisible: true });
  };

  handleDeleteConfirm = () => {
    const deleteOrderId = this.state.orderDeleting._id;
    const uri = process.env.REACT_APP_API_ENDPOINT + "/order/";
    http
      .delete(
        // `http://localhost:4000/order/${deleteOrderId}`
        uri + deleteOrderId
      )
      .then(() => this.setState({ deleteVisible: false, orderDeleting: null }));
    window.location.reload();
  };

  handleClose = () => {
    const deleteVisible = false;
    this.setState({ deleteVisible });
  };

  render() {
    if (this.state.orders.length == 0) {
      return (
        <div className="d-flex justify-content-center mt-3">
          <h2>There is no order to be shown.</h2>
        </div>
      );
    } else {
      return (
        <div>
          <div className="d-flex flex-column align-items-center">
            {this.state.orders.map((order) => (
              <OrderCard order={order} onDelete={this.handleDelete} />
            ))}
          </div>
          <div>
            <DeleteOrderConfirm
              order={this.state.orderDeleting}
              ifVisible={this.state.deleteVisible}
              onConfirm={this.handleDeleteConfirm}
              onClose={this.handleClose}
            />
          </div>
        </div>
      );
    }
  }
}

export default Orders;
