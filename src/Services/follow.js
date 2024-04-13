import api from "./apiConfig";

export const getFollowers = async (profileId) => {
  // getting the followers endpoint from the backend based on the profleID
  try {
    const response = await api.get(`/profile/${profileId}/follow-list/`);
    return response.data.followers;
  } catch (error) {
    throw error;
  }
};

export const getFollowing = async (profileId) => {
  try {
    // getting the following endpoint from the backend based on the profleID
    const response = await api.get(`/profile/${profileId}/follow-list/`);
    return response.data.following;
  } catch (error) {
    throw error;
  }
};

export const createFollow = async (
  follower_profile_id,
  following_profile_id
) => {
  try {
    const response = await api.post(
      `profile/${follower_profile_id}/follow/${following_profile_id}/`
    );
    return response.data;
  } catch (error) {
    throw error;
  }
};

export const deleteFollow = async (
  follower_profile_id,
  following_profile_id
) => {
  try {
    const response = await api.delete(
      `profile/${follower_profile_id}/unfollow/${following_profile_id}/`
    );
    return response.data;
  } catch (error) {
    throw error;
  }
};