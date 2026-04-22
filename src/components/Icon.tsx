import React from 'react';

export type IconName = 
  | "search" | "heart" | "heart-fill" | "bed" | "bath" | "car" | "area" | "pin" 
  | "arrow-right" | "arrow-left" | "plus" | "x" | "filter" | "grid" | "map" | "star" 
  | "share" | "camera" | "check" | "upload" | "user" | "phone" | "message" | "home" 
  | "building" | "key" | "sparkle" | "menu" | "chevron-right" | "chevron-down" | "wifi" 
  | "sun" | "pool" | "dumbbell" | "paw" | "shield" | "mail" | "eye" | "eye-off";

interface IconProps {
  name: IconName | string;
  size?: number;
  stroke?: number;
  style?: React.CSSProperties;
  color?: string;
}

const Icon: React.FC<IconProps> = ({ name, size = 18, stroke = 1.5, style, color }) => {
  const s: React.SVGProps<SVGSVGElement> = { 
    width: size, 
    height: size, 
    fill: "none", 
    stroke: color || "currentColor",
    strokeWidth: stroke, 
    strokeLinecap: "round", 
    strokeLinejoin: "round",
    style
  };
  
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

export default Icon;
