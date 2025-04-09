import React, { useState } from "react";
import "./OrgMapModal.scss";

import {
  MapContainer,
  TileLayer,
  Marker,
  Popup,
  useMapEvents,
} from "react-leaflet";
import "leaflet/dist/leaflet.css";

const OrgMapModal = ({ isOpen, onClose, onLocationSelect }) => {
  const [selectedLocation, setSelectedLocation] = useState(false);

  const LocationMarker = () => {
    useMapEvents({
      click(e) {
        const { lat, lng } = e.latlng;

        setSelectedLocation([lat, lng]);

        const locationString = `${lat}, ${lng}`;
        console.log("Selected Location:", locationString);

        if (onLocationSelect) {
          onLocationSelect(locationString);
        }
      },
    });

    return selectedLocation ? (
      <Marker position={selectedLocation}>
        <Popup>Selected Location: {selectedLocation.join(", ")}</Popup>
      </Marker>
    ) : null;
  };

  return (
    <div className="modal-overlay fixed inset-10 z-50 flex items-center justify-center bg-black/50 shadow-lg rounded-3xl">
      <div className="modal-content bg-white p-6 rounded-xl w-[650px] h-[600px] flex justify-center flex-col items-center">
        <button className="close-btn text-3xl self-end cursor-pointer w-[30px] " onClick={onClose}>×</button>
        <h3 className="head-text text-center font-semibold text-3xl mb-8">Select Your Location</h3>
        <MapContainer
          center={[14.5995, 120.9842]}
          zoom={15}
          style={{ height: "400px", width: "600px", marginBottom: "30px"}}
        >
          <TileLayer
            url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
            attribution='&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a>'
          />
          <LocationMarker />
        </MapContainer>
        <button onClick={onClose} className="save-btn text-white px-6 py-2 rounded-md cursor-pointer hover:bg-emerald-300 transition w-35 h-15">Save Location</button>
      </div>
    </div>
  );
};

export default OrgMapModal;