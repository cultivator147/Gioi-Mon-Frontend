import { TypeLoginRequest } from "../../interfaces/auth";
import request from "./request";
export const loginRequest = (params: TypeLoginRequest) => request.post('/auth/login', params);
export const registerRequest = (params: TypeLoginRequest) => request.post('/auth/register', params);
