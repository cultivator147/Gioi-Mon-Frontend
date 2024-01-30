import { configureStore } from '@reduxjs/toolkit'
import {categorySlice} from './categorySlice';
import { storySlice } from './storySlice';

export const store = configureStore({
  reducer: {
    category: categorySlice.reducer,
    story: storySlice.reducer,
  },
})

export type DefinedRootState = ReturnType<typeof store.getState>
export type DefinedAppDispatch = typeof store.dispatch