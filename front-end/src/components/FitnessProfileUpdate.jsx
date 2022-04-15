import React from "react";
import { Button, Modal } from "react-bootstrap";
import { useFormik } from "formik";
import * as Yup from "yup";
import { getFitnessProfileById } from "../services/fitnessProfiles";

const FitnessProfileUpdate = ({ isVisible, onClose, onSubmitUpdate }) => {
  const member_id = 1;
  const formik = useFormik({
    initialValues: {
      weight: getFitnessProfileById(member_id).weight,
      height: getFitnessProfileById(member_id).height,
      BFP: getFitnessProfileById(member_id).BFP,
      BMI: getFitnessProfileById(member_id).BMI,
    },
    onSubmit: (values) => {
      onSubmitUpdate(values);
    },
    validationSchema: Yup.object({
      weight: Yup.number()
        .max(700, "Please enter the correct weight.")
        .min(1, "Please enter the correct weight.")
        .required(),
      height: Yup.number()
        .max(250, "Please enter the correct height.")
        .min(1, "Please enter the correct height.")
        .required(),
      BFP: Yup.number()
        .max(50, "Please enter the correct BFP.")
        .min(1, "Please enter the correct BFP.")
        .required(),
      BMI: Yup.number()
        .max(50, "Please enter the correct BMI.")
        .min(1, "Please enter the correct BMI.")
        .required(),
    }),
  });

  return (
    <div>
      <form>
        <Modal show={isVisible} onHide={onClose}>
          <Modal.Header closeButton>
            <Modal.Title>Update Profile</Modal.Title>
          </Modal.Header>
          <Modal.Body>
            <div className="mb-3">
              <label htmlFor="exampleInputEmail1" className="form-label">
                Weight(kg)
              </label>
              <input
                type="number"
                className="form-control"
                id="weight"
                name="weight"
                step="0.1"
                aria-describedby="weightHelp"
                value={formik.values.weight}
                onChange={formik.handleChange}
              />
              <p className="text-danger">
                {formik.errors.weight ? formik.errors.weight : null}
              </p>
            </div>
            <div className="mb-3">
              <label htmlFor="exampleInputPassword1" className="form-label">
                Height(cm)
              </label>
              <input
                type="number"
                className="form-control"
                id="height"
                name="height"
                step="0.1"
                aria-describedby="heightHelp"
                value={formik.values.height}
                onChange={formik.handleChange}
              />
              <p className="text-danger">
                {formik.errors.height ? formik.errors.height : null}
              </p>
            </div>
            <div className="mb-3">
              <label htmlFor="exampleInputPassword1" className="form-label">
                BFP
              </label>
              <input
                type="number"
                className="form-control"
                id="BFP"
                name="BFP"
                step="0.1"
                aria-describedby="BFPHelp"
                value={formik.values.BFP}
                onChange={formik.handleChange}
              />
              <p className="text-danger">
                {formik.errors.BFP ? formik.errors.BFP : null}
              </p>
            </div>
            <div className="mb-3">
              <label htmlFor="exampleInputPassword1" className="form-label">
                BMI
              </label>
              <input
                type="number"
                className="form-control"
                id="BMI"
                name="BMI"
                step="0.1"
                aria-describedby="BMIHelp"
                value={formik.values.BMI}
                onChange={formik.handleChange}
              />
              <p className="text-danger">
                {formik.errors.BMI ? formik.errors.BMI : null}
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

export default FitnessProfileUpdate;
