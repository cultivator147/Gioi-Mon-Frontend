import {apiGet} from "./request";

export const getProfile = (headers: any) => {
    return apiGet('/profile', headers);   
}