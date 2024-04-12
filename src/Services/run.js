import api from "./apiConfig.js";

export const createRun = async (profileId, runData) => {
  try {
    const response = await api.post(`runs/${profileId}/create/`, runData);
    return response.data;
  } catch (error) {
    throw error;
  }
};

export const getFeedRuns = async () => {
  try {
    const response = await api.get('/runs/feed/')
    return response.data
  } catch (error) {
    throw error;    
  }
}

export const userRuns = async (profileId) => {
  try {
    const response = await api.get(`/runs/${profileId}/`)
    return response.data
  } catch (error) {
    throw error;    
  }
}