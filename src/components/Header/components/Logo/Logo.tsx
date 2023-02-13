import logoImg from 'images/logo.png';

import s from './Logo.module.css';

const Logo = () => {
	return <img className={s.image} src={logoImg} alt='Programming courses' />;
};

export default Logo;
