import React from "react";
import "./HomePage.css";
import Navbar from "../../components/Navbar-no-gymnastic/Navbar";
import { MdArrowRight } from "react-icons/md";

const HomeHeader = () => {
  return (
    <>
      <Navbar />
      <section className="head-container h-[65vw] w-[99vw] bg-red-200 flex items-center justify-center m-auto relative">
        <div className="flex-col items-start gap-[1.5vw] w-[70%]">
          <div className="text-container text-center text-white">
            <h2 className="font-bold text-[6rem] header-color">
              Match donations instantly with AI
            </h2>
            <p className="text-[1.3vw] text-white font-medium">
              Connecting donors to those in need based on location, urgency, and
              resources.
            </p>
          </div>
          <div className="button-container flex mt-10 justify-center">
            <button className="buttons justify-center flex items-center gap-1">
              Explore
              <MdArrowRight className="icons" />
            </button>
          </div>
        </div>
      </section>
    </>
  );
};

export default HomeHeader;
