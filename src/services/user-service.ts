import { requestBackend } from "../utils/requests";
import * as authService from "../services/auth-service.ts";

export function findMe() {

  const headers = {
    Authorization: "Bearer " + authService.getAccessToken() 
  }

  return requestBackend({ url: `/users/me` , headers: headers });
}