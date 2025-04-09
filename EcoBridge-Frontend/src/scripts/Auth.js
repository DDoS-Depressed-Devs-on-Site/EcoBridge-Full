import axios from "axios";
import { API_URL } from "../../env";
import { CgBoy } from "react-icons/cg";

export const userLogin = async (email, password) => {
  try {
    const response = await axios.post(`${API_URL}users/login`, {
      email,
      password,
    });

    if (response.status >= 200 && response.status < 300) {
      console.log("Login response:", response.data);
      return response.data;
    } else {
      console.error("Login failed. Status code:", response.status);
      return null;
    }
  } catch (e) {
    console.error("Login error:", e.message);
    return null;
  }
};

export const userSignUp = async (
  nameOfUser,
  username,
  email,
  password,
  contact,
  address,
  profilePic,
  coverPic
) => {
  try {
    const formData = new FormData();

    const userData = {
      name: nameOfUser,
      username: username,
      password: password,
      email: email,
      address: address,
      contact_information: contact,
      description: "Volunteer",
    };

    formData.append("create_data", JSON.stringify(userData));
    formData.append("picture", profilePic);
    formData.append("cover_photo", coverPic);

    const response = await axios.post(`${API_URL}users/create`, formData, {
      headers: {
        "Content-Type": "multipart/form-data",
      },
    });

    console.log(response.data);

    return response.data.User.private_key;
  } catch (error) {
    console.error("Sign-up error:", error.message);
    return null;
  }
};

export const orgSignUp = async (
  orgName,
  email,
  password,
  contactInfo,
  address,
  profilePic,
  coverPhoto,
  description,
  population,
  avgFood,
  avgWater,
  avgCloth,
  location
) => {
  try {
    const formData = new FormData();

    const orgData = {
      name: orgName,
      description: description,
      username: orgName,
      password: password,
      email: email,
      address: address,
      latitude: location[0],
      longitude: location[1],
      contact_information_json: contactInfo,
      population: population,
      average_food_consumption: avgFood,
      average_water_consumption: avgWater,
      average_clothing_consumption: avgCloth,
    };

    formData.append("request", JSON.stringify(orgData));
    formData.append("picture", profilePic);
    formData.append("cover_photo", coverPhoto);

    const response = await axios.post(
      `${API_URL}organization/signup`,
      formData,
      {
        headers: {
          "Content-Type": "multipart/form-data",
        },
      }
    );

    return response.data;
  } catch (e) {
    console.error("Sign-up error:", error.message);
    return null;
  }
};

export const orgLogin = async(email, password) => {
  try {
    const response = await axios.post(`${API_URL}organization/login`,{
      email,
      password,
    });

    if (response.status >= 200 && response.status < 300){
      console.log("Login response:", response.data);
      return response.data;
    } else {
      console.error("Login failed, Status code: ", response.status);
      return null;
    }
  }catch (e) {
    console.error("Login error:", e.message);
    return null;
  }
}
