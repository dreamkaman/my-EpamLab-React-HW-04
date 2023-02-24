import { createAction } from '@reduxjs/toolkit';
import {
	GET_COURSES,
	SET_COURSES,
	CLEAR_COURSES,
	ADD_COURSE,
	DELETE_COURSE,
	UPDATE_COURSE,
	SET_NEW_COURSE,
	CLEAR_DELETED_COURSE,
	SET_UPDATED_COURSE,
} from './actionTypes';
import { ICourse, IEditCourseReq } from 'tsTypes';

export const getAllCoursesAction = createAction(GET_COURSES);
export const setAllCoursesAction = createAction(SET_COURSES);
export const clearAllCoursesAction = createAction(CLEAR_COURSES);
export const addNewCourseAction = createAction<
	{
		token: string;
		course: {
			title: string;
			description: string;
			duration: number;
			authors: string[];
		};
	},
	'ADD_COURSE'
>(ADD_COURSE);
export const setNewCourseAction = createAction<ICourse, 'SET_NEW_COURSE'>(
	SET_NEW_COURSE
);
export const deleteCourseAction = createAction<
	{ id: string; token: string },
	'DELETE_COURSE'
>(DELETE_COURSE);

export const clearDeletedCourseAction = createAction<
	string,
	'CLEAR_DELETED_COURSE'
>(CLEAR_DELETED_COURSE);

export const updateCourseAction = createAction<IEditCourseReq, 'UPDATE_COURSE'>(
	UPDATE_COURSE
);

export const setUpdatedCourseAction = createAction(SET_UPDATED_COURSE);
