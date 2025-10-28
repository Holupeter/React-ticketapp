// storage.js — per-user ticket storage in localStorage
import { getCurrentUser } from './auth';

function currentUserKey() {
  const session = getCurrentUser(); // { token, email } or null
  const email = session?.email;
  if (!email) return null;
  // sanitize email to a safe key fragment
  const safe = String(email).toLowerCase().replace(/[^a-z0-9]/gi, '_');
  return `ticketapp_tickets_${safe}`;
}

function readAll() {
  const key = currentUserKey();
  if (!key) return []; // unauthenticated: empty (ProtectedRoute should prevent anyway)
  const raw = localStorage.getItem(key);
  return raw ? JSON.parse(raw) : [];
}

function writeAll(arr) {
  const key = currentUserKey();
  if (!key) throw new Error('Unauthorized');
  localStorage.setItem(key, JSON.stringify(arr));
}

export function listTickets() {
  return readAll();
}

export function createTicket(ticket) {
  const all = readAll();
  const now = new Date().toISOString();
  const withMeta = {
    id: `t_${Date.now()}`,
    createdAt: now,
    updatedAt: now,
    ...ticket,
  };
  all.unshift(withMeta);
  writeAll(all);
  return withMeta;
}

export function updateTicket(id, patch) {
  const all = readAll();
  const idx = all.findIndex(t => t.id === id);
  if (idx === -1) throw new Error('Ticket not found.');
  all[idx] = { ...all[idx], ...patch, updatedAt: new Date().toISOString() };
  writeAll(all);
  return all[idx];
}

export function deleteTicket(id) {
  const all = readAll();
  const next = all.filter(t => t.id !== id);
  writeAll(next);
}

export function stats() {
  const all = readAll();
  const total = all.length;
  const open = all.filter(t => t.status === 'open').length;
  const resolved = all.filter(t => t.status === 'closed').length;
  return { total, open, resolved };
}
