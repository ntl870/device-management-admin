import { axiosClient } from "./axios";

export const createProduct = (values) =>
  axiosClient.post("/api/products", values);

export const getListProducts = () => axiosClient.get("/api/products");

export const deleteProduct = (id) => axiosClient.delete(`/api/products/${id}`);

export const getProductById = (id) => axiosClient.get(`/api/products/${id}`);

export const updateProductById = (values, id) =>
  axiosClient.patch(`/api/products/${id}`);
