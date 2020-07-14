import React from "react";
import Joi from "joi-browser";
import Form from "../common/Form";
import { loginUsers, getCurrentUser } from "../../services/users";
import { Redirect } from "react-router-dom";

export class LoginForm extends Form {
  state = {
    data: { username: "", password: "" },
    errors: {},
  };

  schema = {
    username: Joi.string().required().label("Username"),
    password: Joi.string().required().label("Password"),
  };

  doSubmit = async () => {
    try {
      await loginUsers(this.state.data);
      const { state } = this.props.location;
      window.location = state ? state.from.pathname : "/";
    } catch (ex) {
      if (ex.response && ex.response.status === 400) {
        const errors = { ...this.state.errors };
        errors.username = ex.response.data.non_field_errors;
        this.setState({ errors });
      }
    }
  };

  render() {
    if (getCurrentUser()) return <Redirect to="/" />;

    return (
      <div className="col-md-6 m-auto">
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
