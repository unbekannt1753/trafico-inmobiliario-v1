"use client";
import React, { useState, useMemo, useEffect, Suspense } from 'react';
import { useRouter, useSearchParams } from 'next/navigation';
import { useAppContext } from '@/src/context/AppContext';
import { fmtMXN } from '@/src/data';
import { services } from '@/src/services/factory';
import Icon from '@/src/components/Icon';
import PropertyCard from '@/src/components/PropertyCard';
import ArchPlaceholder from '@/src/components/ArchPlaceholder';
import { Property } from '@/src/types/property';

function SearchContent() {
  const router = useRouter();
  const searchParams = useSearchParams();
  const { favs, toggleFav } = useAppContext();

  // Initial state from URL
  const [op, setOp] = useState(searchParams.get("op") || "venta");
  const [types, setTypes] = useState<Set<string>>(new Set(searchParams.get("types") ? searchParams.get("types")!.split(",") : []));
  const [cities, setCities] = useState<Set<string>>(new Set(searchParams.get("city") ? [searchParams.get("city")!] : []));
  const [priceMin, setPriceMin] = useState(searchParams.get("min") || "");
  const [priceMax, setPriceMax] = useState(searchParams.get("max") || "");
  const [beds, setBeds] = useState(Number(searchParams.get("beds")) || 0);
  const [baths, setBaths] = useState(Number(searchParams.get("baths")) || 0);
  
  const [view, setView] = useState<"grid" | "map">("grid");
  const [sort, setSort] = useState("relevance");
  const [hoverPin, setHoverPin] = useState<string | null>(null);

  const [allProperties, setAllProperties] = useState<Property[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    async function load() {
      try {
        const data = await services.getCRM().getProperties();
        setAllProperties(data);
      } catch (e) {
        console.error(e);
      } finally {
        setLoading(false);
      }
    }
    load();
  }, []);

  // Sync URL with state
  useEffect(() => {
    const query = new URLSearchParams();
    if (op !== "venta") query.set("op", op);
    if (types.size) query.set("types", Array.from(types).join(","));
    if (cities.size) query.set("city", Array.from(cities).join(","));
    if (priceMin) query.set("min", priceMin);
    if (priceMax) query.set("max", priceMax);
    if (beds) query.set("beds", beds.toString());
    if (baths) query.set("baths", baths.toString());
    
    const queryString = query.toString();
    const url = `/search${queryString ? `?${queryString}` : ""}`;
    window.history.replaceState(null, "", url);
  }, [op, types, cities, priceMin, priceMax, beds, baths]);

  const filtered = useMemo(() => {
    return allProperties.filter(p => {
      if (op !== "all" && p.operation !== op) return false;
      if (types.size && !types.has(p.type)) return false;
      if (cities.size && !cities.has(p.city)) return false;
      if (priceMin && p.price < Number(priceMin)) return false;
      if (priceMax && p.price > Number(priceMax)) return false;
      if (beds && p.beds < beds) return false;
      if (baths && p.baths < baths) return false;
      return true;
    }).sort((a, b) => {
      if (sort === "price-asc") return a.price - b.price;
      if (sort === "price-desc") return b.price - a.price;
      if (sort === "new") return (b.year || 0) - (a.year || 0);
      return (b.featured ? 1 : 0) - (a.featured ? 1 : 0);
    });
  }, [op, types, cities, priceMin, priceMax, beds, baths, sort]);

  const toggleSet = (s: Set<string>, setS: React.Dispatch<React.SetStateAction<Set<string>>>, v: string) => {
    const n = new Set(s);
    if (n.has(v)) n.delete(v); else n.add(v);
    setS(n);
  };

  return (
    <div className="page-fade">
      <div className="search-layout">
        <aside className="filters-panel">
          <div style={{display:"flex", alignItems:"center", justifyContent:"space-between", marginBottom:8}}>
            <div style={{fontFamily:"var(--serif)", fontSize:24}}>Filtros</div>
            <button className="mono" style={{fontSize:11, color:"var(--ink-soft)"}} onClick={() => {
              setTypes(new Set()); setCities(new Set()); setPriceMin(""); setPriceMax(""); setBeds(0); setBaths(0);
            }}>Limpiar</button>
          </div>

          <div className="filter-block">
            <h4>Operación</h4>
            <div className="filter-chips">
              {[["venta", "Comprar"], ["renta", "Rentar"], ["preventa", "Preventa"]].map(([k, l]) => (
                <button key={k} className={"filter-chip orange" + (op === k ? " active" : "")} onClick={() => setOp(k)}>{l}</button>
              ))}
            </div>
          </div>

          <div className="filter-block">
            <h4>Tipo de propiedad <span className="ct">{types.size || "Todos"}</span></h4>
            <div className="filter-chips">
              {["Casa", "Departamento", "Terreno", "Local", "Oficina"].map(t => (
                <button key={t} className={"filter-chip" + (types.has(t) ? " active" : "")} onClick={() => toggleSet(types, setTypes, t)}>{t}</button>
              ))}
            </div>
          </div>

          <div className="filter-block">
            <h4>Ciudad</h4>
            <div className="filter-chips">
              {["CDMX", "GDL", "Monterrey", "Tulum", "Playa", "San Miguel", "Valle de Bravo"].map(c => (
                <button key={c} className={"filter-chip" + (cities.has(c) ? " active" : "")} onClick={() => toggleSet(cities, setCities, c)}>{c}</button>
              ))}
            </div>
          </div>

          <div className="filter-block">
            <h4>Precio (MXN)</h4>
            <div className="price-range">
              <input placeholder="Min" value={priceMin} onChange={e => setPriceMin(e.target.value.replace(/\D/g,""))}/>
              <input placeholder="Max" value={priceMax} onChange={e => setPriceMax(e.target.value.replace(/\D/g,""))}/>
            </div>
            <div className="filter-chips" style={{marginTop:10}}>
              {[["< 5M", "0", "5000000"], ["5–10M", "5000000", "10000000"], ["10–20M", "10000000", "20000000"], ["20M+", "20000000", ""]].map(([l, lo, hi]) => (
                <button key={l} className="filter-chip" onClick={() => { setPriceMin(lo); setPriceMax(hi); }}>{l}</button>
              ))}
            </div>
          </div>

          <div className="filter-block">
            <h4>Recámaras</h4>
            <div className="filter-chips">
              {[0,1,2,3,4].map(n => (
                <button key={n} className={"filter-chip" + (beds === n ? " active" : "")} onClick={() => setBeds(n)}>
                  {n === 0 ? "Todas" : n + "+"}
                </button>
              ))}
            </div>
          </div>

          <div className="filter-block">
            <h4>Baños</h4>
            <div className="filter-chips">
              {[0,1,2,3].map(n => (
                <button key={n} className={"filter-chip" + (baths === n ? " active" : "")} onClick={() => setBaths(n)}>
                  {n === 0 ? "Todos" : n + "+"}
                </button>
              ))}
            </div>
          </div>

          <div className="filter-block">
            <h4>Amenidades</h4>
            <div className="filter-chips">
              {["Alberca", "Gimnasio", "Pet friendly", "Roof garden", "Amueblado", "Seguridad 24/7", "Vista al mar"].map(a => (
                <button key={a} className="filter-chip">{a}</button>
              ))}
            </div>
          </div>
        </aside>

        <main className="search-main">
          <div className="search-head">
            <div>
              <h1>
                {op === "venta" ? <>Casas y deptos <span className="it">en venta</span></> :
                 op === "renta" ? <>En <span className="it">renta</span> por México</> :
                 <>En <span className="it">preventa</span></>}
              </h1>
              <div className="count">{filtered.length} resultados · actualizados hoy</div>
            </div>
            <div style={{display:"flex", alignItems:"center", gap:12}}>
              <select value={sort} onChange={e => setSort(e.target.value)} style={{padding:"8px 12px", border:"1px solid var(--line)", borderRadius:999, background:"var(--bg-elev)", fontSize:13}}>
                <option value="relevance">Relevancia</option>
                <option value="price-asc">Precio: menor a mayor</option>
                <option value="price-desc">Precio: mayor a menor</option>
                <option value="new">Más nuevos</option>
              </select>
              <div className="view-toggle">
                <button className={view === "grid" ? "active" : ""} onClick={() => setView("grid")}><Icon name="grid" size={12}/> Grid</button>
                <button className={view === "map" ? "active" : ""} onClick={() => setView("map")}><Icon name="map" size={12}/> Mapa</button>
              </div>
            </div>
          </div>

          {loading ? (
            <div style={{padding: 60, textAlign: "center", width: "100%"}}>
              <div className="pulse" style={{width:40, height:40, background:"var(--orange)", borderRadius:"50%", margin:"0 auto 20px"}}></div>
              <p className="serif">Buscando propiedades...</p>
            </div>
          ) : view === "grid" ? (
            <div className="results-grid">
              {filtered.map((p, i) => (
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
          ) : (
            <div className="map-view">
              <div className="map-canvas">
                <svg viewBox="0 0 800 600" preserveAspectRatio="xMidYMid slice" style={{width:"100%", height:"100%", position:"absolute"}}>
                  <rect width={800} height={600} fill="#F2EFE6"/>
                  {Array.from({length: 24}).map((_, i) => (
                    <line key={"h"+i} x1="0" y1={25 * i} x2="800" y2={25*i} stroke="#E6E4DC" strokeWidth="1"/>
                  ))}
                  {Array.from({length: 32}).map((_, i) => (
                    <line key={"v"+i} x1={25*i} y1="0" x2={25*i} y2="600" stroke="#E6E4DC" strokeWidth="1"/>
                  ))}
                  <circle cx={280} cy={280} r={80} fill="#D4DCC8"/>
                  <rect x={480} y={180} width={120} height={80} fill="#D4DCC8"/>
                  <path d="M 0 300 Q 200 260, 400 320 T 800 300" stroke="#FFC8AA" strokeWidth="8" fill="none"/>
                  <path d="M 400 0 Q 380 300, 420 600" stroke="#FFC8AA" strokeWidth="8" fill="none"/>
                  <text x="270" y="286" fontFamily="monospace" fontSize="11" fill="#8A8A82">Parque México</text>
                  <text x="490" y="224" fontFamily="monospace" fontSize="11" fill="#8A8A82">Chapultepec</text>
                </svg>
                {filtered.map((p, i) => {
                  const x = 120 + (i * 83) % 560;
                  const y = 100 + ((i * 127) % 380);
                  return (
                    <div key={p.id} className={"map-pin" + (hoverPin === p.id ? " active" : "")}
                      style={{left: `${x/800*100}%`, top: `${y/600*100}%`}}
                      onMouseEnter={() => setHoverPin(p.id)}
                      onClick={() => router.push(`/property/${p.id}`)}>
                      <div className="bubble">{fmtMXN(p.price, true)}</div>
                      <div className="tail"></div>
                    </div>
                  );
                })}
              </div>
              <div className="map-side">
                {filtered.map(p => (
                  <div key={p.id} className={"map-card" + (hoverPin === p.id ? " active" : "")}
                    onMouseEnter={() => setHoverPin(p.id)}
                    onClick={() => router.push(`/property/${p.id}`)}>
                    <div className="thumb"><ArchPlaceholder palette={p.palette} seed={0}/></div>
                    <div className="info">
                      <div className="p">{fmtMXN(p.price, true)} <span style={{fontSize:10, color:"var(--ink-mute)"}}>MXN</span></div>
                      <div className="t">{p.title}</div>
                      <div className="s">{p.beds > 0 ? `${p.beds} rec · ${p.baths} baños · ` : ""}{p.m2} m²</div>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          )}
        </main>
      </div>
    </div>
  );
}

export default function Search() {
  return (
    <Suspense fallback={<div className="container" style={{padding: "100px 0", textAlign: "center"}}>Cargando búsqueda...</div>}>
      <SearchContent />
    </Suspense>
  );
}
