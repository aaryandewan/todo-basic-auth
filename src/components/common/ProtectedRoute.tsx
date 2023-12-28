// src/components/common/ProtectedRoute.tsx

import { FC, ReactElement } from 'react';
import { Navigate} from 'react-router-dom';
import { isAuthenticated } from '../../utils/auth';

interface ProtectedRouteProps {
  element: ReactElement;
}

const ProtectedRoute: FC<ProtectedRouteProps> = ({ element }) => {
  if (!isAuthenticated()) { //sirf check karta hai ki token valid hai and exist karta hai
    return <Navigate to="/login"/>;
  }
  return element;
};

export default ProtectedRoute;
