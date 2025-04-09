import { API_URL } from "../../env";
import axios from "axios";

export const getRequest = async (orgPubKey) => {
    try {
        const response = await axios.get(`${API_URL}organization/request`, {
            params: { pub_key: orgPubKey },
        });
  
      return response.data.requests;
    } catch (error) {
      console.log("Error fetching requests:", error);
      return null;
    }
  };