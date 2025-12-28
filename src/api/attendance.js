import api from "axios";

export const createAttendance = async (payload) => {
  const response = await api.post("/attendance", payload);
  return response.data;
};
//attendance should not be editable
// export const updateAttendance = async (id, payload) => {
//   const response = await api.put(`/attendance/${id}`, payload);
//   return response.data;
// };

export const getAttendanceById = async (id) => {
  const response = await api.put(`/attendance/${id}`)
  return response.data;
};

export const getAttendance = async () => {
    const response = await api.put("/attendance");
    return response.data;
};

export const deleteAttendanceById = async (id) => {
  const response = await api.delete(`/attendance/${id}`)
  return response.data;
};


