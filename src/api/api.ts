import axios from 'axios';

import {
	ISignUpUserRes,
	ILoginUserRes,
	LogOutUserFn,
	LoginUserFn,
	SignUpUserFn,
	AddNewCourseFn,
	IAddNewCourseRes,
	EditCourseFn,
	IEditCourseRes,
	DeleteCourseFn,
	IDeleteCourseRes,
	IAddNewAuthorRes,
	AddNewAuthorFn,
	GetUserFn,
	IGetUserRes,
	GetAllCoursesFn,
	IGetAllCoursesRes,
} from 'tsTypes';

const instance = axios.create({
	baseURL: 'http://localhost:4000',
	headers: {
		'Content-Type': 'application/json',
	},
});

export const signUpUser: SignUpUserFn = async ({ name, email, password }) => {
	try {
		const response: ISignUpUserRes = await instance.post('/register', {
			name,
			email,
			password,
		});
		return response;
	} catch (error) {
		console.log(error);
		throw error;
	}
};

export const loginUser: LoginUserFn = async ({ email, password }) => {
	try {
		const response: ILoginUserRes = await instance.post('/login', {
			email,
			password,
		});
		return response;
	} catch (error) {
		console.log(error);
		throw error;
	}
};

export const logOutUser: LogOutUserFn = async (token) => {
	try {
		const response = await instance.delete('/logout', {
			headers: {
				Authorization: `Bearer ${token}`,
			},
		});

		return response;
	} catch (error) {
		console.log(error);
		throw error;
	}
};

export const getAllCourses: GetAllCoursesFn = async () => {
	try {
		const response: IGetAllCoursesRes = await instance.get('/courses/all');
		return response;
	} catch (error) {
		console.log(error);
		throw error;
	}
};

export const getAllAuthors = async () => {
	try {
		const response = await instance.get('/authors/all');
		return response;
	} catch (error) {
		console.log(error);
		throw error;
	}
};

export const addNewCourse: AddNewCourseFn = async ({ token, course }) => {
	try {
		const response: IAddNewCourseRes = await instance.post(
			'/courses/add',
			course,
			{
				headers: {
					Authorization: `Bearer ${token}`,
				},
			}
		);
		const {
			data: { result },
		} = response;
		return result;
	} catch (error) {
		console.log(error);
		throw error;
	}
};

export const editCourse: EditCourseFn = async ({ id, token, course }) => {
	try {
		const response: IEditCourseRes = await instance.put(
			`/courses/${id}`,
			course,
			{
				headers: {
					Authorization: `Bearer ${token}`,
				},
			}
		);
		return response;
	} catch (error) {
		console.log(error);
		throw error;
	}
};

export const deleteCourse: DeleteCourseFn = async ({ id, token }) => {
	try {
		const response: IDeleteCourseRes = await instance.delete(`/courses/${id}`, {
			headers: {
				Authorization: `Bearer ${token}`,
			},
		});
		return response;
	} catch (error) {
		console.log(error);
		throw error;
	}
};

export const addNewAuthor: AddNewAuthorFn = async ({ token, name }) => {
	try {
		const response: IAddNewAuthorRes = await instance.post(
			'/authors/add',
			{ name },
			{
				headers: {
					Authorization: `Bearer ${token}`,
				},
			}
		);
		const {
			data: { result },
		} = response;

		return result;
	} catch (error) {
		console.log(error);
		throw error;
	}
};

export const getUser: GetUserFn = async (token) => {
	try {
		const response: IGetUserRes = await instance.get('/users/me', {
			headers: {
				Authorization: `Bearer ${token}`,
			},
		});

		const { result } = response.data;

		return result;
	} catch (error) {
		console.log(error);
		throw error;
	}
};
