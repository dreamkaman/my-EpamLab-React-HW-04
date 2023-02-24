import { takeEvery, call, put, all, fork } from 'redux-saga/effects';
import {
	addNewCourse,
	deleteCourse,
	getAllAuthors,
	getAllCourses,
	getUser,
	loginUser,
	logOutUser,
} from 'api/api';
import { GET_USER_DATA, USER_LOGIN, USER_LOGOUT } from '../user/actionTypes';

import {
	clearUserDataAction,
	setUserDataAction,
	setUserRoleAction,
} from '../user/actionCreators';
import { ADD_COURSE, DELETE_COURSE, GET_COURSES } from '../courses/actionTypes';
import {
	clearAllCoursesAction,
	clearDeletedCourseAction,
	setAllCoursesAction,
	setNewCourseAction,
} from '../courses/actionCreators';
import { GET_AUTHORS } from '../authors/actionTypes';
import {
	clearAllAuthorsAction,
	setAllAuthorsAction,
} from '../authors/actionCreators';
import { IAddNewCourseReq } from 'tsTypes';

function* userLoginWorkerSaga(action: {
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

function* userLogOutWorkerSaga(action: { type: string; payload: string }) {
	try {
		const res = yield call(logOutUser, action.payload);
		const { status } = res;
		if (status === 200) {
			yield put(clearUserDataAction());
			yield put(clearAllCoursesAction());
			yield put(clearAllAuthorsAction());
		}
	} catch (error) {
		alert(error.message);
	}
}

function* coursesWorkerSaga() {
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

function* authorsWorkerSaga() {
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

function* userLoginWatcherSaga() {
	yield takeEvery(USER_LOGIN, userLoginWorkerSaga);
}

function* userLogoutWatcherSaga() {
	yield takeEvery(USER_LOGOUT, userLogOutWorkerSaga);
}

function* getCoursesWatcherSaga() {
	yield takeEvery(GET_COURSES, coursesWorkerSaga);
}

function* getAuthorsWatcherSaga() {
	yield takeEvery(GET_AUTHORS, authorsWorkerSaga);
}

function* addCourseWorkerSaga(action: {
	type: string;
	payload: IAddNewCourseReq;
}) {
	try {
		const result = yield call(addNewCourse, action.payload);
		yield put(setNewCourseAction(result));
	} catch (error) {
		alert(error.message);
	}
}

function* addNewCourseWatcherSaga() {
	yield takeEvery(ADD_COURSE, addCourseWorkerSaga);
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

export default function* rootSaga() {
	yield all([
		fork(userLoginWatcherSaga),
		fork(userLogoutWatcherSaga),
		fork(getCoursesWatcherSaga),
		fork(getAuthorsWatcherSaga),
		fork(addNewCourseWatcherSaga),
		fork(clearDeletedCourseWatcher),
		fork(getUserDataWatcher),
	]);
}
