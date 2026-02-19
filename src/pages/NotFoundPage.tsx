// src/pages/NotFoundPage.tsx
// CRT Glitch 404 page — matches "404 Page.html" UX/UI design

import React, { useEffect, useRef } from 'react';
import { useNavigate } from 'react-router-dom';
import { useDirection } from '../hooks/useDirection';

const glitchStyle = `
  @keyframes blink { 0%,100%{opacity:1} 50%{opacity:0} }
  @keyframes glitch {
    0%{transform:translate(0)} 20%{transform:translate(-2px,2px)}
    40%{transform:translate(-2px,-2px)} 60%{transform:translate(2px,2px)}
    80%{transform:translate(2px,-2px)} 100%{transform:translate(0)}
  }
  @keyframes flicker {
    0%,10%,30%,50%,70%,90%,100%{opacity:.05}
    5%,25%,45%,65%,85%{opacity:.15}
  }
  @keyframes scanMove { 0%{top:-10%} 100%{top:110%} }
  .blink { animation: blink 0.5s step-end infinite; }
  .glitch { animation: glitch 2s infinite; }
  .scan-line {
    position:fixed; left:0; right:0; height:8px;
    background:rgba(255,0,0,0.07);
    animation: scanMove 4s linear infinite;
    pointer-events:none;
    z-index:60;
  }
  .crt { animation: flicker 0.15s infinite; }
  .scan-overlay {
    position:fixed;inset:0;z-index:50;pointer-events:none;
    background: repeating-linear-gradient(
      to bottom, transparent 0,transparent 3px,rgba(0,0,0,0.35) 3px,rgba(0,0,0,0.35) 4px
    );
  }
  .glitch-text::before,.glitch-text::after {
    content:attr(data-text);position:absolute;top:0;left:0;width:100%;overflow:hidden;
  }
  .glitch-text::before { color:#ff00ff; animation:glitch 2s infinite; clip:rect(24px,550px,56px,0); left:2px; }
  .glitch-text::after  { color:#00ffff; animation:glitch 2s infinite reverse; clip:rect(85px,550px,90px,0); left:-2px; }
`;

