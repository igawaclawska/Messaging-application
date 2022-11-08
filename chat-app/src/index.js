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
import "./buttons.css"

const router = createBrowserRouter([
        {
                path: "/",
                element: <Login />,
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

// If you want to start measuring performance in your app, pass a function
// to log results (for example: reportWebVitals(console.log))
// or send to an analytics endpoint. Learn more: https://bit.ly/CRA-vitals
reportWebVitals();
