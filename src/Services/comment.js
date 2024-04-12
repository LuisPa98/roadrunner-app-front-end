import api from "./apiConfig";

export const addComment = async (runId) => {
    try {
        const response = await api.post(`/runs/${runId}/comment`)
        return response.data      
    } catch (error) {
        throw error
    }
}

export const listComment = async (runId) => {
    try {
        const response = await api.get(`/runs/${runId}/comment`)
        return response.data        
    } catch (error) {
        throw error
    }
}