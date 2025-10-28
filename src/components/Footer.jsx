import React from 'react';

export default function Footer() {
  return (
    <footer className="footer" role="contentinfo">
      <div className="container footer__inner">
        <span>© {new Date().getFullYear()} TicketApp</span>
        <span>Built for the Multi-Framework Challenge</span>
      </div>
    </footer>
  );
}
