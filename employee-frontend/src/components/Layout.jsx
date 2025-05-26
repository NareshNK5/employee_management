import React from 'react';
import { Outlet, Navigate } from 'react-router-dom';
import Navbar from './Navbar';

const Layout = () => {
  const isAuthenticated = !!localStorage.getItem('access');

  if (!isAuthenticated) {
    return <Navigate to="/login" />;
  }

  return (
    <>
      <Navbar />
      <div className="main-content">
        <Outlet />
      </div>
    </>
  );
};

export default Layout;
