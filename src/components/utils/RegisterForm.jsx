import React from "react";
import Form from "../common/Form";
import Joi from "joi-browser";
import { registerUsers } from "../../services/users";

export class RegisterForm extends Form {
  state = {
    data: { username: "", email: "", password: "" },
    errors: {},
  };

  schema = {
    username: Joi.string().required().label("Username"),
    email: Joi.string().email(),
    password: Joi.string().min(5).required().label("Password"),
  };

  doSubmit = async () => {
    try {
      const { data } = await registerUsers(this.state.data);
      localStorage.setItem("token", data["token"]);
      // this.props.history.push("/movies"); This won't refresh the page
      window.location = "/";
    } catch (ex) {
      if (ex.response && ex.response.status === 400) {
        const errors = { ...this.state.errors };
        errors.username = ex.response.data.username;
        errors.email = ex.response.data.email;
        this.setState({ errors });
      }
    }
  };

  render() {
    return (
      <div className="col-md-6 m-auto">
        <div className="card">
          <h5 className="card-header">Register</h5>
          <div className="card-body">
            <form onSubmit={this.handleSubmit}>
              {this.renderInputField("username", "Username", "username")}
              {this.renderInputField("email", "Email", "email")}
              {this.renderInputField("password", "Password", "password")}
              {/* {this.renderInputField("name", "Name")} */}
              {this.renderButton("Register")}
            </form>
          </div>
        </div>
      </div>
    );
  }
}

export default RegisterForm;
