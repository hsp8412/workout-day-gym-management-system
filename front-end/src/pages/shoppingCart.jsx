import React, { Component } from "react";
import { getProducts } from "../services/products";
import { getShoppingCart } from "../services/shoppingCart";
import { Button, Container } from "react-bootstrap";
import ShoppingCartCard from "../components/shoppingCartCard";

class ShoppingCart extends Component {
  state = {
    shoppingCartItems: [],
  };

  componentDidMount() {
    this.setState({
      shoppingCartItems: getShoppingCart(),
    });
  }

  render() {
    return (
      <div className="d-flex">
        <div className="d-flex align-items-start flex-column container-fluid">
          <Container>
            {this.state.shoppingCartItems.map((item) => (
              <ShoppingCartCard key={item._id} item={item} />
            ))}
          </Container>
          <div className="container-fluid d-flex justify-content-center">
            <Button variant="primary" className="mx-2">
              Place the order
            </Button>
            <Button variant="warning">Clear</Button>
          </div>
        </div>
      </div>
    );
  }
}

export default ShoppingCart;
