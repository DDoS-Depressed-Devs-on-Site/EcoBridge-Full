import { createContext, useState } from "react";

export class Organization {
  constructor({
    picture,
    cover_photo,
    pub_key,
    name,
    description,
    username,
    password,
    email,
    address,
    latitude,
    longitude,
    contact_information_json,
    population,
    average_food_consumption,
    average_water_consumption,
    average_clothing_consumption,
  }) {
    this.picture = picture; // Binary buffer
    this.coverPhoto = cover_photo; // Binary buffer

    this.pubKey = pub_key; // Unique, Primary Key
    this.name = name;
    this.description = description;

    this.username = username; // Unique
    this.password = password;

    this.email = email; // Unique
    this.address = address;
    this.latitude = latitude;
    this.longitude = longitude;

    this.contactInformation = contact_information_json; // JSON object

    this.population = population;
    this.averageFoodConsumption = average_food_consumption;
    this.averageWaterConsumption = average_water_consumption;
    this.averageClothingConsumption = average_clothing_consumption;
  }
}

const OrgContext = createContext(null);

export default OrgContext;

export function OrgContextProvider({ children }) {
  const [org, setOrg] = useState(null);

  return (
    <OrgContext.Provider value={{ org, setOrg }}>
      {children}
    </OrgContext.Provider>
  );
}
