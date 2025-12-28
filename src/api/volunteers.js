import api from "../api/axios";

export const getVolunteers = async () => {
  const res = await api.get("/volunteer/all");
  return res.data;
};

export const getVolunteerById = async (id) => {
  const res = await api.get(`/volunteer/fetch/${id}`);
  return res.data;
};

export const createVolunteer = async (payload) => {
  const res = await api.post("volunteer/create", payload);
  return res.data;
};

export const updateVolunteer = async (id,payload) => {
  const res = await api.put(`/volunteer/update/${id}`, payload);
  return res.data;
};

export const deleteVolunteer = async (id) => {
  const res = await api.delete(`/volunteer/remove/${id}`);
  return res.data;
}


