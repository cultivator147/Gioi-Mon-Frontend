import { PayloadAction } from "@reduxjs/toolkit";
import { createSlice } from "../../../utils/@reduxjs/toolkit";
import { useInjectReducer } from "../../../utils/redux-injectors";
import { useEffect } from "react";
export interface CategoryState {
  id: any;
  title: any;
  description?: any;
}
export const initialState: CategoryState = {
  id: 1,
  title: "",
  description: "",
};

const slice = createSlice({
  name: "category",
  initialState,
  reducers: {
    update: (state, action: PayloadAction<CategoryState>) => {
      state.id = action.payload.id;
    },
    add: (state) => {
      state.id += 1;
    },
  },
});

export const { actions: counterActions, reducer } = slice;

export const CategorySlice = () => {
  useInjectReducer({ key: slice.name, reducer: slice.reducer });
  return { counterActions: slice.actions };
};
