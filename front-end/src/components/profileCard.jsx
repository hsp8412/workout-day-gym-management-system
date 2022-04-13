import React from "react";
import { Col, Container, Row } from "react-bootstrap";
import { getProfileById } from "../services/profiles";
import {
  getFitnessProfile,
  getFitnessProfileById,
} from "../services/fitnessProfiles";

const ProfileCard = ({ onSubmitUpdate, onUpdate }) => {
  const profile = getProfileById(1);
  const fitnessProfile = getFitnessProfileById(1);
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
                <p className="align-self-center mb-0">
                  Member Id: {profile.member_id}
                </p>
              </Col>
              <Col
                className="container-fluid d-flex flex-column"
                style={{ height: "100%" }}
              >
                <p>Gender: {profile.gender}</p>
                <p>Weight: {fitnessProfile.weight} kg </p>
                <p>Height: {fitnessProfile.height} cm</p>
                <p>BFP: {fitnessProfile.BFP} %</p>
                <p>BMI: {fitnessProfile.BMI}</p>
                <p>
                  Latest update:{" "}
                  {fitnessProfile.updateDate.toLocaleDateString()}{" "}
                  {fitnessProfile.updateDate.toLocaleTimeString()}
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
