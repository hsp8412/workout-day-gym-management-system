import React, { Component } from "react";
import LoginForm from "../components/loginForm";
import axios from "axios";
import InvalidCredential from "../components/invalidCredential";

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
        console.log(res.headers.data);
        console.log(res.headers.data["x-token"]);
        console.log(email);
        console.log(password);
      })
      .catch(() => {
        console.log("Invalid credential");
        console.log(email);
        console.log(password);
        this.setState({ invalidCredential: true });
      });
  };

  render() {
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

export default Login;
