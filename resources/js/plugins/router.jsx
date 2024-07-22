import AuthLayout from "@/components/layouts/AuthLayout";
import GuestLayout from "@/components/layouts/GuestLayout";
import Login from "@/components/pages/Login";
import Home from "@/components/pages/Home";
import Dashboard from "@/components/pages/Dashboard";
import Media from "@/components/pages/Media";
import { createBrowserRouter, Navigate } from "react-router-dom";
import { loadUser, verifySession } from "../api/auth";
import { useQuery } from "@tanstack/react-query";

const AuthRoute = ({ element, redirectPath = "/login" }) => {
    const users = JSON.parse(localStorage.getItem("users"));
    if (users) {
        return <Navigate to={redirectPath} replace />;
    }
    return element;
};

const GuestRoute = ({ element, redirectPath = "/dashboard" }) => {
    const users = JSON.parse(localStorage.getItem("users"));
    console.log(users);
    if (!users) {
        return <Navigate to={redirectPath} replace />;
    }
    return element;
};

function verify(element) {
    verifySession();
    return element;
}

const router = createBrowserRouter([
    {
        path: "/",
        element: verify(<AuthLayout />),
        children: [
            {
                path: "",
                element: <AuthRoute element={<Home />} />,
            },
            {
                path: "/dashboard",
                element: <AuthRoute element={<Dashboard />} />,
            },
            {
                path: "/media",
                element: <AuthRoute element={<Media />} />,
            },
        ],
    },
    {
        path: "/",
        element: <GuestLayout />,
        children: [
            {
                path: "/login",
                element: <GuestRoute element={<Login />} />,
            },
        ],
    },
]);

export default router;
