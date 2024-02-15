import React from "react";
import { Link, useNavigate } from "react-router-dom";
import "../styles/Header.css"
import { useLogin } from "../LoginProvider";

function clearCookies() {
    document.cookie.split(";").forEach(function (c) {
      document.cookie = c
        .replace(/^ +/, "")
        .replace(/=.*/, "=;expires=" + new Date().toUTCString() + ";path=/");
    });
  }


function Header() {
    const { isLoggedIn, setIsLoggedIn } = useLogin();
    const isAuthenticated = localStorage.getItem('authenticated') === 'true';
    // console.log(isLoggedIn);
    const navigate = useNavigate();


    const handleLogout = () => {
        // Call the clearCookies function to remove cookies
        clearCookies();
    
        // Update the local storage to indicate that the user is not authenticated
        localStorage.setItem("authenticated", "false");
        setIsLoggedIn(false);
        navigate("/login");
    };

    return (
        <header>
            <img id="header-logo" src="https://firebasestorage.googleapis.com/v0/b/highlevel-backend.appspot.com/o/companyPhotos%2FdKTUv5WazGMFeKve1SjA.png?alt=media&token=259754d9-6701-4c5e-90fc-1bdefa2aef33" alt="Event Hawk" />
            <h1 id="header-name"> Event Hawk - IO integration</h1>
            <nav className="navbar-links">
                <ul className="header-links">
                <li>
                    <Link to="/dashboard">Dashboard</Link>
                </li>
                {isLoggedIn ? (
                    <li>
                    <button id="logout-button" onClick={handleLogout}>Logout</button>
                    </li>
                ) : (
                    <li>
                    <Link to="/login">Login</Link>
                    </li>
                )}
                </ul>
            </nav>
        </header>
    );
}

export default Header;