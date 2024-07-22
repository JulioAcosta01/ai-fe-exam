import "./bootstrap";
import "../css/app.css";

import React from "react";
import ReactDOM from "react-dom/client";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { RouterProvider } from "react-router-dom";
import router from "./plugins/router";

const queryClient = new QueryClient();

ReactDOM.createRoot(document.getElementById("app")).render(
    <QueryClientProvider client={queryClient}>
        <RouterProvider router={router}></RouterProvider>
    </QueryClientProvider>
);
