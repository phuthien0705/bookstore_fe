import httpRequest from "./../services/httpRequest";

export const getAllGenre = async () => {
  return httpRequest.get("/admin/genres");
};
export const getAllGenreClient = async () => {
  return httpRequest.get("/genres");
};
export const editGenre = async (id, data) => {
  return httpRequest.put(`/admin/genres/${id}`, data);
};
export const deleteGenre = async (id) => {
  return httpRequest.delete(`/admin/genres/${id}`);
};
export const createGenre = async (data) => {
  return httpRequest.post("/admin/genres", data);
};
