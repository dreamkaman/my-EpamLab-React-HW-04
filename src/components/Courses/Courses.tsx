import { useState } from 'react';
import { useAppSelector } from 'redux/hooks';
import { useNavigate } from 'react-router-dom';

import CourseCard from './components/CourseCard/CourseCard';
import Button from 'common/Button';
import SearchBar from './components/SearchBar';

import { convertAuthorsIdToNames } from 'helpers/authorsString';
import { dateTransform } from 'helpers/dateGenerator';

import { getAllAuthorsSelector } from 'redux/store/authors/selectors';

import { ICourse } from 'tsTypes';

import s from './Courses.module.css';

const Courses = () => {
	const navigate = useNavigate();

	const authors = useAppSelector(getAllAuthorsSelector);

	const [filteredCourses, setFilteredCourses] = useState<ICourse[]>([]);

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
				<Button btnText='Add new course' onClick={onAddNewCourseClick} />
			</div>

			<ul>
				{filteredCourses?.map((course) => {
					return (
						<CourseCard
							id={course.id}
							key={course.id}
							title={course.title}
							description={course.description}
							authors={convertAuthorsIdToNames(course.authorsId, authors)}
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
