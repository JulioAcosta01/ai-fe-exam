import axios from "../plugins/axios";

export function getUsers() {
  return axios.get("/api/users").then(res => {
    const { data } = res.data;
    return data;
  });
}
export function createUsers(payload) {
  return axios.post("/api/users", payload);
}
export function updateUsers(payload) {
  return axios.put(`/api/users/${payload.id}`, payload);
}
export function deleteUsers(payload) {
  return axios.delete(`/api/users/${payload.id}`);
}
