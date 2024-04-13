import api from "./apiConfig";

export const addComment = async (runId, commentContent, userId) => {
    try {
        const payload = {
            comment: commentContent,
            run: runId,
            profile: userId  // Assuming you have access to the user's ID
        };
        const response = await api.post(`/runs/${runId}/comment/`, payload);
        return response.data;
    } catch (error) {
        console.error("Error adding comment:", error.response.data); // Log or handle error response data
        throw error;
    }
}


export const listComment = async (runId) => {
    try {
        const response = await api.get(`/runs/${runId}/comment/`)
        return response.data        
    } catch (error) {
        throw error
    }
}