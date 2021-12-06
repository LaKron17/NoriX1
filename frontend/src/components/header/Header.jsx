import React from "react";
import useAuth from "../../hooks/useAuth";
import SideBar from "../sideBar/SideBar";
import "./Header.css";
import {Link} from 'react-router-dom'
const Header = () => {
  const { user, setUser } = useAuth();

  const LogOut = () => {
    setUser(null);
    localStorage.removeItem("token");
  };

  console.log(user)
  return (
    <header className="sticky-top bg-white ">
      <nav className="container d-flex my-2 justify-content-between align-items-center">
        <h2>
          Task <span class="bg-warning p-1 rounded-3">Manager</span>
        </h2>
        <div className="d-flex">
            {user?<button onClick={LogOut} class="text-decoration-underline pe-auto border-0">
            {user?.username}(Logout)
          </button>:<Link to="/login"  class="text-decoration-underline h5 text-dark border-0">
            Login/Register
          </Link>}
          
        </div>
      </nav>
    </header>
  );
};

export default Header;
