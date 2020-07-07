import React, { Component } from "react";

const Searchbar = ({ name, value, onChange }) => {
  return (
    <input
      className="form-control mr-sm-4 mb-4"
      type={name}
      placeholder="Search"
      aria-label="Search"
      name={name}
      value={value}
      onChange={(e) => onChange(e.currentTarget.value)}
    />
  );
};

export default Searchbar;
