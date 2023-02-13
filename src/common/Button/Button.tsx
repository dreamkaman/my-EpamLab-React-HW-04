import { FC } from 'react';

import { IButtonProps } from 'tsTypes';

import sprite from 'images/svg/sprite.svg';

import styles from './Button.module.css';

const Button: FC<IButtonProps> = ({
	id = '#',
	btnText = '',
	onClick,
	type = 'button',
	image = '',
}) => {
	return (
		<button id={id} className={styles.btn} type={type} onClick={onClick}>
			{!image && btnText}
			{image && (
				<svg className={styles.svg}>
					<use href={sprite + `#${image}`}></use>
				</svg>
			)}
		</button>
	);
};

export default Button;
