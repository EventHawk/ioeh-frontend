import React from "react";
import { Link } from "react-router-dom";
import "../styles/Header.css"

function Header() {
    return (
        <header>
            <img id="header-logo" src="https://firebasestorage.googleapis.com/v0/b/highlevel-backend.appspot.com/o/companyPhotos%2FdKTUv5WazGMFeKve1SjA.png?alt=media&token=259754d9-6701-4c5e-90fc-1bdefa2aef33" alt="Event Hawk" />
            <h1 id="header-name"> Event Hawk - IO integration</h1>
            <nav class="navbar-links">
                <ul className="header-links">
                <li>
                    <Link to="/dashboard">Dashboard</Link>
                </li>
                {localStorage.getItem('authToken') ? (
                    <li>
                    <button id="logout-button">Logout</button>
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