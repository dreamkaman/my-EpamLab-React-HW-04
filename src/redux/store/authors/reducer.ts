import { createReducer } from '@reduxjs/toolkit';
import { IAuthor } from 'helpers/authorsString';
import {
	clearAllAuthorsAction,
	setAllAuthorsAction,
	addNewAuthorAction,
} from './actionCreators';

const initialState: IAuthor[] = [];
export const authorsReducer = createReducer(initialState, {
	[setAllAuthorsAction.type]: (_state, action) => {
		return [...action.payload];
	},
	[clearAllAuthorsAction.type]: () => {
		return [];
	},
	[addNewAuthorAction.type]: (state, action) => {
		return [...state, action.payload];
	},
});
