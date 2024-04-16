import {apiGet, postRequestUser} from "./request";

export const getProfile = (payload: Object, headers: any) => {
    return postRequestUser('/user/profile',payload, headers);   
}