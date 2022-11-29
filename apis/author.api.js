import httpRequest from "./../services/httpRequest";

export const getAllAuthor = async () => {
  return httpRequest.get("/admin/authors");
};
export const getAllAuthorClient = async () => {
  return httpRequest.get("/authors");
};
export const editAuthor = async (id, data) => {
  return httpRequest.put(`/admin/authors/${id}`, data);
};
export const deleteAuthor = async (id) => {
  return httpRequest.delete(`/admin/authors/${id}`);
};
export const createAuthor = async (data) => {
  return httpRequest.post("/admin/authors", data);
};
