import axios from "axios";

const api = axios.create({
  baseURL: "http://localhost:5000",
});


api.interceptors.request.use((req) => {
  const user = localStorage.getItem("user");

  if (user) {
    req.headers.Authorization = `Bearer ${JSON.parse(user).token}`;
  }

  return req;
});

export default api;