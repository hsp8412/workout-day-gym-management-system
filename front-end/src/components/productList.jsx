import React, { Component } from "react";
import ProductCard from "./productCard";
import _ from "lodash";
import { Container, Row } from "react-bootstrap";

const ProductList = (props) => {
  const products = _.chunk(props.products, 3);
  return (
    <Container className="mt-3">
      {products.map((productRow, index) => (
        <Row key={index}>
          {productRow.map((product) => (
            <ProductCard
              id={product.id}
              product={product}
              onPurchase={props.onPurchase}
            />
          ))}
        </Row>
      ))}
    </Container>
  );
};

export default ProductList;
