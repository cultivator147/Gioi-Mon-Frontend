import { createSelector } from '@reduxjs/toolkit';
import { initialState } from '.';

const selectDomain = (state: any) => state?.user || initialState;

export const getUserSelector = createSelector([selectDomain], user => user);

export const getProfileSelector = createSelector(
  [selectDomain],
  user => user.profile,
);
