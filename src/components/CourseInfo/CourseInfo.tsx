import { Link, useParams } from 'react-router-dom';

import { durationTransform } from 'helpers/pipeDuration';
import { dateTransform } from 'helpers/dateGenerator';
import { convertAuthorsIdToNames } from 'helpers/authorsString';

import s from './CourseInfo.module.css';
import { useAppSelector } from 'redux/hooks';
import { getAllCoursesSelector } from 'redux/store/courses/selectors';
import { getAllAuthorsSelector } from 'redux/store/authors/selectors';

const CourseInfo = () => {
	const { courseId } = useParams();

	const courses = useAppSelector(getAllCoursesSelector);
	const authors = useAppSelector(getAllAuthorsSelector);

	const course = courses?.find((course) => course.id === courseId);

	return (
		<section className={s.courseInfoBlock}>
			<Link to='/courses' className={s.backToLink}>
				{'< Back to Courses'}
			</Link>
			<h2>{course?.title}</h2>
			<div className={s.wrapper}>
				<p className={s.description}>{course?.description}</p>
				<div className={s.courseAbout}>
					<p className={s.courseId}>
						<span>ID:</span>
						{course.id}
					</p>
					<p className={s.duration}>
						<span>Duration:</span>
						{durationTransform(course?.duration)} hours
					</p>
					<p className={s.created}>
						<span>Created:</span>
						{dateTransform(course?.creationDate)}
					</p>
					<p className={s.authors}>
						<span>Authors:</span>
						{convertAuthorsIdToNames(course?.authors, authors)}
					</p>
				</div>
			</div>
		</section>
	);
};

export default CourseInfo;
