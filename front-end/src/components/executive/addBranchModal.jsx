import React from "react";
import { useFormik } from "formik";
import * as Yup from "yup";
import { Button, Modal } from "react-bootstrap";
import http from "../../services/httpService";

const AddBranch = ({ isVisible, onClose }) => {
  const uri = process.env.REACT_APP_API_ENDPOINT + "/branch";
  const formik = useFormik({
    initialValues: {
      location: "",
      numberOfMembers: 0,
      yearlyProfit: 0,
      managerId: "",
      name: "",
    },
    onSubmit: (values) => {
      const { location, numberOfMembers, yearlyProfit, managerId, name } =
        values;
      const data = { location, numberOfMembers, yearlyProfit, managerId, name };
      http.post(uri, data);
      onClose();
      window.location.reload();
    },
    validationSchema: Yup.object({
      location: Yup.string().max(70, "Location is too long").required(),
      numberOfMembers: Yup.number()
        .min(0, "Number of members should be bigger than 0")
        .required(),
      yearlyProfit: Yup.number()
        .min(0, "Yearly profit should be bigger than 0")
        .required(),
      managerId: Yup.string(),
      name: Yup.string().max(50, "Name is too long"),
    }),
    validateOnBlur: true,
    validateOnChange: false,
    enableReinitialize: true,
  });

  return (
    <div>
      <form>
        <Modal show={isVisible} onHide={onClose}>
          <Modal.Header closeButton>
            <Modal.Title>Add new branch</Modal.Title>
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
                aria-describedby="weightHelp"
                value={formik.values.name}
                onChange={formik.handleChange}
              />
              <p className="text-danger">
                {formik.errors.name ? formik.errors.name : null}
              </p>
            </div>
            <div className="mb-3">
              <label htmlFor="exampleInputPassword1" className="form-label">
                Location
              </label>
              <input
                type="text"
                className="form-control"
                id="height"
                name="location"
                aria-describedby="heightHelp"
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
                id="BFP"
                name="numberOfMembers"
                aria-describedby="BFPHelp"
                value={formik.values.numberOfMembers}
                onChange={formik.handleChange}
              />
              <p className="text-danger">
                {formik.errors.numberOfMembers
                  ? formik.errors.numberOfMembers
                  : null}
              </p>
            </div>
            <div className="mb-3">
              <label htmlFor="exampleInputPassword1" className="form-label">
                Yearly Profit
              </label>
              <input
                type="number"
                className="form-control"
                id="BMI"
                name="yearlyProfit"
                aria-describedby="BMIHelp"
                value={formik.values.yearlyProfit}
                onChange={formik.handleChange}
              />
              <p className="text-danger">
                {formik.errors.yearlyProfit ? formik.errors.yearlyProfit : null}
              </p>
            </div>
            <div className="mb-3">
              <label htmlFor="exampleInputPassword1" className="form-label">
                Manager ID
              </label>
              <input
                type="text"
                className="form-control"
                id="BMI"
                name="managerId"
                aria-describedby="BMIHelp"
                value={formik.values.managerId}
                onChange={formik.handleChange}
              />
              <p className="text-danger">
                {formik.errors.managerId ? formik.errors.managerId : null}
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
              Save
            </Button>
          </Modal.Footer>
        </Modal>
      </form>
    </div>
  );
};

export default AddBranch;
