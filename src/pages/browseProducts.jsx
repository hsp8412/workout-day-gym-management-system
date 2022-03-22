import React, { Component } from "react";
import { Container, Card, Button, Row } from "react-bootstrap";
import { getProducts } from "../services/products";
import ProductList from "../components/productList";
import Purchase from "../components/purchase";

class Products extends React.Component {
  state = { products: [], productPurchasing: null, ifPurchasing: false };

  componentDidMount() {
    this.setState({
      products: getProducts(),
    });
  }

  onPurchase = (product) => {
    const ifPurchasing = true;
    this.setState({ productPurchasing: product, ifPurchasing });
  };

  onCancelPurchase = () => {
    const ifPurchasing = false;
    this.setState({ productPurchasing: null, ifPurchasing });
  };

  onMakePurchase = (quantity, product) => {
    console.log(product, quantity);
    const ifPurchasing = false;
    this.setState({ productPurchasing: null, ifPurchasing });
  };

  render() {
    return (
      <div>
        <ProductList
          products={this.state.products}
          onPurchase={this.onPurchase}
        />
        <Purchase
          product={this.state.productPurchasing}
          ifPurchasing={this.state.ifPurchasing}
          onCancelPurchase={this.onCancelPurchase}
          onMakePurchase={this.onMakePurchase}
        />
      </div>
    );
  }
}

export default Products;
