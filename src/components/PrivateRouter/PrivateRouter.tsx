import { FC } from 'react';

import { IPrivateRouteProps } from 'tsTypes';

import { Navigate } from 'react-router-dom';

const PrivateRoute: FC<IPrivateRouteProps> = ({ role, children }) => {
	if (role === 'admin') {
		return children;
	}
	return <Navigate to='/registration' replace />;
};

export default PrivateRoute;
