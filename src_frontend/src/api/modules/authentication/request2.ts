import axios from "axios";
import { useSelector } from "react-redux";
import { getUserSelector } from "../../../redux-toolkit/slice/userSlice/selector";
import { GM_STORIES_URL, GM_USER_URL } from "../../constant.url";
import { BaseResponse } from "../../../utils/http/response";

export const postRequest = async (url: string, payload: any, header: any) => {
  try {
    url = GM_USER_URL + url;
    const { data } = await axios.post<BaseResponse>(url, payload, {headers: header});
    return data;
  } catch (error) {
    if (axios.isAxiosError(error)) {
      console.log('error: ', error);
    } else {
      console.log('error: ', 'undefined');
    }
    const response: BaseResponse = {
      data: undefined,
      code: 1,
      status: 500,
      message: 'system_error',
    };
    return response;
  }
};