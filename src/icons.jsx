// Minimal line icons — monoline 1.5px
const Icon = ({ name, size = 18, stroke = 1.5 }) => {
  const s = { width: size, height: size, fill: "none", stroke: "currentColor", strokeWidth: stroke, strokeLinecap: "round", strokeLinejoin: "round" };
  switch (name) {
    case "search": return <svg viewBox="0 0 24 24" {...s}><circle cx="11" cy="11" r="7"/><path d="m20 20-3.5-3.5"/></svg>;
    case "heart": return <svg viewBox="0 0 24 24" {...s}><path d="M12 20s-7-4.5-7-10a4 4 0 0 1 7-2.6A4 4 0 0 1 19 10c0 5.5-7 10-7 10Z"/></svg>;
    case "heart-fill": return <svg viewBox="0 0 24 24" style={{width:size,height:size}} fill="currentColor"><path d="M12 20s-7-4.5-7-10a4 4 0 0 1 7-2.6A4 4 0 0 1 19 10c0 5.5-7 10-7 10Z"/></svg>;
    case "bed": return <svg viewBox="0 0 24 24" {...s}><path d="M3 18v-8h18v8"/><path d="M3 14h18"/><path d="M7 10V7a1 1 0 0 1 1-1h4a1 1 0 0 1 1 1v3"/><path d="M3 20v-2M21 20v-2"/></svg>;
    case "bath": return <svg viewBox="0 0 24 24" {...s}><path d="M3 12h18v4a3 3 0 0 1-3 3H6a3 3 0 0 1-3-3v-4Z"/><path d="M6 12V6a2 2 0 0 1 2-2h0a2 2 0 0 1 2 2"/><path d="M5 19l-1 2M19 19l1 2"/></svg>;
    case "car": return <svg viewBox="0 0 24 24" {...s}><path d="M5 16h14v-4l-2-5H7l-2 5v4Z"/><circle cx="8" cy="16" r="1.5"/><circle cx="16" cy="16" r="1.5"/></svg>;
    case "area": return <svg viewBox="0 0 24 24" {...s}><path d="M4 4h6v6H4zM14 14h6v6h-6z"/><path d="M4 20h6M20 4v6"/></svg>;
    case "pin": return <svg viewBox="0 0 24 24" {...s}><path d="M12 22s-7-7-7-12a7 7 0 1 1 14 0c0 5-7 12-7 12Z"/><circle cx="12" cy="10" r="2.5"/></svg>;
    case "arrow-right": return <svg viewBox="0 0 24 24" {...s}><path d="M5 12h14M13 5l7 7-7 7"/></svg>;
    case "arrow-left": return <svg viewBox="0 0 24 24" {...s}><path d="M19 12H5M11 5l-7 7 7 7"/></svg>;
    case "plus": return <svg viewBox="0 0 24 24" {...s}><path d="M12 5v14M5 12h14"/></svg>;
    case "x": return <svg viewBox="0 0 24 24" {...s}><path d="M18 6 6 18M6 6l12 12"/></svg>;
    case "filter": return <svg viewBox="0 0 24 24" {...s}><path d="M3 6h18M6 12h12M10 18h4"/></svg>;
    case "grid": return <svg viewBox="0 0 24 24" {...s}><rect x="4" y="4" width="7" height="7"/><rect x="13" y="4" width="7" height="7"/><rect x="4" y="13" width="7" height="7"/><rect x="13" y="13" width="7" height="7"/></svg>;
    case "map": return <svg viewBox="0 0 24 24" {...s}><path d="m3 6 6-2 6 2 6-2v14l-6 2-6-2-6 2z"/><path d="M9 4v16M15 6v16"/></svg>;
    case "star": return <svg viewBox="0 0 24 24" style={{width:size,height:size}} fill="currentColor"><path d="m12 2 3 7 7 .5-5.5 4.5 2 7.5L12 17l-6.5 4 2-7.5L2 9.5 9 9z"/></svg>;
    case "share": return <svg viewBox="0 0 24 24" {...s}><circle cx="18" cy="5" r="2.5"/><circle cx="6" cy="12" r="2.5"/><circle cx="18" cy="19" r="2.5"/><path d="m8 11 8-5M8 13l8 5"/></svg>;
    case "camera": return <svg viewBox="0 0 24 24" {...s}><path d="M3 8h4l2-2h6l2 2h4v11H3z"/><circle cx="12" cy="13" r="3.5"/></svg>;
    case "check": return <svg viewBox="0 0 24 24" {...s}><path d="m5 12 5 5 9-11"/></svg>;
    case "upload": return <svg viewBox="0 0 24 24" {...s}><path d="M12 16V4M6 10l6-6 6 6M4 18v2h16v-2"/></svg>;
    case "user": return <svg viewBox="0 0 24 24" {...s}><circle cx="12" cy="8" r="4"/><path d="M4 21c0-4 4-6 8-6s8 2 8 6"/></svg>;
    case "phone": return <svg viewBox="0 0 24 24" {...s}><path d="M4 5a2 2 0 0 1 2-2h2l2 5-2 1a12 12 0 0 0 6 6l1-2 5 2v2a2 2 0 0 1-2 2A16 16 0 0 1 4 5Z"/></svg>;
    case "message": return <svg viewBox="0 0 24 24" {...s}><path d="M4 6a2 2 0 0 1 2-2h12a2 2 0 0 1 2 2v9a2 2 0 0 1-2 2H9l-5 4z"/></svg>;
    case "home": return <svg viewBox="0 0 24 24" {...s}><path d="m3 11 9-7 9 7v9a1 1 0 0 1-1 1h-5v-6h-6v6H4a1 1 0 0 1-1-1z"/></svg>;
    case "building": return <svg viewBox="0 0 24 24" {...s}><rect x="4" y="3" width="16" height="18"/><path d="M8 8h2M14 8h2M8 12h2M14 12h2M8 16h2M14 16h2"/></svg>;
    case "key": return <svg viewBox="0 0 24 24" {...s}><circle cx="7" cy="17" r="3"/><path d="m9 15 10-10M15 9l2 2M17 7l2 2"/></svg>;
    case "sparkle": return <svg viewBox="0 0 24 24" {...s}><path d="m12 3 2 7 7 2-7 2-2 7-2-7-7-2 7-2z"/></svg>;
    case "menu": return <svg viewBox="0 0 24 24" {...s}><path d="M4 7h16M4 12h16M4 17h16"/></svg>;
    case "chevron-right": return <svg viewBox="0 0 24 24" {...s}><path d="m9 6 6 6-6 6"/></svg>;
    case "chevron-down": return <svg viewBox="0 0 24 24" {...s}><path d="m6 9 6 6 6-6"/></svg>;
    case "wifi": return <svg viewBox="0 0 24 24" {...s}><path d="M3 9a14 14 0 0 1 18 0"/><path d="M6 12.5a9 9 0 0 1 12 0"/><path d="M9 16a4 4 0 0 1 6 0"/><circle cx="12" cy="19" r="1" fill="currentColor"/></svg>;
    case "sun": return <svg viewBox="0 0 24 24" {...s}><circle cx="12" cy="12" r="4"/><path d="M12 2v2M12 20v2M2 12h2M20 12h2M5 5l1.5 1.5M17.5 17.5 19 19M5 19l1.5-1.5M17.5 6.5 19 5"/></svg>;
    case "pool": return <svg viewBox="0 0 24 24" {...s}><path d="M2 18c2 0 2-1 4-1s2 1 4 1 2-1 4-1 2 1 4 1 2-1 4-1"/><path d="M2 21c2 0 2-1 4-1s2 1 4 1 2-1 4-1 2 1 4 1 2-1 4-1"/><path d="M7 14V5a2 2 0 0 1 2-2M17 14V5a2 2 0 0 0-2-2"/><path d="M7 9h10"/></svg>;
    case "dumbbell": return <svg viewBox="0 0 24 24" {...s}><path d="M3 10v4M6 7v10M18 7v10M21 10v4M6 12h12"/></svg>;
    case "paw": return <svg viewBox="0 0 24 24" {...s}><circle cx="5" cy="11" r="2"/><circle cx="19" cy="11" r="2"/><circle cx="9" cy="6" r="2"/><circle cx="15" cy="6" r="2"/><path d="M8 17a4 4 0 0 1 8 0c0 2-2 3-4 3s-4-1-4-3Z"/></svg>;
    case "shield": return <svg viewBox="0 0 24 24" {...s}><path d="M12 3 4 6v6c0 4 3 8 8 9 5-1 8-5 8-9V6Z"/></svg>;
    case "mail": return <svg viewBox="0 0 24 24" {...s}><rect x="3" y="5" width="18" height="14" rx="2"/><path d="m3 7 9 6 9-6"/></svg>;
    case "eye": return <svg viewBox="0 0 24 24" {...s}><path d="M2 12s3.5-7 10-7 10 7 10 7-3.5 7-10 7S2 12 2 12Z"/><circle cx="12" cy="12" r="3"/></svg>;
    case "eye-off": return <svg viewBox="0 0 24 24" {...s}><path d="M3 3l18 18"/><path d="M10.6 6.1A10 10 0 0 1 12 6c6.5 0 10 6 10 6a17 17 0 0 1-3.5 4"/><path d="M6 7a17 17 0 0 0-4 5s3.5 7 10 7a10 10 0 0 0 4-.8"/><path d="M10 10a3 3 0 0 0 4 4"/></svg>;
    default: return null;
  }
};

