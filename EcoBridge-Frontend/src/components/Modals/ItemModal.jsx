import React, { useContext, useEffect, useState } from "react";
import "./DonateModal.scss";
import orgInfo from "../../data/partnerLocation.json";
import EcoBridgeLogo from "../../assets/EcoBridge.png";
import {
  Organization,
  OrganizationApiWrapper,
} from "../../scripts/Organization";
import { DonationApiWrapper } from "../../scripts/Donation";
import UserContext from "../../scripts/Context/UserContext";

const ItemModal = ({ isOpen, onClose, location }) => {
  const { user, setUser } = useContext(UserContext);
  const [organization, setOrganization] = useState(new Organization({}));
  const [organizationPubKey, setOrganizationPubKey] = useState(location.pubKey);
  const [privateKey, setPrivateKey] = useState("");
  const [urgencyLevel, setUrgencylevel] = useState("");
  const [items, setItems] = useState([]);

  async function get() {
    const org = await OrganizationApiWrapper.getOrganization(
      organizationPubKey
    );
    if (org != null) {
      setOrganization(org);
      console.log("My organization: ", org);
    } else {
      console.log("failed org");
    }
  }

  useEffect(() => {
    get();
  }, []);

  const handleItemChange = (index, e) => {
    const { name, value } = e.target;
    const updatedItems = [...items];
    updatedItems[index][name] = value;
    setItems((prev) => updatedItems);
  };

  const addItem = () => {
    setItems((prev) => [...prev, { category: "", name: "", qty: "" }]);
  };

  const removeItem = (index) => {
    const updatedItems = items.filter((_, i) => i !== index);
    setItems(updatedItems);
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    console.log(user);
    const result = await DonationApiWrapper.createDonation(
      user.pubKey,
      privateKey,
      organizationPubKey,
      items
    );
    alert(result);
  };

  if (!isOpen) return null;

  return (
    <div className="donation-modal fixed z-50 inset-0 p-3 bg-white">
      <div className="logo-div m-3">
        <img src={EcoBridgeLogo} className="flex h-9"></img>

        <p className="tagline">Connecting Resources, Empowering Communities</p>
      </div>

      <div className="modal-container">
        <form className="p-0 form-container grid">
          <div className="p-0 left-div">
            <label className="label-container">
              <h2 className="name-label font-semibold text-3xl">
                Organization Details
              </h2>
              <input
                type="text"
                name="organizationPublicKey"
                value={organizationPubKey}
                onChange={(e) => setOrganizationPubKey(e.target.value)}
                placeholder="Organization Public Key"
                className="user-input"
                required
              />

              <h2 className="name-label font-semibold text-2xl">Details</h2>
              <p className="p-label">
                <strong>Organization Name:</strong> {organization.name}
              </p>

              <p>
                <strong>Address:</strong> {organization.address}
              </p>
              <p>
                <strong>Email:</strong> {organization.email}
              </p>
              <p>
                <strong>Contact:</strong> {organization.contactInformation}
              </p>
              <p>
                <strong>Population:</strong> {organization.population}
              </p>
            </label>
            <input
              type="text"
              name="yourPrvlicKey"
              value={privateKey}
              onChange={(e) => setPrivateKey(e.target.value)}
              placeholder="Your Private key"
              className="user-input"
              required
            />
            <label className="label-container">
              <p className="p-label font-normal text-2xl">Urgency Level</p>
              <select
                className="user-input"
                name="urgencyLevel"
                placeholder="Urgent"
                value={urgencyLevel}
                onChange={(e) => setUrgencylevel(e.target.value)}
                required
              >
                <option value="">Select Urgency Level</option>
                <option value="Urgent">Urgent Same day delivery</option>
                <option value="Priority">Priority 1-2 Days delivery</option>
                <option value="Least Priority">
                  Least Priority 5 Days - 2 Weeks delivery
                </option>
              </select>
            </label>
          </div>

          <div className="right-div pl-10">
            <div className="item-selection">
              <div className="fixed-header relative ">
                <h2 className=" font-semibold text-3xl">Items</h2>
                <div
                  onClick={addItem}
                  className=" bg-[#2ECC71] flex justify-center items-center w-44 h-10 mr-32 mb-5 pl-0 rounded-lg mt-8 transition-transform duration-200 hover:scale-105 hover:drop-shadow-lg active:scale-95"
                >
                  <p className="text-white font-semibold text-center">
                    Add Item
                  </p>
                </div>
              </div>
              <div className="scrollable-div mt-6">
                {items.map((item, index) => (
                  <div key={index} className="item-entry h-[100px] relative">
                    <label className="label-container">
                      <p className="p-label font-normal text-2xl">Item Type</p>
                      <select
                        name="category"
                        value={item.category}
                        onChange={(e) => handleItemChange(index, e)}
                        className="item-type"
                        required
                      >
                        <option value="" disabled>
                          Select Item Type
                        </option>
                        <option value="Food">Food</option>
                        <option value="Clothes">Clothes</option>
                        <option value="Household Items">Household Items</option>
                        <option value="Water">Water</option>
                        <option value="Medical Supplies">
                          Medical Supplies
                        </option>
                      </select>
                    </label>
                    <label className="label-container">
                      <p className="p-label font-normal text-2xl">Item Name</p>
                      <input
                        type="text"
                        name="name"
                        value={item.name}
                        onChange={(e) => handleItemChange(index, e)}
                        placeholder="Canned Goods"
                        className="item-name"
                        required
                      />
                    </label>
                    <label className="label-container">
                      <p className="p-label font-normal text-2xl">Quantity</p>
                      <input
                        type="number"
                        name="qty"
                        value={item.qty}
                        onChange={(e) => handleItemChange(index, e)}
                        placeholder="Qty"
                        min="1"
                        className="quantity"
                        required
                      />
                    </label>
                    {items.length > 1 && (
                      <div
                        onClick={() => removeItem(index)}
                        className="absolute right-0 top-3  bg-red-500 flex justify-center items-center p-2 px-5 mb-10 h-10 ml-0 pl-0 rounded-lg mt-8 transition-transform duration-200 hover:scale-105 hover:drop-shadow-lg active:scale-95"
                      >
                        <p className="text-white font-semibold text-center w-full ml-4">
                          Remove
                        </p>
                      </div>
                    )}
                  </div>
                ))}
              </div>
            </div>
            <div className="button-container flex justify-center ">
              <div
                onClick={onClose}
                className="bg-[#FFC107] flex justify-center items-center w-44 h-16 ml-0 pl-0 rounded-lg  transition-transform duration-200 hover:scale-105 hover:drop-shadow-lg active:scale-95"
              >
                <p className="text-white font-semibold text-center">Cancel</p>
              </div>
              <div
                onClick={handleSubmit}
                className="bg-[#2ECC71] flex justify-center items-center w-44 h-16 ml-0 pl-0 rounded-lg  transition-transform duration-200 hover:scale-105 hover:drop-shadow-lg active:scale-95"
              >
                <p className="text-white font-semibold text-center">Donate</p>
              </div>
            </div>
          </div>
        </form>
      </div>
    </div>
  );
};

export default ItemModal;
