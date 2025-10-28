import React, { useState } from 'react';
import { signup } from '../services/auth';
import Toast from '../components/Toast';
import { Eye, EyeOff } from 'lucide-react';

const PW_RULE = /^(?=.*[A-Za-z])(?=.*\d)(?=.*[^A-Za-z0-9]).{8,}$/;

export default function Signup() {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [toast, setToast] = useState('');
  const [errors, setErrors] = useState({});
  const [peek, setPeek] = useState(false); // <- press-and-hold visibility

  function validateLocal() {
    const e = {};
    if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(String(email).toLowerCase())) {
      e.email = 'Enter a valid email (e.g., name@example.com).';
    }
    if (!PW_RULE.test(password)) {
      e.password = 'Min 8 chars with a letter, a number, and a symbol.';
    }
    setErrors(e);
    return Object.keys(e).length === 0;
  }

  function handleSubmit(e) {
    e.preventDefault();
    if (!validateLocal()) return;
    try {
      signup(email, password);
      window.location.href = '/auth/login';
    } catch (err) {
      setToast(err.message || 'Signup failed.');
    }
  }

  return (
    <section className="auth">
      <div className="container auth__wrap">
        <div className="auth-card">
          <h2>Get Started</h2>
          <p className="helper">Create your account, then log in to continue.</p>

          <form onSubmit={handleSubmit} noValidate>
            <label className="field">
              <span>Email</span>
              <input
                className="input"
                type="email"
                inputMode="email"
                autoComplete="username"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                required
                aria-invalid={Boolean(errors.email)}
                aria-describedby={errors.email ? 'err-email' : undefined}
              />
              {errors.email && <span id="err-email" className="error-text">{errors.email}</span>}
            </label>

            <label className="field">
              <span>Password</span>
              <div className="input-wrap">
                <input
                  className="input"
                  type={peek ? 'text' : 'password'}
                  autoComplete="new-password"
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                  required
                  minLength={8}
                  aria-invalid={Boolean(errors.password)}
                  aria-describedby={errors.password ? 'err-pw' : 'pw-help'}
                />
                <button
                  type="button"
                  className="peek-btn"
                  aria-label={peek ? 'Hide password' : 'Show password'}
                  onClick={() => setPeek(!peek)}
                >
                  {peek ? <EyeOff size={18} /> : <Eye size={18} />}
                </button>
              </div>
            
            <span id="pw-help" className="helper" style={{fontSize:12, color:'#6b7280'}}>
              Must be at least 8 characters, include a letter, a number, and a symbol.
            </span>
            {errors.password && <span id="err-pw" className="error-text">{errors.password}</span>}
          </label>

            <button className="btn btn--primary" type="submit">Create account</button>
          </form>
        </div>
      </div>

      <Toast message={toast} onClose={() => setToast('')} />
    </section>
  );
}
