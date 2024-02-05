import { createSelector } from '@reduxjs/toolkit';
import { initialState } from '.';

const selectDomain = (state: any) => state?.category || initialState;

export const getCategorySelector = createSelector(
  [selectDomain],
  category => category.value,
);
