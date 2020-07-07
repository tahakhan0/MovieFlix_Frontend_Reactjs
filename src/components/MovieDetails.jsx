import React, { Component } from "react";

export class MovieDetails extends Component {
  handleClick = () => {
    return this.props.history.replace("/movies");
  };

  render() {
    console.log(this.props.match.params);
    return (
      <div>
        <h1>Movie Details {this.props.match.params.id}</h1>
        <button onClick={this.handleClick} className="btn btn-primary btn-md">
          Save
        </button>
      </div>
    );
  }
}

export default MovieDetails;
