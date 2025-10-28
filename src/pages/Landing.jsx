import React from 'react';
import { Link } from 'react-router-dom';
import wave from '../assets/wave.svg';

export default function Landing() {
  return (
    <>
      <section className="hero">
        <div className="container hero__content">
          <h1 className="hero__title">Ticket Management App</h1>
          <p className="hero__subtitle">
            Track, prioritize, and resolve tickets with a unified, responsive UI.
          </p>
          <div className="hero__cta">
            <Link to="/auth/login" className="btn">Login</Link>
            <Link to="/auth/signup" className="btn btn--primary">Get Started</Link>
          </div>
        </div>

        {/* Decorative overlapping circles */}
        <div className="hero__circle" aria-hidden="true"></div>
        <div className="circle--floating" aria-hidden="true"></div>

        {/* Wave at bottom */}
        <img className="hero__wave" src={wave} alt="" aria-hidden="true" />
      </section>

      <section className="container" aria-label="Key features">
        <div className="grid grid--3" style={{ marginTop: 24, marginBottom: 24 }}>
          <div className="card">
            <h3>Secure Auth</h3>
            <p>
              Local session token protects your dashboard and tickets. 
              It's not just about logging in; it's about safeguarding every 
              digital entry point with precision, privacy, and trust.
            </p>
          </div>
          <div className="card">
            <h3>Real-time Validation</h3>
            <p>
              Ensures immediate feedback and error correction as users input data, 
              enhancing accuracy and streamlining the overall user experience.
            </p>
          </div>
          <div className="card">
            <h3>Responsive Layout</h3>
            <p>
              Optimal viewing experience across a wide range of devices, from desktop monitors 
              to mobile screens, by dynamically adjusting the content and design to suit 
              various screen sizes and orientations.
            </p>
          </div>
        </div>
      </section>
    </>
  );
}
