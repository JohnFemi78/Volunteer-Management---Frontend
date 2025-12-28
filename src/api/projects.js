import api from "./axios";

export const getProjectById = async (id) => {
  const response = await api.get(`/projects/${id}`);
  return response.data;
};

export const getProjects = async () => {
  const response = await api.get("/projects");
  return response.data;
};

export const updateProject = async (id, payload) => {
  const response = await api.update(`/projects/${id}`, payload);
  return response.data;
};

export const createProject = async (payload) => {
  const response = await api.post("/projects", payload);
  return response.data;
};

export const deleteProjectById = async (id) => {
  const response = await api.delete(`/projects/${id}`);
  return response.data;
}



