import React, { useState } from 'react';
import { login } from '../services/auth';
import Toast from '../components/Toast';
import Modal from '../components/Modal';
import { Eye, EyeOff } from 'lucide-react';

export default function Login() {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [showNoAccount, setShowNoAccount] = useState(false);
  const [toast, setToast] = useState('');
  const [errors, setErrors] = useState({});
  const [peek, setPeek] = useState(false); // <- toggles password visibility while pressed

  function validateLocal() {
    const e = {};
    if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(String(email).toLowerCase())) {
      e.email = 'Enter a valid email (e.g., name@example.com).';
    }
    if (!password) e.password = 'Password is required.';
    setErrors(e);
    return Object.keys(e).length === 0;
  }

  function handleSubmit(e) {
    e.preventDefault();
    if (!validateLocal()) return;
    try {
      login(email, password);
      window.location.href = '/dashboard';
    } catch (err) {
      if (err?.code === 'NO_ACCOUNT') setShowNoAccount(true);
      else setToast(err.message || 'Invalid email or password.');
    }
  }

  return (
    <section className="auth">
      <div className="container auth__wrap">
        <div className="auth-card">
          <h2>Login</h2>
          <p className="helper">Sign in with your registered email and password.</p>

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
                   autoComplete="current-password"
                   value={password}
                   onChange={(e) => setPassword(e.target.value)}
                   required
                   aria-invalid={Boolean(errors.password)}
                   aria-describedby={errors.password ? 'err-pw' : undefined}
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
                {errors.password && <span id="err-pw" className="error-text">{errors.password}</span>}
              </label>

            <button className="btn btn--primary" type="submit">Sign in</button>
          </form>
        </div>
      </div>

      <Toast message={toast} onClose={() => setToast('')} />

      <Modal
        open={showNoAccount}
        title="No account found"
        onClose={() => setShowNoAccount(false)}
        actions={<a className="btn btn--primary" href="/auth/signup">Get Started</a>}
      >
        <p>Please click <strong>Get Started</strong> to sign up before logging in.</p>
      </Modal>
    </section>
  );
}
