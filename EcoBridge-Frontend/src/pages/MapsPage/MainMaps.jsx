import React, { useEffect, useState } from "react";
import { MapContainer, TileLayer, Marker, Popup } from "react-leaflet";
import "leaflet/dist/leaflet.css";
import MapsModal from "../../components/Modals/MapsModal";
import Navbar from "../../components/Navbar-no-gymnastic/Navbar.jsx";
import { OrganizationApiWrapper } from "../../scripts/Organization.js";

const MainMaps = () => {
  const [selectedOrganization, setSelectedorganization] = useState(null);
  const [isModalOpen, setIsModalOpen] = useState(false);

  const [organizations, setOrganizations] = useState([]);

  async function getAllOrganization() {
    console.log("test");
    const orgs_ = await OrganizationApiWrapper.getAllOrganizations();
    console.log(orgs_);
    setOrganizations(orgs_);

    console.log("Recieved", orgs_.length, "organizations");
  }

  useEffect(() => {
    getAllOrganization();
  }, []);

  const handleMarkerClick = (organization) => {
    console.log("clicked", organization);
    setSelectedorganization(organization);
    setIsModalOpen(true);
  };

  return (
    <div>
      {!isModalOpen && <Navbar />}

      <MapContainer
        center={[14.5995, 120.9842]}
        zoom={6}
        style={{ height: "100vh", width: "100vw", zIndex: "20" }}
      >
        <TileLayer
          url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
          attribution='&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a>'
        />
        {organizations.map((organization) => (
          <Marker
            key={organization.pubKey}
            position={[organization.latitude, organization.longitude]}
            eventHandlers={{
              click: () => handleMarkerClick(organization),
            }}
          />
        ))}
      </MapContainer>

      <MapsModal
        isOpen={isModalOpen}
        onClose={() => setIsModalOpen(false)}
        location={selectedOrganization}
      />
    </div>
  );
};

export default MainMaps;
