import http from "./httpService";
import { apiUrl } from "./config.json";
import { findGenre } from "./genreService";

const apiEndPoint = apiUrl + "movies/";

export function getMovies() {
  return http.get(apiEndPoint);
}

export function getMovie(id) {
  return http.get(apiEndPoint + id + "/");
}

export function saveMovie(movie) {
  if (movie.id) {
    const body = { ...movie };
    body.genre = body.genreId;
    delete body.genreId;
    return http.put(apiEndPoint + movie.id + "/", body);
  }
  const body = { ...movie };
  body.genre = body.genreId;
  delete body.genreId;
  return http.post(apiEndPoint, body);
}

export async function deleteMovie(id) {
  return http.delete(apiEndPoint + id + "/delete/");
}
