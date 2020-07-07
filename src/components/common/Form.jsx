import React, { Component } from "react";
import Joi from "joi-browser";
import FormInputField from "./FormInputField";
import Select from "./select";

export class Form extends Component {
  state = {
    data: {},
    errors: {},
  };
  validate = () => {
    // const errors = {};
    const { data } = this.state;
    const options = { abortEarly: false };
    const { error } = Joi.validate(data, this.schema, options);
    // ^ using object destructuring to get errors from Joi
    // console.log(error, "error is here");
    if (!error) return null;

    const errors = {};
    for (let item of error.details) {
      errors[item.path[0]] = [item.message];
    }
    return errors;

    // Not using the code below as we have switched to joi for authentication
    // if (data.username.trim() === "") {
    //   errors.username = "Username is required";
    // }
    // if (data.password.trim() === "") {
    //   errors.password = "Password is required";
    // }

    // return Object.keys(errors).length === 0 ? null : errors;
  };
  validateProperty = ({ name, value }) => {
    // Using Joi to validate errors. Note we handle errors for one error at a time.
    const obj = { [name]: value }; //Here the name property is set dynamically therefore it uses []

    //A local schema is needed because we dont' need the complete
    // schema to handle this error. If we this.schema, it will evaluate errors for all inputs and we dont't need that
    const localSchema = { [name]: this.schema[name] };
    // console.log(localSchema, "localschema");
    const { error } = Joi.validate(obj, localSchema);
    return error ? error.details[0].message : null;
    // The below function handles errors as they're being changed. note this doesn't use JOi
    // if (name === "username") {
    //   if (value.trim() === "") {
    //     return "Username is required from validateProperty";
    //   }
    // }
    // if (name === "password") {
    //   if (value.trim() === "") {
    //     return "Password is required from validateProperty";
    //   }
    // }
  };
  handleSubmit = (e) => {
    // This method is used to prevent the default action on
    // submitting a form. It doesn't allow a full page refresh
    e.preventDefault();

    const errors = this.validate();
    // console.log(errors);
    this.setState({ errors: errors || {} });
    // console.log(this.state.errors, "SOMEERROR");
    if (errors) return;

    this.doSubmit();
  };
  handleChange = ({ currentTarget: input }) => {
    // Note: currentTarget has an alias called as input

    // Here "e" is the event that is being accessed.
    // CurrentTarget is a property of event
    // It can be any variable, it doesn't have to be e
    const data = { ...this.state.data };
    const errors = { ...this.state.errors };
    const errorMessage = this.validateProperty(input);
    // console.log(errors);
    if (errorMessage) errors[input.name] = errorMessage;
    else delete errors[input.name];
    // data[e.currentTarget.name] = e.currentTarget.value;
    // Instead of above, we can use object destructing to do the following
    data[input.name] = input.value;
    this.setState({ data, errors });
    // data["username"] =
  };

  renderButton(label) {
    return (
      <button disabled={this.validate()} className="btn btn-primary">
        {label}
      </button>
    );
  }

  renderInputField(name, label, type = "text") {
    const { data, errors } = this.state;

    return (
      <FormInputField
        type={type}
        value={data[name]}
        name={name}
        label={label}
        handleChangeFunction={this.handleChange}
        error={errors[name]}
      />
    );
  }

  renderSelect(name, label, options) {
    const { data, errors } = this.state;
    return (
      <Select
        name={name}
        value={data[name]}
        label={label}
        options={options}
        handleChangeFunction={this.handleChange}
        error={errors[name]}
      />
    );
  }
}

export default Form;
