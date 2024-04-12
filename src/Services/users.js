import api from "./apiConfig.js";

export const signUp = async (credentials) => {
  console.log(credentials)
  try {
    const resp = await api.post("/users/register/", credentials);
    localStorage.setItem("token", resp.data.access);
    return resp.data;
  } catch (error) {
    throw error;
  }
};

export const signIn = async (credentials) => {
  try {
    const resp = await api.post("/users/login/", credentials);
    localStorage.setItem("token", resp.data.access);
    return resp.data;
  } catch (error) {
    throw error;
  }
};

export const signOut = async () => {
  try {
    localStorage.removeItem("token");
    return true;
  } catch (error) {
    throw error;
  }
};

export const verifyUser = async () => {
  const token = localStorage.getItem("token");
  if (token) {
    const resp = await api.get("/users/token/refresh/");
    localStorage.setItem("token", resp.data.access);
    return resp.data;
  }
  return false;
};

export const getAllUsers = async (query = "") => {
  try {
    const url = query
      ? `/users/?search=${encodeURIComponent(query)}`
      : "/users/";
    const resp = await api.get(url);
    return resp.data;
  } catch (error) {
    throw error;
  }
};
