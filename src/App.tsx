import { Route, Routes } from 'react-router';

import Header from 'components/Header';
import Courses from 'components/Courses';
import CourseInfo from 'components/CourseInfo';
import Registration from 'components/Registration';
import Login from 'components/Login';
import CourseForm from 'components/CourseForm';
import ProtectedRoute from 'common/ProtectedRoute';
import PrivateRoute from 'components/PrivateRouter';

import { useAppSelector } from 'redux/hooks';
import {
	getIsAuthSelector,
	getUserRoleSelector,
} from 'redux/store/user/selectors';
import { Navigate } from 'react-router-dom';

const App = () => {
	const isAuth = useAppSelector(getIsAuthSelector);
	const role = useAppSelector(getUserRoleSelector);

	return (
		<>
			<Header />
			<Routes>
				<Route path='/login' element={<Login />} />
				<Route path='/registration' element={<Registration />} />
				<Route
					path='/'
					element={
						isAuth ? <Navigate to={'/courses'} /> : <Navigate to={'/login'} />
					}
				/>

				<Route
					path='/courses'
					element={
						<ProtectedRoute isLoggined={isAuth}>
							<Courses />
						</ProtectedRoute>
					}
				/>

				<Route
					path='/courses/add'
					element={
						<PrivateRoute userRole={role}>
							<CourseForm mode='create' />
						</PrivateRoute>
					}
				/>
				<Route
					path='/courses/:courseId'
					element={
						<ProtectedRoute isLoggined={isAuth}>
							<CourseInfo />
						</ProtectedRoute>
					}
				/>

				<Route
					path='/courses/update/:courseId'
					element={
						<PrivateRoute userRole={role}>
							<CourseForm mode='update' />
						</PrivateRoute>
					}
				/>

				<Route path='*' element={<p>Something went wrong: 404!</p>} />
			</Routes>
		</>
	);
};

export default App;
