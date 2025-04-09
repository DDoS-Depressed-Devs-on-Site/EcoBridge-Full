import React, { useState } from "react";
import "./MapsModal.scss";
import ItemModal from "./ItemModal.jsx";
import { sampleImage } from "../../assets/images/assets";
import EcoBridgeLogo from "../../assets/EcoBridge.png";
import LeftYellof from "../../assets/images/left-yellow.png";

const MapsModal = ({ isOpen, onClose, location }) => {
  const [isItemOpen, setItemOpen] = useState(false);

  if (!isOpen || !location) return null;

  return (
    <div className="modal-container fixed z-50 inset-0 bg-white shadow-lg shadow-slate-500 p-3 rounded-2xl">
      <div className="logo-div m-3">
        <img src={EcoBridgeLogo} className="flex h-9"></img>

        <p className="tagline">Connecting Resources, Empowering Communities</p>
      </div>
      <div className="info-container flex rounded-lg p-6 pl-4 pt-0">
        <img
          src={`data:image/png;base64,${location.coverPhoto}`}
          alt={location.name}
          className="w-full rounded-md mt-2"
        />
        <div className="text-info">
          <h3 className="location-name text-2xl font-bold">{location.name}</h3>
          <p className="text-sm text-gray-600">{location.address}</p>
          <p className="text-sm text-gray-600">
            Population: {location.population}
          </p>
          <p className="description">{location.description}</p>
        </div>

        <div className="button-container flex justify-center">
          <div
            onClick={onClose}
            className="bg-[#FFC107] flex justify-center items-center w-44 h-16 ml-0 pl-0 rounded-lg mt-8 transition-transform duration-200 hover:scale-105 hover:drop-shadow-lg active:scale-95"
          >
            <p className="text-white font-semibold text-center">Cancel</p>
          </div>
          <div
            onClick={() => setItemOpen(true)}
            className="bg-[#2ECC71] flex justify-center items-center w-44 h-16 ml-0 pl-0 rounded-lg mt-8 transition-transform duration-200 hover:scale-105 hover:drop-shadow-lg active:scale-95"
          >
            <p className="text-white font-semibold text-center">Donate</p>
          </div>
        </div>
      </div>
      <ItemModal
        isOpen={isItemOpen}
        onClose={() => setItemOpen(false)}
        location={location}
      />
    </div>
  );
};

export default MapsModal;
