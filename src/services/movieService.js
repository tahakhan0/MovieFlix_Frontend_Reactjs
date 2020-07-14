import http from "./httpService";
import { apiUrl } from "./config.json";
import authHeader from "./users";

const apiEndPoint = apiUrl + "movies/";
const authorization = { headers: authHeader() };

export function getMovies() {
  return http.get(apiEndPoint, authorization);
}

export function getMovie(id) {
  return http.get(apiEndPoint + id + "/", authorization);
}

export function saveMovie(movie) {
  if (movie.id) {
    const body = { ...movie };
    body.genre = body.genreId;
    delete body.genreId;
    return http.put(apiEndPoint + movie.id + "/", body, authorization);
  }
  const body = { ...movie };
  body.genre = body.genreId;
  delete body.genreId;
  return http.post(apiEndPoint, body, authorization);
}

export async function deleteMovie(id) {
  return http.delete(apiEndPoint + id + "/delete/", authorization);
}
