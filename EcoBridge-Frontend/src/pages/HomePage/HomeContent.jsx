import React from "react";
import "./HomePage.css";
import { sampleImage } from "../../assets/images/assets";
import { MdArrowRight } from "react-icons/md";

const HomeContent = () => {
  return (
    <section className="h-[90vh] flex items-center justify-center px-10 flex-col mt-40">
      <div className="grid grid-cols-2">
        <div className="flex gap-1 mx-[3.5rem]">
          <img
            className="w-1/2 object-cover img-div"
            src={sampleImage.donate}
            alt="Donating Food"
          />
          <img
            className="relative top-8 right-3 w-1/2 object-cover img-div align-middle justify-center max-h-[270px]"
            src={sampleImage.donating}
            alt="Donating Food"
          />
        </div>
        <div className="flex flex-col justify-center text-left mr-5">
          <h2 className="text-3xl font-bold">
            Connects people, organizations, and communities to reduce waste,
            redistribute resources, and create a more sustainable future
            together.
          </h2>
          <div className="flex mt-10 ">
            <button className="buttons justify-center flex items-center gap-1 text-base">
              Donate Now
              <MdArrowRight className="icons" />
            </button>
          </div>
        </div>
      </div>
      <div className="mt-12 w-full h-[20vw] flex justify-center mb-20">
        <img
          className="w-[90%] max-w-[1200px] h-[30vw] object-cover rounded-2xl"
          src={sampleImage.foodDonate}
          alt="Food Donation"
        />
      </div>
    </section>
  );
};

export default HomeContent;
