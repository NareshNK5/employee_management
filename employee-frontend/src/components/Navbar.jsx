import React from 'react';
import { Link, useNavigate } from 'react-router-dom';

function Navbar() {
  const role = localStorage.getItem('role');
  const navigate = useNavigate();

  const logout = () => {
    localStorage.clear();
    navigate('/login');
  };

  return (
    <nav>
      <Link to="/">Dashboard</Link>
      {role === 'admin' && <Link to="/employees">Employees</Link>}
      <Link to="/leave">Apply Leave</Link>
      <button onClick={logout}>Logout</button>
    </nav>
  );
}
export default Navbar;
