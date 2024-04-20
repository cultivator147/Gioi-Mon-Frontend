import axios from 'axios';
import { GM_POST_URL } from '../../constant.url';
import { CreateApiCaller } from '../../config';
const request = axios.create({
    baseURL: GM_POST_URL,
    timeout: 8000,
    headers: {'Content-Type': 'application/json'},
});
export const requestWithAuth = (token: string) => {
    return CreateApiCaller({
        baseURL: GM_POST_URL,
        timeout: 8000,
        headers: {'Content-Type': 'application/json'}},
        {auth: true, token: token}
    );
}
    
export const postAuthApi = (url: string,token: string, payload: object) => {
    return requestWithAuth(token).post(url, payload);
}
export const getAuthApi = (url: string,token:string, params: object) => {
    return requestWithAuth(token).get(url,  params);
}

export default request;