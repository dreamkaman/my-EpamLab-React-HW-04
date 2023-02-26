import { FC, useEffect, useState } from 'react';
import { useNavigate, useParams } from 'react-router-dom';

import Button from 'common/Button';
import Input from 'common/Input';
import Title from 'common/Title';
import SelectedAuthorsList from './components/SelectedAuthorsList';

import { durationTransform } from 'helpers/pipeDuration';
import { IAuthor, getAuthorsIdArray } from 'helpers/authorsString';

import { useAppSelector } from 'redux/hooks';
import { getAllAuthorsSelector } from 'redux/store/authors/selectors';
import { useAppDispatch } from 'redux/store';

import { addNewAuthorAction } from 'redux/store/authors/actionCreators';

import {
	addNewCourseAction,
	updateCourseAction,
} from 'redux/store/courses/actionCreators';
import { getTokenSelector } from 'redux/store/user/selectors';
import { ICourseFormProps } from 'tsTypes';

import s from './CourseForm.module.css';
import { getAllCoursesSelector } from 'redux/store/courses/selectors';

const CourseForm: FC<ICourseFormProps> = ({ mode }) => {
	const dispatch = useAppDispatch();

	const authors = useAppSelector(getAllAuthorsSelector);

	const courses = useAppSelector(getAllCoursesSelector);

	const token = useAppSelector(getTokenSelector);

	const navigate = useNavigate();

	const params = useParams();

	const [title, setTitle] = useState<string>('');
	const [authorName, setAuthorName] = useState<string>(''); //state for the new author name input
	const [duration, setDuration] = useState<number>(0);
	const [description, setDescription] = useState<string>('');
	const [selectedAuthors, setSelectedAuthors] = useState<IAuthor[]>([]);
	const [restAuthors, setRestAuthors] = useState<IAuthor[]>([]);

	useEffect(() => {
		if (mode === 'create') {
			setRestAuthors(authors);
		} else {
			const id = params.courseId;
			const currentCourse = courses.find((course) => course.id === id);

			const restAuthorsCalculated = authors.filter((author) => {
				return !currentCourse.authors.includes(author.id);
			});

			const selectedAuthorsCalculated = authors.filter((author) => {
				return currentCourse.authors.includes(author.id);
			});

			setTitle(currentCourse.title);
			setDescription(currentCourse.description);
			setDuration(currentCourse.duration);

			setRestAuthors(restAuthorsCalculated);
			setSelectedAuthors(selectedAuthorsCalculated);
		}
	}, [authors]);

	const onChangeTitleHandle: React.ChangeEventHandler<HTMLInputElement> = (
		e
	) => {
		setTitle(e.target.value);
	};

	const onChangeAuthorNameHandle: React.ChangeEventHandler<HTMLInputElement> = (
		e
	) => {
		setAuthorName(e.target.value);
	};

	const onChangeDurationHandle: React.ChangeEventHandler<HTMLInputElement> = (
		e
	) => {
		setDuration(Number(e.target.value));
	};

	const onCancelClick = () => {
		navigate('/courses');
	};

	const onSubmitHandle = (e: React.SyntheticEvent) => {
		e.preventDefault();

		if (
			title.length < 2 ||
			description.length < 2 ||
			!duration ||
			!selectedAuthors.length
		) {
			alert('Please, fill in all fields');
			return;
		}

		const authorsId = getAuthorsIdArray(selectedAuthors);

		if (mode === 'create') {
			dispatch(
				addNewCourseAction({
					token,
					course: { title, description, duration, authors: authorsId },
				})
			);

			setSelectedAuthors([]);
			setRestAuthors(authors);
			setTitle('');
			setDescription('');
			setDuration(0);
		} else {
			const { courseId } = params;

			dispatch(
				updateCourseAction({
					id: courseId,
					token,
					course: { title, description, duration, authors: authorsId },
				})
			);
		}
	};

	const onCreateAuthorClickHandle = () => {
		if (authorName && authorName.length > 1) {
			dispatch(addNewAuthorAction({ token, name: authorName }));

			setAuthorName('');

			return;
		}
		alert('Please, enter correct author name');
	};

	const onAddAuthorClickHandle: React.MouseEventHandler<HTMLElement> = (e) => {
		const selectedAuthor = restAuthors.find(
			(author) => author.id === e.currentTarget.id
		);

		setSelectedAuthors((prev) => [selectedAuthor, ...prev]);

		const rest = restAuthors.filter(
			(author) => author.id !== e.currentTarget.id
		);

		setRestAuthors(rest);
	};

	const onDeleteAuthorClickHandle: React.MouseEventHandler<
		HTMLButtonElement
	> = (e) => {
		const deletedAuthorId = e.currentTarget.id;
		const deletedAuthor = selectedAuthors.find(
			(author) => author.id === e.currentTarget.id
		);
		setSelectedAuthors((prev) => {
			const newState = prev.filter((author) => author.id !== deletedAuthorId);
			return newState;
		});
		setRestAuthors((prev) => [...prev, deletedAuthor]);
	};

	const onChangeDescriptionHandle: React.ChangeEventHandler<
		HTMLTextAreaElement
	> = (e) => {
		setDescription(e.currentTarget.value);
	};

	return (
		<form className={s.createCourseForm} onSubmit={onSubmitHandle}>
			<div className={s.courseHeader}>
				<Input
					labelTxt='Title'
					name='title'
					value={title}
					onChange={onChangeTitleHandle}
					placeholder='Enter title'
				/>
				<div className={s.wrapperBtn}>
					<Button
						btnText={mode === 'create' ? 'Create course' : 'Update course'}
						type='submit'
					/>
					<Button btnText='Cancel' onClick={onCancelClick} />
				</div>
			</div>
			<div className={s.descriptionBlock}>
				<label htmlFor='description'>Description</label>
				<textarea
					name='description'
					className={s.descriptionText}
					placeholder='Enter description'
					onChange={onChangeDescriptionHandle}
					value={description}
				></textarea>
			</div>
			<div className={s.courseProperties}>
				<div className={s.leftSide}>
					<div className={s.addAuthorBlock}>
						<Title titleText='Add author' />
						<Input
							name='authorname'
							labelTxt='Author name'
							value={authorName}
							onChange={onChangeAuthorNameHandle}
							placeholder={'Enter author name...'}
						/>
						<Button
							btnText='Create author'
							onClick={onCreateAuthorClickHandle}
						/>
					</div>
					<div className={s.addDurationBlock}>
						<Title titleText='Duration' />
						<Input
							name='duration'
							labelTxt='Duration'
							value={duration.toString()}
							onChange={onChangeDurationHandle}
							placeholder={'Enter duration in minutes...'}
						/>
						<p className={s.durationTransformed}>
							Duration: <span>{durationTransform(duration)}</span> hours
						</p>
					</div>
				</div>
				<div className={s.rightSide}>
					<div className={s.authorListBlock}>
						<Title titleText='Authors' />
						{!!restAuthors.length && (
							<ul className={s.authorsList}>
								{restAuthors.map((author) => {
									return (
										<li key={author.id} className={s.authorListItem}>
											{author.name}
											<Button
												id={author.id}
												btnText='Add author'
												onClick={onAddAuthorClickHandle}
											/>
										</li>
									);
								})}
							</ul>
						)}
					</div>
					<div className={s.courseAuthorsBlock}>
						<Title titleText='Course authors' />
						{selectedAuthors.length ? (
							<SelectedAuthorsList
								selectedAuthors={selectedAuthors}
								onClick={onDeleteAuthorClickHandle}
							/>
						) : (
							<p style={{ fontWeight: '500' }}>Author list is empty</p>
						)}
					</div>
				</div>
			</div>
		</form>
	);
};

export default CourseForm;
