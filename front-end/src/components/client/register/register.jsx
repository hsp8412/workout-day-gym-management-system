import React from "react";
import { Container } from "react-bootstrap";
import { useFormik } from "formik";
import * as Yup from "yup";
import axios from "axios";
import { useNavigate } from "react-router-dom";

const Register = () => {
  const FILE_SIZE = 5 * 1024 * 1024;
  const SUPPORTED_FORMATS = [
    "image/jpg",
    "image/jpeg",
    "image/gif",
    "image/png",
  ];

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
      image: null,
    },
    onSubmit: async (values) => {
      const {
        firstName,
        lastName,
        gender,
        phoneNumber,
        email,
        password,
        image,
      } = values;

      // const formData = new FormData();
      // formData.append("file", image);
      // formData.append("upload_preset", "Workout-day");
      //
      // const res = await axios.post(
      //   "https://api.cloudinary.com/v1_1/hesipeng/image/upload",
      //   formData
      // );
      //
      // const imgUrl = res.data.secure_url;
      // console.log(imgUrl);

      const result = await axios.post(process.env.REACT_APP_API_ENDPOINT + '/customer', {
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
      image: Yup.mixed()
        .required("A file is required")
        .test(
          "fileSize",
          "File too large",
          (value) => value && value.size <= FILE_SIZE
        )
        .test(
          "fileFormat",
          "Unsupported Format",
          (value) => value && SUPPORTED_FORMATS.includes(value.type)
        ),
    }),
    validateOnBlur: true,
    validateOnChange: true,
  });

  return (
    <div className="mb-5">
      <Container className="d-flex justify-content-center">
        <div className="card mt-5 register-card" style={{ width: "40rem" }}>
          <div className="card-body">
            <div className="d-flex align-items-center flex-column mb-3">
              <h3 className="card-title mb-3">Register</h3>
              {formik.values.image && !formik.errors.image ? (
                <img
                  src={URL.createObjectURL(formik.values.image)}
                  alt="avatar"
                  style={{ width: "80px", height: "80px", borderRadius: "50%" }}
                />
              ) : (
                <img src="/login.png" alt="avatar" style={{ width: "80px" }} />
              )}
            </div>
            <form>
              <div className="mb-3">
                <label htmlFor="formFile" className="form-label">
                  Upload your profile picture
                </label>
                <input
                  className="form-control"
                  type="file"
                  id="formFile"
                  onChange={(e) => {
                    formik.setFieldValue("image", e.currentTarget.files[0]);
                  }}
                />
                <p className="text-danger">
                  {formik.errors.image ? formik.errors.image : null}
                </p>
              </div>
              <div className="row">
                <div className="col-12 col-md-6">
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
                <div className="col-12 col-md-6">
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
                <div className="col-12 col-md-6">
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
                <div className="col-12 col-md-6">
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
