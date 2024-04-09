import axios from 'axios';
import { GM_USER_URL } from '../../constant.url';
const request = axios.create({
    baseURL: GM_USER_URL,
    timeout: 8000,
    headers: {'Content-Type': 'application/json'},
});
export default request;