import React from 'react';
import UserDashboard from './components/user/dashboard/UserDashboard';
import UserLogin from './components/Login/UserLogin';
import SignUp from './components/Login/SignUp';
import { BrowserRouter as Router, Route, Routes, Navigate } from 'react-router-dom';

function App() {
  return (
    <div className="App">
      <Router>
        <Routes>
          <Route path="/login" element={<UserLogin />} />
          <Route path="/signup" element={<SignUp />} />
          <Route path="/dashboard/*" element={<UserDashboard />} />
          <Route path="/" element={<Navigate to="/login" replace />} />
        </Routes>
      </Router>
    </div>
  );
}

export default App;