import { AxiosRequestConfig } from "axios";

export interface TypeListPost extends AxiosRequestConfig{
    page?: number,
    size?: number
}