import { TypeCreatePost } from "../../interfaces/createPost";
import { TypeFavPost } from "../../interfaces/post";
import request, { postAuthApi } from "./request";

export const favPost = (token: string, payload: TypeFavPost) => {
    return postAuthApi('/post/fav-post',token, payload);
}
export const createPost = (token: string, payload: TypeCreatePost) => {
    return postAuthApi('/post/',token, payload);
}