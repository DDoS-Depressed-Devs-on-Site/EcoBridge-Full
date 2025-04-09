import React, { useState } from "react";
import "./SignUpOrg.css";
import SignUpWelcome from "../../components/SignUpWelcome/SignUpWelcome";
import LoginLink from "../../components/LoginLink/LoginLink";
import SignUpLink from "../../components/SignUpLink/SignUpLink";
import { orgSignUp } from "../../scripts/Auth";

import "./OrgMapModal.scss";

import {
  MapContainer,
  TileLayer,
  Marker,
  Popup,
  useMapEvents,
} from "react-leaflet";
import "leaflet/dist/leaflet.css";
import { useNavigate } from "react-router-dom";

const SignUpOrg = () => {
  const [page, setPage] = useState(1);
  const [organizationName, setOrganizationName] = useState("");
  const [organizationEmail, setOrganizationEmail] = useState("");
  const [organizationPassword, setOrganizationPassword] = useState("");
  const [organizationContact, setOrganizationContact] = useState("");
  const [organizationAddress, setOrganizationAddress] = useState("");

  const [profileImage, setProfileImage] = useState(null);
  const [coverImage, setCoverImage] = useState(null);

  const [selectedLocation, setSelectedLocation] = useState(false); // [latitude, longitude]

  const [organizationDescription, setOrganizationDescription] = useState("");
  const [organizationPopulation, setOrganizationPopulation] = useState("");
  const [aveFoodConsume, setAveFoodConsume] = useState("");
  const [aveWaterConsume, setAveWaterConsume] = useState("");
  const [aveClothesConsume, setAveClothesConsume] = useState("");

  const [agreeTerms, setAgreeTerms] = useState(false);
  const nav = useNavigate();

  const handleSubmit = async (e) => {
    e.preventDefault();

    if(!agreeTerms){
      alert("Organization must agree to Terms and Conditions.");
        return;
    }

    await orgSignUp(organizationName,organizationEmail,organizationPassword,organizationContact,organizationAddress,profileImage,coverImage,organizationDescription,organizationPopulation,aveFoodConsume,aveWaterConsume,aveClothesConsume,selectedLocation)
    alert("Organization successfully registered, you may now login your organization.");
    nav("/login");
  }

  const handleProfileChange = (e) => {
    const file = e.target.files[0];
    if (file) {
      setProfileImage((file));
    }
  };

  const handleCoverChange = (e) => {
    const file = e.target.files[0];
    if (file) {
      setCoverImage((file));
    }
  };

  const LocationMarker = () => {
    useMapEvents({
      click(e) {
        const { lat, lng } = e.latlng;

        setSelectedLocation([lat, lng]);

        const locationString = `${lat}, ${lng}`;
        console.log("Selected Location:", locationString);
      },
    });

    return selectedLocation ? (
      <Marker position={selectedLocation}>
        <Popup>Selected Location: {selectedLocation.join(", ")}</Popup>
      </Marker>
    ) : null;
  };

  return (
    <>
      <section className="signup-section">
        <SignUpWelcome />
        <div className="signup-org-loginlink">
          <LoginLink />
        </div>

        {page == 1 ? (
          <div className="register-container">
            <h2>Create Account</h2>

            <p className="account-type">As an Organization</p>

            <form className="signup-org-form" onSubmit={handleSubmit}>
              <label>
                Organization Name
                <input
                  type="text"
                  placeholder="Enter organization name"
                  value={organizationName}
                  onChange={(e) => {
                    setOrganizationName(e.target.value);
                  }}
                />
              </label>

              <label>
                Email
                <input
                  type="email"
                  placeholder="Enter email"
                  value={organizationEmail}
                  onChange={(e) => {
                    setOrganizationEmail(e.target.value);
                  }}
                />
              </label>

              <label>
                Password
                <input
                  type="password"
                  placeholder="Enter password"
                  value={organizationPassword}
                  onChange={(e) => {
                    setOrganizationPassword(e.target.value);
                  }}
                />
              </label>

              <label>
                Contact Information
                <input
                  type="text"
                  placeholder="Enter contact info"
                  value={organizationContact}
                  onChange={(e) => {
                    setOrganizationContact(e.target.value);
                  }}
                />
              </label>

              <label>
                Address
                <input
                  type="text"
                  placeholder="Enter address"
                  value={organizationAddress}
                  onChange={(e) => {
                    setOrganizationAddress(e.target.value);
                  }}
                />
              </label>

              <button
                type="button"
                className="signup-org-next-button"
                onClick={(e) => {
                  e.preventDefault();
                  setPage(2);
                }}
              >
                Next
              </button>
            </form>

            <SignUpLink role="user" path="/signup/create-as-user" />
          </div>
        ) : page == 2 ? (
          <div className="register-container">
            <h2>More Information</h2>

            <form className="signup-org-form" onSubmit={handleSubmit}>
              <label htmlFor="profile-upload">Upload Profile Picture</label>
              <input
                type="file"
                className="profile-upload"
                accept="image/*"
                onChange={handleProfileChange}
              />

              {profileImage && (
                <div className="profile-container">
                  <img
                    src={URL.createObjectURL(profileImage)}
                    alt="Profile Picture"
                    className="profile-img"
                  />
                </div>
              )}

              <label htmlFor="cover-upload">Upload Cover Photo </label>
              <input
                type="file"
                className="cover-upload"
                accept="image/*"
                onChange={handleCoverChange}
              />

              {coverImage && (
                <div className="cover-container">
                  <img
                    src={URL.createObjectURL(coverImage)}
                    alt="Cover Photo"
                    className="cover-img"
                  />
                </div>
              )}

              <button
                type="button"
                className="signup-org-back-button"
                onClick={(e) => {
                  e.preventDefault();
                  setPage(1);
                }}
              >
                Back
              </button>

              <button
                type="button"
                className="signup-org-next-button"
                onClick={(e) => {
                  e.preventDefault();
                  setPage(3);
                }}
              >
                Next
              </button>
            </form>

            <SignUpLink role="user" path="/signup/create-as-user" />
          </div>
        ) : page == 3 ? (
          <div className="register-container">
            <h2>More Information</h2>

            <form className="signup-org-form" onSubmit={handleSubmit}>
              <label>
                Description
                <input
                  type="text"
                  placeholder="A non-profit organization that..."
                  value={organizationDescription}
                  onChange={(e) => {
                    setOrganizationDescription(e.target.value);
                  }}
                />
              </label>

              <label>
                Population
                <input
                  type="number"
                  placeholder="369"
                  value={organizationPopulation}
                  onChange={(e) => {
                    setOrganizationPopulation(e.target.value);
                  }}
                />
              </label>

              <label>
                Average Food Consumption
                <input
                  type="number"
                  placeholder="100"
                  value={aveFoodConsume}
                  onChange={(e) => {
                    setAveFoodConsume(e.target.value);
                  }}
                />
              </label>

              <label>
                Average Water Consumption
                <input
                  type="number"
                  placeholder="100"
                  value={aveWaterConsume}
                  onChange={(e) => {
                    setAveWaterConsume(e.target.value);
                  }}
                />
              </label>

              <label>
                Average Clothing Consumption
                <input
                  type="number"
                  placeholder="100"
                  value={aveClothesConsume}
                  onChange={(e) => {
                    setAveClothesConsume(e.target.value);
                  }}
                />
              </label>

              <button
                type="button"
                className="signup-org-back-button"
                onClick={(e) => {
                  e.preventDefault();
                  setPage(2);
                }}
              >
                Back
              </button>

              <button
                type="button"
                className="signup-org-button"
                onClick={(e) => {
                  e.preventDefault();
                  setPage(4);
                }}
              >
                Next
              </button>
            </form>

            <SignUpLink role="user" path="/signup/create-as-user" />
          </div>
        ) : page == 4 ? (
          <div className="register-container">
            <div className="flex items-center justify-center  w-full">
              <form className="modal-content bg-white p-6 rounded-xl w-[800px] h-[600px] flex justify-center flex-col items-center"
               onSubmit={handleSubmit}
              >
                <h2>Pin your location</h2>
                <MapContainer
                  center={[14.5995, 120.9842]}
                  zoom={15}
                  style={{
                    height: "800px",
                    width: "800px",
                    marginBottom: "30px",
                  }}
                >
                  <TileLayer
                    url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
                    attribution='&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a>'
                  />
                  <LocationMarker />
                </MapContainer>
                <div className="terms-container">
                  <input
                    type="checkbox"
                    checked={agreeTerms}
                    onChange={() => setAgreeTerms(!agreeTerms)}
                  ></input>
                  <p>
                    By clicking sign up, you agree to our Terms of Use and
                    Privacy Policy.
                  </p>
                </div>

                <button
                  type="button"
                  className="signup-org-back-button"
                  onClick={(e) => {
                    e.preventDefault();
                    setPage(3);
                  }}
                >
                  Back
                </button>

                <button
                  type="submit"
                  className="signup-org-button"
                >
                  Sign up
                </button>
              </form>
            </div>
          </div>
        ) : (
          <p>null page</p>
        )}
      </section>
    </>
  );
};

export default SignUpOrg;
