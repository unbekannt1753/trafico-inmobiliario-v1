"use client";
import React from 'react';
import { useAppContext } from '../context/AppContext';
import Icon from './Icon';

const ModeToggle: React.FC = () => {
  const { demoMode, setDemoMode } = useAppContext();

  return (
    <div className="mode-toggle glass" style={{
      display: 'flex',
      padding: '3px',
      borderRadius: '99px',
      background: 'rgba(250, 250, 247, 0.05)',
      border: '1px solid rgba(250, 250, 247, 0.15)',
      gap: '2px',
      marginRight: '12px',
      position: 'relative',
      zIndex: 100
    }}>
      <div 
        className={`mode-option ${demoMode ? 'active' : ''}`}
        onClick={() => setDemoMode(true)}
        style={{
          display: 'flex',
          alignItems: 'center',
          gap: '6px',
          padding: '6px 14px',
          borderRadius: '99px',
          fontSize: '11px',
          fontWeight: 600,
          cursor: 'pointer',
          transition: 'all 0.2s ease',
          background: demoMode ? 'rgba(250, 250, 247, 0.15)' : 'transparent',
          color: demoMode ? '#FAFAF7' : 'rgba(250, 250, 247, 0.4)',
          boxShadow: demoMode ? '0 2px 10px rgba(0,0,0,0.3)' : 'none'
        }}
      >
        <Icon name="sparkle" size={14} color={demoMode ? "#F06D5A" : undefined} />
        <span style={{ fontFamily: 'var(--font-mono)', textTransform: 'uppercase', letterSpacing: '0.05em' }}>Demo</span>
      </div>
      <div 
        className={`mode-option ${!demoMode ? 'active' : ''}`}
        onClick={() => setDemoMode(false)}
        style={{
          display: 'flex',
          alignItems: 'center',
          gap: '6px',
          padding: '6px 14px',
          borderRadius: '99px',
          fontSize: '11px',
          fontWeight: 600,
          cursor: 'pointer',
          transition: 'all 0.2s ease',
          background: !demoMode ? 'rgba(250, 250, 247, 0.15)' : 'transparent',
          color: !demoMode ? '#FAFAF7' : 'rgba(250, 250, 247, 0.4)',
          boxShadow: !demoMode ? '0 2px 10px rgba(0,0,0,0.3)' : 'none'
        }}
      >
        <Icon name="check" size={14} color={!demoMode ? "#F06D5A" : undefined} />
        <span style={{ fontFamily: 'var(--font-mono)', textTransform: 'uppercase', letterSpacing: '0.05em' }}>Prod</span>
      </div>
    </div>
  );
};

export default ModeToggle;
