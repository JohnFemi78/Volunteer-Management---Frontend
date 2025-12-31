import api from "./axios";

export const createAssign = (payload) => {
  return api.post("/volunteerProject/create", payload);
};

export const updateAssignById = (id, payload) => {
  return api.put(`/volunteerProject/update/${id}`, payload);
};

export const getAssigns = (data) => {
  return api.get("/volunteerProject/all", data);
};

export const getAssignsById = (id) => {
  return api.get(`/volunteerProject/${id}`);
};

export const deleteAssignsById = (id) => {
  return api.delete(`/volunteerProject/remove/${id}`);
};






