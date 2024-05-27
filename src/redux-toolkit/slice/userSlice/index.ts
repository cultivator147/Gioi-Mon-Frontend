import { useEffect } from "react";
import { userSaga } from "./saga";
import { createSlice } from "../../../utils/@reduxjs/toolkit";
import { PayloadAction } from "@reduxjs/toolkit";
import {
  useInjectReducer,
  useInjectSaga,
} from "../../../utils/redux-injectors";
import { persistor } from "../../configureStore";

export interface UserState {
  //Account
  id?: number;
  token?: string;
  isLogin?: boolean;
  loading?: boolean;
  username?: string;
  password?: string | number;
  device?: boolean;
  navigate?: string;
  // Status
  register?: {
    error?: number;
    message?: string;
  };
  login?: {
    error?: number;
    message?: string;
    savePassword?: boolean;
  };
  profile?: {
    nickname?: string;
    avatar?: string;
    date_of_birth?: string;
    zodiac?: string;
    gender?: string[];
    introduction?: string;
    relationship?: number;
    coin?: number;
  };
}

export const initialState: UserState = {
  // Account
  id: -1,
  token: "",
  isLogin: false,
  loading: false,
  username: "",
  password: "",
  device: false,
  // Status
  register: {
    error: -1,
    message: "",
  },
  login: {
    error: -1,
    message: "",
    savePassword: false,
  },
  profile: {
    nickname: "Gioimon Reader",
    avatar: "https://bizweb.dktcdn.net/100/438/408/files/avatar-dep-cho-nam-yody-vn.jpg?v=1683516280828",
    date_of_birth: "",
    zodiac: "",
    gender: [],
    introduction: "",
    relationship: -1,
    coin: 0,
  },
};

const slice = createSlice({
  name: "user",
  initialState,
  reducers: {
    setIsLogin(state, action: PayloadAction<UserState>) {
      state.isLogin = action.payload.isLogin;
    },
    requestLogin(state: UserState, action: PayloadAction<UserState>) {
      state.loading = true;
      state.isLogin = false;
      state.login = action.payload.login;
    },
    loginSuccess(state: UserState, action: PayloadAction<UserState>) {
      state.id = action.payload.id;
      state.token = action.payload.token;
      state.isLogin = action.payload.isLogin;
      state.loading = false;
      state.login = action.payload.login;
      state.username = action.payload.username;
    },
    loginFail(state: UserState, action: PayloadAction<UserState>) {
      state.loading = false;
      state.login = action.payload.login;
    },
    requestRegister(state: UserState, action: PayloadAction<UserState>) {
      state.login = action.payload.login;
      state.loading = true;
    },
    registerSuccess(state: UserState, action: PayloadAction<UserState>) {
      state.id = action.payload.id;
      state.token = action.payload.token;
      state.loading = false;
      state.username = action.payload.username;
      state.password = action.payload.password;
      state.register = action.payload.register;
      state.isLogin = action.payload.isLogin;
    },
    registerFail(state: UserState, action: PayloadAction<UserState>) {
      state.loading = false;
      state.register = action.payload.register;
    },

    logoutSuccess(state: UserState) {
      state.id = -1;
      state.token = "";
      state.username = "";
      state.isLogin = false;
      state.loading = false;
      state.register = {
        error: -1,
        message: "",
      };
      state.login = {
        error: -1,
        message: "",
        savePassword: false,
      };
      state.profile = {
        nickname: "",
        avatar: "",
        date_of_birth: "",
        zodiac: "",
        gender: [],
        introduction: "",
        relationship: -1,
      };
    },

    requestProfile(state: UserState, action: PayloadAction<UserState>) {
      state.loading = true;
    },
    setProfile(state: UserState, action: PayloadAction<UserState>) {
      state.loading = true;
      state.profile = action.payload.profile;
    },
    // Create Information Profile User
    updateProfile(state: UserState, action: PayloadAction<UserState>) {
      state.profile = action.payload.profile;
      state.loading = false;
    },
    // Set device
    setDevice(state: UserState, action: PayloadAction<UserState>) {
      state.device = action.payload.device;
    },
  },
});
export const { actions: usersActions, reducer } = slice;
export const UserSlice = () => {
  useInjectReducer({ key: slice.name, reducer: slice.reducer });
  useInjectSaga({ key: slice.name, saga: userSaga });
  useEffect(() => {
    persistor.persist();
  }, []);
  return { actions: slice.actions };
};
