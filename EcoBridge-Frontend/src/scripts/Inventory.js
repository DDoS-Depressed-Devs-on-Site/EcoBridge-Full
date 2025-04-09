import { API_URL } from "../../env";
import axios from "axios";

export class Inventory {
  constructor({
    inventory_id,
    tracking_no,
    organization_pub_key,
    sender_pub_key = null,
    category,
    item_name,
    qty = 1,
    obtained_in = new Date(),
  }) {
    this.inventory_id = inventory_id;
    this.tracking_no = tracking_no;
    this.organization_pub_key = organization_pub_key;
    this.sender_pub_key = sender_pub_key;
    this.category = category;
    this.item_name = item_name;
    this.qty = qty;
    this.obtained_in = obtained_in;
  }
}

export class InventoryAPIWrapper {
  static async getUserInventory(pubKey) {
    try {
      const response = await axios.get(
        `${API_URL}organization/inventory?pub_key=${pubKey}`
      );

      const inventoryData = response.data;
      const inventoryObjects = [];

      for (const i of inventoryData) {
        inventoryObjects.push(new Inventory(i));
      }

      return inventoryObjects;
    } catch (e) {
      console.log("Error while fetching user inventory", e);
      return null;
    }
  }

  static async getHistory(inventory_id){
    try{
      const response = await axios.get(`${API_URL}organization/inventory/history?inventory_id=${inventory_id}`)

      return response.data.history

    }catch(e){
      console.log("Error while getting history", e)
      return null
    }
  }

  static async updateInventory(inventory_id, new_qty) {
    const request = {
      inventory_id: inventory_id,
      new_qty: new_qty,
    };

    try {
      const response = await axios.post(
        `${API_URL}organization/inventory/update`,
        request
      );

      console.log(response);
      return response.data.inventory;
    } catch (e) {
      console.log("Error while updating inventory");
      return null;
    }
  }
}
