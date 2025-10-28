import React from 'react';

export default function Toast({ message, onClose }) {
  // message: string to display
  // onClose: callback to dismiss
  if (!message) return null;                 // Render nothing if no message
  return (
    <div role="status" aria-live="polite" className="toast">
      <span>{message}</span>{' '}
      <button className="btn" onClick={onClose} aria-label="Dismiss">Close</button>
    </div>
  );
}
