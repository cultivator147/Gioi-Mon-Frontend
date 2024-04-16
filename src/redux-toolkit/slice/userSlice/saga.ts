import {
  loginRequest,
} from "../../../api/modules/authentication/authenticate";
import { BaseResponse } from "../../../utils/http/response";
import { put, takeLatest } from "redux-saga/effects";
import { usersActions } from ".";
import { postRequest } from "../../../api/modules/authentication/request2";
import { getProfile } from "../../../api/modules/user/profile";
import History from "../../../app/History/History";

export function* Login(action: any) {
  const data = {
    username: action.payload.username,
    password: action.payload.password,
  };

  const res: BaseResponse = yield loginRequest(data);
  if (res.code === 0) {
    yield put(
      usersActions.loginSuccess({
        id: res.data.id,
        token: res.data.accessToken,
        username: res.data.username,
        isLogin: true,
        login: {
          error: res.code,
          message: res.message,
          savePassword: action.payload.savePassword,
        },
      })
    );
    yield put(
      usersActions.requestProfile(
        res.data
      )
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
    yield put(
      usersActions.registerSuccess({
        id: res.data.id,
        token: res.data.accessToken,
        username: res.data.username,
        password: res.data.password,
        register: {
          error: res.code,
          message: res.message,
        },
      })
    );
    yield put(
      usersActions.requestProfile(
        res.data
      )
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
function* handleGetProfile(action: any) {
  console.log('action' , action);
  try{
  const res: BaseResponse = yield getProfile({
    userId: action.payload.id,
  }, null);
  console.log('data  profile: ', res.data);
    if (res.code === 0) {
      const data = res.data;
    yield put(
      usersActions.setProfile({
        profile: {
          nickname: data.nickname,
          avatar: data.avatar,
          date_of_birth: data.dateOfBirth,
          zodiac: data.zodiac,
          gender: data.gender,
          introduction: data.introduction,
          relationship: data.relationship,
        },
      })
    );
    if(data.nickname === '' || data.nickname === null){
      console.log('navigating to username page...');
      History.push('/user/profile/nickname');
    }else if(data.avatar === '' || data.avatar === null){
      console.log('navigating to picture page...');
      History.push('/user/profile/picture');
    }else if(data.dateOfBirth === '' || data.dateOfBirth === null){
      console.log('navigating to birthday page...');
      History.push('/user/profile/birthday');
    }else if(data.gender === '' || data.gender === null){
      console.log('navigating to gender page...');
      History.push('/user/profile/gender');
    }
      else {
        History.push('/');
        yield put(
          usersActions.setIsLogin({
            isLogin: true,
          }),
        );
      }
    } else {
      throw new Error('System Error');
    }
  }
 catch {
    console.log('get profile error!');
  }
}
// export function* CheckProfile(data: any) {
//   const res: BaseResponse = yield getProfile({
//     userId: data.id,
//   }, null);
//   console.log('data  profile: ', res.data);
//   if(res.code === 0) {
//     const data = res.data;
//     yield put(
//       usersActions.createProfile({
//         profile: {
//           nickname: data.nickname,
//           avatar: data.avatar,
//           date_of_birth: data.dateOfBirth,
//           zodiac: data.zodiac,
//           gender: data.gender,
//           introduction: data.introduction,
//           relationship: data.relationship,
//         },
//       })
//     );
//     if(data.nickname === '' || data.nickname === null){
//       console.log('navigating to username page...');
//       History.push('/user/profile/nickname');
//     }else if(data.avatar === '' || data.avatar === null){
//       console.log('navigating to picture page...');
//       History.push('/user/profile/picture');
//     }else if(data.dateOfBirth === '' || data.dateOfBirth === null){
//       console.log('navigating to birthday page...');
//       History.push('/user/profile/birthday');
//     }else if(data.gender === '' || data.gender === null){
//       console.log('navigating to gender page...');
//       History.push('/user/profile/gender');
//     }
// }
// }
export function* userSaga() {
  yield takeLatest(usersActions.requestLogin.type, Login);
  yield takeLatest(usersActions.requestRegister.type, Register);
  yield takeLatest(usersActions.requestProfile.type, handleGetProfile);

}
