import React, { Component } from "react";
import Products from "./browseProducts";
import ShoppingCart from "./shoppingCart";
import { Container, Tab, Tabs } from "react-bootstrap";
import { getProducts, getProductsById } from "../services/products";

class Shopping extends Component {
  state = {
    products: [],
    productPurchasing: null,
    ifPurchasing: false,
    shoppingCartItems: [],
  };

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
    const ifPurchasing = false;
    this.setState({ productPurchasing: null, ifPurchasing });
    this.addToShoppingCart(quantity, product._id);
  };

  addToShoppingCart(quantity, product_id) {
    const product = getProductsById(product_id);
    let item = {
      quantity: quantity,
      _id: product_id,
      image: product.image,
      description: product.description,
      name: product.name,
      price: product.price,
    };
    const shoppingCartItems = [...this.state.shoppingCartItems];
    shoppingCartItems.push(item);
    this.setState({ shoppingCartItems });
  }

  onDelete = (item) => {
    const shoppingCartItems = this.state.shoppingCartItems.filter(
      (i) => i._id != item._id
    );
    console.log(shoppingCartItems);
    this.setState({ shoppingCartItems });
  };

  onClear = () => {
    const shoppingCartItems = [];
    this.setState({ shoppingCartItems });
  };

  onPlaceOrder = () => {};

  onAddOne = (item) => {
    let quantity = parseInt(item.quantity);
    quantity += 1;
    item.quantity = quantity;
    let shoppingCartItems = this.state.shoppingCartItems.filter(
      (i) => i._id != item._id
    );
    shoppingCartItems.push(item);
    this.setState({ shoppingCartItems });
  };

  onRemoveOne = (item) => {
    let quantity = parseInt(item.quantity);
    quantity += 1;
    item.quantity = quantity;
    let shoppingCartItems = this.state.shoppingCartItems.filter(
      (i) => i._id != item._id
    );
    shoppingCartItems.push(item);
    this.setState({ shoppingCartItems });
  };

  calculateTotal = (items) => {
    let total = 0;
    items.forEach((item) => {
      total += item.price * item.quantity;
    });
    return total;
  };

  calculateSubTotal = (item) => {
    let subTotal = 0;
    subTotal = item.price * item.quantity;
    return subTotal;
  };

  render() {
    let { products, productPurchasing, ifPurchasing, shoppingCartItems } =
      this.state;
    return (
      <div>
        <Container className="mt-3">
          <Tabs
            defaultActiveKey="products"
            id="uncontrolled-tab-example"
            className="mb-3"
          >
            <Tab eventKey="products" title="Products">
              <Products
                products={products}
                onPurchase={this.onPurchase}
                productPurchasing={productPurchasing}
                ifPurchasing={ifPurchasing}
                onCancelPurchase={this.onCancelPurchase}
                onMakePurchase={this.onMakePurchase}
              />
            </Tab>
            <Tab eventKey="shoppingCart" title="Shopping Cart">
              <ShoppingCart
                shoppingCartItems={shoppingCartItems}
                calculateTotal={this.calculateTotal}
                calculateSubTotal={this.calculateSubTotal}
                onDelete={this.onDelete}
                onClear={this.onClear}
                onPlaceOrder={this.onPlaceOrder}
                onAddOne={this.onAddOne}
              />
            </Tab>
          </Tabs>
        </Container>
      </div>
    );
  }
}

export default Shopping;
