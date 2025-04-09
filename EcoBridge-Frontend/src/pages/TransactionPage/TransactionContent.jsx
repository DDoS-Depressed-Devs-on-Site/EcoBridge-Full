import React, { useState, useEffect, useRef, useContext } from "react";
import "./TransactionPage.css";
// import donations from "../../data/transactions.json";
import { Link, useNavigate } from "react-router";
import { IoSearch } from "react-icons/io5";
import { MdKeyboardArrowRight } from "react-icons/md";
import UserContext from "../../scripts/Context/UserContext";
import { DonationApiWrapper } from "../../scripts/Donation";
import OrgContext from "../../scripts/Context/OrgContext";

const TransactionContent = () => {
  const navigate = useNavigate();
  const { user, setUser } = useContext(UserContext);
  const { org, setOrg } = useContext(OrgContext);
  const [isActive, setActive] = useState(false);
  const [selectedTransaction, setSelectedTransaction] = useState(null);

  const [donations, setDonations] = useState([]);

  async function refresh() {
    if (user == null) {
      if (org == null) {
        alert("session timeout ");
        navigate("/login");
        return;
      }
      navigate("/transactions/sender");
    }

    const donations2 = await DonationApiWrapper.getUserRecentDonations(
      user.pubKey
    );

    if (donations2 != null) {
      console.log(donations2);
      setDonations(donations2);
    } else {
      alert("Error wile fetching your donations");
    }
  }

  useEffect(() => {
    refresh();
  }, []);

  const sideWindowRef = useRef(null);

  const showWindow = (transaction) => {
    setSelectedTransaction(transaction);
    setActive(true);
  };

  useEffect(() => {
    const handleClickOutside = (event) => {
      if (
        sideWindowRef.current &&
        !sideWindowRef.current.contains(event.target)
      ) {
        setActive(false);
        setSelectedTransaction(transaction);
      }
    };

    if (isActive) {
      document.addEventListener("mousedown", handleClickOutside);
    } else {
      document.removeEventListener("mousedown", handleClickOutside);
    }

    return () => {
      document.removeEventListener("mousedown", handleClickOutside);
    };
  }, [isActive]);

  const copyToClipboard = (text) => {
    navigator.clipboard.writeText(text);
    alert("Public key copied!");
  };

  return (
    <>
      <div className="hub-container flex flex-row justify-between p-[1rem] max-w-[100%] overflow-x-hidden">
        <div className="main-container w-[80%] max-w-[100%] pl-8 h-[37vw] pr-5">
          <div className="search-container relative w-[60%] text-center pb-0">
            <input
              type="text"
              className="search-id border-2 border-solid rounded-[7px] focus:outline-none focus:ring-0 w-full pl-10"
              placeholder="Search Tracking ID"
            />
            <IoSearch className="icon text-[1rem] absolute top-1/2 transform -translate-y-1/2 right-1" />

            <Link to="/maps">
              <button className="new-donate-btn absolute top-1/2 transform -translate-y-1/2 -right-60 cursor-pointer w-48 h-[2.5rem] rounded-[8px] text-white font-semibold">
                New Donation
              </button>
            </Link>
          </div>
          <div className="transaction-container min-w-[220px] w-full max-w-[95%] max-h-[100vw] overflow-y-auto">
            <div className="label-container grid grid-cols-6 gap-1">
              <p className="text-left font-semibold">Receiver</p>
              <p className="transaction-label">Status</p>
              <p className="transaction-label">Current Location</p>
              <p className="transaction-label">Tracking Number</p>
              <p className="transaction-label">Est. Delivery Date</p>
            </div>

            {donations.map((transaction, index) => (
              <div
                key={index}
                className="details-div grid grid-cols-6 gap-8 relative"
              >
                <p
                  onClick={() => copyToClipboard(transaction.reciever_pub_key)}
                  className="data-label overflow-hidden text-ellipsis cursor-pointer"
                >
                  {transaction.reciever_pub_key}
                </p>
                <p className="data-label">{transaction.curr_state.status}</p>
                <p className="data-label">HUB001</p>
                <p className="data-label text-blue-800">
                  {transaction.tracking_no}
                </p>
                <p className="data-label">
                  {new Date().toJSON().slice(0, 10).replace(/-/g, "/")}
                </p>
                {/* PALAGAY NALANG NUNG PARA SA EST. DELIVERY DATE TY*/}
                <MdKeyboardArrowRight
                  onClick={() => {
                    console.log(
                      "Arrow clicked! Showing window for:",
                      transaction
                    );
                    showWindow(transaction);
                  }}
                  className="arrow text-2xl fill-aunflower cursor-pointer"
                />
              </div>
            ))}
          </div>
        </div>

        {isActive && selectedTransaction && (
          <div
            ref={sideWindowRef}
            className="side-window-container w-[100%] max-w-[30vw] mr-8 rounded-xl shadow-[0_3px_10px_rgb(0,0,0,0.2)] h-[32rem] overflow-y-auto"
          >
            <h2 className="name-header text-center m-5 font-semibold text-2xl overflow-hidden text-ellipsis">
              {selectedTransaction.reciever_pub_key}
            </h2>
            <div className="window-details-div flex flex-col gap-3 relative m-8">
              <p className="data-label">
                <strong>Tracking No.:</strong> {selectedTransaction.tracking_no}
              </p>
              <p className="data-label">
                <strong>Est. Delivery Date:</strong>{" "}
                {new Date().toJSON().slice(0, 10).replace(/-/g, "/")}
              </p>
              {/* PALAGAY NALANG NUNG PARA SA EST. DELIVERY DATE TY*/}
              <p className="data-label">
                <strong>Status:</strong> {selectedTransaction.curr_state.status}
              </p>
              <p className="data-label text-blue-800">
                <strong>Current Location:</strong>{" "}
                {selectedTransaction.curr_state.hub_id}
              </p>
            </div>
            <div className="items-donated-container">
              <div className="label-container grid grid-cols-2 font-semibold">
                <p className="text-left ml-12">Items</p>
                <p className="text-right mr-12">Qty</p>
              </div>
            </div>

            {selectedTransaction.items.map((item, indexItem) => (
              <div
                key={indexItem}
                className="win-div grid grid-cols-2 relative mt-2 p-[0_3rem]"
              >
                <p className="text-left mt-2">{item.name}</p>
                <p className="text-right mt-2">{item.qty}</p>
              </div>
            ))}
          </div>
        )}
      </div>
    </>
  );
};

export default TransactionContent;
