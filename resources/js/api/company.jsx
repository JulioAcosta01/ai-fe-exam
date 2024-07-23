import axios from "../plugins/axios";

export function getCompany() {
  return axios.get("/api/companies").then(res => {
    const { data } = res.data;
    return data;
  });
}

export function createCompany(payload) {
  return axios.post("/api/companies", payload);
}
export function updateCompany(payload) {
  return axios.put(`/api/companies/${payload.id}`, payload);
}
export function deleteCompany(payload) {
  return axios.delete(`/api/companies/${payload.id}`);
}
