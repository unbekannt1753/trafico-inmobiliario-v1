import React from 'react';

interface LogoProps {
  onClick?: () => void;
}

const Logo: React.FC<LogoProps> = ({ onClick }) => (
  <div className="logo" onClick={onClick} style={{ cursor: onClick ? 'pointer' : 'default' }}>
    <div className="logo-mark">T</div>
    <div>
      <div className="logo-word">Tráfico<em> Inmobiliario</em></div>
      <span className="logo-sub">MX · Est. 2026</span>
    </div>
  </div>
);

export default Logo;
