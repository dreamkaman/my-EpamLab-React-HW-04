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

export const getAllCourses = async () => {
	try {
		const response = await instance.get('/courses/all');
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
		const response: IAddNewCourseRes = await instance.post('/courses/add', {
			headers: {
				Authorization: `Bearer ${token}`,
			},
			body: course,
		});
		console.log(course);
		console.log(response);
		return response;
	} catch (error) {
		console.log(error);
		throw error;
	}
};

export const editCourse: EditCourseFn = async ({ token, course }) => {
	try {
		const response: IEditCourseRes = await instance.put('/courses/:id', {
			headers: {
				Authorization: `Bearer ${token}`,
			},
			body: course,
		});
		console.log(course);
		console.log(response);
		return response;
	} catch (error) {
		console.log(error);
		throw error;
	}
};

export const deleteCourse: DeleteCourseFn = async (token) => {
	try {
		const response: IDeleteCourseRes = await instance.delete('/courses/:id', {
			headers: {
				Authorization: `Bearer ${token}`,
			},
		});
		console.log(response);
		return response;
	} catch (error) {
		console.log(error);
		throw error;
	}
};

export const addNewAuthor = (token, name) => {
	try {
		const response = instance.post('/authors/add', {
			headers: {
				Authorization: `Bearer ${token}`,
			},
			body: name,
		});
		return response;
	} catch (error) {
		console.log(error);
		throw error;
	}
};

export const getUser = (token) => {
	try {
		const response = instance.get('/users/me', {
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
