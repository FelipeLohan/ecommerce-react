import { AxiosRequestConfig } from "axios";
import { requestBackend } from "../utils/requests";
import { CategoryDTO } from "../models/category";

export function findAllRequest() {
  const config: AxiosRequestConfig = {
    method: "GET",
    url: "/categories",
  };

  return requestBackend(config);
}

export function insertRequest(obj: CategoryDTO) {
  const config: AxiosRequestConfig = {
    method: "POST",
    url: "/categories",
    withCredentials: true,
    data: obj,
  };

  return requestBackend(config);
}

export function updateRequest(obj: CategoryDTO) {
  const config: AxiosRequestConfig = {
    method: "PUT",
    url: `/categories/${obj.id}`,
    withCredentials: true,
    data: obj,
  };

  return requestBackend(config);
}

export function deleteById(categoryId: number) {
  const config: AxiosRequestConfig = {
    method: "DELETE",
    url: `/categories/${categoryId}`,
    withCredentials: true,
  };

  return requestBackend(config);
}