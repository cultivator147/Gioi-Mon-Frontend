import { PayloadAction, createSlice } from "@reduxjs/toolkit";

interface CategoryState {
  id: any;
  title: any;
  description?: any;
}
const initialState: CategoryState = { id: 0, title: "All" };

export const categorySlice = createSlice({
  name: "category",
  initialState,
  reducers: {
    update : (state, action : PayloadAction<CategoryState>) => {state.id = action.payload.id},
    add : (state) => {state.id += 1},
  },
});
export const {update, add} = categorySlice.actions;
// export default categorySlice.reducer;
