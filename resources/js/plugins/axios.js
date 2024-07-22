import Axios from "axios";

function getCookie(param) {
    let cookie = document.cookie
        .split("; ")
        .find((item) => item.startsWith(`${param}=`));

    if (!cookie) {
        return null;
    }
    return decodeURIComponent(cookie.split("=")[1]);
}

const baseURL =
    window.APP_ENV === "production"
        ? "https://archintel.rooche.net"
        : "http://localhost:8000";

const axios = Axios.create({
    baseURL: baseURL,
    headers: {
        Accept: "application/json",
    },
});

axios.interceptors.request.use(async (req) => {
    const token = localStorage.getItem("bearer_token");

    if (token) {
        req.headers.Authorization = `Bearer ${token}`;
    }

    return req;
});

export default axios;
