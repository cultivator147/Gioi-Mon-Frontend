import { configureStore } from '@reduxjs/toolkit'
import {categorySlice} from './categorySlice';

export const store = configureStore({
  reducer: {
    category: categorySlice.reducer,
  },
})

export type DefinedRootState = ReturnType<typeof store.getState>
export type DefinedAppDispatch = typeof store.dispatch