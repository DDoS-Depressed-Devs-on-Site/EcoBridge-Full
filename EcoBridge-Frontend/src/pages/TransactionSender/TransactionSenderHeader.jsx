import React from "react";
import "./TransactionSend.css";
import Navbar from "../../components/Navbar-no-gymnastic/Navbar.jsx"

const TransactionSenderHeader = () => {
  return (
    <>
    <Navbar/>
      <div className="header-container h-full w-full bg-red">
        <h2 className="header-text font-semibold text-4xl mr-4">
          Your are <span className="yellow-highlight">not alone</span>
        </h2>
        <p className="text-description text-[1.1rem]">
          Over <span className="green-highlight font-semibold">25 generous individuals and 100 organizations </span> have come together to support your cause. The world may have its challenges, but it’s also full of those willing to lend a hand and make a difference.
        </p>
      </div>
    </>
  );
};

export default TransactionSenderHeader;