import { Route, Routes } from 'react-router';

import Header from 'components/Header';
import Courses from 'components/Courses';
import CourseInfo from 'components/CourseInfo';
import Registration from 'components/Registration';
import Login from 'components/Login';
import CreateCourse from 'components/CreateCourse';
import ProtectedRoute from 'common/ProtectedRoute';

import { useAppSelector } from 'redux/hooks';
import { getIsAuthSelector } from 'redux/store/user/selectors';
import { Navigate } from 'react-router-dom';

const App = () => {
	const isAuth = useAppSelector(getIsAuthSelector);

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
						<ProtectedRoute isLoggined={isAuth}>
							<CreateCourse />
						</ProtectedRoute>
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

				<Route path='*' element={<p>Something went wrong: 404!</p>} />
			</Routes>
		</>
	);
};

export default App;
