import axios from "axios";

const request = axios.create({
    baseURL: 'https://api.imgbb.com/1/upload',
    timeout: 8000,
    headers: { Accept: '*/*', 'Accept-Language': 'vi-VN' },
  });
export const uploadImageToImgBB = (params: any) =>
    request({
      baseURL: 'https://api.imgbb.com/1/upload',
      method: 'post',
      data: params,
      headers: {
        'Content-Type': 'multipart/form-data',
      },
    });