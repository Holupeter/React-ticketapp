import React from 'react';

export default function StatusTag({ status }) {
  // Map status to the correct color tag class
  const map = {
    open: 'tag tag--open',
    in_progress: 'tag tag--inprog',
    closed: 'tag tag--closed'
  };
  return <span className={map[status] || 'tag'}>{status}</span>;
}
