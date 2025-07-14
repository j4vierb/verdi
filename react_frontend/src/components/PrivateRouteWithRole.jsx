// src/components/PrivateRouteWithRole.jsx
import React, { useContext } from 'react';
import { Navigate, Outlet } from 'react-router-dom';
import { AuthContext } from '../contexts/AuthContext';

const PrivateRouteWithRole = ({ requiredRole }) => {
  const { user, loading } = useContext(AuthContext);

  if (loading) return <div>Cargando...</div>; // 🔁 mientras se verifica el token
  if (!user) return <Navigate to="/login" />;
  if (requiredRole && user.rol !== requiredRole) return <Navigate to="/no-autorizado" replace />;

  return <Outlet />;
};

export default PrivateRouteWithRole;