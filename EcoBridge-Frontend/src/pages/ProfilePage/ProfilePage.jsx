import React, { useState, useContext, useEffect } from "react";
import "./ProfilePage.scss";
import profilePic from "../../assets/profilepagepfp.png";
import copyPic from "../../assets/copy.png";
import profileBG from "../../assets/bgprofilepage.png";
import verifiedIcon from "../../assets/verifiedicon.png";
import gawadKalingaIcon from "../../assets/gawadKalinga-logo.png";
import pbspIcon from "../../assets/PBSP-logo.png";
import redCrossIcon from "../../assets/redCross-logo.png";
import tahananIcon from "../../assets/tahanan-logo.png";
import OrgContext from "../../scripts/Context/OrgContext";
import Navbar from "../../components/Navbar-no-gymnastic/Navbar";
import { InventoryAPIWrapper } from "../../scripts/Inventory";
import { useNavigate } from "react-router-dom";
import { getRequest } from "../../scripts/Request";

const ProfilePage = () => {
  const navigate = useNavigate();

  const { org, setOrg } = useContext(OrgContext);

  const [contactInformation, setContactInformation] = useState("0900 000 0000");
  const [inventory, setInventory] = useState([]);
  const [requests, setRequests] = useState([]);
  async function refresh() {
    if (org == null) {
      alert("org is null");
      navigate("/login");
    }

    const inv = await InventoryAPIWrapper.getUserInventory(org.pubKey);
    const reqs = await getRequest(org.pubKey);

    console.log(inv);
    if (inv != null) {
      console.log(inv);
      setInventory(inv);
    } else {
      alert("Error while fetching inventory");
    }

    console.log(org.pubKey);
    console.log(reqs);
    if (reqs != null) {
      setRequests(reqs);
    } else {
      alert("Error while fetching requests");
    }
  }

  useEffect(() => {
    refresh();
  }, []);

  const handleCopy = () => {
    navigator.clipboard
      .writeText(org.pubKey)
      .then(() => alert("Public key copied!"))
      .catch((err) => console.error("Copy failed:", err));
  };

  return (
    <>
      <Navbar />
      <div className="container">
        <div className="column ngo-profile">
          <img
            src={`data:image/png;base64,${org.coverPhoto}`}
            alt="Abot-Kamay-Foundation"
            className="profile-bg"
          />
          <img
            src={`data:image/png;base64,${org.picture}`}
            alt="Abot-Kamay-Foundation"
            className="profile-pic"
          />
          <h2 className="user-name">
            {org.username}
            <img src={verifiedIcon} alt="Verified" className="verified-icon" />
          </h2>

          <div className="public-key-wrapper">
            <button className="copy-button" onClick={handleCopy}>
              <img src={copyPic} alt="Copy" />
            </button>
            <span className="public-key">{org.pubKey.slice(0, 20)}...</span>
          </div>

          <div className="profile-details">
            <p className="user-bio">{org.description}</p>
            <p className="email">
              <span className="email-label">Email </span>{" "}
              <span className="email-state">{org.email}</span>
            </p>
            <p className="contact-information">
              <span>Contact Information </span> {contactInformation}
            </p>
            <p className="address">
              <span>Address </span> {org.address}
            </p>
          </div>
        </div>

        <div className="column request-menu">
          <div className="request-donation-container">
            <p className="request">Request</p>
            <button className="bg-[#2ecc71] text-white p-3 rounded-2xl transition-transform hover:scale-105 active:scale-95">
              New Donation
            </button>
          </div>

          <table className="request-table">
            <thead>
              <tr>
                <th>Category</th>
                <th>Item</th>
                <th>Qty</th>
                <th>Date Requested</th>
                <th>Urgency</th>
              </tr>
            </thead>
            <tbody>
              {requests && requests.length > 0 ? (
                requests.map((req, index) => (
                  <tr key={index}>
                    <td>{req.category}</td>
                    <td>{req.item_name}</td>
                    <td>{req.qty}</td>
                    <td>
                      {new Date(req.requested_date).toLocaleDateString(
                        undefined,
                        {
                          year: "numeric",
                          month: "short",
                          day: "numeric",
                          hour: "numeric",
                          minute: "2-digit",
                          hour12: true,
                        }
                      )}
                    </td>
                    <td>{req.urgency || "Urgent"}</td>
                  </tr>
                ))
              ) : (
                <tr>
                  <td colSpan="5" style={{ textAlign: "center" }}>
                    No requests found.
                  </td>
                </tr>
              )}
            </tbody>
          </table>

          <p className="view-more-text">View More</p>

          <div className="inventory-container">
            <p className="inventory">Inventory</p>
          </div>

          <table className="inventory-table">
            <thead>
              <tr>
                <th>Category</th>
                <th>Item</th>
                <th>Qty</th>
                <th>Obtained By</th>
                <th>Tracking No</th>
              </tr>
            </thead>
            <tbody>
              {inventory.map((inv, index) => (
                <tr onClick={() => navigate("/profile/inventory")}>
                  <td>{inv.item_name}</td>
                  <td>{inv.category}</td>
                  <td>{inv.qty}</td>
                  <td>
                    {new Date(inv.obtained_in).toLocaleString(undefined, {
                      year: "numeric",
                      month: "short",
                      day: "numeric",
                      hour: "numeric",
                      minute: "2-digit",
                      hour12: true,
                    })}
                  </td>
                  <td>{inv.tracking_no}</td>
                </tr>
              ))}
            </tbody>
          </table>

          <p className="view-more-text">View More</p>
        </div>

        <div className="column organization">
          <p>Similar Organizations</p>
          <div className="org-profiles">
            <img src={pbspIcon} alt="Organization" className="org-pfp" />
            <div className="org-info">
              <span className="org-name">
                Philippine Business for Social Progress (PBSP)
              </span>
              <p></p>
              <span className="org-description">
                Bridging businesses with social development
              </span>
            </div>
          </div>
          <div className="org-profiles">
            <img
              src={gawadKalingaIcon}
              alt="Organization"
              className="org-pfp"
            />
            <div className="org-info">
              <span className="org-name">Gawad Kalinga</span>
              <p></p>
              <span className="org-description">
                Empowering communities to break free from poverty
              </span>
            </div>
          </div>
          <div className="org-profiles">
            <img src={redCrossIcon} alt="Organization" className="org-pfp" />
            <div className="org-info">
              <span className="org-name">Philippine Red Cross</span>
              <p></p>
              <span className="org-description">
                Delivering humanitarian aid and emergency services nationwide
              </span>
            </div>
          </div>
          <div className="org-profiles">
            <img src={tahananIcon} alt="Organization" className="org-pfp" />
            <div className="org-info">
              <span className="org-name">
                Tahanan ng Pagmamahal Children's Home, Inc.
              </span>
              <p></p>
              <span className="org-description">
                Providing care for abandoned and neglected children
              </span>
            </div>
          </div>
        </div>
      </div>
    </>
  );
};

export default ProfilePage;
