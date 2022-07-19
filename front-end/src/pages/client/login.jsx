import React, { Component } from "react";
import LoginForm from "../../components/client/login/loginForm";
import InvalidCredential from "../../components/client/login/invalidCredential";
import AlreadyLoggedIn from "./alreadyLoggedIn";

class Login extends Component {
  state = { invalidCredential: false };

  handleInvalidClose = () => {
    this.setState({ invalidCredential: false });
  };

  handleInvalidCredential = () => {
    this.setState({ invalidCredential: true });
  };

  render() {
    if (localStorage.getItem("token")) {
      return <AlreadyLoggedIn />;
    } else {
      return (
        <div>
          <LoginForm onInvalidCredential={this.handleInvalidCredential} />
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
