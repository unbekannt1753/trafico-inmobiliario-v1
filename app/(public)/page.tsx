"use client";
import React, { useState } from 'react';
import { useRouter } from 'next/navigation';
import Link from 'next/link';
import { useAppContext } from '@/src/context/AppContext';
import { CITIES, fmtMXN } from '@/src/data';
import { services } from '@/src/services/factory';
import Icon from '@/src/components/Icon';
import ArchPlaceholder from '@/src/components/ArchPlaceholder';
import PropertyCard from '@/src/components/PropertyCard';
import { Property } from '@/src/types/property';

type SearchOp = "venta" | "renta" | "preventa" | "vender";
type OpenPanel = 'where' | 'type' | 'price' | null;

export default function Home() {
  const router = useRouter();
  const { favs, toggleFav } = useAppContext();
  
  const [op, setOp] = useState<SearchOp>("venta");
  const [city, setCity] = useState("CDMX");
  const [types, setTypes] = useState<Set<string>>(new Set(["Casa", "Departamento"]));
  const [where, setWhere] = useState("");
  const [priceMin, setPriceMin] = useState("");
  const [priceMax, setPriceMax] = useState("");
  const [openPanel, setOpenPanel] = useState<OpenPanel>(null);
  const [suggestions] = useState([
    "Roma Norte, CDMX", "Condesa, CDMX", "Polanco, CDMX", "Del Valle, CDMX", 
    "Providencia, GDL", "San Pedro, MTY", "Tulum Centro", "San Miguel de Allende"
  ]);

  const toggleType = (t: string) => {
    const n = new Set(types); 
    if (n.has(t)) n.delete(t); else n.add(t); 
    setTypes(n);
  };

  const [featured, setFeatured] = useState<Property[]>([]);
  const [forRent, setForRent] = useState<Property[]>([]);
  const [loading, setLoading] = useState(true);

  const doSearch = () => {
    const query = new URLSearchParams();
    query.set("op", op);
    if (where) query.set("where", where);
    if (types.size > 0) query.set("types", Array.from(types).join(","));
    if (priceMin) query.set("min", priceMin);
    if (priceMax) query.set("max", priceMax);
    
    router.push(`/search?${query.toString()}`);
  };

  React.useEffect(() => {
    async function loadData() {
      try {
        const all = await services.getCRM().getProperties();
        // Use column name from DB: is_featured
        setFeatured(all.filter((p: any) => p.is_featured));
        setForRent(all.filter((p: any) => p.operation === "renta"));
      } catch (e) {
        console.error("Failed to load properties", e);
      } finally {
        setLoading(false);
      }
    }
    loadData();
  }, []);

  return (
    <div className="page-fade">
      {/* Hero */}
      <section className="hero" style={{paddingTop: 24}}>
        <div className="container">
          <div style={{display:"flex", alignItems:"center", gap:10, marginBottom:20}}>
            <span className="eyebrow"><span className="dot"></span>Vol. 01 · Primavera 2026</span>
            <span style={{flex:1, height:1, background:"var(--line)"}}></span>
            <span className="mono" style={{fontSize:11, color:"var(--ink-mute)"}}>13,247 propiedades activas</span>
          </div>

          {/* Inmuebles24-style search bar at top */}
          <div className="i24-search">
            <div className="i24-tabs">
              {(["venta", "renta", "preventa", "vender"] as const).map((k) => {
                const labels: Record<string, string> = {
                  venta: "Comprar",
                  renta: "Rentar",
                  preventa: "Preventa",
                  vender: "Vender"
                };
                return (
                  <button 
                    key={k} 
                    className={"i24-tab" + (op === k ? " active" : "")} 
                    onClick={() => k === "vender" ? router.push("/publish") : setOp(k)}
                  >
                    {labels[k]}
                  </button>
                );
              })}
            </div>

            <div className="i24-fields">
              {/* Where */}
              <div className="i24-field i24-where" onClick={(e) => { e.stopPropagation(); setOpenPanel(openPanel === "where" ? null : "where"); }}>
                <Icon name="pin" size={16}/>
                <input 
                  type="text" 
                  placeholder="Ciudad, colonia o código postal" 
                  value={where} 
                  onChange={e => setWhere(e.target.value)} 
                  onFocus={() => setOpenPanel("where")} 
                  onClick={e => e.stopPropagation()}
                />
                {openPanel === "where" && (
                  <div className="i24-panel" onClick={e => e.stopPropagation()}>
                    <div className="i24-panel-label">Sugerencias</div>
                    {suggestions.filter(s => !where || s.toLowerCase().includes(where.toLowerCase())).map(s => (
                      <div key={s} className="i24-sugg" onClick={() => { setWhere(s); setOpenPanel(null); }}>
                        <Icon name="pin" size={14}/> {s}
                      </div>
                    ))}
                  </div>
                )}
              </div>

              {/* Type */}
              <div className="i24-field i24-type" onClick={(e) => { e.stopPropagation(); setOpenPanel(openPanel === "type" ? null : "type"); }}>
                <div className="i24-field-label">Tipo</div>
                <div className="i24-field-val">{types.size === 0 ? "Todos" : Array.from(types).slice(0,2).join(", ") + (types.size > 2 ? ` +${types.size - 2}` : "")}</div>
                <Icon name="chevron-down" size={14}/>
                {openPanel === "type" && (
                  <div className="i24-panel" onClick={e => e.stopPropagation()}>
                    <div className="i24-panel-label">Tipo de propiedad</div>
                    {["Casa", "Departamento", "Terreno", "Local", "Oficina", "Bodega", "Casa de campo"].map(t => (
                      <label key={t} className="i24-check">
                        <input type="checkbox" checked={types.has(t)} onChange={() => toggleType(t)}/>
                        <span>{t}</span>
                      </label>
                    ))}
                  </div>
                )}
              </div>

              {/* Price */}
              <div className="i24-field i24-price" onClick={(e) => { e.stopPropagation(); setOpenPanel(openPanel === "price" ? null : "price"); }}>
                <div className="i24-field-label">Precio</div>
                <div className="i24-field-val">
                  {priceMin || priceMax ? `${priceMin ? fmtMXN(+priceMin, true) : "0"} – ${priceMax ? fmtMXN(+priceMax, true) : "∞"}` : "Cualquier precio"}
                </div>
                <Icon name="chevron-down" size={14}/>
                {openPanel === "price" && (
                  <div className="i24-panel" onClick={e => e.stopPropagation()}>
                    <div className="i24-panel-label">Precio en MXN</div>
                    <div className="price-range">
                      <input placeholder="Mínimo" value={priceMin} onChange={e => setPriceMin(e.target.value.replace(/\D/g,""))}/>
                      <input placeholder="Máximo" value={priceMax} onChange={e => setPriceMax(e.target.value.replace(/\D/g,""))}/>
                    </div>
                    <div className="filter-chips" style={{marginTop:10}}>
                      {[["Hasta 3M", "", "3000000"], ["3–8M", "3000000", "8000000"], ["8–15M", "8000000", "15000000"], ["15M+", "15000000", ""]].map(([l, lo, hi]) => (
                        <button key={l} className="filter-chip" onClick={() => { setPriceMin(lo); setPriceMax(hi); }}>{l}</button>
                      ))}
                    </div>
                  </div>
                )}
              </div>

              <button className="i24-go" onClick={doSearch}>
                <Icon name="search" size={18}/> <span>Buscar</span>
              </button>
            </div>

            <div className="i24-quick">
              <span className="i24-quick-lbl">Populares:</span>
              {["Roma Norte", "Polanco", "Condesa", "Tulum", "San Pedro MTY"].map(q => (
                <button key={q} className="i24-quick-chip" onClick={() => { setWhere(q); doSearch(); }}>{q}</button>
              ))}
            </div>

            {openPanel && <div className="i24-scrim" onClick={() => setOpenPanel(null)}/>}
          </div>

          <div className="hero-grid" style={{marginTop: 48}}>
            <div>
              <h1 className="display">
                Casa,<br/>
                departamento,<br/>
                <span className="it">un nuevo</span><br/>
                comienzo.
              </h1>
              <div className="hero-meta">
                <div className="hero-meta-item">
                  <div className="num">13.2K</div>
                  <div className="lbl">Propiedades</div>
                </div>
                <div className="hero-meta-item">
                  <div className="num">248</div>
                  <div className="lbl">Agentes AMPI</div>
                </div>
                <div className="hero-meta-item">
                  <div className="num">32</div>
                  <div className="lbl">Ciudades</div>
                </div>
                <div className="hero-meta-item">
                  <div className="num">4.8<span style={{color:"var(--orange)"}}>★</span></div>
                  <div className="lbl">Calificación</div>
                </div>
              </div>
            </div>

            <div className="hero-right">
              <p className="hero-caption">
                Marketplace mexicano para comprar, vender o rentar inmuebles. Sin letra chiquita, con agentes verificados y precios en pesos mexicanos.
              </p>
              <div className="hero-pins">
                {["CDMX", "Guadalajara", "Monterrey", "Tulum", "San Miguel", "Mérida", "Puerto Vallarta"].map(c => (
                  <span key={c} className={"city-chip" + (city === c ? " active" : "")} onClick={() => setCity(c)}>
                    {c}
                  </span>
                ))}
              </div>

              <div style={{aspectRatio:"4/3", borderRadius:"var(--radius-lg)", overflow:"hidden", marginTop:8}}>
                <ArchPlaceholder palette={["#C4572E", "#E8C28C", "#1A1A1A", "#F2EFE6"]} seed={1} />
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Featured properties */}
      <section className="section">
        <div className="container">
          <div className="section-head">
            <div>
              <div className="eyebrow" style={{marginBottom:16}}><span className="dot"></span>Seleccionadas por editores</div>
              <h2>Destacadas <span className="it">de la semana</span></h2>
            </div>
            <p>Un vistazo curado a las propiedades más interesantes que entraron al catálogo esta semana.</p>
          </div>
          <div className="grid-4">
            {featured.map((p, i) => (
              <PropertyCard 
                key={p.id} 
                p={p} 
                onOpen={(pr) => router.push(`/property/${pr.id}`)} 
                favs={favs} 
                toggleFav={toggleFav} 
                seed={i} 
              />
            ))}
          </div>
        </div>
      </section>

      {/* Orange slab — publish CTA */}
      <section style={{padding: "20px 0"}}>
        <div className="container">
          <div className="orange-slab">
            <div className="stamp">Para propietarios · 001</div>
            <h2>
              ¿Tienes algo<br/>
              que <span className="it">mover?</span>
            </h2>
            <p style={{maxWidth: 620, fontSize:17, lineHeight:1.55, marginBottom:32, color:"rgba(250,250,247,.85)"}}>
              Publica tu casa, depa, terreno o local en menos de 10 minutos. Sin comisión de alta, con tour 360°, fotos profesionales y agente asignado opcional.
            </p>
            <div className="cta-row">
              <Link href="/publish" className="btn btn-dark btn-lg">
                Publicar mi propiedad <Icon name="arrow-right" size={16} />
              </Link>
              <button className="btn btn-outline btn-lg">
                Cómo funciona
              </button>
            </div>

            <div style={{display:"grid", gridTemplateColumns:"repeat(3,1fr)", gap:32, marginTop:80, paddingTop:40, borderTop:"1px solid rgba(255,255,255,.25)"}}>
              <div>
                <div style={{fontFamily:"var(--serif)", fontSize:48, lineHeight:1}}>01</div>
                <div style={{marginTop:12, fontSize:15, lineHeight:1.5, maxWidth:240}}>Registra tu propiedad con fotos y datos básicos.</div>
              </div>
              <div>
                <div style={{fontFamily:"var(--serif)", fontSize:48, lineHeight:1}}>02</div>
                <div style={{marginTop:12, fontSize:15, lineHeight:1.5, maxWidth:240}}>Verificamos y mejoramos tu anuncio sin costo.</div>
              </div>
              <div>
                <div style={{fontFamily:"var(--serif)", fontSize:48, lineHeight:1}}>03</div>
                <div style={{marginTop:12, fontSize:15, lineHeight:1.5, maxWidth:240}}>Recibe ofertas verificadas y cierra en confianza.</div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Cities */}
      <section className="section">
        <div className="container">
          <div className="section-head">
            <div>
              <div className="eyebrow" style={{marginBottom:16}}><span className="dot"></span>Rutas del país</div>
              <h2>Tráfico <span className="it">por ciudad</span></h2>
            </div>
            <p>Dónde se mueven las propiedades en México esta temporada. Datos actualizados diariamente.</p>
          </div>

          <div style={{display:"grid", gridTemplateColumns:"repeat(5, 1fr)", gap:1, background:"var(--line)", border:"1px solid var(--line)", borderRadius:"var(--radius-lg)", overflow:"hidden"}}>
            {CITIES.map((c, i) => (
              <div 
                key={c.short} 
                style={{background:"var(--bg-elev)", padding:"32px 24px", cursor:"pointer", position:"relative", minHeight:180}}
                onClick={() => router.push(`/search?city=${c.short}`)}
              >
                {c.hot && <span style={{position:"absolute", top:16, right:16, fontFamily:"var(--mono)", fontSize:9, letterSpacing:"0.12em", color:"var(--orange)", textTransform:"uppercase"}}>● Hot</span>}
                <div style={{fontFamily:"var(--mono)", fontSize:11, color:"var(--ink-mute)", letterSpacing:"0.12em"}}>MX-{String(i+1).padStart(2,"0")}</div>
                <div style={{fontFamily:"var(--serif)", fontSize:28, lineHeight:1.05, marginTop:28, letterSpacing:"-0.01em"}}>{c.name}</div>
                <div style={{fontFamily:"var(--mono)", fontSize:12, color:"var(--ink-soft)", marginTop:12}}>{c.count.toLocaleString("es-MX")} propiedades</div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Editorial — big quote */}
      <section className="section" style={{background:"var(--ink)", color:"var(--bg)", padding:"120px 0"}}>
        <div className="container">
          <div style={{display:"grid", gridTemplateColumns:"1fr 1fr", gap:80, alignItems:"center"}}>
            <div>
              <div className="eyebrow" style={{color:"var(--orange)", marginBottom:24}}><span className="dot" style={{background:"var(--orange)"}}></span>Manifiesto</div>
              <div style={{fontFamily:"var(--serif)", fontSize:"clamp(40px, 5vw, 72px)", lineHeight:1.05, letterSpacing:"-0.02em"}}>
                Una casa <span style={{color:"var(--orange)", fontStyle:"italic"}}>no es</span> un producto. Es un punto de llegada.
              </div>
              <div style={{marginTop:40, fontSize:16, color:"rgba(250,250,247,.7)", maxWidth:440, lineHeight:1.6}}>
                Por eso diseñamos Tráfico: menos trucos, más claridad. Catastro verificado, precios en pesos, fotos sin filtros engañosos y agentes con cédula visible.
              </div>
            </div>
            <div>
              <div style={{aspectRatio:"4/5", borderRadius:"var(--radius-lg)", overflow:"hidden"}}>
                <ArchPlaceholder palette={["#C21927", "#E8C28C", "#0A0A0A"]} seed={2} />
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Rent carousel */}
      <section className="section">
        <div className="container">
          <div className="section-head">
            <div>
              <div className="eyebrow" style={{marginBottom:16}}><span className="dot"></span>Renta mensual</div>
              <h2>Listas <span className="it">para mudarse</span></h2>
            </div>
            <p>Departamentos y casas en renta con disponibilidad inmediata. Precio en pesos, sin sorpresas.</p>
          </div>
          <div className="grid-4">
            {forRent.map((p, i) => (
              <PropertyCard 
                key={p.id} 
                p={p} 
                onOpen={(pr) => router.push(`/property/${pr.id}`)} 
                favs={favs} 
                toggleFav={toggleFav} 
                seed={i + 2} 
              />
            ))}
          </div>
        </div>
      </section>

      {/* Trust strip */}
      <section style={{padding:"40px 0", borderTop:"1px solid var(--line)", borderBottom:"1px solid var(--line)"}}>
        <div className="container">
          <div style={{display:"grid", gridTemplateColumns:"repeat(4, 1fr)", gap:32}}>
            {[
              ["Cédula pública", "Cada agente con cédula AMPI visible en su perfil."],
              ["Precio en MXN", "Sin dólares ni tipos de cambio confusos."],
              ["Visita verificada", "Agendamos con fotografía de la cita."],
              ["Asesor hipotecario", "Calculadora con bancos mexicanos reales."],
            ].map(([t, d]) => (
              <div key={t}>
                <div style={{fontFamily:"var(--mono)", fontSize:10, letterSpacing:"0.12em", textTransform:"uppercase", color:"var(--orange)", marginBottom:10}}>● Garantía</div>
                <div style={{fontFamily:"var(--serif)", fontSize:22, lineHeight:1.1, marginBottom:8}}>{t}</div>
                <div style={{fontSize:13, color:"var(--ink-soft)", lineHeight:1.5}}>{d}</div>
              </div>
            ))}
          </div>
        </div>
      </section>
    </div>
  );
}
