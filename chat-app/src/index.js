import React from "react";
import ReactDOM from "react-dom/client";
import Home from "./pages/Home";
import Login from "./pages/Login";
import Register from "./pages/Register";
import {
        createBrowserRouter,
        RouterProvider,
        Route,
} from "react-router-dom";
import "./styles.css";

const router = createBrowserRouter([
        {
                path: "/",
                element: <Home />,
        }, {
                path: "/Home",
                element: <Home />,
        },
        {
                path: "/Login",
                element: <Login />,
        },{
                path: "/Register",
                element: <Register />,
              },
]);

ReactDOM.createRoot(document.getElementById("root")).render(
        <React.StrictMode>
                <RouterProvider router={router} />
        </React.StrictMode>
);