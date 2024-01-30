import { AxiosRequestConfig } from "axios";

export interface TypeFilteredListStories extends AxiosRequestConfig{
    category_id ?: number,
    writing_state?: number,
    sortBy?: string,
    page?: number,
    size?: number
}
export interface TypeTopStories extends AxiosRequestConfig{
    orderBy ?: any;
}
