import http from "./httpService";
import { usersUrl } from "./config.json";
const registerAPI = usersUrl + "register/";
const loginAPI = usersUrl + "login/";
const UserAPI = usersUrl + "user/";

export function registerUsers(users) {
  return http.post(registerAPI, {
    username: users.username,
    email: users.email,
    password: users.password,
  });
}

export async function loginUsers(users) {
  const { data: jwt } = await http.post(loginAPI, {
    username: users.username,
    email: users.email,
    password: users.password,
  });
  localStorage.setItem("token", jwt["token"]);
}

export default function authHeader() {
  const token = localStorage.getItem("token");
  if (token) {
    return { Authorization: `Token ${token}` };
  } else {
    return null;
  }
}

export function getCurrentUser() {
  return localStorage.getItem("token");
}

export function CurrentUser() {
  return http.get(UserAPI, { headers: authHeader() });
}

export function logoutUser() {
  localStorage.removeItem("token");
}
