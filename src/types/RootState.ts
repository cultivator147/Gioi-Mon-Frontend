// [IMPORT NEW CONTAINERSTATE ABOVE] < Needed for generating containers seamlessly

import { CategoryState } from "../redux-toolkit/slice/categorySlice";
import { CounterState } from "../redux-toolkit/slice/counterSlice";
import { UserState } from "../redux-toolkit/slice/userSlice";

/* 
  Because the redux-injectors injects your reducers asynchronously somewhere in your code
  You have to declare them here manually
*/
export interface RootState {
  user?: UserState;
}
export interface RootState {
  counter?: CounterState;
}
export interface RootState {
  category?: CategoryState;
}
