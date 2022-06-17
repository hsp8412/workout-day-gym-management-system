import React, { Component } from "react";
import { Card, Button, Col } from "react-bootstrap";
import product from "../../../pages/manager/product";

const ProductCard = (props) => {
  function productType() {
    if (props.product.isCourse == true) {
      return "This product is a course.";
    } else if (props.product.isMeal == true) {
      return "This product is a meal.";
    } else {
      return "This product is a normal good.";
    }
  }

  return (
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
          <p className="card-text mt-auto">{productType()}</p>
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
