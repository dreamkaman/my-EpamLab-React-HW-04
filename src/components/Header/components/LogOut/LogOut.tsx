import { FC, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { useAppSelector } from 'redux/hooks';

import Button from 'common/Button';

import { getTokenSelector } from 'redux/store/user/selectors';
import { useAppDispatch } from 'redux/hooks';
import { userLogoutAction } from 'redux/store/user/actionCreators';
import { ILogoOutProps } from 'tsTypes';

import s from './LogOut.module.css';

const LogOut: FC<ILogoOutProps> = ({ userName = 'Anonymous' }) => {
	const navigate = useNavigate();
	const dispatch = useAppDispatch();
	const token = useAppSelector(getTokenSelector);

	useEffect(() => {
		if (!token) {
			localStorage.setItem('token', '');
			navigate('/login');
		}
	}, [token]);

	const onClickHandler = () => {
		dispatch(userLogoutAction(token));
	};

	return (
		<div className={s.wrapper}>
			<p className={s.userName}>{userName}</p>
			<Button btnText='Logout' onClick={onClickHandler} />
		</div>
	);
};

export default LogOut;
