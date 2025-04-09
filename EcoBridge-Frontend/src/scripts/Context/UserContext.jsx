import { createContext, useState } from "react";

export class User {
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
    contact_information,
    eco_points = 0,
    created_at = new Date(),
    rank,
  }) {
    this.picture = picture; // Expected to be a binary buffer
    this.coverPhoto = cover_photo; // Expected to be a binary buffer

    this.pubKey = pub_key; // Unique, Primary Key
    this.name = name;
    this.description = description;

    this.username = username; // Unique
    this.password = password;

    this.email = email; // Unique
    this.address = address;
    this.contactInformation = contact_information; // JSON object
    this.ecoPoints = eco_points;
    this.createdAt = created_at;

    this.rank = rank; // FK to a "ranks" table
  }
}

const UserContext = createContext(null);

export default UserContext;

export function UserContextProvider({ children }) {
  const [user, setUser] = useState(null);

  return (
    <UserContext.Provider value={{ user, setUser }}>
      {children}
    </UserContext.Provider>
  );
}
