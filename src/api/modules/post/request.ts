import axios from 'axios';
import { GM_POST_URL } from '../../constant.url';
const request = axios.create({
    baseURL: GM_POST_URL,
    timeout: 8000,
    headers: {'Content-Type': 'application/json'},
});
export default request;