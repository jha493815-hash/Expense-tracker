import api from "./api";

// register
export const registerUser = (data) =>
  api.post("/auth/register", data);

// login
export const loginUser = (data) =>
  api.post("/auth/login", data);