import axios from "../plugins/axios";

export function getUsers() {
    return axios.get("/api/users").then((res) => {
        const { data } = res.data;
        return data;
    });
}
