import React from "react";
import { useNavigate } from "react-router-dom";
import { Container, Row } from "react-bootstrap";

function handleLogOut(navigate) {
  localStorage.clear();
  window.location.reload();
}

const AlreadyLoggedIn = ({}) => {
  const navigate = useNavigate();
  return (
    <div>
      <Container>
        <div className="d-flex justify-content-center mt-3">
          <h1>You have already logged in.</h1>
        </div>
        <div className="d-flex justify-content-center mt-3">
          <button
            type="button"
            className="btn btn-primary btn-lg"
            onClick={() => handleLogOut(navigate)}
          >
            Log out
          </button>
        </div>
      </Container>
    </div>
  );
};

export default AlreadyLoggedIn;
