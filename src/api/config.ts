import axios, { CreateAxiosDefaults } from "axios";
import { rehydration, store } from "../redux-toolkit/configureStore";

rehydration();
export const CreateApiCaller = (config: CreateAxiosDefaults, {auth = false, token = ''}) => {
    const apiCaller = axios.create(config);
    apiCaller.interceptors.request.use(config => {
        if(auth){
            config.headers.Authorization = token;
        }
        return config;
    }, error => {
        console.log('error from frontend');
        Promise.reject(error);
    }
);
    return apiCaller;
};