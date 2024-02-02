import axios from "axios";
import { useSelector } from "react-redux";
import { getUserSelector } from "../../../redux-toolkit/slice/userSlice/selector";
import { GM_USER_URL } from "../../constant.url";
import { BaseResponse } from "../../../utils/http/response";

export const apiGet = async (url: string, header: any) => {
  try {
    url = GM_USER_URL + url;
    const { data } = await axios.get(url, { headers: header });
    return data;
  } catch (error) {
    if (axios.isAxiosError(error)) {
      console.log('error: ', error.message);
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

export const apiPost = async (url: string, payload: any, header: any) => {
  try {
    url = GM_USER_URL + url;
    const { data } = await axios.post<BaseResponse>(url, payload, {
      headers: header,
    });
    return data;
  } catch (error) {
    if (axios.isAxiosError(error)) {
      console.log('error: ', error.message);
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