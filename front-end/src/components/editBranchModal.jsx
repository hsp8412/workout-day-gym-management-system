import React from "react";
import { Button, Modal } from "react-bootstrap";
import { useFormik } from "formik";
import * as Yup from "yup";

const EditBranch = ({ isVisible, onClose, branchEditing, onSubmitUpdate }) => {
  console.log(branchEditing);
  const formik = useFormik({
    initialValues: {
      name: branchEditing.name,
      yearlyProfit: branchEditing.yearlyProfit,
      location: branchEditing.location,
      numberOfMembers: branchEditing.numberOfMembers,
    },
    onSubmit: (values) => {
      onSubmitUpdate(values);
    },
    validationSchema: Yup.object({
      name: Yup.string().max(50, "Name is too long.").required(),
      yearlyProfit: Yup.number().required(),
      location: Yup.string().max(50, "Location too long.").required(),
      numberOfMembers: Yup.number()
        .max(10000, "Please enter the correct number of members.")
        .required(),
    }),
    validateOnChange: false,
    validateOnBlur: true,
    enableReinitialize: true,
  });
  return (
    <div>
      <form>
        <Modal show={isVisible} onHide={onClose}>
          <Modal.Header closeButton>
            <Modal.Title>Update Branch</Modal.Title>
          </Modal.Header>
          <Modal.Body>
            <div className="mb-3">
              <label htmlFor="exampleInputEmail1" className="form-label">
                Name
              </label>
              <input
                type="text"
                className="form-control"
                id="weight"
                name="name"
                value={formik.values.name}
                onChange={formik.handleChange}
              />
              <p className="text-danger">
                {formik.errors.name ? formik.errors.name : null}
              </p>
            </div>
            <div className="mb-3">
              <label htmlFor="exampleInputPassword1" className="form-label">
                Yearly Profit
              </label>
              <input
                type="number"
                className="form-control"
                id="height"
                name="yearlyProfit"
                aria-describedby="heightHelp"
                value={formik.values.yearlyProfit}
                onChange={formik.handleChange}
              />
              <p className="text-danger">
                {formik.errors.yearlyProfit ? formik.errors.yearlyProfit : null}
              </p>
            </div>
            <div className="mb-3">
              <label htmlFor="exampleInputPassword1" className="form-label">
                Location
              </label>
              <input
                type="text"
                className="form-control"
                id="BFP"
                name="location"
                aria-describedby="BFPHelp"
                value={formik.values.location}
                onChange={formik.handleChange}
              />
              <p className="text-danger">
                {formik.errors.location ? formik.errors.location : null}
              </p>
            </div>
            <div className="mb-3">
              <label htmlFor="exampleInputPassword1" className="form-label">
                Number of members
              </label>
              <input
                type="number"
                className="form-control"
                id="BMI"
                name="numberOfMembers"
                aria-describedby="BMIHelp"
                value={formik.values.numberOfMembers}
                onChange={formik.handleChange}
              />
              <p className="text-danger">
                {formik.errors.numberOfMembers
                  ? formik.errors.numberOfMembers
                  : null}
              </p>
            </div>
          </Modal.Body>
          <Modal.Footer>
            <Button variant="secondary" onClick={onClose}>
              Close
            </Button>
            <Button
              variant="primary"
              type="submit"
              onClick={formik.handleSubmit}
            >
              Save Changes
            </Button>
          </Modal.Footer>
        </Modal>
      </form>
    </div>
  );
};

export default EditBranch;
