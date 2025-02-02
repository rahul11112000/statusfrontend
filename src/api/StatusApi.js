import axios from "axios";
// import { ThemeConsumer } from "react-bootstrap/esm/ThemeProvider";

const API_BASE_URL = "http://applicationstatus.us-east-1.elasticbeanstalk.com";

export const getApp = async (token) => {
    try {
        const response = await axios.get(`${API_BASE_URL}/status/application`, {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        });
    
        return response.data;
      } catch (error) {
        console.error("Error:", error.response?.data || error.message);
        throw error;
      }
};

export const getStatusComponents = async (app_id,token) => {
    try {
        const response = await axios.get(`${API_BASE_URL}/status/get-all/component/${app_id}`, {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        });
    
        return response.data;
      } catch (error) {
        console.error("Error:", error.response?.data || error.message);
        throw error;
      }
};


export const getStatus = async (com_id,token) => {
    try {
        const response = await axios.get(`${API_BASE_URL}/status/get-all/status/${com_id}`, {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        });
    
        return response.data;
      } catch (error) {
        console.error("Error:", error.response?.data || error.message);
        throw error;
      }
};

export const getStatu = async (status_id,token) => {
    try {
        const response = await axios.get(`${API_BASE_URL}/status/get/status/${status_id}`, {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        });
    
        return response.data;
      } catch (error) {
        console.error("Error:", error.response?.data || error.message);
        throw error;
      }
};

export const addStatus = async (com_id,profileData,token) => {
    try {
      const response = await axios.post(
        `${API_BASE_URL}/status/create/status/${com_id}`,
        profileData,
        {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        }
      );
  
      return response.data;
    } catch (error) {
      console.error("Error:", error.response?.data || error.message);
      throw error;
    }
  };

  export const updateStatus = async (status_id,profileData,token) => {
    try {
      const response = await axios.put(
        `${API_BASE_URL}/status/update/status/${status_id}`,
        profileData,
        {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        }
      );
  
      return response.data;
    } catch (error) {
      console.error("Error:", error.response?.data || error.message);
      throw error;
    }
  };

  export const deleteStatus = async (status_id,token) => {
    try {
      const response = await axios.delete(
        `${API_BASE_URL}/status/delete/status/${status_id}`,
        {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        }
      );
  
      return response.data;
    } catch (error) {
      console.error("Error:", error.response?.data || error.message);
      throw error;
    }
  };