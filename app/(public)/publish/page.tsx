"use client";
import React, { useState } from 'react';
import { useRouter } from 'next/navigation';
import Icon, { IconName } from '@/src/components/Icon';
import ArchPlaceholder from '@/src/components/ArchPlaceholder';

interface FormState {
  title: string;
  price: string;
  address: string;
  colonia: string;
  city: string;
  beds: number;
  baths: number;
  parking: number;
  m2: number;
  terreno: number;
  year: number;
  desc: string;
}

export default function Publish() {
  const router = useRouter();
  const [step, setStep] = useState(0);
  const [operation, setOperation] = useState("venta");
  const [type, setType] = useState("casa");
  const [photos, setPhotos] = useState<number[]>([0, 1, 2]);
  const [form, setForm] = useState<FormState>({
    title: "",
    price: "",
    address: "",
    colonia: "",
    city: "CDMX",
    beds: 2,
    baths: 2,
    parking: 1,
    m2: 120,
    terreno: 150,
    year: 2020,
    desc: ""
  });
  
  const update = (k: keyof FormState, v: string | number) => setForm(f => ({ ...f, [k]: v }));

  const steps = [
    { n: "01", t: "Operación" },
    { n: "02", t: "Tipo" },
    { n: "03", t: "Ubicación" },
    { n: "04", t: "Características" },
    { n: "05", t: "Fotos" },
    { n: "06", t: "Precio" },
    { n: "07", t: "Publicar" }
  ];

  const next = () => setStep(s => Math.min(s + 1, steps.length - 1));
  const prev = () => setStep(s => Math.max(s - 1, 0));

  return (
    <div className="page-fade">
      <div className="publish-wrap">
        <div className="eyebrow" style={{marginBottom:16}}><span className="dot"></span>Publicar propiedad · Gratis</div>
        <h1 className="display" style={{fontSize:"clamp(44px, 6vw, 88px)", margin:"0 0 16px"}}>
          Pon tu inmueble <span style={{color:"var(--orange)", fontStyle:"italic"}}>en tráfico.</span>
        </h1>
        <p style={{fontSize:17, color:"var(--ink-soft)", maxWidth:560, lineHeight:1.55, marginBottom:48}}>
          Siete pasos cortos. Te damos fotografía profesional, verificación y difusión. Solo cobramos si cierras.
        </p>

        <div className="steps">
          {steps.map((s, i) => (
            <div key={s.n} className={"step" + (i < step ? " done" : "") + (i === step ? " active" : "")} onClick={() => setStep(i)}>
              <span className="n">{s.n}</span>
              <span className="t">{s.t}</span>
            </div>
          ))}
        </div>

        <div style={{background:"var(--bg-elev)", border:"1px solid var(--line)", borderRadius:"var(--radius-xl)", padding:40}}>
          {step === 0 && (
            <>
              <div style={{marginBottom:24}}>
                <div style={{fontFamily:"var(--serif)", fontSize:36, letterSpacing:"-0.02em", marginBottom:8}}>¿Qué quieres hacer?</div>
                <div style={{color:"var(--ink-soft)"}}>Elige el tipo de operación.</div>
              </div>
              <div className="op-grid">
                {([
                  ["venta", "Vender", "Encuentra comprador para tu propiedad."],
                  ["renta", "Rentar", "Inquilinos verificados, contrato digital."],
                  ["traspaso", "Traspasar", "Para locales, derechos y preventa."]
                ] as const).map(([k, t, d]) => (
                  <div key={k} className={"op-card" + (operation === k ? " active" : "")} onClick={() => setOperation(k)}>
                    <div className="t">{t}</div>
                    <div className="d">{d}</div>
                  </div>
                ))}
              </div>
            </>
          )}

          {step === 1 && (
            <>
              <div style={{marginBottom:24}}>
                <div style={{fontFamily:"var(--serif)", fontSize:36, letterSpacing:"-0.02em", marginBottom:8}}>Tipo de propiedad</div>
                <div style={{color:"var(--ink-soft)"}}>¿Qué vas a publicar?</div>
              </div>
              <div className="type-grid">
                {([
                  ["casa", "Casa", "home"],
                  ["depa", "Departamento", "building"],
                  ["terreno", "Terreno", "area"],
                  ["local", "Local", "shop"],
                  ["oficina", "Oficina", "building"],
                  ["bodega", "Bodega", "building"],
                  ["edificio", "Edificio", "building"],
                  ["casa-campo", "Casa de campo", "home"],
                ] as const).map(([k, n, ic]) => (
                  <div key={k} className={"type-card" + (type === k ? " active" : "")} onClick={() => setType(k)}>
                    <div className="ic" style={{color:type===k?"var(--orange)":"var(--ink)"}}><Icon name={ic as IconName} size={28}/></div>
                    <div className="n">{n}</div>
                  </div>
                ))}
              </div>
            </>
          )}

          {step === 2 && (
            <>
              <div style={{marginBottom:24}}>
                <div style={{fontFamily:"var(--serif)", fontSize:36, letterSpacing:"-0.02em", marginBottom:8}}>Ubicación</div>
                <div style={{color:"var(--ink-soft)"}}>Los clientes buscan por colonia y ciudad.</div>
              </div>
              <div className="form-group">
                <label>Ciudad</label>
                <div className="filter-chips">
                  {["CDMX", "GDL", "Monterrey", "Querétaro", "Mérida", "Tulum", "Playa del Carmen", "Puerto Vallarta", "San Miguel"].map(c => (
                    <button key={c} className={"filter-chip" + (form.city === c ? " active" : "")} onClick={() => update("city", c)}>{c}</button>
                  ))}
                </div>
              </div>
              <div className="form-row">
                <div className="form-group">
                  <label>Colonia</label>
                  <input type="text" placeholder="Ej. Roma Norte" value={form.colonia} onChange={e => update("colonia", e.target.value)}/>
                </div>
                <div className="form-group">
                  <label>Código Postal</label>
                  <input type="text" placeholder="06700" />
                </div>
              </div>
              <div className="form-group">
                <label>Calle y número</label>
                <input type="text" placeholder="Álvaro Obregón 214, interior 3" value={form.address} onChange={e => update("address", e.target.value)}/>
                <div className="help">La dirección exacta no se mostrará pública hasta el cierre.</div>
              </div>
              <div style={{aspectRatio:"2/1", borderRadius:"var(--radius-lg)", overflow:"hidden", border:"1px solid var(--line)", marginTop:16}}>
                <svg viewBox="0 0 800 400" preserveAspectRatio="xMidYMid slice" style={{width:"100%", height:"100%"}}>
                  <rect width="800" height="400" fill="#F2EFE6"/>
                  {Array.from({length:16}).map((_,i) => <line key={"h"+i} x1="0" y1={25*i} x2="800" y2={25*i} stroke="#E6E4DC"/>)}
                  {Array.from({length:32}).map((_,i) => <line key={"v"+i} x1={25*i} y1="0" x2={25*i} y2="400" stroke="#E6E4DC"/>)}
                  <circle cx="400" cy="200" r="50" fill="#D4DCC8"/>
                  <circle cx="400" cy="200" r="14" fill="#C21927"/>
                  <circle cx="400" cy="200" r="6" fill="white"/>
                </svg>
              </div>
            </>
          )}

          {step === 3 && (
            <>
              <div style={{marginBottom:24}}>
                <div style={{fontFamily:"var(--serif)", fontSize:36, letterSpacing:"-0.02em", marginBottom:8}}>Características</div>
                <div style={{color:"var(--ink-soft)"}}>Los números que buscan los compradores.</div>
              </div>
              <div className="form-row-3">
                <div className="form-group">
                  <label>Recámaras</label>
                  <div className="filter-chips">
                    {[1,2,3,4,5].map(n => (
                      <button key={n} className={"filter-chip" + (form.beds === n ? " active" : "")} onClick={() => update("beds", n)}>{n}{n===5?"+":""}</button>
                    ))}
                  </div>
                </div>
                <div className="form-group">
                  <label>Baños</label>
                  <div className="filter-chips">
                    {[1,1.5,2,2.5,3,4].map(n => (
                      <button key={n} className={"filter-chip" + (form.baths === n ? " active" : "")} onClick={() => update("baths", n)}>{n}</button>
                    ))}
                  </div>
                </div>
                <div className="form-group">
                  <label>Estacionamientos</label>
                  <div className="filter-chips">
                    {[0,1,2,3,4].map(n => (
                      <button key={n} className={"filter-chip" + (form.parking === n ? " active" : "")} onClick={() => update("parking", n)}>{n}</button>
                    ))}
                  </div>
                </div>
              </div>
              <div className="form-row">
                <div className="form-group">
                  <label>Superficie de construcción (m²)</label>
                  <input type="number" value={form.m2} onChange={e => update("m2", +e.target.value)}/>
                </div>
                <div className="form-group">
                  <label>Terreno (m²)</label>
                  <input type="number" value={form.terreno} onChange={e => update("terreno", +e.target.value)}/>
                </div>
              </div>
              <div className="form-group">
                <label>Antigüedad</label>
                <input type="number" value={form.year} onChange={e => update("year", +e.target.value)}/>
              </div>
              <div className="form-group">
                <label>Amenidades</label>
                <div className="filter-chips">
                  {["Alberca", "Gimnasio", "Roof garden", "Jardín", "Terraza", "Pet friendly", "Seguridad 24/7", "Elevador", "Amueblado", "Calentador solar", "Cisterna"].map(a => (
                    <button key={a} className="filter-chip">{a}</button>
                  ))}
                </div>
              </div>
            </>
          )}

          {step === 4 && (
            <>
              <div style={{marginBottom:24}}>
                <div style={{fontFamily:"var(--serif)", fontSize:36, letterSpacing:"-0.02em", marginBottom:8}}>Fotos</div>
                <div style={{color:"var(--ink-soft)"}}>Mínimo 5 fotos. Ofrecemos sesión profesional gratuita.</div>
              </div>
              <div className="upload-zone">
                <Icon name="upload" size={32}/>
                <div style={{fontFamily:"var(--serif)", fontSize:22, marginTop:16}}>Arrastra tus fotos aquí</div>
                <div style={{fontSize:13, color:"var(--ink-soft)", marginTop:6}}>JPG o PNG · máximo 20MB por foto</div>
                <button className="btn btn-dark btn-sm" style={{marginTop:16}}>Seleccionar archivos</button>
              </div>
              <div className="thumbs">
                {photos.map((i, idx) => (
                  <div key={idx} className="thumb">
                    <ArchPlaceholder palette={["#C4572E", "#E8C28C", "#1A1A1A"]} seed={i}/>
                    <div className="x" onClick={() => setPhotos(photos.filter((_, j) => j !== idx))}>×</div>
                  </div>
                ))}
                <div className="thumb" style={{background:"var(--sand)", display:"grid", placeItems:"center", border:"1px dashed var(--line)", cursor:"pointer"}} onClick={() => setPhotos([...photos, photos.length])}>
                  <Icon name="plus" size={24}/>
                </div>
              </div>
              <div className="divider-label">O pide sesión profesional</div>
              <div style={{padding:20, border:"1px solid var(--line)", borderRadius:"var(--radius-lg)", display:"flex", alignItems:"center", gap:16}}>
                <div className="avatar" style={{background:"var(--ink)"}}><Icon name="camera" size={20}/></div>
                <div style={{flex:1}}>
                  <div style={{fontWeight:500}}>Fotografía profesional</div>
                  <div style={{fontSize:13, color:"var(--ink-soft)"}}>Un fotógrafo local, 25 fotos editadas, tour 360°. $0 de costo.</div>
                </div>
                <button className="btn btn-ghost btn-sm">Agendar</button>
              </div>
            </>
          )}

          {step === 5 && (
            <>
              <div style={{marginBottom:24}}>
                <div style={{fontFamily:"var(--serif)", fontSize:36, letterSpacing:"-0.02em", marginBottom:8}}>Precio y descripción</div>
                <div style={{color:"var(--ink-soft)"}}>Últimos detalles antes de publicar.</div>
              </div>
              <div className="form-group">
                <label>Título del anuncio</label>
                <input type="text" placeholder="Ej. Casa de autor en Roma Norte con roof garden" value={form.title} onChange={e => update("title", e.target.value)}/>
              </div>
              <div className="form-group">
                <label>Precio {operation === "renta" ? "mensual" : ""} en MXN</label>
                <div style={{position:"relative"}}>
                  <span style={{position:"absolute", left:16, top:14, fontFamily:"var(--mono)", color:"var(--ink-soft)"}}>$</span>
                  <input type="text" placeholder="8,950,000" value={form.price} onChange={e => update("price", e.target.value.replace(/\D/g, "").replace(/\B(?=(\d{3})+(?!\d))/g, ","))} style={{paddingLeft:28, fontFamily:"var(--mono)"}}/>
                </div>
                <div style={{marginTop:12, padding:"14px 16px", background:"var(--orange-wash)", borderRadius:"var(--radius)", fontSize:13, display:"flex", alignItems:"center", gap:10}}>
                  <Icon name="sparkle" size={16}/>
                  <span><strong>Tráfico sugiere:</strong> $8.2M – $9.3M MXN para tu zona y metros cuadrados.</span>
                </div>
              </div>
              <div className="form-group">
                <label>Descripción</label>
                <textarea placeholder="Cuéntanos de la propiedad: materiales, vista, vecindario..." value={form.desc} onChange={e => update("desc", e.target.value)}/>
                <div className="help">Tip: 200–400 palabras funciona mejor. Puedes usar nuestro asistente para redactar.</div>
                <button className="btn btn-ghost btn-sm" style={{marginTop:10}}><Icon name="sparkle" size={14}/> Redactar con IA</button>
              </div>
            </>
          )}

          {step === 6 && (
            <>
              <div style={{textAlign:"center", padding:"40px 0"}}>
                <div style={{width:80, height:80, borderRadius:"50%", background:"var(--orange)", color:"white", display:"grid", placeItems:"center", margin:"0 auto 24px"}}>
                  <Icon name="check" size={40} stroke={2}/>
                </div>
                <div style={{fontFamily:"var(--serif)", fontSize:48, letterSpacing:"-0.02em", marginBottom:12}}>
                  Listo para revisión
                </div>
                <p style={{color:"var(--ink-soft)", maxWidth:420, margin:"0 auto 32px", lineHeight:1.55}}>
                  Nuestro equipo verifica tu anuncio en 2–4 horas. Te avisamos por email y WhatsApp cuando esté en línea.
                </p>
                <div style={{maxWidth:480, margin:"0 auto", textAlign:"left", padding:24, border:"1px solid var(--line)", borderRadius:"var(--radius-lg)"}}>
                  <div style={{fontFamily:"var(--mono)", fontSize:11, letterSpacing:"0.12em", color:"var(--ink-mute)", textTransform:"uppercase", marginBottom:14}}>Resumen</div>
                  {([
                    ["Operación", operation === "venta" ? "Venta" : operation === "renta" ? "Renta" : "Traspaso"],
                    ["Tipo", type.charAt(0).toUpperCase() + type.slice(1)],
                    ["Ubicación", `${form.colonia || "—"}, ${form.city}`],
                    ["Metros cuadrados", `${form.m2} m²`],
                    ["Precio", form.price ? `$${form.price} MXN` : "—"],
                    ["Fotos", `${photos.length} archivos`]
                  ] as const).map(([k, v]) => (
                    <div key={k} style={{display:"flex", justifyContent:"space-between", padding:"10px 0", borderBottom:"1px solid var(--line-soft)", fontSize:14}}>
                      <span style={{color:"var(--ink-soft)"}}>{k}</span>
                      <span className="mono" style={{fontWeight:500}}>{v}</span>
                    </div>
                  ))}
                </div>
                <button className="btn btn-primary btn-lg" style={{marginTop:32}} onClick={() => router.push("/")}>
                  Publicar anuncio <Icon name="arrow-right" size={16}/>
                </button>
              </div>
            </>
          )}

          {step < 6 && (
            <div style={{display:"flex", justifyContent:"space-between", marginTop:40, paddingTop:24, borderTop:"1px solid var(--line-soft)"}}>
              <button className="btn btn-ghost" onClick={prev} disabled={step === 0} style={{opacity: step === 0 ? 0.4 : 1}}>
                <Icon name="arrow-left" size={14}/> Atrás
              </button>
              <div style={{fontFamily:"var(--mono)", fontSize:12, color:"var(--ink-soft)", alignSelf:"center"}}>
                Paso {step + 1} de {steps.length}
              </div>
              <button className="btn btn-primary" onClick={next}>
                Continuar <Icon name="arrow-right" size={14}/>
              </button>
            </div>
          )}
        </div>
      </div>
    </div>
  );
}
