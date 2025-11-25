import axios from 'axios';

const API_BASE_URL = 'http://localhost:5000';

const api = axios.create({
  baseURL: API_BASE_URL,
  headers: {
    'Content-Type': 'application/json',
  },
});

export const farmersAPI = {
  getFarmers: async () => {
    // Placeholder for API call
    return { data: [] };
  },
  
  getFarmer: async (id) => {
    // Placeholder for API call
    return { data: {} };
  },
  
  updateFarmer: async (id, data) => {
    // Placeholder for API call
    return { data: {} };
  }
};

export const advisoriesAPI = {
  getAdvisories: async () => {
    // Placeholder for API call
    return { data: [] };
  },
  
  createAdvisory: async (data) => {
    // Placeholder for API call
    console.log('API: Creating advisory', data);
    return { data: { id: Date.now(), ...data } };
  },
  
  updateAdvisory: async (id, data) => {
    // Placeholder for API call
    return { data: {} };
  },
  
  deleteAdvisory: async (id) => {
    // Placeholder for API call
    return { data: {} };
  }
};

export const weatherAPI = {
  getWeatherAlerts: async () => {
    try {
      const response = await api.get('/weather_alerts');
      return response.data;
    } catch (error) {
      console.error('Error fetching weather alerts:', error);
      return { alerts: [] };
    }
  }
};

export const statsAPI = {
  getDashboardStats: async () => {
    // Placeholder for API call
    return {
      data: {
        totalFarmers: 1247,
        activeAdvisories: 34,
        pendingRequests: 12
      }
    };
  }
};

export default api;