import { RootState } from 'redux/store';

export const getIsAuthSelector = (state: RootState) => state.user.isAuth;
export const getTokenSelector = (state: RootState) => state.user.token;
export const getUserNameSelector = (state: RootState) => state.user.name;
