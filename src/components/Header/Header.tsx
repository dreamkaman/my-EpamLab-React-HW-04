import { Link } from 'react-router-dom';

import Logo from './components/Logo/Logo';
import LogOut from './components/LogOut/LogOut';

import { useAppSelector } from 'redux/hooks';
import {
	getIsAuthSelector,
	getUserNameSelector,
} from 'redux/store/user/selectors';

import s from './Header.module.css';

const Header = () => {
	const userName = useAppSelector(getUserNameSelector);
	const isLoggined = useAppSelector(getIsAuthSelector);

	return (
		<header>
			<div className={s.wrapper}>
				<Link to='/'>
					<Logo />
				</Link>

				<p className={s.logoText}>courses</p>
			</div>
			{isLoggined && <LogOut userName={userName} />}
		</header>
	);
};

export default Header;
