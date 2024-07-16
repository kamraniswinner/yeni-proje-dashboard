import React from 'react';
import { Navigate } from 'react-router-dom';
import { useSelector } from 'react-redux';

const PrivateRoute = ({ children }) => {
  const isAuthenticated = useSelector(state => state.admin.isAuthenticated);

  return isAuthenticated ? children : <Navigate to="/" />;
};

export default PrivateRoute;