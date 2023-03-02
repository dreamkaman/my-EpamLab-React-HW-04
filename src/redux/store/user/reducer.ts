import { PayloadAction, createReducer } from '@reduxjs/toolkit';
import {
	setUserDataAction,
	clearUserDataAction,
	setUserRoleAction,
	setUserSavedProfileAction,
} from './actionCreators';

export interface IUserLoginPayload {
	isAuth: boolean;
	name: string;
	email: string;
	token: string;
	role: 'admin' | 'user' | null;
}

const initialState: IUserLoginPayload = {
	isAuth: false,
	name: '',
	email: '',
	token: '',
	role: null,
};

export const userReducer = createReducer(initialState, {
	[clearUserDataAction.type]: () => {
		return { ...initialState };
	},
	[setUserDataAction.type]: (
		_state,
		action: PayloadAction<IUserLoginPayload>
	) => {
		return { ...action.payload, isAuth: true };
	},
	[setUserRoleAction.type]: (
		state,
		action: PayloadAction<'admin' | 'user'>
	) => {
		return { ...state, role: action.payload };
	},
	[setUserSavedProfileAction.type]: (
		_state,
		action: PayloadAction<IUserLoginPayload>
	) => {
		return { ...action.payload };
	},
});
