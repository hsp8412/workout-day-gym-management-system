import React from "react";
import { Col, Container, Row } from "react-bootstrap";

const ProfileCard = (props) => {
  return (
    <div>
      <Container className="d-flex flex-column justify-content-center">
        <div className="card align-self-center mt-4" style={{ width: "50rem" }}>
          <div className="card-body">
            <Row className="d-flex">
              <Col className="d-flex flex-column">
                <img
                  src="avatar.jpeg"
                  style={{ width: "20rem", height: "15rem" }}
                />
                <p className="align-self-center mt-2 mb-0">Name: Li Junyi</p>
                <p className="align-self-center mb-0">Member Id: 2333333333</p>
              </Col>
              <Col
                className="container-fluid d-flex flex-column"
                style={{ height: "100%" }}
              >
                <p>Gender: Male</p>
                <p>Weight: 74 kg </p>
                <p>Height: 173 cm</p>
                <p>BFP: 21 %</p>
                <p>BMI: 24.7</p>
                <p>Latest update: 2021-3-30</p>
                <button
                  type="button"
                  className="btn btn-outline-primary align-self-end"
                >
                  Update
                </button>
              </Col>
            </Row>
          </div>
        </div>
      </Container>
    </div>
  );
};

export default ProfileCard;
