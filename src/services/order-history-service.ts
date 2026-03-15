import { AxiosRequestConfig } from "axios";
import { requestBackend } from "../utils/requests";

type FindPageParams = {
  page: number;
  size?: number;
  email?: string;
};

export function findPageRequest({ page, size = 10, email }: FindPageParams) {
  const params: Record<string, unknown> = { page, size };
  if (email) params.email = email;

  const config: AxiosRequestConfig = {
    url: "/order-history",
    withCredentials: true,
    params,
  };

  return requestBackend(config);
}
