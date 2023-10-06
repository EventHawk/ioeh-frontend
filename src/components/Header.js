import React from "react";
import "../styles/Header.css"

function Header() {
    return (
        <header>
            <img id="header-logo" src="https://firebasestorage.googleapis.com/v0/b/highlevel-backend.appspot.com/o/companyPhotos%2FdKTUv5WazGMFeKve1SjA.png?alt=media&token=259754d9-6701-4c5e-90fc-1bdefa2aef33" alt="Event Hawk" />
            <h1 id="header-name"> Event Hawk - IO integration</h1>
        </header>
    );
}

export default Header;