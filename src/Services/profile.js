import api from "./apiConfig.js";

  export const getUser = async (profileId) => {
    try {
      const resp = await api.get(`profile/${profileId}/`);
      return resp.data;
    } catch (error) {
      console.error("Error getting user: ", error);
    }
  };
  export const editUser = async (profileId, updatedUserData) => {
    try {
      const resp = await api.patch(`/profile/${profileId}/`, updatedUserData);
      return resp.data;
    } catch (error) {
      console.error("Error updating user: ", error);
    }
  };
  export const deleteUser = async (profileId) => {
    try {
      const resp = await api.delete(`/profile/${profileId}/`);
      return resp.data;
    } catch (error) {
      console.error("Error deleting user: ", error);
    }
  };
