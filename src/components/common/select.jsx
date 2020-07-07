import React from "react";

const Select = ({
  options,
  value,
  name,
  label,
  handleChangeFunction,
  error,
}) => {
  // SOME COMMENT
  return (
    <div className="form-group">
      <label htmlFor={name}>{label}</label>
      <select
        className="form-control"
        id={name}
        name={name}
        value={value}
        onChange={handleChangeFunction}
      >
        <option value="" />
        {options.map((option) => (
          <option key={option.pk} value={option.pk}>
            {option.name}
          </option>
        ))}
      </select>
      {error && <div className="alert alert-danger">{error}</div>}
    </div>
  );
};

export default Select;
