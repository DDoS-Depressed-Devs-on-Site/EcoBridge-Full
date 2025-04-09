import axios from "axios";
import { API_URL } from "../../env";

export class Organization {
  constructor({
    picture = "",
    cover_photo = "",
    pub_key = "",
    name = "",
    description = "",
    username = "",
    password = "",
    email = "",
    address = "",
    latitude = 0,
    Longitude = 0,
    contact_information_json = "",
    created_at = new Date(),
    verification_status = "Not Verified",
    population = 0,
    average_food_consumption = 0,
    average_water_consumption = 0,
    average_clothing_consumption = 0,
  }) {
    this.picture = picture;
    this.coverPhoto = cover_photo;

    this.pubKey = pub_key;
    this.name = name;
    this.description = description;

    this.username = username;
    this.password = password;
    this.email = email;

    this.address = address;
    this.latitude = latitude;
    this.longitude = Longitude;

    this.contactInformation = contact_information_json;

    this.createdAt = created_at;
    this.verificationStatus = verification_status;

    this.population = population;
    this.averageFoodConsumption = average_food_consumption;
    this.averageWaterConsumption = average_water_consumption;
    this.averageClothingConsumption = average_clothing_consumption;
  }
}

export class OrganizationApiWrapper {
  static async getOrganization(pubKey) {
    console.log(`${API_URL}organization/get?pub_key=${pubKey}`);
    try {
      const response = await axios.get(
        `${API_URL}organization/get?pub_key=${pubKey}`
      );
      console.log("Organization", response.data.organization);

      return new Organization(response.data.organization);
    } catch (e) {
      console.error("Error getting organization:", e.message);
    }
  }

  static async getAllOrganizations() {
    try {
        
      const response = await axios.get(`${API_URL}organization/get-all`);

      const organizations = response.data.organizations;

      const organization_objects = [];

      for (const org of organizations) {
        organization_objects.push(new Organization(org));
      }

      return organization_objects;
    } catch (e) {
      console.error("Error getting organization:", e.message);
    }
  }
}
