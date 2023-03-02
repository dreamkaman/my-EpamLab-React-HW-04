import { createAction } from '@reduxjs/toolkit';

import {
	SET_USER_DATA,
	USER_LOGIN,
	USER_LOGOUT,
	CLEAR_USER_DATA,
	GET_USER_DATA,
	SET_USER_ROLE,
} from './actionTypes';

import { IReqUser } from 'tsTypes';
import { IUserLoginPayload } from './reducer';
import { SET_USER_SAVED_PROFILE } from '../authors/actionTypes';

export const userLoginAction = createAction<IReqUser, 'USER_LOGIN'>(USER_LOGIN);

export const userLogoutAction = createAction<string, 'USER_LOGOUT'>(
	USER_LOGOUT
);

export const setUserDataAction = createAction<
	IUserLoginPayload,
	'SET_USER_DATA'
>(SET_USER_DATA);

export const clearUserDataAction =
	createAction<'CLEAR_USER_DATA'>(CLEAR_USER_DATA);

export const getUserDataAction = createAction<string, 'GET_USER_DATA'>(
	GET_USER_DATA
);

export const setUserRoleAction = createAction<
	'admin' | 'user',
	'SET_USER_ROLE'
>(SET_USER_ROLE);

export const setUserSavedProfileAction = createAction<
	IUserLoginPayload,
	'SET_USER_SAVED_PROFILE'
>(SET_USER_SAVED_PROFILE);
