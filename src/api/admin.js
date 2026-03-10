import api from "./axios";

export const updateStaff = (id, payload) => {
    return api.put(`/update/${id}`, payload );
  };

  export const getAllStaff = (data) => {
    return api.get("/admin/user", data);
  }
  