import { RootState } from 'redux/store';

export const getAllCoursesSelector = (state: RootState) => state.courses;
