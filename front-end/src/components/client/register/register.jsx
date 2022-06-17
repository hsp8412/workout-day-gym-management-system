import React, { Component, useState } from "react";
import { Container } from "react-bootstrap";
import { useFormik } from "formik";
import * as Yup from "yup";
import { First } from "react-bootstrap/PageItem";
import axios from "axios";
import { useNavigate } from "react-router-dom";

const Register = () => {
  const navigate = useNavigate();
  const formik = useFormik({
    initialValues: {
      email: "",
      password: "",
      confirmPassword: "",
      firstName: "",
      lastName: "",
      phoneNumber: "",
      gender: "",
    },
    onSubmit: async (values) => {
      const { firstName, lastName, gender, phoneNumber, email, password } =
        values;
      const result = await axios.post("http://localhost:4000/customer", {
        firstName,
        lastName,
        phoneNumber,
        email,
        password,
        gender,
      });
      console.log(result);
      navigate("/login");
    },
    validationSchema: Yup.object({
      firstName: Yup.string()
        .max(30, "The first name is too long")
        .required("Firstname is required"),
      lastName: Yup.string()
        .max(30, "The last name is too long")
        .required("Lastname is required"),
      phoneNumber: Yup.string()
        .max(10, "Ten characters required")
        .min(10, "Ten characters required")
        .required("Phone number is required"),
      gender: Yup.string()
        .max(9, "Too long")
        .required("Phone number is required"),
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
    validateOnBlur: true,
    validateOnChange: false,
  });

  return (
    <div className="mb-5">
      <Container className="row justify-content-center">
        <div className="card mt-5" style={{ width: "40rem" }}>
          <div className="card-body">
            <h3 className="card-title">Register</h3>
            <form>
              <div className="row">
                <div className="col">
                  <label htmlFor="exampleInputEmail1">First name</label>
                  <input
                    type="text"
                    className="form-control"
                    placeholder="First name"
                    name="firstName"
                    value={formik.values.firstName}
                    onChange={formik.handleChange}
                  />
                  <p className="text-danger">
                    {formik.errors.firstName ? formik.errors.firstName : null}
                  </p>
                </div>
                <div className="col">
                  <label htmlFor="exampleInputEmail1">Last name</label>
                  <input
                    type="text"
                    className="form-control"
                    placeholder="Last name"
                    name="lastName"
                    value={formik.values.lastName}
                    onChange={formik.handleChange}
                  />
                  <p className="text-danger">
                    {formik.errors.lastName ? formik.errors.lastName : null}
                  </p>
                </div>
              </div>
              <div className="row mt-3">
                <div className="col">
                  <label htmlFor="exampleInputEmail1">Phone number</label>
                  <input
                    type="text"
                    className="form-control"
                    placeholder="Phone number"
                    name="phoneNumber"
                    value={formik.values.phoneNumber}
                    onChange={formik.handleChange}
                  />
                  <p className="text-danger">
                    {formik.errors.phoneNumber
                      ? formik.errors.phoneNumber
                      : null}
                  </p>
                </div>
                <div className="col">
                  <label htmlFor="exampleInputEmail1">Gender</label>
                  <input
                    type="text"
                    className="form-control"
                    placeholder="Gender"
                    name="gender"
                    value={formik.values.gender}
                    onChange={formik.handleChange}
                  />
                  <p className="text-danger">
                    {formik.errors.gender ? formik.errors.gender : null}
                  </p>
                </div>
              </div>
              <div className="form-group mt-3">
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
              <div className="form-group mt-3">
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
              <div className="form-group mt-3">
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
