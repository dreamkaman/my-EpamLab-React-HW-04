import { createAction } from '@reduxjs/toolkit';
import {
	GET_AUTHORS,
	SET_AUTHORS,
	CLEAR_AUTHORS,
	ADD_NEW_AUTHOR,
} from './actionTypes';
import { IAuthor } from 'helpers/authorsString';

export const getAllAuthorsAction = createAction(GET_AUTHORS);

export const setAllAuthorsAction = createAction(SET_AUTHORS);

export const clearAllAuthorsAction = createAction(CLEAR_AUTHORS);

export const addNewAuthorAction = createAction<IAuthor>(ADD_NEW_AUTHOR);
