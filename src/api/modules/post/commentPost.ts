import { TypeCommentPost } from "../../interfaces/commentPost";
import { postAuthApi } from "./request";

export const createComment = (token: string, payload: TypeCommentPost) => {
    return postAuthApi('/comment/create',token, payload);
}
export const getComments = (token: string, payload: TypeCommentPost) => {
    return postAuthApi( '/comment/get-all', token, payload);
}