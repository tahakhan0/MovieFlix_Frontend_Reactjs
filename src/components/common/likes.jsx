import React from "react";

const likes = (props) => {
  let classes = "fa fa-heart";
  if (!props.liked) classes += "-o";
  return (
    <i onClick={props.likeToggled} className={classes} aria-hidden="true"></i>
  );
};

export default likes;
