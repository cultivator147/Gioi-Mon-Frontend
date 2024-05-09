import { AxiosRequestConfig } from "axios";

export interface TypeListPost extends AxiosRequestConfig{
    friend_id?: number,
    page?: number,
    size?: number
}