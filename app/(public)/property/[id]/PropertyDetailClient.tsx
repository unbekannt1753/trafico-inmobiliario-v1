"use client";
import React, { useState } from 'react';
import { useRouter } from 'next/navigation';
import { useAppContext } from '@/src/context/AppContext';
import { fmtMXN } from '@/src/data';
import { Property } from '@/src/types/property';
import Icon, { IconName } from '@/src/components/Icon';
import ArchPlaceholder from '@/src/components/ArchPlaceholder';

export default function PropertyDetailClient({ property: p }: { property: Property }) {
  const router = useRouter();
  const { favs, toggleFav } = useAppContext();
  
  const [msg, setMsg] = useState("Hola, me interesa esta propiedad. ¿Podemos agendar una visita esta semana?");
  const [downPct, setDownPct] = useState(20);
  const [years, setYears] = useState(20);

  const downPayment = Math.round(p.price * downPct / 100);
  const loan = p.price - downPayment;
  const rate = 0.1125; // 11.25% anual
  const monthlyRate = rate / 12;
  const months = years * 12;
  const monthly = loan > 0 ? Math.round((loan * monthlyRate) / (1 - Math.pow(1 + monthlyRate, -months))) : 0;
  const isFav = favs?.has(p.id);

  const icMap: Record<string, IconName> = { 
    "Roof garden": "home", 
    "Gimnasio": "dumbbell", 
    "Alberca": "pool", 
    "Pet friendly": "paw", 
    "Seguridad 24/7": "shield", 
    "Amueblado": "home", 
    "Internet": "wifi", 
    "Internet 300mb": "wifi", 
    "Calentador solar": "sun" 
  };

  return (
    <div className="page-fade">
      <div className="container" style={{paddingTop:20}}>
        {/* Breadcrumb */}
        <div style={{display:"flex", alignItems:"center", gap:8, fontSize:13, color:"var(--ink-soft)", marginBottom:12}}>
          <span style={{cursor:"pointer"}} onClick={() => router.push("/")}>Inicio</span>
          <Icon name="chevron-right" size={12}/>
          <span style={{cursor:"pointer"}} onClick={() => router.push("/search")}>{p.operation === "venta" ? "Comprar" : "Rentar"}</span>
          <Icon name="chevron-right" size={12}/>
          <span>{p.city}</span>
          <Icon name="chevron-right" size={12}/>
          <span style={{color:"var(--ink)"}}>{p.title}</span>
        </div>

        {/* Title row */}
        <div style={{display:"flex", alignItems:"flex-end", justifyContent:"space-between", flexWrap:"wrap", gap:16, marginTop:20}}>
          <div>
            <div style={{display:"flex", gap:8, marginBottom:12}}>
              <span className="pill orange">{p.operation === "venta" ? "En venta" : p.operation === "renta" ? "En renta" : "Preventa"}</span>
              {p.tag && <span className="pill">{p.tag}</span>}
              <span className="pill outline"><Icon name="check" size={10}/> Verificada</span>
            </div>
            <h1 className="detail-title">{p.title}</h1>
            <div className="detail-addr"><Icon name="pin" size={14}/> &nbsp;{p.location}</div>
          </div>
          <div style={{display:"flex", gap:8}}>
            <button className="btn btn-ghost btn-sm" onClick={() => toggleFav(p.id)}>
              <Icon name={isFav ? "heart-fill" : "heart"} size={14}/> {isFav ? "Guardado" : "Guardar"}
            </button>
            <button className="btn btn-ghost btn-sm"><Icon name="share" size={14}/> Compartir</button>
          </div>
        </div>

        {/* Hero gallery */}
        <div className="detail-hero">
          <div><ArchPlaceholder palette={p.palette} seed={0}/>
            <button className="more-btn"><Icon name="camera" size={14}/> Ver 24 fotos</button>
          </div>
          <div><ArchPlaceholder palette={p.palette} seed={1}/></div>
          <div><ArchPlaceholder palette={p.palette} seed={2}/></div>
          <div><ArchPlaceholder palette={p.palette} seed={3}/></div>
          <div><ArchPlaceholder palette={p.palette} seed={4}/></div>
        </div>

        {/* Main layout */}
        <div className="detail-layout">
          <div>
            {/* Key stats */}
            <div className="detail-stats">
              <div className="detail-stat"><div className="n">{p.beds || "—"}</div><div className="l">Recámaras</div></div>
              <div className="detail-stat"><div className="n">{p.baths || "—"}</div><div className="l">Baños</div></div>
              <div className="detail-stat"><div className="n">{p.m2}<span style={{fontSize:16, color:"var(--ink-soft)"}}> m²</span></div><div className="l">Construcción</div></div>
              <div className="detail-stat"><div className="n">{p.parking || "—"}</div><div className="l">Estacionamientos</div></div>
            </div>

            {/* Description */}
            <section style={{marginBottom:48}}>
              <div className="eyebrow" style={{marginBottom:14}}><span className="dot"></span>Sobre la propiedad</div>
              <p style={{fontSize:18, lineHeight:1.6, color:"var(--ink-2)", maxWidth:620}}>{p.desc}</p>
              <p style={{fontSize:15, lineHeight:1.65, color:"var(--ink-soft)", maxWidth:620, marginTop:16}}>
                Construida en {p.year || "—"}, esta propiedad combina arquitectura mexicana contemporánea con detalles que privilegian el uso diario: entrada amplia de luz natural, ventilación cruzada y materiales que envejecen bien. Ubicada en una de las zonas más conectadas de {p.city}.
              </p>
            </section>

            {/* Specs */}
            <section style={{marginBottom:48}}>
              <div className="eyebrow" style={{marginBottom:14}}><span className="dot"></span>Ficha técnica</div>
              <div style={{border:"1px solid var(--line)", borderRadius:"var(--radius-lg)", overflow:"hidden"}}>
                {p.specs.map(([k, v], i) => (
                  <div key={k} style={{display:"flex", justifyContent:"space-between", padding:"16px 20px", borderBottom: i < p.specs.length-1 ? "1px solid var(--line-soft)" : "0", fontSize:14}}>
                    <div style={{color:"var(--ink-soft)"}}>{k}</div>
                    <div className="mono" style={{fontWeight:500}}>{v}</div>
                  </div>
                ))}
              </div>
            </section>

            {/* Amenities */}
            <section style={{marginBottom:48}}>
              <div className="eyebrow" style={{marginBottom:14}}><span className="dot"></span>Incluye</div>
              <div className="amenities">
                {p.amenities.map(a => (
                  <div key={a} className="amenity">
                    <div className="ic"><Icon name={icMap[a] || "check"} size={16}/></div>
                    {a}
                  </div>
                ))}
              </div>
            </section>

            {/* Location map */}
            <section style={{marginBottom:48}}>
              <div className="eyebrow" style={{marginBottom:14}}><span className="dot"></span>Ubicación</div>
              <div style={{aspectRatio:"16/7", borderRadius:"var(--radius-lg)", overflow:"hidden", border:"1px solid var(--line)", position:"relative"}}>
                <svg viewBox="0 0 800 350" preserveAspectRatio="xMidYMid slice" style={{width:"100%", height:"100%"}}>
                  <rect width="800" height="350" fill="#F2EFE6"/>
                  {Array.from({length:14}).map((_,i) => <line key={"h"+i} x1="0" y1={25*i} x2="800" y2={25*i} stroke="#E6E4DC"/>)}
                  {Array.from({length:32}).map((_,i) => <line key={"v"+i} x1={25*i} y1="0" x2={25*i} y2="350" stroke="#E6E4DC"/>)}
                  <circle cx="400" cy="175" r="50" fill="#D4DCC8"/>
                  <path d="M 0 175 Q 200 145, 400 175 T 800 175" stroke="#FFC8AA" strokeWidth="8" fill="none"/>
                  <text x="370" y="180" fontFamily="monospace" fontSize="12" fill="#52524D">Parque</text>
                </svg>
                <div className="map-pin active" style={{left:"50%", top:"50%", transform:"translate(-50%, -100%)"}}>
                  <div className="bubble">{fmtMXN(p.price, true)}</div>
                  <div className="tail"></div>
                </div>
              </div>
              <div style={{display:"grid", gridTemplateColumns:"repeat(4, 1fr)", gap:16, marginTop:20}}>
                {([["Supermercado", "180 m"], ["Metro/Transporte", "6 min"], ["Escuelas", "4 cerca"], ["Parques", "2 a pie"]] as const).map(([k, v]) => (
                  <div key={k} style={{padding:"16px 18px", border:"1px solid var(--line)", borderRadius:"var(--radius-lg)"}}>
                    <div style={{fontFamily:"var(--mono)", fontSize:10, letterSpacing:"0.12em", color:"var(--orange)", textTransform:"uppercase"}}>● {k}</div>
                    <div style={{fontFamily:"var(--serif)", fontSize:24, marginTop:8}}>{v}</div>
                  </div>
                ))}
              </div>
            </section>
          </div>

          {/* Contact card */}
          <aside>
            <div className="contact-card">
              <div style={{fontSize:12, color:"var(--ink-soft)", marginBottom:6}}>
                {p.operation === "renta" ? "Renta mensual" : "Precio de lista"}
              </div>
              <div className="price">
                {fmtMXN(p.price)}
                <span className="mxn">MXN{p.operation === "renta" ? " / mes" : ""}</span>
              </div>
              {p.operation === "venta" && <div style={{fontSize:12, color:"var(--ink-mute)", marginTop:4, fontFamily:"var(--mono)"}}>
                ≈ {fmtMXN(Math.round(p.price / p.m2))} / m²
              </div>}

              <div className="agent">
                <div className="avatar">{p.agent.initials}</div>
                <div style={{flex:1, minWidth:0}}>
                  <div style={{fontWeight:500, fontSize:14}}>{p.agent.name}</div>
                  <div style={{fontSize:12, color:"var(--ink-soft)", marginTop:2}}>{p.agent.role}</div>
                  <div style={{fontSize:11, color:"var(--ink-mute)", marginTop:4, fontFamily:"var(--mono)"}}>
                    <span style={{color:"var(--orange)"}}>★</span> {p.agent.rating} · {p.agent.reviews} reseñas
                  </div>
                </div>
              </div>

              <textarea rows={3} value={msg} onChange={e => setMsg(e.target.value)}
                style={{width:"100%", padding:"12px 14px", border:"1px solid var(--line)", borderRadius:"var(--radius)", background:"var(--bg)", fontSize:13, fontFamily:"inherit", resize:"none"}}/>

              <div style={{display:"flex", flexDirection:"column", gap:8, marginTop:12}}>
                <button className="btn btn-primary"><Icon name="message" size={14}/> Enviar mensaje</button>
                <button className="btn btn-ghost"><Icon name="phone" size={14}/> Llamar al agente</button>
                <button className="btn btn-ghost"><Icon name="camera" size={14}/> Agendar visita</button>
              </div>

              {p.operation === "venta" && (
                <div className="mortgage">
                  <div style={{display:"flex", justifyContent:"space-between", alignItems:"center", marginBottom:12}}>
                    <div style={{fontFamily:"var(--serif)", fontSize:20}}>Crédito hipotecario</div>
                    <span className="pill">Est.</span>
                  </div>

                  <div className="range-row">
                    <span>Enganche</span>
                    <span className="v">{downPct}% · {fmtMXN(downPayment, true)}</span>
                  </div>
                  <input type="range" min="10" max="50" value={downPct} onChange={e => setDownPct(+e.target.value)} className="mxn-slider"/>

                  <div className="range-row" style={{marginTop:14}}>
                    <span>Plazo</span>
                    <span className="v">{years} años</span>
                  </div>
                  <input type="range" min="5" max="30" step="5" value={years} onChange={e => setYears(+e.target.value)} className="mxn-slider"/>

                  <div style={{marginTop:20, padding:"16px", background:"var(--orange-wash)", borderRadius:"var(--radius)"}}>
                    <div style={{fontFamily:"var(--mono)", fontSize:10, letterSpacing:"0.1em", color:"var(--ink-soft)", textTransform:"uppercase", marginBottom:6}}>Mensualidad estimada</div>
                    <div style={{fontFamily:"var(--mono)", fontSize:26, fontWeight:600, color:"var(--orange)"}}>
                      {fmtMXN(monthly)}<span style={{fontSize:12, color:"var(--ink-soft)", marginLeft:4}}>/ mes</span>
                    </div>
                    <div style={{fontSize:11, color:"var(--ink-mute)", marginTop:4}}>Tasa 11.25% anual · referencia</div>
                  </div>
                </div>
              )}
            </div>
          </aside>
        </div>
      </div>
    </div>
  );
}
