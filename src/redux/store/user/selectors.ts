import { RootState } from 'redux/store';

export const getIsAuthSelector = (state: RootState) => state.user.isAuth;
export const getTokenSelector = (state: RootState) => state.user.token;
export const getUserNameSelector = (state: RootState) => state.user.name;
export const getUserRoleSelector = (state: RootState) => state.user.role;
export const getUserProfileSelector = (state: RootState) => state.user;
