import React, { Component } from "react";
import { Card, Button, Col } from "react-bootstrap";
const ProductCard = (props) => {
  return (
    // <Col>
    //   <Card
    //     className="d-flex justify-content-center"
    //     style={{ width: "18rem", height: "30rem" }}
    //   >
    //     <Card.Img
    //       variant="top"
    //       src={props.product.image}
    //       style={{ width: "15rem", height: "15rem" }}
    //     />
    //     <Card.Body className="d-flex flex-column">
    //       <Card.Title className="mt-auto">{props.product.name}</Card.Title>
    //       <Card.Text className="mt-auto">{props.product.description}</Card.Text>
    //       <Button className="mt-auto" variant="primary">
    //         Add To Cart
    //       </Button>
    //     </Card.Body>
    //   </Card>
    // </Col>
    <Col className="d-flex justify-content-center">
      <div className="card d-flex" style={{ width: "18rem", height: "30rem" }}>
        <img
          src={props.product.image}
          className="card-img-top mx-auto"
          alt="..."
          style={{ height: "15rem" }}
        />
        <div className="card-body d-flex flex-column">
          <h5 className="card-title mt-auto">{props.product.name}</h5>
          <p className="card-text mt-auto">{props.product.description}</p>
          <p className="card-text mt-auto">${props.product.price}</p>
          <a
            href="#"
            className="btn btn-primary mt-auto"
            onClick={() => props.onPurchase(props.product)}
          >
            Add To Cart
          </a>
        </div>
      </div>
    </Col>
  );
};

export default ProductCard;
