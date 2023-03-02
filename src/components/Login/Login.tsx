import { useState, useEffect } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { useAppDispatch } from 'redux/store';
import { useAppSelector } from 'redux/hooks';

import Input from 'common/Input';
import Button from 'common/Button';

import { userLoginAction } from 'redux/store/user/actionCreators';

import {
	getTokenSelector,
	getIsAuthSelector,
} from 'redux/store/user/selectors';

import { IReqUser } from 'tsTypes';

import s from './Login.module.css';

const Login = () => {
	const navigate = useNavigate();
	const dispatch = useAppDispatch();
	const token = useAppSelector(getTokenSelector);
	const isAuth = useAppSelector(getIsAuthSelector);

	const [emailValue, setEmailValue] = useState('');
	const [passwordValue, setPasswordValue] = useState('');

	useEffect(() => {
		if (isAuth) {
			localStorage.setItem('token', token);
			navigate('/courses');
		}
	}, [isAuth]);

	const onChangeEmailHandle: React.ChangeEventHandler<HTMLInputElement> = (
		e
	) => {
		setEmailValue(e.target.value);
	};

	const onChangePasswordHandle: React.ChangeEventHandler<HTMLInputElement> = (
		e
	) => {
		setPasswordValue(e.target.value);
	};

	const onSubmitHandle: React.FormEventHandler<HTMLFormElement> = async (e) => {
		e.preventDefault();

		const reqUser: IReqUser = { email: emailValue, password: passwordValue };

		///----------------
		dispatch(userLoginAction(reqUser));
		///----------------
	};

	return (
		<form className={s.loginForm} onSubmit={onSubmitHandle}>
			<h2>Login</h2>
			<Input
				placeholder='Enter email'
				labelTxt='Email'
				value={emailValue}
				onChange={onChangeEmailHandle}
			/>
			<Input
				placeholder='Enter password'
				labelTxt='Password'
				value={passwordValue}
				type='password'
				onChange={onChangePasswordHandle}
			/>
			<Button btnText='Login' type='submit' />

			<p className={s.warning}>
				If you have an account you can{' '}
				<Link to='/registration' className={s.registrationLink}>
					Registration
				</Link>
			</p>
		</form>
	);
};

export default Login;
