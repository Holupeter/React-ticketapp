import React from 'react';
import { Link } from 'react-router-dom';
import { isAuthenticated, logout } from '../services/auth';

export default function Navbar() {
  const authed = isAuthenticated();                       // Check session

  return (
    <div className="navbar">
      <div className="container navbar__inner">
        <Link to="/" aria-label="Home">
          <strong>TicketApp</strong>
        </Link>

        <nav className="nav__links" aria-label="Primary">
          <Link to="/tickets">Tickets</Link>
          <Link to="/dashboard">Dashboard</Link>

          {!authed && (
            <>
              <Link to="/auth/login">Login</Link>
              <Link to="/auth/signup">Get Started</Link>
            </>
          )}

          {authed && (
            <button
              className="btn"
              onClick={() => { logout(); window.location.href = '/'; }}
              aria-label="Log out"
            >
              Logout
            </button>
          )}
        </nav>
      </div>
    </div>
  );
}
