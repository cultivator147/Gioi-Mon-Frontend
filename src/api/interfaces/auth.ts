import { AxiosRequestConfig } from "axios";

export interface TypeLoginRequest extends AxiosRequestConfig {
    username: string;
    password: string;
};