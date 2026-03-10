import { requestBackend } from "../utils/requests";
import { AxiosRequestConfig } from "axios";
import { RegisterDTO } from "../models/user";

export function register(data: RegisterDTO) {
  const config: AxiosRequestConfig = {
    method: "POST",
    url: "/users/register",
    data,
  };

  return requestBackend(config);
}

export function findMe() {


  const config : AxiosRequestConfig = {
      url: `/users/me`,
      withCredentials: true
  }

  return requestBackend(config);
}