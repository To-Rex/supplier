import React from 'react';
import { BrowserRouter, Routes, Route, Navigate } from 'react-router-dom';
import { ThemeProvider } from './contexts/ThemeContext';
import { AuthProvider } from './contexts/AuthContext';
import MainSite from './MainSite';
import AdminLogin from './pages/AdminLogin';
import Dashboard from './pages/admin/Dashboard';
import TeamManagement from './pages/admin/TeamManagement';
import UsersManagement from './pages/admin/UsersManagement';
import ProtectedRoute from './components/admin/ProtectedRoute';

function App() {
  return (
    <ThemeProvider>
      <AuthProvider>
        <BrowserRouter>
          <Routes>
            <Route path="/*" element={<MainSite />} />
            <Route path="/admin/login" element={<AdminLogin />} />
            <Route
              path="/admin/dashboard"
              element={
                <ProtectedRoute>
                  <Dashboard />
                </ProtectedRoute>
              }
            />
            <Route
              path="/admin/team"
              element={
                <ProtectedRoute>
                  <TeamManagement />
                </ProtectedRoute>
              }
            />
            <Route
              path="/admin/users"
              element={
                <ProtectedRoute>
                  <UsersManagement />
                </ProtectedRoute>
              }
            />
            <Route path="/admin" element={<Navigate to="/admin/login" replace />} />
          </Routes>
        </BrowserRouter>
      </AuthProvider>
    </ThemeProvider>
  );
}

export default App;
