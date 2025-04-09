import React, { useState } from "react";
import "./ProfilePageNGO.scss";
import profilePic from '../../../assets/profilepagepfp.png';
import copyPic from '../../../assets/copy.png';
import profileBG from '../../../assets/bgprofilepage.png';
import verifiedIcon from '../../../assets/verifiedicon.png';
import gawadKalingaIcon from '../../../assets/gawadKalinga-logo.png';
import pbspIcon from '../../../assets/PBSP-logo.png';
import redCrossIcon from '../../../assets/redCross-logo.png';
import tahananIcon from '../../../assets/tahanan-logo.png';



const ProfilePage = () => {
  const [userName, setUsername] = useState('Abot Kamay Foundation');
  const [publicKey, setPublicKey] = useState('266671bab2deeea2eeeq122444ffccv12444');
  const [userBio, setUserbio] = useState('Abot Kamay Foundation is a dedicated food bank and housing initiative committed to providing daily nourishment and support to those in need. Through the generosity of donors and volunteers, we distribute food to vulnerable individuals and families every day, ensuring no one goes to bed hungry. Our mission is to alleviate food insecurity and offer a helping hand to..... See more');
  const [email, setEmail] = useState('lenithepinkiegirlie@gmail.com');
  const [contactInformation, setContactInformation] = useState('0900 000 0000');
  const [address, setAddress] = useState('123 Maginhawa St., Quezon City, Metro Manila');

  const handleCopy = () => {
    navigator.clipboard.writeText(publicKey)
      .then(() => alert("Public key copied!"))
      .catch((err) => console.error("Copy failed:", err));
  };

  return (
    <div className="container">
      <div className="column ngo-profile">
        <img src={profileBG} alt="Abot-Kamay-Foundation" className="profile-bg" />
        <img src={profilePic} alt="Abot-Kamay-Foundation" className="profile-pic" />
        <h2 className="user-name">
          {userName}
          <img src={verifiedIcon} alt="Verified" className="verified-icon" />
        </h2>

        <div className="public-key-wrapper">
          <button className="copy-button" onClick={handleCopy}>
            <img src={copyPic} alt="Copy" />
          </button>
          <span className="public-key">{publicKey}</span>
        </div>

        <div className="profile-details">
          <p className="user-bio">{userBio}</p>
          <p className="email"><span className="email-label">Email </span> <span className="email-state">{email}</span></p>
          <p className="contact-information"><span>Contact Information </span> {contactInformation}</p>
          <p className="address"><span>Address </span> {address}</p>
        </div>
      </div>

      <div className="column request-menu">
        <div className="request-donation-container">
          <p className="request">Request</p>
          <button className="edit-button">Edit</button>
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
            <tr>
              <td>Food</td>
              <td>Rice</td>
              <td>50</td>
              <td>April 24 2025</td>
              <td>High</td>
            </tr>
            <tr>
              <td>Clothing</td>
              <td>Blankets</td>
              <td>30</td>
              <td>April 24 2025</td>
              <td>Medium</td>
            </tr>
            <tr>
              <td>Food</td>
              <td>Canned Goods</td>
              <td>100</td>
              <td>April 24 2025</td>
              <td>Low</td>
            </tr>
          </tbody>
        </table>

        <p className="view-more-text">View More</p>

        <div className="inventory-container">
          <p className="inventory">Inventory</p>
          <button className="edit-button">Edit</button>
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
            <tr>
              <td>Canned Beans</td>
              <td>Food</td>
              <td>200</td>
              <td>April 24 2025</td>
              <td>ZOK12MKlO</td>
            </tr>
            <tr>
              <td>Blankets</td>
              <td>Clothing</td>
              <td>150</td>
              <td>April 24 2025</td>
              <td>ZOK12MKlO</td>
            </tr>
            <tr>
              <td>Rice Pack</td>
              <td>Food</td>
              <td>100</td>
              <td>April 24 2025</td>
              <td>ZOK12MKlO</td>
            </tr>
          </tbody>
        </table>

        <p className="view-more-text">View More</p>
      </div>

      <div className="column organization">
        <p>Similar Organizations</p>
        <div className="org-profiles">
          <img src={pbspIcon} alt="Organization" className="org-pfp" />
          <div className="org-info">
            <span className="org-name">Philippine Business for Social Progress (PBSP)</span>
            <p></p>
            <span className="org-description">Bridging businesses with social development</span>
          </div>
        </div>
        <div className="org-profiles">
          <img src={gawadKalingaIcon} alt="Organization" className="org-pfp" />
          <div className="org-info">
            <span className="org-name">Gawad Kalinga</span>
            <p></p>
            <span className="org-description">Empowering communities to break free from poverty</span>
          </div>
        </div>
        <div className="org-profiles">
          <img src={redCrossIcon} alt="Organization" className="org-pfp" />
          <div className="org-info">
            <span className="org-name">Philippine Red Cross</span>
            <p></p>
            <span className="org-description">Delivering humanitarian aid and emergency services nationwide</span>
          </div>
        </div>
        <div className="org-profiles">
          <img src={tahananIcon} alt="Organization" className="org-pfp" />
          <div className="org-info">
            <span className="org-name">Tahanan ng Pagmamahal Children's Home, Inc.</span>
            <p></p>
            <span className="org-description">Providing care for abandoned and neglected children</span>
          </div>
        </div>
      </div>
    </div>
  );
};

export default ProfilePage;
