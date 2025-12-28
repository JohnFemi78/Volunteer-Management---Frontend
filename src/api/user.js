import api from "./axios";

export const getUser = async () => {
  const res = await api.get("/user/all");
  return res.data;
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


