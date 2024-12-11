import { Warehouses } from "@/types";
import { api } from "./client";

export const getAllProducts = async () => {
  const response = await api.get("/products");
  return response.data;
};

export const createProduct = async (data: FormData) => {
  const response = await api.post("/products", data, {
    headers: {
      "Content-Type": "multipart/form-data",
    },
  });
  return response.data;
};

export const getAllInventories = async () => {
  const response = await api.get("/inventories");
  return response.data;
};

export const createWarehouse = async (data: Warehouses) => {
  const response = await api.post("/warehouses", data);
  return response.data;
};

export const getAllWarehouses = async () => {
  const response = await api.get("/warehouses");
  console.log(response.data);
  return response.data;
};

export const getAllDeliveryPerson = async () => {
  const response = await api.get("/delivery-person");
  return response.data;
};
