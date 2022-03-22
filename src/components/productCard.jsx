import React, { Component } from "react";
import { Card, Button, Col } from "react-bootstrap";
const ProductCard = (props) => {
  return (
    <Col>
      <Card style={{ width: "18rem", height: "30rem" }}>
        <Card.Img variant="top" src={props.product.image} />
        <Card.Body className="d-flex flex-column ">
          <Card.Title>{props.product.name}</Card.Title>
          <Card.Text>{props.product.description}</Card.Text>
          <Button className="mt-auto" variant="primary">
            Add To Cart
          </Button>
        </Card.Body>
      </Card>
    </Col>
  );
};

export default ProductCard;
