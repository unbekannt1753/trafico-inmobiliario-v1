import React from 'react';

interface ArchPlaceholderProps {
  palette?: string[];
  seed?: number;
}

const ArchPlaceholder: React.FC<ArchPlaceholderProps> = ({ 
  palette = ["#C4572E", "#E8C28C", "#1A1A1A"], 
  seed = 0 
}) => {
  const [a, b, c, d] = [...palette, "#F2EFE6", "#1A1A1A"];
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
        <linearGradient id={`sky0-${seed}`} x1={0} x2={0} y1={0} y2={1}>
          <stop offset="0%" stopColor={sky} stopOpacity="0.9"/>
          <stop offset="100%" stopColor={sky} stopOpacity="0.5"/>
        </linearGradient>
      </defs>
      <rect width={400} height={300} fill={`url(#sky0-${seed})`}/>
      <path d="M0 200 L80 150 L160 180 L260 140 L360 190 L400 170 L400 220 L0 220 Z" fill={dark} opacity={0.15}/>
      <rect x={70} y={130} width={260} height={130} fill={wall}/>
      <path d="M60 130 L200 80 L340 130 Z" fill={dark} opacity={0.85}/>
      <path d="M60 130 L200 80 L340 130 L320 135 L200 88 L80 135 Z" fill={dark}/>
      <rect x={180} y={180} width={40} height={80} fill={dark}/>
      <rect x={182} y={182} width={36} height={76} fill={dark} opacity={0.7}/>
      <circle cx={212} cy={222} r={1.5} fill={wall}/>
      <rect x={100} y={165} width={45} height={45} fill={dark}/>
      <rect x={103} y={168} width={19} height={39} fill={sky} opacity={0.5}/>
      <rect x={123} y={168} width={19} height={39} fill={sky} opacity={0.5}/>
      <rect x={255} y={165} width={45} height={45} fill={dark}/>
      <rect x={258} y={168} width={19} height={39} fill={sky} opacity={0.5}/>
      <rect x={278} y={168} width={19} height={39} fill={sky} opacity={0.5}/>
      <rect x={0} y={260} width={400} height={40} fill={ground} opacity={0.4}/>
      <ellipse cx={340} cy={255} rx={12} ry={18} fill={dark} opacity={0.6}/>
      <ellipse cx={60} cy={255} rx={10} ry={14} fill={dark} opacity={0.5}/>
    </svg>,

    // 1 — Modern apartment tower with balconies
    <svg key="v1" viewBox="0 0 400 300" preserveAspectRatio="xMidYMid slice" className="ph-arch">
      <defs>
        <linearGradient id={`sky1-${seed}`} x1={0} x2={0} y1={0} y2={1}>
          <stop offset="0%" stopColor={sky}/>
          <stop offset="100%" stopColor={wallAlt} stopOpacity={0.6}/>
        </linearGradient>
      </defs>
      <rect width={400} height={300} fill={`url(#sky1-${seed})`}/>
      <rect x={20} y={90} width={90} height={210} fill={dark} opacity={0.25}/>
      <rect x={290} y={60} width={90} height={240} fill={dark} opacity={0.3}/>
      <rect x={120} y={40} width={160} height={260} fill={wall}/>
      <rect x={120} y={40} width={160} height={6} fill={dark}/>
      {[70, 115, 160, 205, 250].map((y, i) => (
        <g key={i}>
          <rect x={120} y={y} width={160} height={30} fill={dark} opacity={0.15}/>
          <rect x={132} y={y+6} width={40} height={20} fill={dark} opacity={0.85}/>
          <rect x={180} y={y+6} width={40} height={20} fill={dark} opacity={0.85}/>
          <rect x={228} y={y+6} width={40} height={20} fill={dark} opacity={0.85}/>
          <rect x={120} y={y+28} width={160} height={3} fill={dark}/>
        </g>
      ))}
      <rect x={160} y={25} width={30} height={15} fill={dark}/>
    </svg>,

    // 2 — Living room interior with window view
    <svg key="v2" viewBox="0 0 400 300" preserveAspectRatio="xMidYMid slice" className="ph-arch">
      <rect width={400} height={300} fill={wallAlt}/>
      <path d="M0 220 L400 220 L400 300 L0 300 Z" fill={wall} opacity={0.7}/>
      <path d="M0 220 L400 220" stroke={dark} strokeWidth={1} opacity={0.3}/>
      <rect x={60} y={50} width={180} height={140} fill={dark}/>
      <rect x={64} y={54} width={172} height={132} fill={sky} opacity={0.6}/>
      <line x1={150} y1={54} x2={150} y2={186} stroke={dark} strokeWidth={3}/>
      <line x1={64} y1={120} x2={236} y2={120} stroke={dark} strokeWidth={3}/>
      <rect x={64} y={140} width={172} height={46} fill={dark} opacity={0.35}/>
      <rect x={260} y={170} width={110} height={50} rx={6} fill={dark}/>
      <rect x={260} y={160} width={110} height={20} rx={4} fill={dark} opacity={0.85}/>
      <rect x={270} y={165} width={30} height={20} rx={3} fill={accent} opacity={0.9}/>
      <rect x={330} y={165} width={30} height={20} rx={3} fill={accent} opacity={0.7}/>
      <rect x={220} y={190} width={30} height={30} fill={dark} opacity={0.9}/>
      <rect x={225} y={175} width={20} height={18} rx={2} fill={accent}/>
      <line x1={40} y1={220} x2={40} y2={140} stroke={dark} strokeWidth={2}/>
      <path d="M28 140 L52 140 L46 120 L34 120 Z" fill={dark}/>
      <ellipse cx={200} cy={255} rx={140} ry={18} fill={accent} opacity={0.4}/>
    </svg>,

    // 3 — Aerial view / garden with pool (house from above)
    <svg key="v3" viewBox="0 0 400 300" preserveAspectRatio="xMidYMid slice" className="ph-arch">
      <rect width={400} height={300} fill={wall} opacity={0.4}/>
      <rect x={0} y={0} width={400} height={300} fill={dark} opacity={0.12}/>
      <rect x={0} y={140} width={400} height={28} fill={wallAlt} opacity={0.7}/>
      <rect x={60} y={40} width={150} height={90} fill={dark}/>
      <rect x={70} y={50} width={40} height={40} fill={accent} opacity={0.6}/>
      <rect x={120} y={50} width={80} height={70} fill={wallAlt} opacity={0.4}/>
      <rect x={240} y={190} width={120} height={70} rx={4} fill={sky}/>
      <rect x={245} y={195} width={110} height={60} rx={2} fill={sky} opacity={0.7}/>
      <rect x={230} y={180} width={140} height={90} rx={4} fill={wallAlt} opacity={0.5}/>
      <rect x={240} y={190} width={120} height={70} rx={4} fill={sky}/>
      <circle cx={40} cy={60} r={18} fill={dark} opacity={0.55}/>
      <circle cx={380} cy={40} r={14} fill={dark} opacity={0.55}/>
      <circle cx={30} cy={250} r={22} fill={dark} opacity={0.55}/>
      <circle cx={360} cy={90} r={12} fill={dark} opacity={0.5}/>
      <rect x={250} y={200} width={18} height={8} rx={2} fill={wallAlt}/>
      <rect x={250} y={212} width={18} height={8} rx={2} fill={wallAlt}/>
      <rect x={230} y={40} width={28} height={90} fill={wallAlt} opacity={0.6}/>
      <rect x={235} y={80} width={18} height={30} rx={3} fill={accent}/>
    </svg>,

    // 4 — Kitchen interior
    <svg key="v4" viewBox="0 0 400 300" preserveAspectRatio="xMidYMid slice" className="ph-arch">
      <rect width={400} height={300} fill={wallAlt}/>
      <rect x={0} y={0} width={400} height={170} fill={wall} opacity={0.5}/>
      {[40, 80, 120, 160, 200, 240, 280, 320, 360].map(x => (
        <line key={x} x1={x} y1={80} x2={x} y2="170" stroke={dark} strokeWidth={0.5} opacity={0.3}/>
      ))}
      <line x1={0} y1={125} x2={400} y2={125} stroke={dark} strokeWidth={0.5} opacity={0.3}/>
      <rect x={30} y={40} width={340} height={60} fill={dark}/>
      <line x1={115} y1={40} x2={115} y2={100} stroke={wall} strokeWidth={1.5}/>
      <line x1={200} y1={40} x2={200} y2={100} stroke={wall} strokeWidth={1.5}/>
      <line x1={285} y1={40} x2={285} y2={100} stroke={wall} strokeWidth={1.5}/>
      <rect x={20} y={170} width={360} height={12} fill={dark}/>
      <rect x={30} y={182} width={340} height={78} fill={dark} opacity={0.9}/>
      <line x1={115} y1={182} x2={115} y2={260} stroke={wall} strokeWidth={1.5} opacity={0.6}/>
      <line x1={200} y1={182} x2={200} y2={260} stroke={wall} strokeWidth={1.5} opacity={0.6}/>
      <line x1={285} y1={182} x2={285} y2={260} stroke={wall} strokeWidth={1.5} opacity={0.6}/>
      <rect x={160} y={182} width={80} height={12} fill={dark}/>
      <circle cx={180} cy={188} r={4} fill={accent}/>
      <circle cx={220} cy={188} r={4} fill={accent}/>
      <line x1={140} y1={0} x2={140} y2={30} stroke={dark} strokeWidth={1}/>
      <circle cx={140} cy={35} r={8} fill={accent}/>
      <line x1={260} y1={0} x2={260} y2={30} stroke={dark} strokeWidth={1}/>
      <circle cx={260} cy={35} r={8} fill={accent}/>
      <rect x={0} y={260} width={400} height={40} fill={wall} opacity={0.7}/>
      <circle cx={90} cy={280} r={6} fill={dark}/>
      <rect x={88} y={280} width={4} height={15} fill={dark}/>
    </svg>,

    // 5 — Facade at dusk with lit windows
    <svg key="v5" viewBox="0 0 400 300" preserveAspectRatio="xMidYMid slice" className="ph-arch">
      <defs>
        <linearGradient id={`sky5-${seed}`} x1={0} x2={0} y1={0} y2={1}>
          <stop offset="0%" stopColor={dark}/>
          <stop offset="60%" stopColor={accent} stopOpacity={0.5}/>
          <stop offset="100%" stopColor={wallAlt} stopOpacity={0.4}/>
        </linearGradient>
      </defs>
      <rect width={400} height={300} fill={`url(#sky5-${seed})`}/>
      <rect x={0} y={170} width={400} height={130} fill={dark}/>
      <rect x={80} y={90} width={240} height={160} fill={dark} opacity={0.95}/>
      <rect x={80} y={88} width={240} height={6} fill={dark}/>
      {[
        [100, 110], [160, 110], [220, 110], [280, 110],
        [100, 160], [160, 160], [220, 160], [280, 160],
        [100, 210], [160, 210], [220, 210], [280, 210],
      ].map(([x, y], i) => (
        <rect key={i} x={x} y={y} width={22} height={30} fill={i % 3 === 1 ? dark : accent} opacity={i % 3 === 1 ? 0.4 : 0.85}/>
      ))}
      <rect x={190} y={230} width={30} height={30} fill={accent} opacity={0.95}/>
      <circle cx={350} cy={60} r={14} fill={wallAlt} opacity={0.9}/>
      <rect x={0} y={280} width={400} height={20} fill={accent} opacity={0.1}/>
    </svg>,
  ];
  return variants[seed % variants.length];
};

export default ArchPlaceholder;
