import React, { Component } from "react";
import { getProducts } from "../services/products";
import { getShoppingCart } from "../services/shoppingCart";
import { Container } from "react-bootstrap";
import ShoppingCartCard from "../components/shoppingCartCard";

class ShoppingCart extends Component {
  state = {
    orders: [],
  };

  componentDidMount() {
    this.setState({
      orders: getShoppingCart(),
    });
  }

  render() {
    return (
      <div>
        <Container>
          {this.state.orders.map((order) => (
            <ShoppingCartCard order={order} />
          ))}
        </Container>
      </div>
    );
  }
}

export default ShoppingCart;
