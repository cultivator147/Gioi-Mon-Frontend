import {
  loginRequest,
  registerRequest,
} from "../../../api/modules/authentication/authenticate";
import { BaseResponse } from "../../../utils/http/response";
import { put, takeLatest } from "redux-saga/effects";
import { usersActions } from ".";
import { apiGet } from "../../../api/modules/user/request";
import { postRequest } from "../../../api/modules/authentication/request2";

export function* Login(action: any) {
  const data = {
    username: action.payload.username,
    password: action.payload.password,
  };

  const res: BaseResponse = yield loginRequest(data);
  if (res.code === 0) {
    // yield CheckProfile(res.data);
    console.log("putting...");

    yield put(
      usersActions.loginSuccess({
        id: res.data.id,
        token: res.data.accessToken,
        username: res.data.username,
        isLogin: false,
        login: {
          error: res.code,
          message: res.message,
          savePassword: action.payload.savePassword,
        },
      })
    );
  } else {
    yield put(
      usersActions.loginFail({
        login: {
          error: res.code,
          message: res.message,
        },
      })
    );
  }
}

export function* Register(action: any) {
  const data = {
    username: action.payload.username,
    password: action.payload.password,
  };

  const res: BaseResponse = yield postRequest("/auth/register", data, {
    "Content-Type": "application/json",
  });

  if (res.code === 0) {
    // yield CheckProfile(res.data);
    yield put(
      usersActions.registerSuccess({
        id: res.data.id,
        token: res.data.token,
        username: res.data.username,
        password: res.data.password,
        register: {
          error: res.code,
          message: res.message,
        },
      })
    );
  } else {
    yield put(
      usersActions.loginFail({
        login: {
          error: res.code,
          message: res.message,
        },
      })
    );
  }
}

export function* CheckProfile(data: any) {
  const res: BaseResponse = yield apiGet("/profile", {
    user_id: data.id,
    token: data.accessToken,
  });
  if (res.data !== null) {
    yield put(
      usersActions.createProfile({
        profile: {
          nickname: res.data.nickname,
          picture: res.data.picture,
          date_of_birth: res.data.date_of_birth,
          zodiac: res.data.zodiac,
          gender: res.data.gender,
          introduction: res.data.introduction,
          relationship: res.data.relationship,
        },
      })
    );
  } else {
    yield put(
      usersActions.createProfile({
        profile: {
          nickname: "",
          picture: [],
          date_of_birth: "",
          zodiac: "",
          gender: [],
          introduction: "",
          relationship: -1,
        },
      })
    );
  }
}
export function* userSaga() {
  yield takeLatest(usersActions.requestLogin.type, Login);
  yield takeLatest(usersActions.requestRegister.type, Register);
}
