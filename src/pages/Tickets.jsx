import React, { useEffect, useMemo, useRef, useState } from 'react';
import { createTicket, listTickets, updateTicket, deleteTicket } from '../services/storage';
import { validateTicketFields } from '../utils/validation';
import StatusTag from '../components/StatusTag';
import Toast from '../components/Toast';
import Hero from '../components/Hero';
import { useLocation } from 'react-router-dom';

const EMPTY = { title: '', status: 'open', description: '', priority: 'medium' };

function useQuery() {
  const { search } = useLocation();
  return new URLSearchParams(search);
}

export default function Tickets() {
  const [tickets, setTickets] = useState([]);
  const [form, setForm] = useState(EMPTY);
  const [errors, setErrors] = useState({});
  const [editingId, setEditingId] = useState(null);
  const [toast, setToast] = useState('');
  const formRef = useRef(null);

  const query = useQuery();
  const filter = (query.get('filter') || 'all').toLowerCase();   // all | open | in_progress | closed
  const action = (query.get('action') || '').toLowerCase();      // create

  useEffect(() => {
    try {
      setTickets(listTickets());
    } catch {
      setToast('Failed to load tickets. Please retry.');
    }
  }, []);

  // If action=create, focus/scroll to the form
  useEffect(() => {
    if (action === 'create' && formRef.current) {
      formRef.current.scrollIntoView({ behavior: 'smooth', block: 'start' });
      // Optionally focus the title input after a short delay:
      setTimeout(() => {
        const titleInput = formRef.current.querySelector('input[name="title"]');
        if (titleInput) titleInput.focus();
      }, 250);
    }
  }, [action]);

  useEffect(() => { setErrors(validateTicketFields(form)); }, [form]);
  const isValid = useMemo(() => Object.keys(errors).length === 0, [errors]);

  const visibleTickets = useMemo(() => {
    if (filter === 'all') return tickets;
    return tickets.filter(t => t.status === filter);
  }, [tickets, filter]);

  function handleChange(e) {
    const { name, value } = e.target;
    setForm(prev => ({ ...prev, [name]: value }));
  }

  function handleSubmit(e) {
    e.preventDefault();
    const currentErrors = validateTicketFields(form);
    if (Object.keys(currentErrors).length > 0) {
      setErrors(currentErrors);
      setToast('Please fix validation errors.');
      return;
    }
    try {
      if (editingId) {
        const updated = updateTicket(editingId, form);
        setTickets(prev => prev.map(t => t.id === editingId ? updated : t));
        setToast('Ticket updated successfully.');
      } else {
        const created = createTicket(form);
        setTickets(prev => [created, ...prev]);
        setToast('Ticket created successfully.');
      }
      setForm(EMPTY);
      setEditingId(null);
    } catch {
      setToast('Operation failed. Please retry.');
    }
  }

  function startEdit(t) {
    setEditingId(t.id);
    setForm({ title: t.title, status: t.status, description: t.description || '', priority: t.priority || 'medium' });
    window.scrollTo({ top: 0, behavior: 'smooth' });
  }

  function confirmDelete(id) {
    const ok = window.confirm('Are you sure you want to delete this ticket?');
    if (!ok) return;
    try {
      deleteTicket(id);
      setTickets(prev => prev.filter(t => t.id !== id));
      setToast('Ticket deleted.');
    } catch {
      setToast('Delete failed. Please retry.');
    }
  }

  return (
    <>
      <Hero
        title="Tickets"
        subtitle="Create, view, edit, and delete tickets."
        variant="compact"
      />

      <div className="container" style={{ padding: '24px' }}>
        {/* Create / Edit form (TOP). The list will show BELOW, as you requested */}
        <form ref={formRef} className="card" onSubmit={handleSubmit} noValidate aria-label="Ticket form" style={{ margin: '16px 0' }}>
          <div className="grid grid--2">
            <label className="field">
              <span>Title *</span>
              <input
                className="input"
                name="title"
                value={form.title}
                onChange={handleChange}
                aria-invalid={Boolean(errors.title)}
                aria-describedby={errors.title ? 'err-title' : undefined}
                placeholder="e.g., Payment not going through"
                required
              />
              {errors.title && <span id="err-title" className="error-text">{errors.title}</span>}
            </label>

            <label className="field">
              <span>Status *</span>
              <select
                className="select"
                name="status"
                value={form.status}
                onChange={handleChange}
                aria-invalid={Boolean(errors.status)}
                aria-describedby={errors.status ? 'err-status' : undefined}
                required
              >
                <option value="open">open</option>
                <option value="in_progress">in_progress</option>
                <option value="closed">closed</option>
              </select>
              {errors.status && <span id="err-status" className="error-text">{errors.status}</span>}
            </label>
          </div>

          <label className="field">
            <span>Description</span>
            <textarea
              className="textarea"
              name="description"
              value={form.description}
              onChange={handleChange}
              rows={4}
              aria-invalid={Boolean(errors.description)}
              aria-describedby={errors.description ? 'err-desc' : undefined}
              placeholder="Optional details (max 500 chars)"
            />
            {errors.description && <span id="err-desc" className="error-text">{errors.description}</span>}
          </label>

          <label className="field">
            <span>Priority</span>
            <select
              className="select"
              name="priority"
              value={form.priority}
              onChange={handleChange}
              aria-invalid={Boolean(errors.priority)}
              aria-describedby={errors.priority ? 'err-pri' : undefined}
            >
              <option value="low">low</option>
              <option value="medium">medium</option>
              <option value="high">high</option>
            </select>
            {errors.priority && <span id="err-pri" className="error-text">{errors.priority}</span>}
          </label>

          <div style={{ display: 'flex', gap: 12 }}>
            <button className="btn btn--primary" type="submit" disabled={!isValid}>
              {editingId ? 'Save changes' : 'Create ticket'}
            </button>
            {editingId && (
              <button className="btn" type="button" onClick={() => { setEditingId(null); setForm(EMPTY); }}>
                Cancel
              </button>
            )}
          </div>
        </form>

        {/* LIST BELOW — applies the dashboard-selected filter */}
        <div className="grid grid--2">
          {visibleTickets.map(t => (
            <article key={t.id} className="card" aria-labelledby={`t-${t.id}-title`}>
              <header style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
                <h3 id={`t-${t.id}-title`} style={{ margin: 0 }}>{t.title}</h3>
                <StatusTag status={t.status} />
              </header>
              {t.description && <p style={{ marginTop: 8 }}>{t.description}</p>}
              <p style={{ marginTop: 8, fontSize: 12, color: '#6b7280' }}>
                Priority: <strong>{t.priority || 'medium'}</strong>
                {' · '}
                Updated: {new Date(t.updatedAt).toLocaleString()}
              </p>
              <div style={{ display: 'flex', gap: 8, marginTop: 12 }}>
                <button className="btn btn--secondary" onClick={() => startEdit(t)} aria-label={`Edit ${t.title}`}>Edit</button>
                <button className="btn btn--danger" onClick={() => confirmDelete(t.id)} aria-label={`Delete ${t.title}`}>Delete</button>
              </div>
            </article>
          ))}

          {visibleTickets.length === 0 && (
            <div className="card">
              <p>No tickets found for this view.</p>
            </div>
          )}
        </div>

        <Toast message={toast} onClose={() => setToast('')} />
      </div>
    </>
  );
}
