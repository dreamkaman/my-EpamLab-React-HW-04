import { createReducer } from '@reduxjs/toolkit';
import {
	setAllCoursesAction,
	clearAllCoursesAction,
	deleteCourseAction,
	updateCourseAction,
	setNewCourseAction,
} from './actionCreators';

import { ICourse } from 'tsTypes';

const initialReducer: ICourse[] = [];

export const coursesReducer = createReducer(initialReducer, {
	[setAllCoursesAction.type]: (_state, action) => {
		return [...action.payload];
	},
	[clearAllCoursesAction.type]: () => {
		return initialReducer;
	},
	[setNewCourseAction.type]: (state, action) => {
		return [...state, action.payload];
	},
	[deleteCourseAction.type]: (state, action) => {
		const filteredCourses = state.filter(
			(course) => course.id !== action.payload //in this case we pass only id as payload
		);

		return [...filteredCourses];
	},
	[updateCourseAction.type]: (state, action) => {
		return [...state, ...action.payload];
	},
});
