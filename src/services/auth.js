// auth.js — handles users, validation, and session using localStorage

export const SESSION_KEY = 'ticketapp_session';   // required by spec
const USERS_KEY = 'ticketapp_users';              // where we store signed-up users

// --- Validation helpers ---
function isValidEmail(email) {
  // Simple, solid email regex (client-side only)
  return /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(String(email).toLowerCase());
}

function isStrongPassword(pw) {
  // ≥8 chars, at least one letter, one digit, and one non-alphanumeric symbol
  return /^(?=.*[A-Za-z])(?=.*\d)(?=.*[^A-Za-z0-9]).{8,}$/.test(pw);
}

// --- LocalStorage helpers for users ---
function loadUsers() {
  const raw = localStorage.getItem(USERS_KEY);
  return raw ? JSON.parse(raw) : []; // [{ email, password }]
}
function saveUsers(arr) {
  localStorage.setItem(USERS_KEY, JSON.stringify(arr));
}

// --- Public API ---
// Sign up: validate, ensure unique email, save user; DO NOT log in automatically
export function signup(email, password) {
  if (!isValidEmail(email)) {
    throw new Error('Please enter a valid email address.');
  }
  if (!isStrongPassword(password)) {
    throw new Error('Password must be at least 8 characters and include a letter, a number, and a symbol.');
  }

  const users = loadUsers();
  const exists = users.some(u => u.email.toLowerCase() === email.toLowerCase());
  if (exists) throw new Error('An account with this email already exists.');

  users.push({ email, password });     // NOTE: mock only — do NOT store plain text in real apps
  saveUsers(users);

  return true; // indicate success (we’ll redirect to /auth/login in the UI)
}

// Login: only for existing users; on success set the session token (spec key)
export function login(email, password) {
  if (!isValidEmail(email)) {
    throw new Error('Please enter a valid email address.');
  }
  if (!password) {
    throw new Error('Please enter your password.');
  }

  const users = loadUsers();
  const match = users.find(u => u.email.toLowerCase() === email.toLowerCase());

  if (!match) {
    const err = new Error('No account found for this email.');
    err.code = 'NO_ACCOUNT';
    throw err;
  }
  if (match.password !== password) {
    throw new Error('Invalid email or password.');
  }

  const token = `tok_${Date.now()}`;
  const session = { token, email: match.email };
  localStorage.setItem(SESSION_KEY, JSON.stringify(session));
  return session;
}


export function logout() {
  localStorage.removeItem(SESSION_KEY);
}

export function isAuthenticated() {
  try {
    const raw = localStorage.getItem(SESSION_KEY);
    if (!raw) return false;
    const parsed = JSON.parse(raw);
    return Boolean(parsed?.token && parsed?.email);
  } catch {
    return false;
  }
}

export function getCurrentUser() {
  try {
    const raw = localStorage.getItem(SESSION_KEY);
    return raw ? JSON.parse(raw) : null;
  } catch {
    return null;
  }
}

export function requireAuthOrThrow() {
  if (!isAuthenticated()) {
    const err = new Error('Unauthorized');
    err.code = 401;
    throw err;
  }
}
