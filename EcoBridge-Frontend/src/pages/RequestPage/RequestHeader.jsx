import React from "react";
import "./RequestStyle.css";
import Navbar from "../../components/Navbar-no-gymnastic/Navbar.jsx";

const TransactionHeader = () => {
  return (
    <>
      <Navbar />
      <div className="header-container h-full w-full bg-red">
        <h2 className="header-text font-semibold text-4xl mr-4">
          Show what you already have—
          <span className="green-highlight">
            so others can give what you truly need.
          </span>
        </h2>
        <p className="text-description text-[1.1rem]">
          We believe in sharing not just the blessings we receive, but also the
          reality of our needs. By{" "}
          <span className="yellow-highlight font-semibold">
            letting donors know what we already have in abundance
          </span>
          , we can{" "}
          <span className="green-highlight font-semibold">
            avoid waste, prevent overstocking, and make room for the things that
            matter most.
          </span>
        </p>
      </div>
    </>
  );
};

export default TransactionHeader;
