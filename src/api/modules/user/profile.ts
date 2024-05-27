import {apiGet, getAuthApi, postRequestUser} from "./request";

export const getProfile = (payload: Object, headers: any) => {
    return postRequestUser('/user/profile',payload, headers);   
}

export const getUserCoin = (token: string) => {
    return getAuthApi('/payment/get-user-coin', token, {params: null});
}