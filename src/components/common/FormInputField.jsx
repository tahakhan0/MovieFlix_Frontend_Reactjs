import React from "react";

const FormInputField = ({
  value,
  name,
  label,
  handleChangeFunction,
  error,
  type,
}) => {
  // if using props do this ===> const { value, name, label, handleChangeFunction, error } = props;
  return (
    <div className="form-group">
      <label htmlFor={name}>{label}</label>
      <input
        value={value}
        onChange={handleChangeFunction}
        id={name}
        name={name}
        type={type}
        className="form-control"
      />
      {error && <div className="alert alert-danger">{error}</div>}
    </div>
  );
};

export default FormInputField;
