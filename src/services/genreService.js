import http from "./httpService";
import { apiUrl } from "./config.json";
import authHeader from "./users";

const authorization = { headers: authHeader() };

export function getGenres() {
  return http.get(apiUrl + "genres/", authorization);
}

export function findGenre(genreId) {
  return http.get(apiUrl + `genres/${genreId}/`, authorization);
}
