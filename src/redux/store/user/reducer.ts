import { PayloadAction, createReducer } from '@reduxjs/toolkit';
import {
	setUserDataAction,
	clearUserDataAction,
	setUserRoleAction,
} from './actionCreators';

const initialState = {
	isAuth: false,
	name: '',
	email: '',
	token: '',
	role: '',
};

export interface IUserLoginPayload {
	name: string;
	email: string;
	token: string;
	role: string;
}

export const userReducer = createReducer(initialState, {
	[clearUserDataAction.type]: () => {
		return { ...initialState };
	},
	[setUserDataAction.type]: (
		_state,
		action: PayloadAction<IUserLoginPayload>
	) => {
		return { isAuth: true, ...action.payload };
	},
	[setUserRoleAction.type]: (state, action: PayloadAction<string>) => {
		return { ...state, role: action.payload };
	},
});
