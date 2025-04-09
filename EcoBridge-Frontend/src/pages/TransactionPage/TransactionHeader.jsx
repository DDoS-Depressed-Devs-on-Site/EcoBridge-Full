import React from "react";
import "./TransactionPage.css";
import Navbar from "../../components/Navbar-no-gymnastic/Navbar.jsx"

const TransactionHeader = () => {
  return (
    <>
    <Navbar/>
      <div className="header-container h-full w-full bg-red">
        <h2 className="header-text font-semibold text-4xl mr-4">
          Your Donations
        </h2>
        <p className="text-description text-[1.1rem] font-semibold">
          You've donated
          <span className="yellow-highlight font-semibold">
            {" "}
            25 times across
          </span>
          <span className="green-highlight font-semibold">
            {" "}
            10 amazing organizations
          </span>
          — thank you!
        </p>
        <p className="text-description text-[1.1rem]">
          We’re incredibly grateful for your unwavering support. Your generosity
          fuels our mission and brings hope to those who need it most.
        </p>
      </div>
    </>
  );
};

export default TransactionHeader;
