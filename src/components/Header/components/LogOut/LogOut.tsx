import { FC } from 'react';
import { useAppSelector } from 'redux/hooks';

import Button from 'common/Button';

import { getTokenSelector } from 'redux/store/user/selectors';
import { useAppDispatch } from 'redux/hooks';
import { userLogoutAction } from 'redux/store/user/actionCreators';
import { ILogoOutProps } from 'tsTypes';

import s from './LogOut.module.css';

const LogOut: FC<ILogoOutProps> = ({ userName = 'Anonymous' }) => {
	const dispatch = useAppDispatch();
	const token = useAppSelector(getTokenSelector);

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
