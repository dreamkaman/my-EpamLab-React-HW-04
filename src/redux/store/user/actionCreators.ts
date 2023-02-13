import { createAction } from '@reduxjs/toolkit';

import {
	SET_USER_DATA,
	USER_LOGIN,
	USER_LOGOUT,
	CLEAR_USER_DATA,
} from './actionTypes';

import { IReqUser } from 'tsTypes';
import { IUserLoginPayload } from './reducer';

export const userLoginAction = createAction<IReqUser, 'USER_LOGIN'>(USER_LOGIN);

export const userLogoutAction = createAction<string>(USER_LOGOUT);

export const setUserDataAction = createAction<
	IUserLoginPayload,
	'SET_USER_DATA'
>(SET_USER_DATA);

export const clearUserDataAction = createAction(CLEAR_USER_DATA);
