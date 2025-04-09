import React, { useState, useEffect, useRef } from "react";
import "./RequestStyle.css";
import donateData from "../../data/transactions.json";
import { IoSearch } from "react-icons/io5";
import { MdKeyboardArrowRight } from "react-icons/md";
import { InventoryAPIWrapper } from "../../scripts/Inventory";

const RequestContent = () => {
  const [isActive, setActive] = useState(false);
  const [isItemActive, setItemActive] = useState(false);
  const [selectedRequest, setSelectedRequest] = useState(null);

  const sideWindowRef = useRef(null);

  const [formData, setFormData] = useState({
    category: "",
    itemName: "",
    quantity: 1,
  });

  const showWindow = (transaction) => {
    setSelectedRequest(transaction);
    setItemActive(true);
  };

  useEffect(() => {
    const handleClickOutside = (event) => {
      if (
        sideWindowRef.current &&
        !sideWindowRef.current.contains(event.target)
      ) {
        setActive(false);
        setItemActive(false);
        setSelectedRequest(null);
      }
    };

    if (isActive || isItemActive) {
      document.addEventListener("mousedown", handleClickOutside);
    } else {
      document.removeEventListener("mousedown", handleClickOutside);
    }

    return () => {
      document.removeEventListener("mousedown", handleClickOutside);
    };
  }, [isActive, isItemActive]);

  const handleQuantityChange = (e) => {
    const value = parseInt(e.target.value, 10);

    if (!isNaN(value) && value >= 1) {
      setFormData((prev) => ({ ...prev, quantity: value }));
    }
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
            <IoSearch className="icon text-[1rem] absolute top-1/2 transform -translate-y-1/2 right-[2rem]" />
            <button
              onClick={() => {
                {
                  setActive(true);
                }
              }}
              className="new-donate-btn absolute top-1/2 transform -translate-y-1/2 -right-60 cursor-pointer w-48 h-[2.5rem] rounded-[8px] text-white font-semibold"
            >
              Request Item
            </button>
          </div>
          <div className="transaction-container min-w-[220px] w-full max-w-[94%] max-h-[100vw] overflow-y-auto">
            <div className="label-container grid grid-cols-6 gap-1">
              <p className="transaction-label text-left">Organization</p>
              <p className="transaction-label">Category</p>
              <p className="transaction-label">Item Name</p>
              <p className="transaction-label">Qty</p>
              <p className="transaction-label">Date of Request</p>
            </div>

            {donateData.your_donations.map((transaction, index) => (
              <div
                key={index}
                className="details-div grid grid-cols-6 gap-1 relative w-[70vw]"
              >
                <p className="data-label overflow-hidden text-ellipsis">
                  {transaction.sender_pub_key}
                </p>
                <p className="data-label text-center">N/A</p>{" "}
                {/** PALAGAY NALANG NG CATEGORY */}
                <p className="data-label">{transaction.items?.[0]?.name}</p>
                <p className="data-label">{transaction.items?.[0]?.qty}</p>
                <p className="data-label text-center">
                  {transaction.timestamp}
                </p>
                {/* PALAGAY NALANG NUNG PARA SA EST. DELIVERY DATE TY*/}
                <MdKeyboardArrowRight
                  onClick={() => {
                    console.log("clicked", transaction);
                    showWindow(transaction);
                  }}
                  className="arrow text-2xl fill-aunflower cursor-pointer"
                />
              </div>
            ))}
          </div>
        </div>

        {isActive && (
          <div
            ref={sideWindowRef}
            className="side-window-container w-[100%] max-w-[30vw] mr-8 rounded-xl shadow-[0_3px_10px_rgb(0,0,0,0.2)] h-[32rem] overflow-y-auto"
          >
            <h2 className="name-header text-left m-5 font-semibold text-2xl">
              Request Item
            </h2>
            <form className="item-form-container flex flex-col justify-end flex-grow">
              <label className="container-label">
                <p className="font-semibold ml-6">Category</p>
                <input
                  type="text"
                  value={formData.category}
                  name="category"
                  placeholder="Item Category"
                  className="p-1 m-[.5rem_1.3rem] pl-3"
                  onChange={(e) =>
                    setFormData((prev) => ({
                      ...prev,
                      category: e.target.value,
                    }))
                  }
                  required
                />
              </label>
              <label className="container-label">
                <p className="font-semibold ml-6">Item Name</p>
                <input
                  type="text"
                  value={formData.itemName}
                  name="itemName"
                  placeholder="Item Name"
                  className="p-1 m-[.5rem_1.3rem] pl-3"
                  onChange={(e) =>
                    setFormData((prev) => ({
                      ...prev,
                      category: e.target.value,
                    }))
                  }
                  required
                />
              </label>

              <label className="flex flex-col justify-center items-center  mt-[3rem]">
                <p className="font-semibold text-center mb-3">Qty</p>
                <div className="flex items-center space-x-2 justify-center mb-10">
                  <button
                    type="button"
                    onClick={() =>
                      setFormData((prev) => ({
                        ...prev,
                        quantity: Math.max(1, prev.quantity - 1),
                      }))
                    }
                    className="red-highlight font-bold text-[36px]"
                  >
                    -
                  </button>
                  <input
                    type="number"
                    value={formData.quantity}
                    name="quantity"
                    onChange={handleQuantityChange}
                    min={1}
                    className="w-[25%] h-[5rem] text-2xl font-bold text-center p-2 rounded-none"
                  />
                  <button
                    type="button"
                    onClick={() =>
                      setFormData((prev) => ({
                        ...prev,
                        quantity: Math.max(prev.quantity + 1),
                      }))
                    }
                    className="green-highlight font-bold text-[2rem]"
                  >
                    +
                  </button>
                </div>
              </label>

              <button className="new-donate-btn items-center justify-center text-white h-[3rem] rounded-lg w-[10rem] font-semibold self-center mt-auto">
                Save
              </button>
            </form>
          </div>
        )}

        {isItemActive && selectedRequest && (
          <div
            ref={sideWindowRef}
            className="side-window-container w-[100%] max-w-[30vw] mr-8 rounded-xl shadow-[0_3px_10px_rgb(0,0,0,0.2)] h-[32rem] overflow-y-auto"
          >
            <h2 className="name-header text-left m-5 font-semibold text-2xl">
              {selectedRequest.items?.[0]?.name || "Item Name"}
            </h2>
            <div className="window-details-div flex flex-col gap-3 relative m-8">
              <p className="data-label">
                <strong>Tracking No.:</strong> {selectedRequest.tracking_no}
              </p>
              <p className="data-label">
                <strong>Request Id.:</strong> {selectedRequest.request_id}
              </p>
              <p className="data-label">
                <strong>Est. Delivery Date:</strong> N/A
              </p>
              {/* PALAGAY NALANG NUNG PARA SA EST. DELIVERY DATE TY*/}
            </div>
            <form className="item-form-container flex flex-col justify-end flex-grow">
              <label className="flex flex-col justify-center items-center">
                <p className="font-semibold text-center mb-3">Qty</p>
                <div className="flex items-center space-x-2 justify-center mb-10">
                  <button
                    type="button"
                    onClick={() =>
                      setFormData((prev) => ({
                        ...prev,
                        quantity: Math.max(1, prev.quantity - 1),
                      }))
                    }
                    className="red-highlight font-bold text-[36px]"
                  >
                    -
                  </button>
                  <input
                    type="number"
                    value={formData.quantity}
                    name="quantity"
                    min={1}
                    onChange={handleQuantityChange}
                    className="w-[20%] h-[3rem] text-base font-bold text-center p-2 rounded-none"
                  />
                  <button
                    type="button"
                    onClick={() =>
                      setFormData((prev) => ({
                        ...prev,
                        quantity: Math.max(prev.quantity + 1),
                      }))
                    }
                    className="green-highlight font-bold text-[2rem]"
                  >
                    +
                  </button>
                </div>
              </label>

              <div className="items-donated-container">
                <p className="font-semibold  ml-12 mb-1">History</p>
                <div className="label-container grid grid-cols-2 font-semibold">
                  <p className="text-left ml-12">Date</p>
                  <p className="text-right mr-12">Change</p>
                </div>
              </div>

              <div className="win-div grid grid-cols-2 relative mt-2 p-[0_3.1rem] overflow-y-auto scrolling">
                <p className="text-left mt-2">Hello</p>
                <p className="text-right mt-2">32</p>
              </div>

              <button className="new-donate-btn items-center justify-center text-white h-[3rem] rounded-lg w-[10rem] font-semibold self-center mt-[3rem]">
                Save
              </button>
            </form>
          </div>
        )}
      </div>
    </>
  );
};

export default RequestContent;
