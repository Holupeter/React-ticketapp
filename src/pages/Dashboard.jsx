import React from 'react';
import { stats } from '../services/storage';
import { getCurrentUser } from '../services/auth';
import Hero from '../components/Hero';
import { useNavigate } from 'react-router-dom';

export default function Dashboard() {
  const { total, open, resolved } = stats();
  const navigate = useNavigate();
  const user = getCurrentUser(); // { token, email }

  function go(filter) {
    const f = filter === 'total' ? 'all' : filter;
    navigate(`/tickets?filter=${encodeURIComponent(f)}`);
  }

  return (
    <>
      <Hero
        title="Dashboard"
        subtitle="High-level overview of your ticket activity."
        variant="compact"
      />

      <div className="container" style={{ padding: '24px' }}>
        {/* 👇 New welcome message */}
        {user?.email && (
          <p
            style={{
              textAlign: 'center',
              fontSize: '18px',
              color: '#374151',
              marginTop: '-12px',
              marginBottom: '32px',
            }}
          >
            Welcome, <strong>{user.email}</strong>
          </p>
        )}

        <div className="grid grid--3" style={{ marginTop: 16 }}>
          <div
            className="card card--clickable"
            onClick={() => go('total')}
            aria-label="Total tickets"
          >
            <h3>Total</h3>
            <strong style={{ fontSize: 28 }}>{total}</strong>
          </div>
          <div
            className="card card--clickable"
            onClick={() => go('open')}
            aria-label="Open tickets"
          >
            <h3>Open</h3>
            <strong style={{ fontSize: 28 }}>{open}</strong>
          </div>
          <div
            className="card card--clickable"
            onClick={() => go('closed')}
            aria-label="Resolved tickets"
          >
            <h3>Resolved</h3>
            <strong style={{ fontSize: 28 }}>{resolved}</strong>
          </div>
        </div>

        <div style={{ marginTop: 16 }}>
          <button
            className="btn btn--primary"
            onClick={() => navigate('/tickets?action=create')}
          >
            Create Ticket
          </button>
        </div>
      </div>
    </>
  );
}
