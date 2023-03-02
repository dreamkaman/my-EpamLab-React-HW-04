import { useEffect, useState } from 'react';
import { useAppDispatch, useAppSelector } from 'redux/hooks';
import { useNavigate } from 'react-router-dom';

import CourseCard from './components/CourseCard/CourseCard';
import Button from 'common/Button';
import SearchBar from './components/SearchBar';

import { convertAuthorsIdToNames } from 'helpers/authorsString';
import { dateTransform } from 'helpers/dateGenerator';

import { getAllAuthorsSelector } from 'redux/store/authors/selectors';
import {
	getTokenSelector,
	getUserProfileSelector,
	getUserRoleSelector,
} from 'redux/store/user/selectors';
import { getUserDataAction } from 'redux/store/user/actionCreators';

import { ICourse } from 'tsTypes';

import s from './Courses.module.css';

const Courses = () => {
	const navigate = useNavigate();

	const authors = useAppSelector(getAllAuthorsSelector);

	const [filteredCourses, setFilteredCourses] = useState<ICourse[]>([]);

	const token = useAppSelector(getTokenSelector);

	const role = useAppSelector(getUserRoleSelector);

	const userProfile = useAppSelector(getUserProfileSelector);

	const dispatch = useAppDispatch();

	useEffect(() => {
		dispatch(getUserDataAction(token));
	}, [token]);

	useEffect(() => {
		if (role) {
			localStorage.setItem('user', JSON.stringify(userProfile));
		}
	}, [role]);

	const onAddNewCourseClick = () => {
		navigate('/courses/add');
	};

	return (
		<section className={s.coursesSection}>
			<div className={s.wrapper}>
				<SearchBar
					filteredCourses={filteredCourses}
					setFilteredCourses={setFilteredCourses}
				/>
				{role === 'admin' && (
					<Button btnText='Add new course' onClick={onAddNewCourseClick} />
				)}
			</div>

			<ul>
				{filteredCourses?.map((course) => {
					return (
						<CourseCard
							id={course.id}
							key={course.id}
							title={course.title}
							description={course.description}
							authors={convertAuthorsIdToNames(course.authors, authors)}
							duration={course.duration}
							creationDate={dateTransform(course.creationDate)}
						/>
					);
				})}
			</ul>
			{/* )} */}
		</section>
	);
};

export default Courses;
