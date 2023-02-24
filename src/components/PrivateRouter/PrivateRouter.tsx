import { FC } from 'react';

import { IPrivateRouteProps } from 'tsTypes';

import { Navigate } from 'react-router-dom';

const PrivateRoute: FC<IPrivateRouteProps> = ({ userRole, children }) => {
	if (userRole === 'admin') {
		return children;
	}
	return <Navigate to='/courses' replace />;
};

export default PrivateRoute;
