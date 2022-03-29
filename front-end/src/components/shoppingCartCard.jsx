import React from "react";
import { Col, Row } from "react-bootstrap";

const ShoppingCartCard = (props) => {
  return (
    <div className="d-flex mt-3 mb-3">
      <div className="card mx-auto">
        <h5 className="card-header">{props.order.name}</h5>
        <div className="card-body justify-content-center d-flex">
          <Row>
            <Col className="flex-column" md="auto">
              <img
                src={props.order.image}
                className="mx-auto"
                alt="..."
                style={{ height: "15rem" }}
              />
            </Col>
            <Col>
              <h5 className="card-title"></h5>
              <p className="card-text">
                With supporting text below as a natural lead-in to additional
                content.
              </p>
              <a href="#" className="btn btn-primary">
                Go somewhere
              </a>
            </Col>
          </Row>
        </div>
      </div>
    </div>
  );
};

export default ShoppingCartCard;
