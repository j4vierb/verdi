// src/contexts/AuthContext.jsx
import React, { createContext, useState, useEffect } from 'react';
import { jwtDecode } from 'jwt-decode';

export const AuthContext = createContext({
  user: null,
  loading: true,
  login: () => {},
  logout: () => {},
});

export function AuthProvider({ children }) {
  const [user, setUser] = useState(null);
  const [loading, setLoading] = useState(true);

  // Cargar usuario desde localStorage al iniciar la app
  useEffect(() => {
    const token = localStorage.getItem('token');
    if (token) {
      try {
        const payload = jwtDecode(token);
        setUser({
          id: payload.sub,       
          nombre: payload.nombre || "",
          email: payload.email,
          rol: payload.roles?.[0] || ""
        });
      } catch (err) {
        console.error('Token inválido:', err);
        localStorage.removeItem('token');
      }
    }
    setLoading(false);
  }, []);

  // Guardar usuario al hacer login
  const login = (userData) => {
    setUser(userData);
    localStorage.setItem('user', JSON.stringify(userData)); // opcional si quieres persistir user completo
    // Si prefieres seguir usando solo el token, también puedes guardar token aquí:
    // localStorage.setItem('token', token);
  };

  const logout = () => {
    localStorage.removeItem('token');
    localStorage.removeItem('user');
    setUser(null);
  };

  return (
    <AuthContext.Provider value={{ user, loading, login, logout }}>
      {children}
    </AuthContext.Provider>
  );
}
