import logo from "./logo.svg";
import "./App.css";
import Header from "./components/header/Header";
import SideBar from "./components/sideBar/SideBar";
import { useEffect, useState } from "react";
import Tasks from "./pages/tasks/Tasks";
import { Routes, Route, Link, BrowserRouter } from "react-router-dom";
import Login from "./pages/login/Login";
import AuthProvider from "./contexts/AuthProvider";
import PrivateRoute from "./routes/PrivateRoute";
import useAuth from "./hooks/useAuth";
import jwt_decode from "jwt-decode";
import { token } from "./.env";
import { set } from "react-hook-form";

function App() {
  const [sideBar, setSideBar] = useState(false);

  const handleCloseSideBar = (e) => {
    sideBar && setSideBar(false);
  };
  const { user } = useAuth();

 
  return (
    <div>
      <BrowserRouter>
        <Header />
        <Routes>
          <Route
            path="/"
            element={
              <PrivateRoute>
                <Tasks />
              </PrivateRoute>
            }
          />
          <Route path="/login" element={<Login />} />
        </Routes>

        {user && (
          <div onClick={handleCloseSideBar} className="container-fuild">
            <a
              onClick={() => setSideBar(true)}
              id="my-done"
              class="text-decoration-none fw-bolder"
            >
              My Done <sup>{user?.total_done}</sup>{" "}
            </a>
          </div>
        )}

        {sideBar && <SideBar handleCloseSideBar={handleCloseSideBar} />}
      </BrowserRouter>
    </div>
  );
}

export default App;
