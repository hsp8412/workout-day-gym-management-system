import React, { useState } from "react";
import { useFormik } from "formik";
import * as Yup from "yup";
import { Container } from "react-bootstrap";
import InvalidCredential from "../client/login/invalidCredential";
import http from "../../services/httpService";

const MyComponent = () => {
  const [invalidCredentialVisibility, setInvalidCredentialVisibility] =
    useState(false);
  const formik = useFormik({
    initialValues: {
      username: "",
      password: "",
    },
    onSubmit: async (values) => {
      const username = values.username;
      const password = values.password;
      console.log(values);
      await http
        .post(`http://localhost:4000/executiveLogin`, {
          username,
          password,
        })
        .then((res) => {
          console.log();
          localStorage.setItem("eToken", res.data.token);
          localStorage.setItem("eId", res.data.id);
          window.location.reload();
        })
        .catch(() => {
          setInvalidCredentialVisibility(true);
        });
    },
    validationSchema: Yup.object({
      username: Yup.string().required("Username is required."),
      password: Yup.string().required("Password is required."),
    }),
    validateOnChange: false,
    validateOnBlur: true,
  });
  return (
    <div className="mt-3">
      <Container className="px-5">
        <h3 className="mb-3">Login as executive manager</h3>
        <form onSubmit={formik.handleSubmit}>
          <div className="mb-3">
            <label htmlFor="exampleInputEmail1" className="form-label">
              Username
            </label>
            <input
              type="text"
              className="form-control"
              id="exampleInputEmail1"
              aria-describedby="emailHelp"
              name="username"
              value={formik.values.username}
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
          <button type="submit" className="btn btn-primary">
            Submit
          </button>
        </form>
      </Container>
      <InvalidCredential
        ifVisible={invalidCredentialVisibility}
        onClose={() => setInvalidCredentialVisibility(false)}
      />
    </div>
  );
};

export default MyComponent;
