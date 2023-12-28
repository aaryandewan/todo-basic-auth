import React from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import Signup from './pages/Signup';
import SignIn from './pages/Login';
import TodoPage from './pages/TodoPage';
import { AuthProvider } from './AuthContext';

import ProtectedRoute from './components/common/ProtectedRoute';

const App: React.FC = () => {
  return (
    <Router>
      <AuthProvider>
        <Routes>
          <Route path="/signup" element={<Signup />} />
          <Route path="/login" element={<SignIn />} />
          <Route path="/todos" element={<ProtectedRoute path="/todos" element={<TodoPage />} />} />
        </Routes>
      </AuthProvider>
    </Router>
  );
};

export default App;
