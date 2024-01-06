import { AxiosRequestConfig } from "axios";

export interface TypeFilteredListStories extends AxiosRequestConfig{
    categoryId ?: number,
    writingState?: number,
    sortBy?: string,
    page?: number,
    size?: number
}