export default function NotFoundPage() {
    const navigate = useNavigate();
    useDirection();
    const countRef = useRef<HTMLSpanElement>(null);

    useEffect(() => {
        // Random hex counter flicker
        const interval = setInterval(() => {
            if (countRef.current) {
                countRef.current.textContent = `0x${Math.floor(Math.random() * 0xfff)
                    .toString(16)
                    .toUpperCase()
                    .padStart(3, '0')}`;
            }
        }, 100);
        return () => clearInterval(interval);
    }, []);

    return (
        <>
            <style>{glitchStyle}</style>

            {/* CRT effects */}
            <div className="crt" style={{ position: 'fixed', inset: 0, background: 'rgba(255,0,0,0.05)', zIndex: 40, pointerEvents: 'none' }} />
            <div className="scan-overlay" />
            <div className="scan-line" />

            <div
                style={{
                    minHeight: '100vh',
                    background: '#000',
                    display: 'flex',
                    flexDirection: 'column',
                    alignItems: 'center',
                    justifyContent: 'center',
                    fontFamily: 'monospace',
                    color: '#ff0000',
                    textAlign: 'center',
                    padding: '2rem',
                    position: 'relative',
                    zIndex: 1,
                }}
            >
                {/* Top system line */}
                <p style={{ fontSize: '0.75rem', letterSpacing: '0.2em', marginBottom: '2rem', color: '#ff4444', opacity: 0.8 }}>
                    CYBERGUARD_OS v2.0.1 &gt; ERROR_HANDLER &gt; CRITICAL_FAILURE
                </p>

                {/* Big 404 */}
                <div
                    className="glitch-text"
                    data-text="404"
                    style={{
                        fontSize: 'clamp(6rem,20vw,14rem)',
                        fontWeight: 900,
                        lineHeight: 1,
                        position: 'relative',
                        textShadow: '0 0 12px rgba(255,0,0,0.8), 0 0 20px rgba(255,0,0,0.4)',
                        letterSpacing: '-0.02em',
                        marginBottom: '1rem',
                    }}
                >
                    404
                </div>

                <p style={{ fontSize: '1.5rem', letterSpacing: '0.3em', marginBottom: '0.5rem', textShadow: '0 0 8px rgba(255,0,0,0.6)' }}>
                    ACCESS DENIED
                </p>
                <p style={{ fontSize: '0.85rem', color: '#ff6666', marginBottom: '3rem', maxWidth: '480px', lineHeight: 1.8 }}>
                    SECURITY BREACH DETECTED — THE REQUESTED PAGE DOES NOT EXIST IN THE SYSTEM.
                    <br />
                    THIS INCIDENT HAS BEEN LOGGED.&nbsp;
                    <span ref={countRef} style={{ color: '#ff0000' }}>0x000</span>
                </p>

                {/* Terminal log */}
                <div
                    style={{
                        background: 'rgba(255,0,0,0.05)',
                        border: '1px solid rgba(255,0,0,0.3)',
                        borderRadius: '4px',
                        padding: '1rem 1.5rem',
                        marginBottom: '2rem',
                        maxWidth: '580px',
                        width: '100%',
                        textAlign: 'left',
                        fontSize: '0.75rem',
                        lineHeight: 2,
                    }}
                >
                    <div><span style={{ color: '#ff4444' }}>[ERROR]</span> Page not found in system registry</div>
                    <div><span style={{ color: '#ff4444' }}>[WARN]</span> Unauthorized access attempt detected</div>
                    <div><span style={{ color: '#ff4444' }}>[INFO]</span> Returning to safe zone<span className="blink">_</span></div>
                </div>

                {/* Actions */}
                <div style={{ display: 'flex', gap: '1rem', flexWrap: 'wrap', justifyContent: 'center' }}>
                    <button
                        onClick={() => navigate(-1)}
                        style={{
                            padding: '0.75rem 1.5rem',
                            background: 'transparent',
                            border: '1px solid rgba(255,0,0,0.5)',
                            color: '#ff4444',
                            fontFamily: 'monospace',
                            fontSize: '0.85rem',
                            letterSpacing: '0.1em',
                            cursor: 'pointer',
                            borderRadius: '4px',
                            transition: 'all 0.2s',
                        }}
                        onMouseEnter={e => (e.currentTarget.style.background = 'rgba(255,0,0,0.1)')}
                        onMouseLeave={e => (e.currentTarget.style.background = 'transparent')}
                    >
                        ← PREVIOUS LOCATION
                    </button>
                    <button
                        onClick={() => navigate('/dashboard')}
                        style={{
                            padding: '0.75rem 1.5rem',
                            background: 'rgba(255,0,0,0.15)',
                            border: '1px solid #ff0000',
                            color: '#ff0000',
                            fontFamily: 'monospace',
                            fontSize: '0.85rem',
                            letterSpacing: '0.1em',
                            cursor: 'pointer',
                            borderRadius: '4px',
                            fontWeight: 700,
                            textShadow: '0 0 8px rgba(255,0,0,0.8)',
                            transition: 'all 0.2s',
                        }}
                        onMouseEnter={e => (e.currentTarget.style.background = 'rgba(255,0,0,0.3)')}
                        onMouseLeave={e => (e.currentTarget.style.background = 'rgba(255,0,0,0.15)')}
                    >
                        ⚡ RETURN TO BASE
                    </button>
                </div>

                <p style={{ marginTop: '3rem', fontSize: '0.65rem', letterSpacing: '0.15em', color: '#551111' }}>
                    CLASSIFIED INCIDENT #<span ref={null}>{Math.floor(Math.random() * 99999).toString().padStart(5, '0')}</span> — CYBERGUARD_SECURITY_MODULE
                </p>
            </div>
        </>
    );
}
