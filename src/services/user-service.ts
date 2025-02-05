import { requestBackend } from "../utils/requests";

export function findMe() {
  return requestBackend({ url: `/users/me` });
}