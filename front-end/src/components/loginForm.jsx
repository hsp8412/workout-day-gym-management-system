import React from "react";
import { useFormik } from "formik";
import * as Yup from "yup";
import { Container } from "react-bootstrap";
import { Link } from "react-router-dom";

const LoginForm = (props) => {
  const formik = useFormik({
    initialValues: {
      email: "",
      password: "",
      rememberMe: false,
    },
    onSubmit: (values) => {
      props.onSubmit(values.email, values.password, values.rememberMe);
    },
    validationSchema: Yup.object({
      email: Yup.string()
        .email("Please enter a valid email address.")
        .required("Email is required."),
      password: Yup.string("Password is required."),
      rememberMe: Yup.boolean(),
    }),
  });
  return (
    <div className="mt-3">
      <Container className="px-5">
        <form onSubmit={formik.handleSubmit}>
          <div className="mb-3">
            <label htmlFor="exampleInputEmail1" className="form-label">
              Email address
            </label>
            <input
              type="email"
              className="form-control"
              id="exampleInputEmail1"
              aria-describedby="emailHelp"
              name="email"
              value={formik.values.email}
              onChange={formik.handleChange}
            />
            <p className="text-danger">
              {formik.errors.email ? formik.errors.email : null}
            </p>
          </div>
          <div className="mb-3">
            <label htmlFor="exampleInputPassword1" className="form-label">
              Password
            </label>
            <input
              type="password"
              name="password"
              className="form-control"
              id="exampleInputPassword1"
              value={formik.values.password}
              onChange={formik.handleChange}
            />
            <p className="text-danger">
              {formik.errors.password ? formik.errors.password : null}
            </p>
          </div>
          <div className="mb-3 form-check">
            <input
              type="checkbox"
              name="rememberMe"
              className="form-check-input"
              id="exampleCheck1"
              checked={formik.values.rememberMe}
              onChange={formik.handleChange}
            />
            <label className="form-check-label" htmlFor="exampleCheck1">
              Remember me
            </label>
          </div>
          <button type="submit" className="btn btn-primary">
            Submit
          </button>
          <Link className="btn btn-primary mx-2" to="/register">
            Register
          </Link>
        </form>
      </Container>
    </div>
  );
};

export default LoginForm;