// Realistic architectural illustrations — uses property palette
const ArchPlaceholder = ({ palette = ["#C4572E", "#E8C28C", "#1A1A1A"], seed = 0, label }) => {
  const [a, b, c, d] = [...palette, "#F2EFE6", "#1A1A1A"];
  // semantic colors
  const sky = b;
  const wall = a;
  const wallAlt = d || "#F2EFE6";
  const dark = c;
  const accent = a;
  const ground = "#2d2d2d";

  const variants = [
    // 0 — Mexican colonial-style house with patio wall
    <svg key="v0" viewBox="0 0 400 300" preserveAspectRatio="xMidYMid slice" className="ph-arch">
      <defs>
        <linearGradient id={`sky0-${seed}`} x1="0" x2="0" y1="0" y2="1">
          <stop offset="0%" stopColor={sky} stopOpacity="0.9"/>
          <stop offset="100%" stopColor={sky} stopOpacity="0.5"/>
        </linearGradient>
      </defs>
      <rect width="400" height="300" fill={`url(#sky0-${seed})`}/>
      {/* distant mountain */}
      <path d="M0 200 L80 150 L160 180 L260 140 L360 190 L400 170 L400 220 L0 220 Z" fill={dark} opacity="0.15"/>
      {/* house body */}
      <rect x="70" y="130" width="260" height="130" fill={wall}/>
      {/* roof tiles */}
      <path d="M60 130 L200 80 L340 130 Z" fill={dark} opacity="0.85"/>
      <path d="M60 130 L200 80 L340 130 L320 135 L200 88 L80 135 Z" fill={dark}/>
      {/* door */}
      <rect x="180" y="180" width="40" height="80" fill={dark}/>
      <rect x="182" y="182" width="36" height="76" fill={dark} opacity="0.7"/>
      <circle cx="212" cy="222" r="1.5" fill={wall}/>
      {/* windows with shutters */}
      <rect x="100" y="165" width="45" height="45" fill={dark}/>
      <rect x="103" y="168" width="19" height="39" fill={sky} opacity="0.5"/>
      <rect x="123" y="168" width="19" height="39" fill={sky} opacity="0.5"/>
      <rect x="255" y="165" width="45" height="45" fill={dark}/>
      <rect x="258" y="168" width="19" height="39" fill={sky} opacity="0.5"/>
      <rect x="278" y="168" width="19" height="39" fill={sky} opacity="0.5"/>
      {/* ground */}
      <rect x="0" y="260" width="400" height="40" fill={ground} opacity="0.4"/>
      {/* plant */}
      <ellipse cx="340" cy="255" rx="12" ry="18" fill={dark} opacity="0.6"/>
      <ellipse cx="60" cy="255" rx="10" ry="14" fill={dark} opacity="0.5"/>
    </svg>,

    // 1 — Modern apartment tower with balconies
    <svg key="v1" viewBox="0 0 400 300" preserveAspectRatio="xMidYMid slice" className="ph-arch">
      <defs>
        <linearGradient id={`sky1-${seed}`} x1="0" x2="0" y1="0" y2="1">
          <stop offset="0%" stopColor={sky}/>
          <stop offset="100%" stopColor={wallAlt} stopOpacity="0.6"/>
        </linearGradient>
      </defs>
      <rect width="400" height="300" fill={`url(#sky1-${seed})`}/>
      {/* background building */}
      <rect x="20" y="90" width="90" height="210" fill={dark} opacity="0.25"/>
      <rect x="290" y="60" width="90" height="240" fill={dark} opacity="0.3"/>
      {/* main tower */}
      <rect x="120" y="40" width="160" height="260" fill={wall}/>
      <rect x="120" y="40" width="160" height="6" fill={dark}/>
      {/* balcony rows */}
      {[70, 115, 160, 205, 250].map((y, i) => (
        <g key={i}>
          <rect x="120" y={y} width="160" height="30" fill={dark} opacity="0.15"/>
          <rect x="132" y={y+6} width="40" height="20" fill={dark} opacity="0.85"/>
          <rect x="180" y={y+6} width="40" height="20" fill={dark} opacity="0.85"/>
          <rect x="228" y={y+6} width="40" height="20" fill={dark} opacity="0.85"/>
          {/* balcony rails */}
          <rect x="120" y={y+28} width="160" height="3" fill={dark}/>
        </g>
      ))}
      {/* rooftop */}
      <rect x="160" y="25" width="30" height="15" fill={dark}/>
    </svg>,

    // 2 — Living room interior with window view
    <svg key="v2" viewBox="0 0 400 300" preserveAspectRatio="xMidYMid slice" className="ph-arch">
      <rect width="400" height="300" fill={wallAlt}/>
      {/* floor */}
      <path d="M0 220 L400 220 L400 300 L0 300 Z" fill={wall} opacity="0.7"/>
      <path d="M0 220 L400 220" stroke={dark} strokeWidth="1" opacity="0.3"/>
      {/* large window */}
      <rect x="60" y="50" width="180" height="140" fill={dark}/>
      <rect x="64" y="54" width="172" height="132" fill={sky} opacity="0.6"/>
      <line x1="150" y1="54" x2="150" y2="186" stroke={dark} strokeWidth="3"/>
      <line x1="64" y1="120" x2="236" y2="120" stroke={dark} strokeWidth="3"/>
      {/* view through window */}
      <rect x="64" y="140" width="172" height="46" fill={dark} opacity="0.35"/>
      {/* sofa */}
      <rect x="260" y="170" width="110" height="50" rx="6" fill={dark}/>
      <rect x="260" y="160" width="110" height="20" rx="4" fill={dark} opacity="0.85"/>
      <rect x="270" y="165" width="30" height="20" rx="3" fill={accent} opacity="0.9"/>
      <rect x="330" y="165" width="30" height="20" rx="3" fill={accent} opacity="0.7"/>
      {/* side table */}
      <rect x="220" y="190" width="30" height="30" fill={dark} opacity="0.9"/>
      <rect x="225" y="175" width="20" height="18" rx="2" fill={accent}/>
      {/* floor lamp */}
      <line x1="40" y1="220" x2="40" y2="140" stroke={dark} strokeWidth="2"/>
      <path d="M28 140 L52 140 L46 120 L34 120 Z" fill={dark}/>
      {/* rug */}
      <ellipse cx="200" cy="255" rx="140" ry="18" fill={accent} opacity="0.4"/>
    </svg>,

    // 3 — Aerial view / garden with pool (house from above)
    <svg key="v3" viewBox="0 0 400 300" preserveAspectRatio="xMidYMid slice" className="ph-arch">
      <rect width="400" height="300" fill={wall} opacity="0.4"/>
      {/* lawn areas */}
      <rect x="0" y="0" width="400" height="300" fill={dark} opacity="0.12"/>
      {/* paths */}
      <rect x="0" y="140" width="400" height="28" fill={wallAlt} opacity="0.7"/>
      {/* house footprint */}
      <rect x="60" y="40" width="150" height="90" fill={dark}/>
      <rect x="70" y="50" width="40" height="40" fill={accent} opacity="0.6"/>
      <rect x="120" y="50" width="80" height="70" fill={wallAlt} opacity="0.4"/>
      {/* pool */}
      <rect x="240" y="190" width="120" height="70" rx="4" fill={sky}/>
      <rect x="245" y="195" width="110" height="60" rx="2" fill={sky} opacity="0.7"/>
      {/* deck around pool */}
      <rect x="230" y="180" width="140" height="90" rx="4" fill={wallAlt} opacity="0.5"/>
      <rect x="240" y="190" width="120" height="70" rx="4" fill={sky}/>
      {/* trees (circles) */}
      <circle cx="40" cy="60" r="18" fill={dark} opacity="0.55"/>
      <circle cx="380" cy="40" r="14" fill={dark} opacity="0.55"/>
      <circle cx="30" cy="250" r="22" fill={dark} opacity="0.55"/>
      <circle cx="360" cy="90" r="12" fill={dark} opacity="0.5"/>
      {/* lounge chairs */}
      <rect x="250" y="200" width="18" height="8" rx="2" fill={wallAlt}/>
      <rect x="250" y="212" width="18" height="8" rx="2" fill={wallAlt}/>
      {/* driveway */}
      <rect x="230" y="40" width="28" height="90" fill={wallAlt} opacity="0.6"/>
      <rect x="235" y="80" width="18" height="30" rx="3" fill={accent}/>
    </svg>,

    // 4 — Kitchen interior
    <svg key="v4" viewBox="0 0 400 300" preserveAspectRatio="xMidYMid slice" className="ph-arch">
      <rect width="400" height="300" fill={wallAlt}/>
      {/* back wall tiles */}
      <rect x="0" y="0" width="400" height="170" fill={wall} opacity="0.5"/>
      {[40, 80, 120, 160, 200, 240, 280, 320, 360].map(x => (
        <line key={x} x1={x} y1="80" x2={x} y2="170" stroke={dark} strokeWidth="0.5" opacity="0.3"/>
      ))}
      <line x1="0" y1="125" x2="400" y2="125" stroke={dark} strokeWidth="0.5" opacity="0.3"/>
      {/* upper cabinets */}
      <rect x="30" y="40" width="340" height="60" fill={dark}/>
      <line x1="115" y1="40" x2="115" y2="100" stroke={wall} strokeWidth="1.5"/>
      <line x1="200" y1="40" x2="200" y2="100" stroke={wall} strokeWidth="1.5"/>
      <line x1="285" y1="40" x2="285" y2="100" stroke={wall} strokeWidth="1.5"/>
      {/* countertop */}
      <rect x="20" y="170" width="360" height="12" fill={dark}/>
      {/* lower cabinets */}
      <rect x="30" y="182" width="340" height="78" fill={dark} opacity="0.9"/>
      <line x1="115" y1="182" x2="115" y2="260" stroke={wall} strokeWidth="1.5" opacity="0.6"/>
      <line x1="200" y1="182" x2="200" y2="260" stroke={wall} strokeWidth="1.5" opacity="0.6"/>
      <line x1="285" y1="182" x2="285" y2="260" stroke={wall} strokeWidth="1.5" opacity="0.6"/>
      {/* stove */}
      <rect x="160" y="182" width="80" height="12" fill={dark}/>
      <circle cx="180" cy="188" r="4" fill={accent}/>
      <circle cx="220" cy="188" r="4" fill={accent}/>
      {/* pendant lights */}
      <line x1="140" y1="0" x2="140" y2="30" stroke={dark} strokeWidth="1"/>
      <circle cx="140" cy="35" r="8" fill={accent}/>
      <line x1="260" y1="0" x2="260" y2="30" stroke={dark} strokeWidth="1"/>
      <circle cx="260" cy="35" r="8" fill={accent}/>
      {/* floor */}
      <rect x="0" y="260" width="400" height="40" fill={wall} opacity="0.7"/>
      {/* island stools */}
      <circle cx="90" cy="280" r="6" fill={dark}/>
      <rect x="88" y="280" width="4" height="15" fill={dark}/>
    </svg>,

    // 5 — Facade at dusk with lit windows
    <svg key="v5" viewBox="0 0 400 300" preserveAspectRatio="xMidYMid slice" className="ph-arch">
      <defs>
        <linearGradient id={`sky5-${seed}`} x1="0" x2="0" y1="0" y2="1">
          <stop offset="0%" stopColor={dark}/>
          <stop offset="60%" stopColor={accent} stopOpacity="0.5"/>
          <stop offset="100%" stopColor={wallAlt} stopOpacity="0.4"/>
        </linearGradient>
      </defs>
      <rect width="400" height="300" fill={`url(#sky5-${seed})`}/>
      {/* silhouette */}
      <rect x="0" y="170" width="400" height="130" fill={dark}/>
      {/* main facade */}
      <rect x="80" y="90" width="240" height="160" fill={dark} opacity="0.95"/>
      <rect x="80" y="88" width="240" height="6" fill={dark}/>
      {/* windows lit */}
      {[
        [100, 110], [160, 110], [220, 110], [280, 110],
        [100, 160], [160, 160], [220, 160], [280, 160],
        [100, 210], [160, 210], [220, 210], [280, 210],
      ].map(([x, y], i) => (
        <rect key={i} x={x} y={y} width="22" height="30" fill={i % 3 === 1 ? dark : accent} opacity={i % 3 === 1 ? 0.4 : 0.85}/>
      ))}
      {/* door with warm light */}
      <rect x="190" y="230" width="30" height="30" fill={accent} opacity="0.95"/>
      {/* moon */}
      <circle cx="350" cy="60" r="14" fill={wallAlt} opacity="0.9"/>
      {/* ground reflection */}
      <rect x="0" y="280" width="400" height="20" fill={accent} opacity="0.1"/>
    </svg>,
  ];
  return variants[seed % variants.length];
};

Object.assign(window, { Icon, ArchPlaceholder });
