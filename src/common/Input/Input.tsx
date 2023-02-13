import { FC } from 'react';

import { IInputProps } from 'tsTypes';

import s from './Input.module.css';

const Input: FC<IInputProps> = ({
	placeholder = '',
	width = 300,
	labelTxt = '',
	value = '',
	type = 'text',
	onChange,
}) => {
	return (
		<div className={s.wrapper}>
			<label htmlFor='searchText' className={s.labelTxt}>
				{labelTxt}
			</label>
			<input
				name='searchText'
				type={type}
				style={{ width: width + 'px', marginRight: '10px' }}
				className={s.txtInput}
				placeholder={placeholder}
				value={value}
				onChange={onChange}
			/>
		</div>
	);
};

export default Input;
