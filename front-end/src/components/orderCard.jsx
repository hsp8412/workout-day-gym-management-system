import React from "react";

function calculateTotal(order) {
  let total = 0;
  order.products.forEach((product) => {
    total += product.price * product.quantity;
  });
  return total;
}

const OrderCard = ({ onDelete, order }) => {
  return (
    <div className="card my-3 " style={{ width: "40rem" }}>
      <div className="card-body">
        <h5 className="card-title">Products: </h5>
        <div className="card-text">
          {order.products.map((product) => (
            <p>
              {product.name} *{product.quantity}
            </p>
          ))}
        </div>
        <p>Total: {calculateTotal(order)}</p>
        <p>Date: {order.createDate.toString()}</p>
        <a href="#" className="btn btn-primary" onClick={() => onDelete(order)}>
          Cancel the Order
        </a>
      </div>
    </div>
  );
};

export default OrderCard;
