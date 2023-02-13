import { FC } from 'react';

import { ITitleProps } from 'tsTypes';

import s from './Title.module.css';

const Title: FC<ITitleProps> = ({ titleText }) => (
	<h3 className={s.title}>{titleText}</h3>
);

export default Title;
