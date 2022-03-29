import React from "react";

function calculateTotal(order) {
  let total = 0;
  order.products.forEach((product) => {
    total += product.price * product.quantity;
  });
  return total;
}

const OrderCard = (props) => {
  return (
    <div className="card my-3 " style={{ width: "40rem" }}>
      <div className="card-body">
        <h5 className="card-title">Products: </h5>
        <p className="card-text">
          {props.order.products.map((product) => (
            <p>
              {product.name} *{product.quantity}
            </p>
          ))}
        </p>
        <p>Total: {calculateTotal(props.order)}</p>
        <p>Date: {props.order.createDate.toString()}</p>
        <a href="#" className="btn btn-primary">
          Cancel the Order
        </a>
      </div>
    </div>
  );
};

export default OrderCard;
