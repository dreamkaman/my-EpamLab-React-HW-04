import { PayloadAction, createReducer } from '@reduxjs/toolkit';
import { setUserDataAction, clearUserDataAction } from './actionCreators';

const initialState = {
	isAuth: false,
	name: '',
	email: '',
	token: '',
};

export interface IUserLoginPayload {
	name: string;
	email: string;
	token: string;
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
});
