import { TypeListPost } from "../../interfaces/listPost";
import request from "./request";

export const getListPost = (params?: TypeListPost) => {
    return request.get('/list-post/', {params: params});
}
