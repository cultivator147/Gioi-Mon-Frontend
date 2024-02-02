import { AxiosRequestConfig } from "axios";

export interface TypeFilteredListStories extends AxiosRequestConfig{
    category_id ?: number,
    writing_state?: number,
    sort_by?: string,
    page?: number,
    size?: number
}
export interface TypeTopStories extends AxiosRequestConfig{
    orderBy ?: any;
}
