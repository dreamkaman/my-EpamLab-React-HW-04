import { ChangeEvent, ReactElement } from 'react';

import { IAuthor } from 'helpers/authorsString';

export interface ICourseFormProps {
	mode: 'create' | 'update';
}

export interface ICourseBase {
	id: string;
	title: string;
	description: string;
	creationDate: string;
	duration: number;
}

export interface ICourse extends ICourseBase {
	authors: string[];
}

export type TonClickHandle = (value: boolean) => void;

export interface ISignUpUserReq {
	name: string;
	email: string;
	password: string;
}

export interface ISignUpUserRes {
	data: { successful: boolean; result: string };
	status: number;
	statusText: string;
}

export interface ILoginUserReq {
	email: string;
	password: string;
}

export interface IData {
	successful: boolean;
	result: string; //token
	user: ILoginUserReq;
}

export interface ILoginUserRes {
	status: number;
	data: IData;
}

export interface ILogoutUserRes {
	status: number;
}

export type SignUpUserFn = (user: ISignUpUserReq) => Promise<ISignUpUserRes>;

export type LoginUserFn = (user: ILoginUserReq) => Promise<ILoginUserRes>;

export type LogOutUserFn = (token: string) => Promise<ILogoutUserRes>;

export interface IButtonProps {
	id?: string;
	btnText?: string;
	onClick?: React.MouseEventHandler<HTMLButtonElement>;
	type?: 'button' | 'submit';
	image?: string;
}

export interface IInputProps {
	name?: string;
	placeholder?: string;
	width?: number;
	labelTxt?: string;
	value?: string;
	type?: 'text' | 'password';
	onChange: (e: ChangeEvent<HTMLInputElement>) => void;
}

export interface IProtectedRouteProps {
	isLoggined: boolean;
	children: ReactElement;
}

export interface IPrivateRouteProps {
	userRole: 'admin' | 'user';
	children: ReactElement;
}

export interface ITitleProps {
	titleText: string;
}

export interface ICourseCardProps extends ICourseBase {
	authors: string;
}

export interface ISearchBarProps {
	filteredCourses: ICourse[];
	setFilteredCourses: React.Dispatch<React.SetStateAction<ICourse[]>>;
}

export interface ISelectedAuthorsListProps {
	selectedAuthors: IAuthor[];
	onClick: React.MouseEventHandler<HTMLButtonElement>;
}

export interface ILogoOutProps {
	userName?: string;
}

export interface IReqUser {
	email: string;
	password: string;
}

export interface IAddNewCourseReq {
	token: string;
	course: {
		title: string;
		duration: number;
		description: string;
		authors: string[];
	};
}

export interface IAddNewCourseRes {
	successful: boolean;
	data: {
		result: ICourse;
	};
}

export type AddNewCourseFn = (req: IAddNewCourseReq) => Promise<ICourse>;

export interface IEditCourseReq {
	id: string;
	token: string;
	course: {
		authors: string[];
		description: string;
		duration: number;
		title: string;
	};
}

export interface IEditCourseRes {
	successful: boolean;
	result: ICourse;
}

export type EditCourseFn = (req: IEditCourseReq) => Promise<IEditCourseRes>;

export interface IDeleteCourseRes {
	successful: boolean;
	result: string;
}
export type DeleteCourseFn = (req: {
	id: string;
	token: string;
}) => Promise<IDeleteCourseRes>;

export interface IAddNewAuthorRes {
	data: {
		successful: boolean;
		result: IAuthor;
	};
}
export type AddNewAuthorFn = (req: {
	token: string;
	name: string;
}) => Promise<IAuthor>;

export interface IFullUserData {
	name: string;
	email: string;
	password: string;
	role: 'admin' | 'user';
	id: string;
}

export interface IGetUserRes {
	data: {
		successful: boolean;
		result: IFullUserData;
	};
}

export type GetUserFn = (token: string) => Promise<IFullUserData>;

export interface IGetAllCoursesRes {
	data: {
		successful: boolean;
		result: ICourse;
	};
}

export type GetAllCoursesFn = () => Promise<IGetAllCoursesRes>;
