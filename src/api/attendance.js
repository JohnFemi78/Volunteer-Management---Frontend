import api from "./axios";

export const createAttendance = (payload) => {
  return api.post("/attendance/create", payload);
};
//attendance should not be editable
// export const updateAttendance = async (id, payload) => {
//   const response = await api.put(`/attendance/${id}`, payload);
//   return response.data;
// };

export const getAttendanceById = (id) => {
  return api.get(`/attendance/fetch/${id}`);
};

export const getAttendance = () => {
  return api.get("/attendance/all");
};

export const deleteAttendanceById = (id) => {
  return api.delete(`/attendance/remove/${id}`);
};
