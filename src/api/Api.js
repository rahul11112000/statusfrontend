import axios from "axios";
// import { ThemeConsumer } from "react-bootstrap/esm/ThemeProvider";

const API_BASE_URL = "http://statusapplication.ap-south-1.elasticbeanstalk.com";

export const signUp = async (formData) => {
  try {
    const response = await axios.post(`${API_BASE_URL}/sign-up`, formData);
    return response.data; // Return data received from the backend
  } catch (error) {
    console.error(
      "Error during sign-up:",
      error.response?.data || error.message
    );
    throw error; // Re-throw the error for further handling
  }
};

export const login = async (formData) => {
  try {
    const authHeader = `Basic ${btoa(
      `${formData.email}:${formData.password}`
    )}`;

    const response = await axios.post(
      `${API_BASE_URL}/token`,
      {},
      {
        headers: {
          Authorization: authHeader,
        },
      }
    );

    return response.data;
  } catch (error) {
    console.error("Error:", error.response?.data || error.message);
    throw error;
  }
};


export const Applications = async (token) => {
    try {
      const response = await axios.get(`${API_BASE_URL}/app-admin/get-all/app`, {
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

  export const getApplication = async (app_id, token) => {
    try {
      const response = await axios.get(`${API_BASE_URL}/app-admin/get/app/${app_id}`, {
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


  export const updateApplication = async (app_id,profileData, token) => {
    try {
      const response = await axios.put(
        `${API_BASE_URL}/app-admin/update/app/${app_id}`,
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

  export const deleteApplication = async (app_id,token) => {
    try {
      const response = await axios.delete(
        `${API_BASE_URL}/app-admin/delete/app/${app_id}`,
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

  export const addApplication = async (profileData,token) => {
    try {
      const response = await axios.post(
        `${API_BASE_URL}/app-admin/create/app`,
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