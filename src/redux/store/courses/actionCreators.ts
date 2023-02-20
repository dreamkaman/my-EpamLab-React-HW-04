import { createAction } from '@reduxjs/toolkit';
import {
	GET_COURSES,
	SET_COURSES,
	CLEAR_COURSES,
	ADD_COURSE,
	DELETE_COURSE,
	UPDATE_COURSE,
	SET_NEW_COURSE,
} from './actionTypes';
import { ICourse } from 'tsTypes';

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
export const deleteCourseAction = createAction<string, 'DELETE_COURSE'>(
	DELETE_COURSE
);
export const updateCourseAction = createAction(UPDATE_COURSE);
