import axios from "../plugins/axios";

export function getArticles() {
  return axios.get("/api/articles").then(res => res.data);
}

export function createArticles(payload) {
  return axios.post("/api/articles", payload);
}
export function updateArticles(payload) {
  return axios.put(`/api/articles/${payload.id}`, payload);
}
export function deleteArticles(payload) {
  return axios.delete(`/api/articles/${payload.id}`);
}
