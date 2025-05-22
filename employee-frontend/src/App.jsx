import React from 'react';
import { BrowserRouter as Router, Routes, Route, Navigate } from 'react-router-dom';
import Login from './components/Login';
import Dashboard from './components/Dashboard';
import EmployeeList from './components/EmployeeList';
import LeaveForm from './components/LeaveForm';

function App() {
  const isAuthenticated = !!localStorage.getItem('access');

  return (
    <Router>
      <Routes>
        <Route path="/login" element={<Login />} />
        <Route path="/" element={isAuthenticated ? <Dashboard /> : <Navigate to="/login" />} />
        <Route path="/employees" element={<EmployeeList />} />
        <Route path="/leaves" element={<LeaveForm />} />
      </Routes>
    </Router>
  );
}

export default App;
