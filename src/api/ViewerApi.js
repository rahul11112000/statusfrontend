import axios from "axios";
const API_BASE_URL = "http://statusapplication.ap-south-1.elasticbeanstalk.com";

export const getApp = async (token) => {
    try {
        const response = await axios.get(`${API_BASE_URL}/viewer/application`, {
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

export const getViewerComponents = async (app_id,token) => {
    try {
        const response = await axios.get(`${API_BASE_URL}/viewer/get-all/component/${app_id}`, {
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

export const getViewerStatus = async (com_id,token) => {
    try {
        const response = await axios.get(`${API_BASE_URL}/viewer/get/status/${com_id}`, {
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