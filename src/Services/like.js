import api from "./apiConfig";

export const addLike = async (runId) => {
    try {
        const response = await api.post(`/runs/${runId}/like`)
        return response.data      
    } catch (error) {
        throw error
    }
}

export const removeLike = async (runId) => {
    try {
        const response = await api.delete(`/runs/${runId}/like`)
        return response.data      
    } catch (error) {
        throw error
    }
}