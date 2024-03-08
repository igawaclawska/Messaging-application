import React, { useContext } from "react";
import Home from "./pages/home/Home";
import Login from "./pages/Login";
import Register from "./pages/Register";
import { BrowserRouter, Routes, Route, Navigate } from "react-router-dom";
import { AuthContext } from "./context/AuthContext";
import "./styles.css";

function App() {
  const { userLogged } = useContext(AuthContext);
  const ProtectedRoute = ({ children }) => {
    if (!userLogged) {
      return <Navigate to="/login" />;
    }
    return children
  };
  return (
    <BrowserRouter>
      <Routes>
          <Route path="/home"
            element={
              <ProtectedRoute>
                <Home />
              </ProtectedRoute>
            }
          />
          <Route path={"/login" }index element={<Login />} />
          <Route path={"/" }index element={<Login />} />
          <Route path="/register" element={<Register />} />
      </Routes>
    </BrowserRouter>
  );
}

export default App;