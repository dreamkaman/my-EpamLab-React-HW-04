import { FC, MouseEventHandler } from 'react';

import { useNavigate } from 'react-router-dom';
import Button from 'common/Button';

import { ICourseCardProps } from 'tsTypes';
import { durationTransform } from 'helpers/pipeDuration';
import { useAppDispatch } from 'redux/store';
import { deleteCourseAction } from 'redux/store/courses/actionCreators';

import s from './CourseCard.module.css';

const CourseCard: FC<ICourseCardProps> = ({
	id,
	title,
	description,
	authors,
	duration,
	creationDate,
}) => {
	const navigate = useNavigate();
	const dispatch = useAppDispatch();

	const onShowCourseClickHandle = () => {
		navigate(`/courses/${id}`);
	};

	const onDeleteCourse: MouseEventHandler<HTMLButtonElement> = (e) => {
		const id = e.currentTarget.id;
		dispatch(deleteCourseAction(id));
	};

	return (
		<li className={s.courseCard}>
			<div className={s.courseCardLeftSide}>
				<h3 className={s.title}>{title}</h3>
				<p className={s.description}>{description}</p>
			</div>
			<div className={s.courseCardRightSide}>
				<p>
					<span>Author: </span>
					{authors}
				</p>
				<p>
					<span>Duration: </span>
					{durationTransform(duration)} hours
				</p>
				<p>
					<span>Created: </span>
					{creationDate}
				</p>
				<div className={s.buttonsWrapper}>
					<Button
						id={id}
						btnText='Show course'
						onClick={onShowCourseClickHandle}
					/>
					<Button id={id} image='pen' btnText='' />
					<Button id={id} image='trash' btnText='' onClick={onDeleteCourse} />
				</div>
			</div>
		</li>
	);
};

export default CourseCard;
