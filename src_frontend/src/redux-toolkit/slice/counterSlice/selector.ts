import { createSelector } from '@reduxjs/toolkit';
import { initialState } from '.';

const selectDomain = (state: any) => state?.counter || initialState;

export const getCounterSelector = createSelector(
  [selectDomain],
  counter => counter.value,
);
