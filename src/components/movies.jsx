import React, { Component, Fragment } from "react";
import { getMovies, deleteMovie } from "../services/movieService";
import Likes from "./common/likes";
import Pagination from "./common/Pagination";
import paginate from "./utils/paginate";
import Sidebar from "./common/Sidebar";
import { getGenres } from "../services/genreService.js";
import { Link } from "react-router-dom";
import Searchbar from "./common/Searchbar";
import { toast } from "react-toastify";

export class movies extends Component {
  state = {
    movies: [],
    genres: [],
    pageSize: 4,
    currentPage: 1,
    searchQuery: "",
    selectedGenre: null,
  };

  async componentDidMount() {
    const { data: movieData } = await getMovies();
    // console.log(movieData, "FROM HERE");
    const { data: genresData } = await getGenres();
    const genres = [{ pk: "", name: "All Genres" }, ...genresData];
    // console.log(genresData, "gernedata");
    this.setState({ movies: movieData, genres });
  }

  handleDelete = async (id) => {
    const originalStateOfMovies = this.state.movies;
    try {
      this.setState({
        movies: originalStateOfMovies.filter((movie) => movie.id !== id),
      });
      await deleteMovie(id);
    } catch (ex) {
      if (ex.response && ex.response.status === 404) {
        toast.error("Movie has already been deleted");
      }
      this.setState({ movies: originalStateOfMovies });
    }
  };

  handleLike = (movie) => {
    const movies = [...this.state.movies];
    const index = this.state.movies.indexOf(movie);
    movies[index] = { ...movies[index] };
    movies[index].liked = !movies[index].liked;
    this.setState({ movies });
  };

  handlePageChange = (page) => {
    this.setState({ currentPage: page });
  };

  handleGenreSelect = (genre) => {
    this.setState({ selectedGenre: genre, currentPage: 1 });
  };

  handleQuery = (query) => {
    this.setState({ searchQuery: query, selectedGenre: null, currentPage: 1 });
  };

  render() {
    const {
      movies: allMovies,
      currentPage,
      pageSize,
      selectedGenre,
      searchQuery,
    } = this.state;
    const { user } = this.props;
    if (allMovies.length === 0)
      return <p>There are no movies in the database</p>;

    let filteredMovies = allMovies;

    if (searchQuery)
      filteredMovies = allMovies.filter((movie) =>
        movie.title.toLowerCase().startsWith(searchQuery.toLowerCase())
      );
    else if (selectedGenre && selectedGenre.pk) {
      filteredMovies = allMovies.filter((m) => m.genre === selectedGenre.pk);
    }

    const movies = paginate(filteredMovies, currentPage, pageSize);

    return (
      <Fragment>
        <div className="row mt-2">
          <div className="col-3">
            <Sidebar
              genreChoices={this.state.genres}
              onGenreSelect={this.handleGenreSelect}
              selectedGenretype={this.state.selectedGenre}
            />
          </div>
          <div className="col">
            {user && (
              <Link to="/movies/new" className="btn btn-primary mb-2">
                New movie
              </Link>
            )}
            <p>Showing {filteredMovies.length} movies in the database</p>
            <Searchbar
              value={searchQuery}
              onChange={this.handleQuery}
              name="search"
            />
            <table className="table table-hover">
              <thead>
                <tr>
                  <th>Title</th>
                  <th>Genre</th>
                  <th>Stock</th>
                  <th>Rate</th>
                  <th></th>
                  <th></th>
                </tr>
              </thead>
              <tbody>
                {movies.map((movie) => (
                  <tr key={movie.id}>
                    <td>
                      <Link to={`/movies/${movie.id}`}>{movie.title}</Link>
                    </td>
                    <td>{movie.genreName}</td>
                    <td>{movie.numberInStock}</td>
                    <td>{movie.dailyRentalRate}</td>
                    <td>
                      <Likes
                        likeToggled={() => this.handleLike(movie)}
                        liked={movie.liked}
                      />
                    </td>
                    <td>
                      {user && user.is_superuser && (
                        <button
                          onClick={() => this.handleDelete(movie.id)}
                          className="btn btn-danger btn-sm"
                        >
                          Delete
                        </button>
                      )}
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
            <Pagination
              numOfItems={filteredMovies.length}
              pageSize={pageSize}
              onPageChange={this.handlePageChange}
              currentPage={currentPage}
            />
          </div>
        </div>
      </Fragment>
    );
  }
}

export default movies;
