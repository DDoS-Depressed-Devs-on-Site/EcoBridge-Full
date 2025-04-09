import React, { useContext, useEffect, useState } from "react";
import "./DonationPage.css";
import Navbar from "../../components/Navbar-no-gymnastic/Navbar";
import { DonationApiWrapper } from "../../scripts/Donation";
import UserContext, { User } from "../../scripts/Context/UserContext";
import { useNavigate } from "react-router-dom";
import OrgContext from "../../scripts/Context/OrgContext";
import { TbUserOff } from "react-icons/tb";

const DonationPage = () => {
  const navigate = useNavigate();

  const { user, setUser } = useContext(UserContext);
  const { org, setOrg } = useContext(OrgContext);
  const [recentDonationsShowAll, setRecentDonationsShowAll] = useState(false);
  const [yourDonationsShowAll, setYourDonationsShowAll] = useState(false);
  const [donationUpdateShowAll, setDonationUpdateShowAll] = useState(false);

  const [recentDonations, setRecentDonations] = useState([]);
  const [yourDonations, setYourDonations] = useState([]);

  const userorg = user || org;

  async function refresh() {
    if (userorg == null) {
      navigate("/login");
      return;
    }

    const donations = await DonationApiWrapper.getRecentDonations();

    if (donations != null) {
      console.log(donations);
      setRecentDonations(donations);
    } else {
      alert("Error while fetching donatiosn");
    }
    console.log(userorg);

    var donation2 = null;

    if (typeof userorg == User) {
      donation2 = await DonationApiWrapper.getUserRecentDonations(
        userorg.pubKey
      );
    } else {
      donation2 = await DonationApiWrapper.getOrgRecentDonations(
        userorg.pubKey
      );
    }

    if (donation2 != null) {
      console.log(donation2);
      setYourDonations(donation2);
    } else {
      alert("Error wile fetching your donations");
    }
  }

  useEffect(() => {
    refresh();
  }, []);

  const formatTimestamp = (timestamp) => {
    const date = new Date(timestamp * 1000);
    return date.toLocaleDateString("en-US", {
      year: "numeric",
      month: "short",
      day: "numeric",
    });
  };

  const dummyDonationUpdate = {
    donation_update: [
      {
        inventory_id: "INV001",
        qty_before_change: 10,
        change_in_qty: -2,
        qty_after_change: 8,
        date: "2025-04-08T10:00:00",
        date_obtained: "2025-04-08T09:50:00",
        organization: "Tahanan ng Pag-asa",
        item: "Rice",
        changed_on: "Jan 12, 2025",
      },
      {
        inventory_id: "INV002",
        qty_before_change: 5,
        change_in_qty: 3,
        qty_after_change: 8,
        date: "2025-04-08T11:30:00",
        date_obtained: "2025-04-08T11:00:00",
        organization: "Philippine Red Cross",
        item: "Canned Goods",
        changed_on: "Feb 11, 2025",
      },
      {
        inventory_id: "INV003",
        qty_before_change: 15,
        change_in_qty: -5,
        qty_after_change: 10,
        date: "2025-04-08T12:45:00",
        date_obtained: "2025-04-08T12:30:00",
        organization: "Gawad Kalinga",
        item: "Clothes",
        changed_on: "Feb 23, 2025",
      },
      {
        inventory_id: "INV004",
        qty_before_change: 0,
        change_in_qty: 10,
        qty_after_change: 10,
        date: "2025-04-08T13:15:00",
        date_obtained: "2025-04-08T13:00:00",
        organization: "Katuwang ng Bayan",
        item: "Blankets",
        changed_on: "Mar 3, 2025",
      },
      {
        inventory_id: "INV005",
        qty_before_change: 20,
        change_in_qty: -1,
        qty_after_change: 19,
        date: "2025-04-08T14:00:00",
        date_obtained: "2025-04-08T13:45:00",
        organization: "Libreng Pagkain",
        item: "Water Bottles",
        changed_on: "Mar 18, 2025",
      },
    ],
  };

  const filteredRecentDonations = recentDonationsShowAll
    ? recentDonations
    : recentDonations.slice(0, 10);

  const filteredYourDonations = yourDonationsShowAll
    ? yourDonations
    : yourDonations.slice(0, 4);

  const filteredDonationUpdate = donationUpdateShowAll
    ? dummyDonationUpdate.donation_update
    : dummyDonationUpdate.donation_update.slice(0, 4);

  return (
    <>
      <Navbar />
      <div className="donation-container">
        <div className="statistics-container">
          <h1>
            You've made a difference—{" "}
            <span className="h-span">25 times over.</span>
          </h1>
          <p>
            Thanks to your generous donations to{" "}
            <span className="p-span">
              {recentDonations.length} incredible organizations
            </span>
            , your impact has reached over{" "}
            <span className="p-span">100,000 lives</span>. Every contribution
            brings us one step closer to a world where help is always within
            reach.
          </p>
        </div>

        <div className="information-container">
          <div className="recent-donations-container">
            <div className="recent-donations-card">
              <h6>Recent Donations</h6>

              <table className="recent-donations-table">
                <thead>
                  <tr>
                    <th>From</th>
                    <th>Item</th>
                    <th>Hash</th>
                  </tr>
                </thead>

                <tbody>
                  {filteredRecentDonations.map((transaction, index) => (
                    <tr key={index}>
                      <td>{transaction.sender_pub_key.slice(0, 10)}...</td>
                      <td className="item-td">
                        {transaction.items.map((item, i) => (
                          <div key={i}>{item.category}</div>
                        ))}
                      </td>
                      <td>{transaction.transaction_hash.slice(0, 10)}...</td>
                    </tr>
                  ))}
                </tbody>
              </table>

              <button
                onClick={() =>
                  setRecentDonationsShowAll(!recentDonationsShowAll)
                }
                className="recent-donations-show-button"
              >
                {recentDonationsShowAll ? "View Less" : "View More"}
              </button>
            </div>
          </div>

          <div className="tracker-donations-container">
            <button
              type="button"
              className="new-donation-button"
              onClick={() => navigate("/maps")}
            >
              New Donation
            </button>

            <div className="your-donations-container">
              <h6>Your Donations</h6>

              <table className="your-donations-table">
                <thead>
                  <tr>
                    <th>Receiver</th>
                    <th>Status</th>
                    <th>Tracking Number</th>
                    <th>Est. Delivery Date</th>
                  </tr>
                </thead>

                <tbody>
                  {filteredYourDonations.map((transaction, index) => {
                    console.log(transaction);
                    return (
                      <tr key={index}>
                        <td>{transaction.reciever_pub_key.slice(0, 20)}...</td>
                        <td className="status-td">
                          {transaction.curr_state.status}
                        </td>
                        <td>{transaction.tracking_no}</td>
                        <td>{formatTimestamp(transaction.timestamp)}</td>
                        <td className="arrow-td">
                          <button
                            type="button"
                            className="arrow-button"
                            onClick={() => {
                              navigate("/transactions");
                              console.log("test");
                            }}
                          >
                            &gt;
                          </button>
                        </td>
                      </tr>
                    );
                  })}
                </tbody>
              </table>

              <div className="your-donations-button-container">
                <button
                  onClick={() => setYourDonationsShowAll(!yourDonationsShowAll)}
                  className="your-donations-show-button"
                >
                  {yourDonationsShowAll ? "View Less" : "View More"}
                </button>
              </div>
            </div>

            <div className="donation-update-container">
              <h6>Donations Update</h6>

              <table className="your-donations-table">
                <thead>
                  <tr>
                    <th>Organization</th>
                    <th>Current qty</th>
                    <th>Item</th>
                    <th>Changed on</th>
                  </tr>
                </thead>

                <tbody>
                  {filteredDonationUpdate.map((transaction, index) => (
                    <tr key={index}>
                      <td>{transaction.organization}</td>
                      <td className="current-qty-td">
                        {transaction.qty_after_change}
                        <sup> {transaction.change_in_qty}</sup>
                      </td>
                      <td>{transaction.item}</td>
                      <td>{transaction.changed_on}</td>
                      <td className="arrow-td">
                        <button type="button" className="arrow-button">
                          &gt;
                        </button>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>

              <div className="donation-update-button-container">
                <button
                  onClick={() =>
                    setDonationUpdateShowAll(!donationUpdateShowAll)
                  }
                  className="donation-update-show-button"
                >
                  {donationUpdateShowAll ? "View Less" : "View More"}
                </button>
              </div>
            </div>
          </div>
        </div>
      </div>
    </>
  );
};

export default DonationPage;
