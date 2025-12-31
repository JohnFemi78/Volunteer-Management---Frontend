import api from "./axios";

export const loginUser = (data) => {
  return api.post("/auth/login", data);
}

export const getUser =(data) => {
  return api.get("/user/all", data);
};

export const getUserById = async (id) => {
  const res = await api.get(`/user/${id}`);
  return res.data;
};

export const createUser = async (payload) => {
  const res = await api.post("/user/register", payload);
  return res.data;
};

export const updateUser = async (id,payload) => {
  const res = await api.put(`/user/update/${id}`, payload);
  return res.data;
};

export const deleteUser = async (id) => {
  const res = await api.delete(`/user/remove/${id}`);
  return res.data;
}


