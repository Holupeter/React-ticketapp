import React from 'react';

export default function Modal({ open, title, children, onClose, actions }) {
  if (!open) return null;
  return (
    <div className="modal__backdrop" role="dialog" aria-modal="true">
      <div className="modal__panel" role="document">
        {title && <h3 className="modal__title">{title}</h3>}
        <div className="modal__body">{children}</div>
        <div className="modal__actions">
          {actions}
          <button className="btn" onClick={onClose} aria-label="Close">Close</button>
        </div>
      </div>
    </div>
  );
}
