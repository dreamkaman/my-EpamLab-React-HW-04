import { useState } from 'react';
import { Link } from 'react-router-dom';
import { useNavigate } from 'react-router-dom';

import Input from 'common/Input';
import Button from 'common/Button';
import * as api from 'api/api';

import s from './Registration.module.css';

const Registration = () => {
	const [nameValue, setNameValue] = useState('');
	const [emailValue, setEmailValue] = useState('');
	const [passwordValue, setPasswordValue] = useState('');

	const navigate = useNavigate();

	const onChangeNameHandle: React.ChangeEventHandler<HTMLInputElement> = (
		e
	) => {
		setNameValue(e.target.value);
	};

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

		const newUser = {
			name: nameValue,
			email: emailValue,
			password: passwordValue,
		};

		const response = await api.signUpUser(newUser);

		if (response?.status === 201) {
			navigate('/login');
		}
	};
	return (
		<form className={s.registrationForm} onSubmit={onSubmitHandle}>
			<h2>Registration</h2>
			<Input
				placeholder='Enter name'
				labelTxt='Name'
				width={350}
				value={nameValue}
				onChange={onChangeNameHandle}
			/>
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
			<Button btnText='Registration' type='submit' />
			<p className={s.warning}>
				If you have an account you can{' '}
				<Link to='/login' className={s.loginLink}>
					Login
				</Link>
			</p>
		</form>
	);
};

export default Registration;
