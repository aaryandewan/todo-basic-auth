import React from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import SignUp from './pages/SignUp';// the path to your theme file

// ... import other pages/componeants

const App = () => {
  return (
    <Router>
      <Routes>
        <Route path="/signup" element={<SignUp />} />
        {/* Add other routes here */}
      </Routes>
    </Router>
  );
};

export default App;
