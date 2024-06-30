
export interface ErrorResponse {
    code : number;
    message: string;
    status: number;
  }
  export interface BaseResponse extends ErrorResponse {
    data: any;
  }