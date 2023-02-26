import { createAction } from '@reduxjs/toolkit';
import {
	GET_AUTHORS,
	SET_AUTHORS,
	CLEAR_AUTHORS,
	ADD_NEW_AUTHOR,
	SET_NEW_AUTHOR,
} from './actionTypes';
import { IAuthor } from 'helpers/authorsString';

export const getAllAuthorsAction = createAction(GET_AUTHORS);

export const setAllAuthorsAction = createAction(SET_AUTHORS);

export const clearAllAuthorsAction = createAction(CLEAR_AUTHORS);

export const addNewAuthorAction = createAction<
	{ token: string; name: string },
	'ADD_NEW_AUTHOR'
>(ADD_NEW_AUTHOR);

export const setNewAuthorAction = createAction<IAuthor, 'SET_NEW_AUTHOR'>(
	SET_NEW_AUTHOR
);
