import React from "react";
import { Col, Row } from "react-bootstrap";

const ShoppingCartCard = ({
  item,
  calculateSubTotal,
  onDelete,
  onAddOne,
  onRemoveOne,
}) => {
  return (
    <div className="d-flex mt-3 mb-3 justify-content-center">
      <div className="card" style={{ width: "50rem" }}>
        <h5 className="card-header">{item.name}</h5>
        <div className="card-body d-flex justify-content-center">
          <Row className="container-fluid">
            <Col xs={3} className="d-flex justify-content-center">
              <img
                src={item.image}
                className="mx-auto"
                alt="..."
                style={{ height: "10rem" }}
              />
            </Col>
            <Col className="d-flex container-fluid">
              <div className="d-flex align-items-start flex-column container-fluid">
                <p>{item.description}</p>
                <p className="d-inline-block">Quantity: {item.quantity}</p>
                <p className="d-inline-block">
                  Subtotal: {calculateSubTotal(item)}
                </p>
                <div>
                  <button
                    type="button"
                    className="btn btn-warning mx-2"
                    onClick={() => onAddOne(item)}
                  >
                    +
                  </button>
                  <button
                    type="button"
                    className="btn btn-warning mx-2"
                    onClick={() => onRemoveOne(item)}
                  >
                    -
                  </button>
                </div>
              </div>
              <div className="align-self-end block">
                <a
                  href="#"
                  className="btn btn-danger mt-2"
                  onClick={() => onDelete(item)}
                >
                  Delete
                </a>
              </div>
            </Col>
          </Row>
        </div>
      </div>
    </div>
  );
};

export default ShoppingCartCard;
