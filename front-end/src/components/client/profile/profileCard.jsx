import React from "react";
import { Col, Container, Row } from "react-bootstrap";

const ProfileCard = ({ onSubmitUpdate, onUpdate, profile }) => {
  if (profile == null) {
    return <div></div>;
  }
  console.log(profile);
  return (
    <div>
      <Container className="d-flex flex-column justify-content-center">
        <div className="card align-self-center mt-4" style={{ width: "50rem" }}>
          <div className="card-body">
            <Row className="d-flex">
              <Col className="d-flex flex-column">
                <img
                  src="avatar.jpeg"
                  style={{ width: "15rem", height: "15rem" }}
                  className="align-self-center"
                />
                <p className="align-self-center mt-2 mb-0">
                  Name: {profile.firstName} {profile.lastName}
                </p>
              </Col>
              <Col
                className="container-fluid d-flex flex-column"
                style={{ height: "100%" }}
              >
                <p>Gender: {profile.gender}</p>
                <p>
                  Weight:{" "}
                  {profile.fitnessProfile.weight != 0
                    ? profile.fitnessProfile.weight
                    : "no data"}{" "}
                  kg{" "}
                </p>
                <p>
                  Height:{" "}
                  {profile.fitnessProfile.height != 0
                    ? profile.fitnessProfile.height
                    : "no data"}{" "}
                  cm
                </p>
                <p>
                  BFP:{" "}
                  {profile.fitnessProfile.BFP != 0
                    ? profile.fitnessProfile.BFP
                    : "no data"}{" "}
                  %
                </p>
                <p>
                  BMI:{" "}
                  {profile.fitnessProfile.BMI != 0
                    ? profile.fitnessProfile.BMI
                    : "no data"}
                </p>
                <p>
                  Latest update:{" "}
                  {new Date(
                    profile.fitnessProfile.lastUpdateDate
                  ).toLocaleDateString()}{" "}
                  {new Date(
                    profile.fitnessProfile.lastUpdateDate
                  ).toLocaleTimeString()}
                </p>
                <button
                  type="button"
                  className="btn btn-outline-primary align-self-end"
                  onClick={onUpdate}
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
