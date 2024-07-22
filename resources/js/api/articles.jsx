import axios from "../plugins/axios";

export function getArticles() {
  return axios.get("/api/articles").then(res => res.data);
}

export function createArticles(payload) {
  return axios.post("/api/articles", payload);
}
