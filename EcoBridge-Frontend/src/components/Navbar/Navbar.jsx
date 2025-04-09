import React, { useState } from "react";
import "./Navbar.scss";
import { Link } from "react-router";
import EcoBridgeLogo from "../../assets/EcoBridge.png";

const Navbar = () => {
  const [transparent, setTransparent] = useState("header");

  const addBg = () => {
    if (window.scrollY >= 10) {
      setTransparent("header active-header");
    } else {
      setTransparent("header");
    }
  };

  window.addEventListener("scroll", addBg);

  return (
    <section className="navbar-section">
      <div className={`${transparent} flex z-50`}>
        <div className="logo-div">
          <Link to="/" className="logo">
            <img src={EcoBridgeLogo} className="flex h-10"></img>
          </Link>
        </div>

        <div className="navbar">
          <ul className="nav-lists flex">
            <li className="nav-item">
              <Link to="/" className="nav-link">
                Home
              </Link>
            </li>
            <li className="nav-item">
              <Link to="/donations" className="nav-link">
                Donations
              </Link>
            </li>
            <li className="nav-item">
              <Link to="/community" className="nav-link">
                Community Hub
              </Link>
            </li>
            <li className="nav-item">
              <Link to="/ranks-badges" className="nav-link">
                Ranks and Badges
              </Link>
            </li>
            <li className="nav-item">
              <Link to="/partners" className="nav-link">
                Partners
              </Link>
            </li>
            <li className="nav-item">
              <Link to="/signup" className="nav-link">
                Sign Up
              </Link>
            </li>
            <li className="nav-item">
              <Link to="/login" className="nav-link">
                Login
              </Link>
            </li>
          </ul>
        </div>
      </div>
    </section>
  );
};

export default Navbar;
