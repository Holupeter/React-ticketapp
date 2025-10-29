import React from 'react';
import { BBrowserRouter as  Routes, Route } from 'react-router-dom';

import './styles.css';
import Navbar from './components/Navbar';
import Footer from './components/Footer';
import ProtectedRoute from './components/ProtectedRoute';

import Landing from './pages/Landing';
import Login from './pages/Login';
import Signup from './pages/Signup';
import Dashboard from './pages/Dashboard';
import Tickets from './pages/Tickets';

export default function App() {
  return (
    <div className='layout'>
      <BrowserRouter>
      <Navbar />
      <main>
        <Routes>
          {/* Public routes */}
          <Route path="/" element={<Landing />} />
          <Route path="/auth/login" element={<Login />} />
          <Route path="/auth/signup" element={<Signup />} />

          {/* Protected routes */}
          <Route path="/dashboard" element={
            <ProtectedRoute>
              <Dashboard />
            </ProtectedRoute>
          } />

          <Route path="/tickets" element={
            <ProtectedRoute>
              <Tickets />
            </ProtectedRoute>
          } />
        </Routes>
      </main>
      <Footer />
    </BrowserRouter>
    </div>
    
  );
}
