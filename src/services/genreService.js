import http from "./httpService";
import { apiUrl } from "./config.json";

export function getGenres() {
  return http.get(apiUrl + "genres/");
}

export function findGenre(genreId) {
  return http.get(apiUrl + `genres/${genreId}/`);
}
