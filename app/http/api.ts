import { api } from "./client";

export const getAllProducts = async () => {
  const response = await api.get("/products");
  console.log(response);
  return response.data;
};
