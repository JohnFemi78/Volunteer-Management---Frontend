import api from "../api/axios";

export const getVolunteers = (data) => {
  return api.get("/volunteer/all", data);
};

export const getVolunteerById = (id) => {
  return api.get(`/volunteer/fetch/${id}`);
};

export const createVolunteer = (payload) => {
  return api.post("volunteer/create", payload);
};

export const updateVolunteer = (id, payload) => {
  return api.put(`/volunteer/update/${id}`, payload);
};

export const deleteVolunteer = (id) => {
  return api.delete(`/volunteer/remove/${id}`);
}


