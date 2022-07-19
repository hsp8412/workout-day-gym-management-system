import React, { Component } from "react";
import { Modal, Button } from "react-bootstrap";
import { useFormik } from "formik";
import * as Yup from "yup";
const Purchase = ({
  product,
  ifPurchasing,
  onCancelPurchase,
  onMakePurchase,
  shoppingCartItems,
}) => {
  const formik = useFormik({
    initialValues: {
      quantity: "1",
    },
    onSubmit: (values) => {
      onMakePurchase(parseInt(values.quantity), product);
      values.quantity = 1;
    },
    validationSchema: Yup.object({
      quantity: Yup.number()
        .integer("The input quantity should be an integer.")
        .max(100, "The input quantity must be less than or equal to 100.")
        .min(1, "The input quantity must be greater than or equal to 1.")
        .test(
          "testOverload",
          "Exceeding quantity Limitation.",
          function testOverload(value) {
            let item = shoppingCartItems.find((item) => {
              return item._id == product._id;
            });
            if (item == null) {
              return true;
            } else {
              return parseInt(item.quantity) + parseInt(value) <= 100;
            }
          }
        )
        .required(),
    }),
  });

  function calculateTotal() {
    let value = 0;
    if (
      formik.values.quantity > 0 &&
      formik.values.quantity <= 100 &&
      ifPurchasing
    )
      value = formik.values.quantity * product.price;
    return value;
  }

  return (
    <Modal show={ifPurchasing} onHide={onCancelPurchase}>
      <Modal.Header closeButton>
        <Modal.Title>{ifPurchasing ? product.name : " "}</Modal.Title>
      </Modal.Header>
      <Modal.Body>
        {ifPurchasing ? product.description : " "}
        <div>
          <br />
          <p>Price: ${ifPurchasing ? product.price : " "}</p>
          <form>
            <div className="form-group">
              <label htmlFor="quantityInput">Quantity:</label>
              <input
                type="number"
                name="quantity"
                className="form-control mt-2"
                id="quantityInput"
                value={formik.values.quantity}
                onChange={formik.handleChange}
              />
              <p className="text-danger">
                {formik.errors.quantity ? formik.errors.quantity : null}
              </p>
            </div>
            <p className="mt-3">Total: ${calculateTotal()}</p>
            <div className="d-flex">
              <Button
                variant="primary"
                type="submit"
                onClick={formik.handleSubmit}
                className="mt-3"
              >
                Add To Cart
              </Button>
              <Button
                variant="secondary"
                onClick={() => onCancelPurchase()}
                className="mt-3 mx-4"
              >
                Cancel
              </Button>
            </div>
          </form>
        </div>
      </Modal.Body>
    </Modal>
  );
};

export default Purchase;
