import React from "react";
import Form from "../common/Form";
import { getGenres } from "../../services/genreService";
import Joi from "joi-browser";
import { getMovie, saveMovie } from "../../services/movieService";

class NewMovies extends Form {
  state = {
    data: { title: "", genreId: "", numberInStock: "", dailyRentalRate: "" },
    errors: {},
    Genres: [],
  };

  schema = {
    id: Joi.number(),
    title: Joi.string().required().label("Title"),
    genreId: Joi.number().required().label("Genre"),
    numberInStock: Joi.number()
      .required()
      .min(0)
      .max(100)
      .label("Number in stock"),
    dailyRentalRate: Joi.number()
      .required()
      .min(0)
      .max(10)
      .label("Daily rental rate"),
  };

  async populateGenres() {
    const { data: Genres } = await getGenres();
    this.setState({ Genres });
  }

  async populateMovies() {
    try {
      const movieId = this.props.match.params.id;
      if (movieId === "new") return;

      const { data: movie } = await getMovie(movieId);
      this.setState({ data: this.mapToViewModel(movie) });
    } catch (ex) {
      if (ex.response && ex.response.status === 404) {
        this.props.history.replace("/not-found");
      }
    }
  }

  async componentDidMount() {
    await this.populateGenres();
    await this.populateMovies();
  }

  mapToViewModel(movie) {
    return {
      id: movie.id,
      title: movie.title,
      numberInStock: movie.numberInStock,
      dailyRentalRate: movie.dailyRentalRate,
      genreId: movie.genre,
    };
  }

  doSubmit = async () => {
    await saveMovie(this.state.data);
    this.props.history.push("/movies");
  };

  render() {
    const { Genres } = this.state;
    return (
      <div>
        <h1>Movie Form</h1>
        <form onSubmit={this.handleSubmit}>
          {this.renderInputField("title", "Title")}
          {this.renderSelect("genreId", "Genre", Genres)}
          {this.renderInputField("numberInStock", "Number", "number")}
          {this.renderInputField("dailyRentalRate", "Rate", "number")}
          {this.renderButton("Save")}
        </form>
      </div>
    );
  }
}

export default NewMovies;
