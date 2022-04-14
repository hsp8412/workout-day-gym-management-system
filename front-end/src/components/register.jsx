import React, { Component } from "react";
import { Container } from "react-bootstrap";
import { useFormik } from "formik";
import * as Yup from "yup";

const Register = () => {
  const formik = useFormik({
    initialValues: {
      email: "",
      password: "",
      confirmPassword: "",
    },
    onSubmit: (values) => {
      console.log(values.password, values.email);
    },
    validationSchema: Yup.object({
      email: Yup.string()
        .email("Please enter a valid email address.")
        .required("Email is required."),
      password: Yup.string()
        .required("Password is required.")
        .min(8, "The password should be at least 8 characters."),
      confirmPassword: Yup.string()
        .required("Please re-enter the password.")
        .oneOf([Yup.ref("password")], "Passwords do not match"),
    }),
  });

  return (
    <div>
      <Container className="row justify-content-center">
        <div className="card mt-5" style={{ width: "40rem" }}>
          <div className="card-body">
            <h3 className="card-title">Register</h3>
            <form>
              <div className="form-group mt-4">
                <label htmlFor="exampleInputEmail1">Email address</label>
                <input
                  type="email"
                  name="email"
                  className="form-control"
                  id="exampleInputEmail1"
                  placeholder="Email address"
                  aria-describedby="emailHelp"
                  value={formik.values.email}
                  onChange={formik.handleChange}
                />
                <p className="text-danger">
                  {formik.errors.email ? formik.errors.email : null}
                </p>
              </div>
              <div className="form-group mt-4">
                <label htmlFor="exampleInputPassword1">Password</label>
                <input
                  type="password"
                  name="password"
                  className="form-control"
                  id="exampleInputPassword1"
                  placeholder="Password"
                  value={formik.values.password}
                  onChange={formik.handleChange}
                />
                <p className="text-danger">
                  {formik.errors.password ? formik.errors.password : null}
                </p>
              </div>
              <div className="form-group mt-4">
                <label htmlFor="exampleInputPassword2">Confirm Password</label>
                <input
                  type="password"
                  name="confirmPassword"
                  className="form-control"
                  id="exampleInputPassword2"
                  placeholder="Confirm Password"
                  value={formik.values.confirmPassword}
                  onChange={formik.handleChange}
                />
                <p className="text-danger">
                  {formik.errors.confirmPassword
                    ? formik.errors.confirmPassword
                    : null}
                </p>
              </div>
              <button
                type="submit"
                className="btn btn-primary mt-4"
                onClick={formik.handleSubmit}
              >
                Register
              </button>
            </form>
          </div>
        </div>
      </Container>
    </div>
  );
};

export default Register;
