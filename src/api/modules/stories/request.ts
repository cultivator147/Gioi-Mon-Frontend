import axios from 'axios';
import { GM_STORIES_URL } from '../../constant.url';
const request = axios.create({
    baseURL: GM_STORIES_URL,
    timeout: 8000,
    headers: {Accept: '*/*', 'Content-Type': 'application/json'},
});
export default request;