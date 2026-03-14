import { AxiosRequestConfig } from "axios";
import { requestBackend } from "../utils/requests";
import { ProductDTO } from "../models/product";

export function findPageRequest(
  page: number,
  name: string,
  categoryId: number,
  sort: string,
  size?: number,
) {
  const config: AxiosRequestConfig = {
    method: "GET",
    url: "/products",
    params: {
      page,
      name,
      categoryId,
      sort,
      size: size ?? 12,
    },
  };

  return requestBackend(config);
}

export function findFeaturedRequest() {
  return requestBackend({ url: "/products/featured" });
}

export function findById(id: number) {
  return requestBackend({ url: `/products/${id}` });
}

export function deleteById(productId: number) {
  const config: AxiosRequestConfig = {
    method: "DELETE",
    url: `/products/${productId}`,
    withCredentials: true
  }

  return requestBackend(config);
}

export function updateRequest(obj: ProductDTO){
  const config: AxiosRequestConfig = {
    method: "PUT",
    url: `/products/${obj.id}`,
    withCredentials: true,
    data: obj
  }

  return requestBackend(config)
}

export function insertRequest(obj: ProductDTO){
  const config: AxiosRequestConfig = {
    method: "POST",
    url: `/products`,
    withCredentials: true,
    data: obj
  }

  return requestBackend(config)
}

