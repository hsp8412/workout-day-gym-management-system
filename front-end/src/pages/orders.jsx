import React, { Component } from "react";
import { getShoppingCart } from "../services/shoppingCart";
import { getOrders } from "../services/orders";
import orderCard from "../components/orderCard";
import OrderCard from "../components/orderCard";
import { Container, Row } from "react-bootstrap";
import DeleteOrderConfirm from "../components/deleteOrderConfirm";

class Orders extends Component {
  state = {
    orders: [],
    deleteVisible: false,
    orderDeleting: null,
  };

  componentDidMount() {
    this.setState({
      orders: getOrders(),
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
