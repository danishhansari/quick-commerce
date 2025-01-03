import {
  DeliveryPerson,
  Inventories,
  OrderData,
  Product,
  VerifyPayment,
  Warehouses,
} from "@/types";
import { api } from "./client";

export const createProduct = async (data: Product) => {
  const response = await api.post("/products", data, {
    headers: {
      "Content-Type": "multipart/form-data",
    },
  });
  return response.data;
};

export const getAllProducts = async () => {
  const response = await api.get("/products");
  return response.data;
};

export const getProductById = async (id: string) => {
  const response = await api.get(`/products/${id}`);
  return response.data;
};

export const createDeliveryPerson = async (data: DeliveryPerson) => {
  const response = await api.post("/delivery-person", data);
  return response.data;
};

export const getAllDeliveryPerson = async () => {
  const response = await api.get("/delivery-person");
  return response.data;
};

export const createInventory = async (data: Inventories) => {
  const response = await api.post("/inventories", data);
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

export const placeOrder = async (data: OrderData) => {
  const response = await api.post(`/orders`, data);
  return response.data;
};

export const verifyPayment = async (data: VerifyPayment) => {
  const response = await api.post(`/verify-payment`, data);
  return response.data;
};

export const getAllOrders = async () => {
  const response = await api.get(`/orders`);
  return response.data;
};

export const getAllMyOrders = async () => {
  const response = await api.get(`/my-orders`);
  return response.data;
};
