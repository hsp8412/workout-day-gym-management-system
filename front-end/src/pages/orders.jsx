import React, { Component } from "react";
import { getShoppingCart } from "../services/shoppingCart";
import { getOrders } from "../services/orders";
import orderCard from "../components/orderCard";
import OrderCard from "../components/orderCard";
import { Container, Row } from "react-bootstrap";

class Orders extends Component {
  state = {
    orders: [],
  };

  componentDidMount() {
    this.setState({
      orders: getOrders(),
    });
  }

  render() {
    return (
      <div className="d-flex flex-column align-items-center">
        {this.state.orders.map((order) => (
          <OrderCard order={order} />
        ))}
      </div>
    );
  }
}

export default Orders;
