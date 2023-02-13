import { FC } from 'react';

import Button from 'common/Button';

import { ISelectedAuthorsListProps } from 'tsTypes';

import s from './SelectedAuthorsList.module.css';

const SelectedAuthorsList: FC<ISelectedAuthorsListProps> = ({
	selectedAuthors,
	onClick,
}) => {
	return (
		<ul>
			{selectedAuthors.map((author) => {
				return (
					<li key={author.id} className={s.authorsListItem}>
						{author.name}
						<Button id={author.id} btnText='X' onClick={onClick} />
					</li>
				);
			})}
		</ul>
	);
};

export default SelectedAuthorsList;
