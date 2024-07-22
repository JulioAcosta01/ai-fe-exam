import axios from "../plugins/axios";

export function getCompany() {
  return axios.get("/api/companies").then(res => {
    const { data } = res.data;
    return data;
  });
}
