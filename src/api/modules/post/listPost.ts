import { TypeListPost } from "../../interfaces/listPost";
import request, { getAuthApi, postAuthApi } from "./request";

export const getListPost = (token: string, params?: TypeListPost) => {
    return getAuthApi('/list-post/', token, {params: params});
}
