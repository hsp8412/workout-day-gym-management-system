import React, { Component } from "react";
import LoginForm from "../components/loginForm";
import axios from "axios";
import InvalidCredential from "../components/invalidCredential";
import AlreadyLoggedIn from "./alreadyLoggedIn";

class Login extends Component {
  state = { invalidCredential: false };

  handleInvalidClose = () => {
    this.setState({ invalidCredential: false });
  };

  handleSubmit = async (email, password, rememberMe) => {
    // console.log(email);
    // console.log(password);
    // console.log(rememberMe);
    await axios
      .post("http://localhost:4000/auth", { email, password })
      .then((res) => {
        localStorage.setItem("token", res.data.token);
      })
      .catch(() => {
        console.log("Invalid credential");
        console.log(email);
        console.log(password);
        this.setState({ invalidCredential: true });
      });
  };

  handleLogOut = () => {
    console.log("Hi");
    localStorage.clear();
  };

  render() {
    if (localStorage.getItem("token")) {
      return <AlreadyLoggedIn onLogOut={this.handleLogOut} />;
    } else {
      return (
        <div>
          <LoginForm onSubmit={this.handleSubmit} />
          <InvalidCredential
            ifVisible={this.state.invalidCredential}
            onClose={this.handleInvalidClose}
          />
        </div>
      );
    }
  }
}

export default Login;
