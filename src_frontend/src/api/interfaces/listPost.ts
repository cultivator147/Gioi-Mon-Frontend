import { AxiosRequestConfig } from "axios";

export interface TypeListPost extends AxiosRequestConfig{
    friend_id?: number,
    page?: number,
    size?: number,
    storyId?: any,
    filterBy?: any,    // 0: ALL, 1: Top yêu thích, 2: Top bình luận
    favouriteStatus?: any, //0: Tất cả, 1: Đã thích, 2: Chưa thích
    sortBy?: any, //0: Tất cả, 1: Mới nhất, 2: Cũ nhất
}