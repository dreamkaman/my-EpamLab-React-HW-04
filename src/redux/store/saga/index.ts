import { takeEvery, call, put, all, fork } from 'redux-saga/effects';
import {
	addNewCourse,
	deleteCourse,
	getAllAuthors,
	getAllCourses,
	getUser,
	loginUser,
	logOutUser,
	editCourse,
	addNewAuthor,
} from 'api/api';
import { GET_USER_DATA, USER_LOGIN, USER_LOGOUT } from '../user/actionTypes';

import {
	clearUserDataAction,
	setUserDataAction,
	setUserRoleAction,
} from '../user/actionCreators';
import {
	ADD_COURSE,
	DELETE_COURSE,
	GET_COURSES,
	UPDATE_COURSE,
} from '../courses/actionTypes';
import {
	clearAllCoursesAction,
	clearDeletedCourseAction,
	setAllCoursesAction,
	setNewCourseAction,
} from '../courses/actionCreators';
import { ADD_NEW_AUTHOR, GET_AUTHORS } from '../authors/actionTypes';
import {
	clearAllAuthorsAction,
	setAllAuthorsAction,
	setNewAuthorAction,
} from '../authors/actionCreators';
import { IAddNewCourseReq, IEditCourseReq } from 'tsTypes';

function* userLoginWorker(action: {
	type: string;
	payload: { email: string; password: string };
}) {
	try {
		const { payload } = action;
		const res = yield call(loginUser, payload);

		const {
			data: { user, result },
		} = res;

		const userData = {
			...user,
			token: result.split(' ')[1],
		};

		yield put(setUserDataAction(userData));
	} catch (error) {
		alert(error.message);
	}
}

function* userLogOutWorker(action: { type: string; payload: string }) {
	try {
		const res = yield call(logOutUser, action.payload);
		const { status } = res;
		if (status === 200) {
			yield put(clearUserDataAction());
			yield put(clearAllCoursesAction());
			yield put(clearAllAuthorsAction());
			localStorage.setItem('token', '');
			localStorage.setItem('user', '');
		}
	} catch (error) {
		alert(error.message);
	}
}

function* coursesWorker() {
	try {
		const res = yield call(getAllCourses);
		const {
			data: { result },
		} = res;
		yield put(setAllCoursesAction(result));
	} catch (error) {
		alert(error.message);
	}
}

function* authorsWorker() {
	try {
		const res = yield call(getAllAuthors);
		const {
			data: { result },
		} = res;

		yield put(setAllAuthorsAction(result));
	} catch (error) {
		alert(error.message);
	}
}

function* userLoginWatcher() {
	yield takeEvery(USER_LOGIN, userLoginWorker);
}

function* userLogoutWatcher() {
	yield takeEvery(USER_LOGOUT, userLogOutWorker);
}

function* getCoursesWatcher() {
	yield takeEvery(GET_COURSES, coursesWorker);
}

function* getAuthorsWatcher() {
	yield takeEvery(GET_AUTHORS, authorsWorker);
}

function* addCourseWorker(action: { type: string; payload: IAddNewCourseReq }) {
	try {
		const result = yield call(addNewCourse, action.payload);
		yield put(setNewCourseAction(result));
	} catch (error) {
		alert(error.message);
	}
}

function* addNewCourseWatcher() {
	yield takeEvery(ADD_COURSE, addCourseWorker);
}

function* deleteCourseWorker(action: {
	type: string;
	payload: { id: string; token: string };
}) {
	try {
		const result = yield deleteCourse(action.payload);
		if (result.data.successful) {
			yield put(clearDeletedCourseAction(action.payload.id));
		}
	} catch (error) {
		alert(error.message);
	}
}
function* clearDeletedCourseWatcher() {
	yield takeEvery(DELETE_COURSE, deleteCourseWorker);
}

function* getUserDataWorker(action: {
	type: 'GET_USER_DATA';
	payload: string;
}) {
	try {
		const res = yield call(getUser, action.payload);

		const { role } = res;

		yield put(setUserRoleAction(role));
	} catch (error) {
		alert(error.message);
	}
}

function* getUserDataWatcher() {
	yield takeEvery(GET_USER_DATA, getUserDataWorker);
}

function* editCourseWorker(action: {
	type: 'UPDATE_COURSE';
	payload: IEditCourseReq;
}) {
	const res = yield call(editCourse, action.payload);

	console.log(res);
}

function* editCourseWatcher() {
	yield takeEvery(UPDATE_COURSE, editCourseWorker);
}

function* addNewAuthorWorker(action: {
	type: string;
	payload: { token: string; name: string };
}) {
	const res = yield call(addNewAuthor, action.payload);

	yield put(setNewAuthorAction(res));
}

function* addNewAuthorWatcher() {
	yield takeEvery(ADD_NEW_AUTHOR, addNewAuthorWorker);
}

export default function* rootSaga() {
	yield all([
		fork(userLoginWatcher),
		fork(userLogoutWatcher),
		fork(getCoursesWatcher),
		fork(getAuthorsWatcher),
		fork(addNewCourseWatcher),
		fork(clearDeletedCourseWatcher),
		fork(getUserDataWatcher),
		fork(editCourseWatcher),
		fork(addNewAuthorWatcher),
	]);
}
