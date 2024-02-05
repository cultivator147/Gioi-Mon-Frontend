import { AxiosRequestConfig } from "axios";

export interface TypeFilteredListStories extends AxiosRequestConfig{
    category_id ?: number,
    writing_state?: number,
    sort_by?: string,
    keyword?: string,
    page?: number,
    size?: number
}
export interface TypeTopStories extends AxiosRequestConfig{
    type ?: any;
}
export interface TypeSearch extends AxiosRequestConfig{
    keyword: any,
    page?: number,
    size?: number
}
