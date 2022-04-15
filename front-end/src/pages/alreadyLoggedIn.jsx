import React from "react";

const AlreadyLoggedIn = ({ onLogOut }) => {
  return (
    <div className="d-flex justify-content-center mt-3">
      <h1>You have already logged in.</h1>
      <button
        type="button"
        className="btn btn-primary btn-lg"
        onClick={onLogOut}
      >
        Log out
      </button>
    </div>
  );
};

export default AlreadyLoggedIn;
