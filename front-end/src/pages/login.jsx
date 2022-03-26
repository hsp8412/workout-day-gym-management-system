import React, { Component } from "react";
import LoginForm from "../components/loginForm";

class Login extends Component {
  state = {};

  handleSubmit = (email, password, rememberMe) => {
    console.log(email);
    console.log(password);
    console.log(rememberMe);
  };

  render() {
    return <LoginForm onSubmit={this.handleSubmit} />;
  }
}

export default Login;
