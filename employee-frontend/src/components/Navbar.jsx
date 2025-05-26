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
    <nav className="navbar navbar-expand-lg navbar-light bg-light mb-3">
      <div className="container-fluid">
        <Link className="navbar-brand" to="/">Dashboard</Link>
        <div className="collapse navbar-collapse">
          <ul className="navbar-nav me-auto mb-2 mb-lg-0">
          {role === 'admin' && (
              <li className="nav-item">
                <Link className="nav-link" to="/employees">Employees</Link>
              </li>
            )}            
            {role === 'user' && (
            <li className="nav-item">
              <Link className="nav-link" to="/leaves">Apply Leave</Link>
            </li>
            )}
            <li className="nav-item">
              <button className="btn btn-outline-danger" onClick={logout}>
                Logout
              </button>
            </li>
          </ul>
        </div>
      </div>
    </nav>
  );
}
export default Navbar;
