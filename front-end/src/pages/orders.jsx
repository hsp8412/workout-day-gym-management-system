import React, { Component } from "react";
import { getOrders } from "../services/orders";
import OrderCard from "../components/orderCard";
import DeleteOrderConfirm from "../components/deleteOrderConfirm";
import axios from "axios";

class Orders extends Component {
  state = {
    orders: [],
    deleteVisible: false,
    orderDeleting: null,
  };

  componentDidMount() {
    const userId = localStorage.getItem("id");
    axios.get("http://localhost:4000/order").then((res) => {
      const allOrders = res.data;
      const orders = allOrders.filter((order) => {
        return order.customerId == userId;
      });
      this.setState({ orders });
    });
  }

  handleDelete = (order) => {
    console.log(order);
    let orderDeleting = order;
    const deleteVisible = true;
    this.setState({ orderDeleting, deleteVisible });
  };

  handleDeleteConfirm = () => {
    let orders = [...this.state.orders];
    let index = orders.findIndex((order) => {
      return order._id == order._id;
    });
    orders.splice(index, 1);
    const deleteVisible = false;
    this.setState({ orders, deleteVisible });
  };

  handleClose = () => {
    const deleteVisible = false;
    this.setState({ deleteVisible });
  };

  render() {
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

export default Orders;
