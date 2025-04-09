import React, { useState } from "react";
import "./Navbar.scss";
import { Link } from "react-router";
import EcoBridgeLogo from "../../assets/EcoBridge.png";

const Navbar = () => {
  return (
    <section className="navbar-section">
      <div className={`header active-header flex z-50`}>
        <div className="logo-div">
          <Link to="/" className="logo">
            <img src={EcoBridgeLogo} className="flex h-10"></img>
          </Link>
        </div>

        <div className="navbar">
          <ul className="nav-lists flex">
            <li className="nav-item">
              <Link to="/maps" className="nav-link">
                Map
              </Link>
            </li>
            <li className="nav-item">
              <Link to="/donations" className="nav-link">
                Dashboard
              </Link>
            </li>
            <li className="nav-item">
              <Link to="/community" className="nav-link">
                Community Hub
              </Link>
            </li>
            <li className="nav-item">
              <Link to="/profile" className="nav-link">
                Profile
              </Link>
            </li>
          </ul>
        </div>
      </div>
    </section>
  );
};

export default Navbar;
