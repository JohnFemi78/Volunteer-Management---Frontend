import api from "./axios";

export const createAssign = async (payload) => {
  const response = await api.post("/assigns", payload);
  return response.data;
}

export const updateAssignById = async (id, payload) => {
  const response = await api.put(`/assigns/${id}`, payload);
  return response.data;
};

export const getAssigns = async () => {
  const response = await api.get("/assigns");
  return response.data;
};

export const getAssignsById = async (id) => {
  const response = await api.get(`/assigns/${id}`);
  return response.data;
};

export const deleteAssignsById = async (id) => {
  const response = await api.delete(`/assigns/${id}`);
  return response.data;
};






