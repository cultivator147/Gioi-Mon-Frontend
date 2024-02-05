import { loginRequest, registerRequest } from '../../../api/modules/authentication/authenticate';
import { BaseResponse } from '../../../utils/http/response';
import { call, put, takeLatest } from 'redux-saga/effects';
import { usersActions } from '.';
import { Logger } from '../../../utils/helper';
import { getProfile } from '../../../api/modules/user/profile';
import { apiGet } from '../../../api/modules/user/request';

export function* Login(action: any) {
    const data = {
      username: action.payload.username,
      password: action.payload.password,
    };
  
    const res: BaseResponse = yield loginRequest(data);

    if (res.data.code === 0) {
      // yield CheckProfile(res.data);
      yield put(
        usersActions.loginSuccess({
          id: res.data.data.id,
          token: res.data.data.accessToken,
          username: res.data.data.username,
          isLogin: false,
          login: {
            error: res.data.code,
            message: res.data.message,
            savePassword: action.payload.savePassword,
          },
        }),
      );
    } else {
      yield put(
        usersActions.loginFail({
          login: {
            error: res.data.code,
            message: res.data.message,
          },
        }),
      );
    }
  };

  export function* Register(action: any) {
    const data = {
      username: action.payload.username,
      password: action.payload.password,
    };
  
    const res: BaseResponse = yield registerRequest(data);

    if (res.data.code === 0) {
      // yield CheckProfile(res.data);
      yield put(
        usersActions.registerSuccess({
          id: res.data.data.id,
          token: res.data.data.token,
          username: res.data.data.username,
          password: res.data.data.password,
          register: {
            error: res.data.code,
            message: res.data.message,
          },
        }),
      );
    } else {
      yield put(
        usersActions.loginFail({
          login: {
            error: res.data.code,
            message: res.data.message,
          },
        }),
      );
    }
  };

  export function* CheckProfile(data: any) {
    const res: BaseResponse = yield apiGet('/profile',{
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
        }),
      );
    } else {
      yield put(
        usersActions.createProfile({
          profile: {
            nickname: '',
            picture: [],
            date_of_birth: '',
            zodiac: '',
            gender: [],
            introduction: '',
            relationship: -1,
          },
        }),
      );
    }
  }
  export function* userSaga() {
    yield takeLatest(usersActions.requestLogin.type, Login);
    yield takeLatest(usersActions.requestRegister.type, Register);
  }