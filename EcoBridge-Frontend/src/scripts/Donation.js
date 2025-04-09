import elliptic from "elliptic";
import axios from "axios";
import { BLOCKCHAIN_API_URL } from "../../env.js";

const EC = elliptic.ec;
const ec = new EC("secp256k1");

export class Item {
  constructor(category, name, qty) {
    this.category = category;
    this.name = name;
    this.qty = qty;
  }
}

export class State {
  constructor(hub_id, status, handler) {
    this.hub_id = hub_id;
    this.status = status;
    this.handler = handler;
  }
}

export class Transaction {
  constructor({
    transaction_hash,
    sender_pub_key,
    reciever_pub_key,
    tracking_no,
    timestamp,
    estimated_time_delivered,
    urgency,
    curr_state,
    items,
    prev_transaction_hash,
    signature,
  }) {
    this.transaction_hash = transaction_hash;
    this.sender_pub_key = sender_pub_key;
    this.reciever_pub_key = reciever_pub_key;
    this.tracking_no = tracking_no;
    this.timestamp = timestamp;
    this.estimated_time_delivered = estimated_time_delivered;
    this.urgency = urgency;
    this.curr_state = new State(
      curr_state.hub_id,
      curr_state.status,
      curr_state.handler
    );
    this.items = items.map(
      (item) => new Item(item.category, item.name, item.qty)
    );
    this.prev_transaction_hash = prev_transaction_hash;
    this.signature = signature;
  }
}

export class DonationApiWrapper {
  static async createDonation(
    sender_pub_key,
    sender_prv_key,
    reciever_pub_key,
    items
  ) {
    const request = {
      sender_pub_key: sender_pub_key,
      sender_prv_key: sender_prv_key,
      reciever_pub_ky: reciever_pub_key,
      items: items,
    };
    console.log(JSON.stringify(request));
    try {
      const response = await axios.post(
        `${BLOCKCHAIN_API_URL}transaction/create/new`,
        request
      );

      console.log("Succcssfully created donation: ", response.data);

      return response.data;
    } catch (e) {
      console.log("Error while creating new transaction", e);
      return null;
    }
  }

  static async getRecentDonations() {
    try {
      const response = await axios.get(
        `${BLOCKCHAIN_API_URL}transactions/get/latest`
      );

      const donations = response.data.transactions;

      const donationObjects = [];
      for (const d of donations) {
        donationObjects.push(new Transaction(d));
      }

      return donationObjects;
    } catch (e) {
      console.log("Error fetching recent donations", e);
      return null;
    }
  }

  static async getUserRecentDonations(pubKey) {
    try {
      const response = await axios.get(
        `${BLOCKCHAIN_API_URL}get-all-sent-transactions-tracking-number/${pubKey}`
      );
      const trackingNumbers = response.data.tracking_no;

      const donations_obj = [];
      for (const no of trackingNumbers) {
        const response = await axios.get(
          `${BLOCKCHAIN_API_URL}transaction/get/{tracking_no}?trackin_no=${no}`
        );
        const latest = response.data.history[0];
        donations_obj.push(new Transaction(latest));
      }

      return donations_obj;
    } catch (e) {
      console.log("Error while fetching users recent donations", e);
      return null;
    }
  }

  static async getOrgRecentDonations(pubKey) {
    try {
      console.log(
        `${BLOCKCHAIN_API_URL}get-all-recieved-transactions-tracking-number/${pubKey}`
      );
      const response = await axios.get(
        `${BLOCKCHAIN_API_URL}get-all-recieved-transactions-tracking-number/${pubKey}`
      );
      const trackingNumbers = response.data.tracking_no;

      const donations_obj = [];
      for (const no of trackingNumbers) {
        const response = await axios.get(
          `${BLOCKCHAIN_API_URL}transaction/get/{tracking_no}?trackin_no=${no}`
        );
        const latest = response.data.history[0];
        donations_obj.push(new Transaction(latest));
      }

      return donations_obj;
    } catch (e) {
      console.log("Error while fetching users recent donations", e);
      return null;
    }
  }
}

// console.log(
//   DonationApiWrapper.getUserRecentDonations(
//     "3ed7e803054c2d88c53ee3bc7bcef161cf4342f013639401d47f9b703490868da18c9a45ed5ee9659a1266569668c7e4bb31f8cf0a7c6fe5c6053f9736bdd8be"
//   )
// );
