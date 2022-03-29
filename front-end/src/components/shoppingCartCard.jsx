import React from "react";
import { Col, Row } from "react-bootstrap";

const ShoppingCartCard = (props) => {
  return (
    <div className="d-flex mt-3 mb-3 justify-content-center">
      <div className="card" style={{ width: "50rem" }}>
        <h5 className="card-header">{props.item.name}</h5>
        <div className="card-body d-flex justify-content-center">
          <Row className="container-fluid">
            <Col xs={3} className="d-flex justify-content-center">
              <img
                src={props.item.image}
                className="mx-auto"
                alt="..."
                style={{ height: "10rem" }}
              />
            </Col>
            <Col className="d-flex container-fluid">
              <div className="d-flex align-items-start flex-column container-fluid">
                <p>{props.item.description}</p>
                <p className="d-inline-block">
                  Quantity: {props.item.quantity}
                </p>
              </div>
              <a href="#" className="btn btn-danger align-self-end block">
                Delete
              </a>
            </Col>
          </Row>
        </div>
      </div>
    </div>
  );
};

export default ShoppingCartCard;
