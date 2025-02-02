import axios from "axios";
// import { ThemeConsumer } from "react-bootstrap/esm/ThemeProvider";

const API_BASE_URL = "http://statusapplication.ap-south-1.elasticbeanstalk.com";


export const getApp = async (token) => {
    try {
        const response = await axios.get(`${API_BASE_URL}/com-admin/application`, {
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

export const getComponents = async (app_id,token) => {
    try {
        const response = await axios.get(`${API_BASE_URL}/com-admin/get-all/component/${app_id}`, {
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

export const addComponent = async (app_id,profileData,token) => {
    try {
      const response = await axios.post(
        `${API_BASE_URL}/com-admin/create/component/${app_id}`,
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

  export const getComponent = async (com_id,token) => {
    try {
        const response = await axios.get(`${API_BASE_URL}/com-admin/get/component/${com_id}`, {
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


export const updateComponent = async (com_id,profileData, token) => {
    try {
      const response = await axios.put(
        `${API_BASE_URL}/com-admin/update/component/${com_id}`,
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

  export const deleteComponent = async (com_id,token) => {
    try {
      const response = await axios.delete(
        `${API_BASE_URL}/com-admin/delete/component/${com_id}`,
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