import React from "react";
import Joi from "joi-browser";
import Form from "../common/Form";

export class LoginForm extends Form {
  state = {
    data: { username: "", password: "" },
    errors: {},
  };

  schema = {
    username: Joi.string().required().label("Username"),
    password: Joi.string().required().label("Password"),
  };

  doSubmit = () => {
    console.log("Submitted");
    // this.props.history.replace("/movies");
  };

  render() {
    return (
      <div>
        <h1>Login</h1>
        <form onSubmit={this.handleSubmit}>
          {this.renderInputField("username", "Username")}
          {this.renderInputField("password", "Password", "password")}
          {this.renderButton("Log in")}
        </form>
      </div>
    );
  }
}

export default LoginForm;
