import React from 'react';
import { BrowserRouter, Routes, Route, Navigate } from 'react-router-dom';
import AuthLayout from './components/layout/AuthLayout';
import DashboardLayout from './components/layout/DashboardLayout';
import IdentityVerification from './pages/IdentityVerification';
import SignIn from './pages/SignIn';
import Dashboard from './pages/Dashboard';
import Analytics from './pages/Analytics';
import Logs from './pages/Logs';
import System from './pages/System';

function App() {
  return (
    <BrowserRouter>
      <Routes>
        {/* Auth Routes */}
        <Route path="/" element={<AuthLayout><IdentityVerification /></AuthLayout>} />
        <Route path="/login" element={<AuthLayout><SignIn /></AuthLayout>} />
        
        {/* Unified Dashboard Routes */}
        <Route path="/dashboard" element={<DashboardLayout><Dashboard /></DashboardLayout>} />
        <Route path="/analytics" element={<DashboardLayout><Analytics /></DashboardLayout>} />
        <Route path="/logs" element={<DashboardLayout><Logs /></DashboardLayout>} />
        <Route path="/system" element={<DashboardLayout><System /></DashboardLayout>} />
        
        {/* Fallback */}
        <Route path="*" element={<Navigate to="/" replace />} />
      </Routes>
    </BrowserRouter>
  );
}

export default App;
