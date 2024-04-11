import api from "./apiConfig.js";

export const createRun = async (profileId, runData) => {
  try {
    const response = await api.post(`runs/${profileId}/create/`, runData);
    return response.data;
  } catch (error) {
    throw error;
  }
};
