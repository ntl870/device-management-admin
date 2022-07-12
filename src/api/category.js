import { axiosClient } from "./axios";

export const getCategories = (values) =>
  axiosClient.get("/api/categories", values);
