import axios from 'axios';

import {
	ISignUpUserRes,
	ILoginUserRes,
	LogOutUserFn,
	LoginUserFn,
	SignUpUserFn,
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
