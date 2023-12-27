import React from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import Signup from './pages/Signup';// the path to your theme file
import SignIn from './pages/Login';// the path to your theme file
import TodoPage from './pages/TodoPage';// the path to your theme file

import ProtectedRoute from './components/common/ProtectedRoute';

// ... import other pages/componeants

const App: React.FC = () => {
  return (
    <Router>
      <Routes>
      <Route path="/signup" element={<Signup />} />
      <Route path="/login" element={<SignIn />} />
      <Route path="/todos" element={<ProtectedRoute path="/todos" element={<TodoPage />} />} />
        {/* Add other routes here */}
      </Routes>
    </Router>
  );
};

export default App;
