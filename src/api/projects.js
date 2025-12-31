import api from "./axios";

export const getProjectById = (id) => {
  return api.get(`/project/${id}`);
};

export const getProjects = (data) => {
  return api.get("/project/all", data);
};

export const updateProject = (id, payload) => {
  return api.put(`/project/update/${id}`, payload);
};

export const createProject = (payload) => {
  return api.post("/project/create", payload);
};

export const deleteProjectById = (id) => {
  return api.delete(`/project/remove/${id}`);
}



