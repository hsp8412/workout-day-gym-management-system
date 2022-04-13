import React, { Component } from "react";
import { Modal, Button } from "react-bootstrap";
import { useFormik } from "formik";
import * as Yup from "yup";
const Purchase = (props) => {
  const formik = useFormik({
    initialValues: {
      quantity: "1",
    },
    onSubmit: (values) => {
      props.onMakePurchase(values.quantity, props.product);
      values.quantity = 1;
    },
    validationSchema: Yup.object({
      quantity: Yup.number()
        .integer("The input quantity should be an integer.")
        .max(100, "The input quantity must be less than or equal to 100.")
        .min(1, "The input quantity must be greater than or equal to 1.")
        .required(),
    }),
  });

  function calculateTotal() {
    let value = 0;
    if (
      formik.values.quantity > 0 &&
      formik.values.quantity <= 100 &&
      props.ifPurchasing
    )
      value = formik.values.quantity * props.product.price;
    return value;
  }

  return (
    <Modal
      show={props.ifPurchasing ? true : false}
      onHide={props.onCancelPurchase}
    >
      <Modal.Header closeButton>
        <Modal.Title>
          {props.ifPurchasing ? props.product.name : " "}
        </Modal.Title>
      </Modal.Header>
      <Modal.Body>
        {props.ifPurchasing ? props.product.description : " "}
        <div>
          <br />
          <p>Price: ${props.ifPurchasing ? props.product.price : " "}</p>
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
                onClick={() => props.onCancelPurchase()}
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
