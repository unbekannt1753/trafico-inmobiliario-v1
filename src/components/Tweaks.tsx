"use client";
import React from 'react';
import { useAppContext, Tweaks as TweaksType } from '../context/AppContext';

const Tweaks: React.FC = () => {
  const { tweaks, setTweak, editMode } = useAppContext();

  if (!editMode) return null;

  return (
    <div className="tweaks-panel">
      <div className="tweaks-head">
        <div className="t">Tweaks</div>
        <span className="mono" style={{fontSize:10, color:"var(--ink-mute)"}}>Tráfico · v1</span>
      </div>
      <div className="tweaks-body">
        <div className="tweak-row">
          <label>Tema</label>
          <div className="tweak-seg">
            {(["light", "dark"] as const).map(v => (
              <button 
                key={v} 
                className={tweaks.theme === v ? "active" : ""} 
                onClick={() => setTweak("theme", v)}
              >
                {v === "light" ? "Claro" : "Oscuro"}
              </button>
            ))}
          </div>
        </div>

        <div className="tweak-row">
          <label>Densidad</label>
          <div className="tweak-seg">
            {([["comfortable", "Amplio"], ["compact", "Compacto"]] as const).map(([k, l]) => (
              <button 
                key={k} 
                className={tweaks.density === k ? "active" : ""} 
                onClick={() => setTweak("density", k)}
              >
                {l}
              </button>
            ))}
          </div>
        </div>

        <div className="tweak-row">
          <label>Estilo de tarjeta</label>
          <div className="tweak-seg">
            {([["editorial", "Editorial"], ["minimal", "Minimal"], ["compact", "Compact"]] as const).map(([k, l]) => (
              <button 
                key={k} 
                className={tweaks.cardStyle === k ? "active" : ""} 
                onClick={() => setTweak("cardStyle", k)}
              >
                {l}
              </button>
            ))}
          </div>
        </div>

        <div className="tweak-row tweak-switch">
          <label style={{marginBottom:0}}>Display en serif</label>
          <div className={"switch" + (tweaks.serifDisplay ? " on" : "")} onClick={() => setTweak("serifDisplay", !tweaks.serifDisplay)}>
            <div className="knob"></div>
          </div>
        </div>

        <div className="tweak-row">
          <label>Intensidad del naranja</label>
          <div className="tweak-seg">
            {([["accent", "Acento"], ["hero", "Protagonista"]] as const).map(([k, l]) => (
              <button 
                key={k} 
                className={tweaks.orangeIntensity === k ? "active" : ""} 
                onClick={() => setTweak("orangeIntensity", k)}
              >
                {l}
              </button>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
};

export default Tweaks;
