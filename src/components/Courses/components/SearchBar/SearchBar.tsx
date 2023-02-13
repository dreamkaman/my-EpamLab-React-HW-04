import { FC, useEffect, useState } from 'react';

import Input from 'common/Input';
import Button from 'common/Button';

import { useAppSelector } from 'redux/hooks';
import { getAllCoursesSelector } from 'redux/store/courses/selectors';
import { useAppDispatch } from 'redux/store';
import { getAllCoursesAction } from 'redux/store/courses/actionCreators';
import { getAllAuthorsAction } from 'redux/store/authors/actionCreators';
import { ISearchBarProps } from 'tsTypes';

import s from './SearchBar.module.css';

const SearchBar: FC<ISearchBarProps> = ({
	filteredCourses,
	setFilteredCourses,
}) => {
	const [filter, setFilter] = useState('');

	const courses = useAppSelector(getAllCoursesSelector);
	const dispatch = useAppDispatch();

	useEffect(() => {
		dispatch(getAllCoursesAction());
		dispatch(getAllAuthorsAction());
	}, []);

	useEffect(() => {
		setFilteredCourses(courses);
	}, [courses]);

	const onChangeHandle = (e: React.FormEvent<HTMLInputElement>) => {
		setFilter(e.currentTarget.value);
	};

	const onSubmitHandle = (e: React.SyntheticEvent) => {
		e.preventDefault();

		const filterInLowerCase = filter.toLowerCase();

		if (filterInLowerCase) {
			const foundCourses = filteredCourses.filter(
				(course) =>
					course.id.toLowerCase().includes(filterInLowerCase) ||
					course.title.toLowerCase().includes(filterInLowerCase)
			);
			setFilteredCourses(foundCourses);
		} else {
			setFilteredCourses(courses);
		}
	};

	return (
		<div>
			<form action='#' className={s.searchForm} onSubmit={onSubmitHandle}>
				<Input
					name='searchText'
					placeholder='Enter course name...'
					onChange={onChangeHandle}
					value={filter}
				/>
				<Button btnText='Search' type='submit' />
			</form>
		</div>
	);
};

export default SearchBar;
