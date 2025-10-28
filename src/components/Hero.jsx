import React from 'react';
import wave from '../assets/wave.svg';

/**
 * Reusable hero with wave + circles, same look as landing.
 * Props:
 * - title: string
 * - subtitle: string
 * - variant: 'full' | 'compact' (default 'compact')
 * - bgImage: optional imported image (e.g., from src/assets/bg-ticket.jpg)
 */
export default function Hero({ title, subtitle, variant = 'compact', bgImage }) {
  const classes = ['hero'];
  if (variant === 'compact') classes.push('hero--compact');

  const style = bgImage
    ? {
        backgroundImage: `linear-gradient(180deg, #f8fafc 0%, #eef2ff 100%), url(${bgImage})`,
        backgroundSize: 'cover',
        backgroundPosition: 'center',
        backgroundRepeat: 'no-repeat',
      }
    : undefined;

  return (
    <section className={classes.join(' ')} style={style}>
      <div className="container hero__content">
        {title && <h1 className="hero__title">{title}</h1>}
        {subtitle && <p className="hero__subtitle">{subtitle}</p>}
      </div>

      {/* Decorative circles + wave (same as landing) */}
      <div className="hero__circle" aria-hidden="true"></div>
      <div className="circle--floating" aria-hidden="true"></div>
      <img className="hero__wave" src={wave} alt="" aria-hidden="true" />
    </section>
  );
}
