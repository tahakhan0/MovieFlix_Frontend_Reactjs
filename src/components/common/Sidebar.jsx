import React from "react";

const Sidebar = (props) => {
  const {
    genreChoices,
    valueProperty,
    textProperty,
    onGenreSelect,
    selectedGenretype,
  } = props;
  return (
    <ul className="list-group">
      {genreChoices.map((genre) => (
        <li
          key={genre.pk}
          onClick={() => onGenreSelect(genre)}
          className={
            genre === selectedGenretype
              ? "list-group-item active"
              : "list-group-item"
          }
        >
          {genre[textProperty]}
        </li>
      ))}
    </ul>
  );
};

Sidebar.defaultProps = {
  textProperty: "name",
  valueProperty: "_id",
};

export default Sidebar;
