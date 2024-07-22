import AuthLayout from "@/components/layouts/AuthLayout";
import GuestLayout from "@/components/layouts/GuestLayout";
import Login from "@/components/pages/Login";
import Home from "@/components/pages/Home";
import Dashboard from "@/components/pages/Dashboard";
import Media from "@/components/pages/Media";
import { createBrowserRouter, Navigate } from "react-router-dom";
import { loadUser, verifySession } from "../api/auth";
import { useQuery } from "@tanstack/react-query";
import AddArticle from "@/components/pages/AddArticle";

const AuthRoute = ({ element, redirectPath = "/login" }) => {
    const user = JSON.parse(localStorage.getItem("user"));
    if (!user) {
        return <Navigate to={redirectPath} replace />;
    }
    return element;
};

const GuestRoute = ({ element, redirectPath = "/dashboard" }) => {
    const user = JSON.parse(localStorage.getItem("user"));
    console.log(user);
    if (user) {
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
            {
                path: "/add-article",
                element: <AuthRoute element={<AddArticle />} />,
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
