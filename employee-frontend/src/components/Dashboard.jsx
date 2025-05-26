import React from 'react';
import { Container, Button } from 'react-bootstrap';
import { useNavigate } from 'react-router-dom';

const Dashboard = () => {
  const navigate = useNavigate();

  const logout = () => {
    localStorage.clear();
    navigate('/login');
  };
  const role = localStorage.getItem('role');

  return (
    <Container className="mt-4">
      <h2>Dashboard</h2>
      {role === 'admin' && 
      <Button variant="info" onClick={() => navigate('/employees')} className="me-2">Manage Employees</Button>}
      <Button variant="success" onClick={() => navigate('/leaves')} className="me-2">Apply Leave</Button>
      <Button variant="danger" onClick={logout}>Logout</Button>
    </Container>
  );
};

export default Dashboard;
