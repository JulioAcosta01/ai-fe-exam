import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query";
import axios from "../plugins/axios";

let isSessionVerified = false;

export async function login(param) {
    const response = await axios.post("/api/login", param);
    if (response.status === 200) {
        // auth = response.data;
        const { data } = response.data;
        localStorage.setItem("bearer_token", data.token);
        await loadUser();
    }
}

export async function loadUser() {
    isSessionVerified = true;
    const response = await axios.get("/api/users/profile");
    const { data: result } = response.data;

    if (result.data) {
        localStorage.setItem("user", JSON.stringify(result.data));
    }
}

export async function logout() {
    await axios.post("/logout");
    // auth = null;
}

export async function verifySession() {
    //check api/auth & initialpageload
    const user = JSON.parse(localStorage.getItem("user"));
    if (user && !isSessionVerified) {
        try {
            await loadUser();
        } catch (error) {
            localStorage.removeItem("user");
            // auth = null;
        }
    }
}
