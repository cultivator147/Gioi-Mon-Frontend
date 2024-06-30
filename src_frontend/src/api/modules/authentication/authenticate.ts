import { TypeLoginRequest } from "../../interfaces/auth";
import { postRequest } from "./request2";

export const loginRequest = (params: TypeLoginRequest) => {
  return postRequest("/auth/login", params, {
    'Content-Type': 'application/json',
  });
};
export const registerRequest = (params: TypeLoginRequest) => {

  return postRequest("/auth/register", params, {
    'Content-Type': 'application/json',
  });
};
