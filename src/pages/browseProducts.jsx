import React, { Component } from "react";
import { Container, Card, Button, Row } from "react-bootstrap";
import { getProducts } from "../services/products";
import ProductList from "../components/productList";

class Products extends React.Component {
  state = { products: [] };

  componentDidMount() {
    this.setState({
      products: getProducts(),
    });
  }

  render() {
    return <ProductList products={this.state.products} />;
  }
}

export default Products;
