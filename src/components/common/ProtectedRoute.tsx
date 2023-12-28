// src/components/common/ProtectedRoute.tsx

import React, { FC, ReactElement } from 'react';
import { Navigate, useLocation, Route } from 'react-router-dom';
import { isAuthenticated } from '../../utils/auth';

interface ProtectedRouteProps {
  path: string;
  element: ReactElement;
}

const ProtectedRoute: FC<ProtectedRouteProps> = ({ path, element }) => {
  const location = useLocation();

  if (!isAuthenticated()) {
    // Redirect them to the /signin page, but save the current location they were
    // trying to go to when they were redirected. This allows us to send them
    // along to that page after they login, which is a nicer user experience
    // than dropping them off on the home page.
    return <Navigate to="/login" state={{ from: location }} />;
  }

  return <Route path={path} element={element} />;
};

export default ProtectedRoute;
