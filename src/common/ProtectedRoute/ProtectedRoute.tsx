import { FC } from 'react';

import { IProtectedRouteProps } from 'tsTypes';

import { Navigate } from 'react-router-dom';

const ProtectedRoute: FC<IProtectedRouteProps> = ({ isLoggined, children }) => {
	if (isLoggined) {
		return children;
	}
	return <Navigate to='/registration' replace />;
};

export default ProtectedRoute;
