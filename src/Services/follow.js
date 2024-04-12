import api from "./apiConfig";

export const getFollowers = async (profileId) => {
        // getting the followers endpoint from the backend based on the profleID
    try {
        const response = await api.get(`/profile/${profileId}/follow-list/`);
        return response.data.followers
    } catch (error) {
        throw error;
    }
}

export const getFollowing = async (profileId) => {
    try {
        // getting the following endpoint from the backend based on the profleID
        const response = await api.get(`/profile/${profileId}/follow-list/`);
        return response.data.following
    } catch (error) {
        throw error;        
    }
}