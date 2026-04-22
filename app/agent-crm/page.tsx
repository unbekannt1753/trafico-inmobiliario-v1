"use client";
import React, { useState } from 'react';
import { useRouter } from 'next/navigation';
import { fmtMXN } from '@/src/data';
import { services } from '@/src/services/factory';
import Icon from '@/src/components/Icon';
import ArchPlaceholder from '@/src/components/ArchPlaceholder';
import { Property } from '@/src/types/property';
import ModeToggle from '@/src/components/ModeToggle';

interface AgendaItem {
  time: string;
  type: string;
  title: string;
  who: string;
  dur: string;
  color: string;
  priority: "alta" | "media" | "baja";
}

interface SmartReminder {
  type: string;
  icon: string;
  title: string;
  hint: string;
  action: string;
  urgent: boolean;
}

interface Lead {
  name: string;
  prop: string;
  stage: string;
  heat: "hot" | "warm" | "cold" | "done";
  budget: string;
  last: string;
  phone: string;
  objections: string[];
  seen: string[];
  notes: string;
  interactions: number;
}

export default function AgentCRM() {
  const router = useRouter();
  const [section, setSection] = useState("dashboard");
  const today = new Date(2026, 3, 19);
  const [selDay, setSelDay] = useState(today.getDate());
  const [selLead, setSelLead] = useState(0);

  const [myLeads, setMyLeads] = useState<Lead[]>([]);
  const [myListings, setMyListings] = useState<any[]>([]);
  const [agents, setAgents] = useState<any[]>([]);
  const [currentAgent, setCurrentAgent] = useState<any>(null);
  const [loading, setLoading] = useState(true);

  React.useEffect(() => {
    async function load() {
      try {
        const [agentsData, leadsData, propsData] = await Promise.all([
          services.getCRM().getAgents(),
          services.getCRM().getLeads(),
          services.getCRM().getProperties()
        ]);
        
        // Fallback if DB is empty
        const finalAgents = agentsData.length > 0 ? agentsData : [
          { id: '1', full_name: 'Daniela Ruiz', role: 'agent', license_id: 'AMPI 4782' },
          { id: '2', full_name: 'Carlos Méndez', role: 'agent', license_id: 'AMPI 9123' }
        ];

        setAgents(finalAgents);
        if (finalAgents.length > 0) {
          setCurrentAgent(finalAgents[0]);
        }

        const fallbackLeads: Lead[] = [
          { name: 'Javier M.', prop: 'Casa Roma Norte', stage: 'Calificación', heat: 'hot', budget: '$5.2M', last: 'hace 5 min', phone: '5512345678', objections: [], seen: [], notes: 'Interesado en crédito', interactions: 12 },
          { name: 'Sofia R.', prop: 'Depa Condesa', stage: 'Visita programada', heat: 'warm', budget: '$3.8M', last: 'hace 2h', phone: '5587654321', objections: [], seen: [], notes: 'Busca terraza', interactions: 5 }
        ];

        // Map DB leads to UI interface
        const mappedLeads: Lead[] = leadsData.length > 0 ? leadsData.map((l: any): Lead => ({
          name: String(l.full_name || 'Sin nombre'),
          prop: String(l.property?.title || "Interés general"),
          stage: String(l.status === 'new' ? 'Lead nuevo' : l.status),
          heat: (l.interest_level > 70 ? 'hot' : l.interest_level > 30 ? 'warm' : 'cold') as "hot" | "warm" | "cold" | "done",
          budget: "$---", 
          last: String(l.last_contact_at ? new Date(l.last_contact_at).toLocaleDateString() : "Nunca"),
          phone: String(l.phone || "---"),
          objections: [],
          seen: [],
          notes: String(l.notes || ""),
          interactions: 1
        })) : fallbackLeads;

        setMyLeads(mappedLeads.length > 0 ? mappedLeads : []);
        setMyListings(propsData.map((p, i) => ({
          ...p,
          views: 120 + i * 53,
          leads: 3 + i * 2,
          days: 8 + i * 12,
          leadsTrend: i % 2 === 0 ? "up" : "down"
        })));

      } catch (e) {
        console.error(e);
      } finally {
        setLoading(false);
      }
    }
    load();

    const handleModeChange = () => {
      setLoading(true);
      load();
    };

    window.addEventListener('demo-mode-changed', handleModeChange);
    return () => window.removeEventListener('demo-mode-changed', handleModeChange);
  }, []);

  // ===== 1. TÁCTICO =====
  const velocity = { avg: 2.4, best: 0.5, worst: 7, unit: "días", pct: 72 };
  const funnel = [
    { stage: "Contacto nuevo", count: 47, pct: 100, drop: null, conv: null, color: "#5A9BF0" },
    { stage: "Calificación", count: 32, pct: 68, drop: -32, conv: "68%", color: "#7BA7E8" },
    { stage: "Visita programada", count: 18, pct: 38, drop: -44, conv: "56%", color: "#E8C28C" },
    { stage: "Negociación", count: 9, pct: 19, drop: -50, conv: "50%", color: "#F06D5A" },
    { stage: "Cierre", count: 3, pct: 6, drop: -67, conv: "33%", color: "#4FB97A" },
  ];
  const hotOpps = myLeads
    .filter(l => l.heat === 'hot' || l.heat === 'warm')
    .sort((a, b) => b.interactions - a.interactions)
    .slice(0, 4)
    .map(l => ({
      name: l.name,
      act: l.notes || `Interesado en ${l.prop}`,
      score: l.heat === 'hot' ? 85 + Math.floor(Math.random() * 15) : 60 + Math.floor(Math.random() * 20),
      time: l.last === 'Nunca' ? 'Pendiente' : l.last,
      signal: "whatsapp"
    }));

  // ===== 2. RELACIONES =====
  const agenda: AgendaItem[] = [
    { time: "09:00", type: "visita", title: "Visita Casa Roma Norte", who: "Ana García", dur: "45 min", color: "#F06D5A", priority: "alta" },
    { time: "11:30", type: "llamada", title: "Seguimiento oferta", who: "Luis Ramírez", dur: "20 min", color: "#5A9BF0", priority: "alta" },
    { time: "14:00", type: "visita", title: "Tour Depa Condesa", who: "Marisol V.", dur: "60 min", color: "#F06D5A", priority: "media" },
    { time: "16:30", type: "firma", title: "Firma de contrato", who: "Pedro & Julia", dur: "90 min", color: "#4FB97A", priority: "alta" },
    { time: "18:00", type: "reunion", title: "Junta equipo semanal", who: "Oficina", dur: "30 min", color: "#E8C28C", priority: "baja" },
  ];
  const smartReminders: SmartReminder[] = [
    { type: "warning", icon: "⚠", title: "Carlos M. sin respuesta hace 52h", hint: "Envía WhatsApp con Villa Tulum", action: "Enviar ahora", urgent: true },
    { type: "info", icon: "📬", title: "Sofía López cumple años mañana", hint: "Oportunidad de reconexión", action: "Programar mensaje", urgent: false },
    { type: "hot", icon: "🔥", title: "Ana vio tu propiedad 3 veces hoy", hint: "Llámala antes del cierre del día", action: "Llamar", urgent: true },
    { type: "follow", icon: "🔄", title: "Oferta de Luis vence en 18h", hint: "Aún sin respuesta del vendedor", action: "Escalar", urgent: true },
  ];
  
  // ===== 3. MERCADO =====
  const hotInventory = [
    { title: "Casa Roma Norte", change: "precio -3%", trend: "down", rotation: 92, days: 14 },
    { title: "Depa Condesa", change: "nueva", trend: "new", rotation: 88, days: 3 },
    { title: "Villa Tulum", change: "+2 ofertas", trend: "up", rotation: 81, days: 21 },
    { title: "PH Polanco", change: "precio -5%", trend: "down", rotation: 76, days: 38 },
    { title: "Loft Juárez", change: "nueva", trend: "new", rotation: 68, days: 1 },
  ];

  const gaugeAngle = -90 + (velocity.pct / 100) * 180;

  const navItems = [
    { id: "dashboard", icon: "grid", label: "Panel" },
    { id: "tactical", icon: "sparkle", label: "Táctico" },
    { id: "agenda", icon: "check", label: "Agenda" },
    { id: "leads", icon: "user", label: "Leads & 360°" },
    { id: "market", icon: "map", label: "Mercado" },
    { id: "cma", icon: "area", label: "CMA Express" },
    { id: "listings", icon: "building", label: "Inventario" },
    { id: "kpis", icon: "star", label: "Mis KPIs" },
    { id: "messages", icon: "message", label: "Mensajes" },
  ];

  return (
    <div className="crm-shell">
      <div className="crm-bg">
        <div className="crm-bg-blob b1"></div>
        <div className="crm-bg-blob b2"></div>
        <div className="crm-bg-blob b3"></div>
        <div className="crm-bg-grid"></div>
      </div>

      <div className="crm-layout agent-v2">
        <aside className="crm-side-wide glass">
          <div className="crm-side-top">
            <div className="crm-side-logo" onClick={() => router.push("/")}>
              <svg viewBox="0 0 24 24" width="18" height="18" fill="none" stroke="currentColor" strokeWidth="2"><path d="m3 11 9-7 9 7v9a1 1 0 0 1-1 1h-5v-6h-6v6H4a1 1 0 0 1-1-1z"/></svg>
            </div>
            <div>
              <div style={{fontSize:13, fontWeight:700}}>Tráfico</div>
              <div style={{fontSize:10, color:"rgba(250,250,247,.55)", fontFamily:"var(--mono)"}}>CRM · Agente</div>
            </div>
          </div>

          <nav className="crm-side-nav-wide">
            {navItems.map(i => (
              <button key={i.id} className={"crm-nav-item" + (section === i.id ? " active" : "")} onClick={() => {
                setSection(i.id);
                const el = document.getElementById("sec-" + i.id);
                if (el) el.scrollIntoView({behavior:"smooth", block:"start"});
              }}>
                <Icon name={i.icon} size={16}/>
                <span>{i.label}</span>
              </button>
            ))}
          </nav>

          <div className="crm-side-me">
            <div className="crm-avatar">{currentAgent?.full_name?.split(' ').map((n: string) => n[0]).join('') || 'A'}</div>
            <div style={{flex:1, minWidth:0}}>
              <div style={{fontSize:12, fontWeight:600, whiteSpace:"nowrap", overflow:"hidden", textOverflow:"ellipsis"}}>
                {currentAgent?.full_name || 'Cargando...'}
              </div>
              <div style={{fontSize:10, color:"rgba(250,250,247,.55)", fontFamily:"var(--mono)"}}>
                {currentAgent?.license_id || 'ID Pendiente'}
              </div>
            </div>
            <select 
              className="crm-agent-select"
              onChange={(e) => setCurrentAgent(agents.find(a => a.id === e.target.value))}
              value={currentAgent?.id || ''}
              style={{
                position: 'absolute',
                top: 0, left: 0, width: '100%', height: '100%',
                opacity: 0, cursor: 'pointer'
              }}
            >
              {agents.map(a => <option key={a.id} value={a.id}>{a.full_name}</option>)}
            </select>
            <button className="crm-side-btn sm"><Icon name="chevron-down" size={14}/></button>
          </div>
        </aside>

        <main className="crm-main">
          <header className="crm-head">
            <div>
              <div className="crm-crumb">CRM · Panel personal · {new Date().toLocaleDateString('es-MX', { weekday: 'short', day: 'numeric', month: 'short' })}</div>
              <h1 className="crm-title">Buenos días, <span className="it">{currentAgent?.full_name?.split(' ')[0] || 'Agente'}</span></h1>
            </div>
            <div className="crm-head-right">
              <ModeToggle />
              <div className="crm-search glass">
                <Icon name="search" size={15}/>
                <input placeholder="Buscar cliente, propiedad, tarea..."/>
                <span className="mono kbd">⌘K</span>
              </div>
              <button className="btn btn-orange btn-sm"><Icon name="plus" size={13}/> Nueva acción</button>
            </div>
          </header>

          <div id="sec-dashboard"></div>
          <div id="sec-tactical" className="crm-block">
            <div className="block-head">
              <div className="block-eyebrow">Bloque 01 · Táctico</div>
              <h2 className="block-title">Vista rápida del día</h2>
            </div>
            <section className="crm-row-tac">
              <div className="crm-card glass">
                <div className="crm-card-eyebrow">Velocidad de cierre</div>
                <h3 className="crm-card-title">Lead → cita</h3>
                <div className="gauge-wrap">
                  <svg viewBox="0 0 200 120" width="100%" style={{maxHeight:160}}>
                    <defs>
                      <linearGradient id="gaugeGrad" x1="0" x2="1" y1="0" y2="0">
                        <stop offset="0%" stopColor="#4FB97A"/>
                        <stop offset="50%" stopColor="#E8C28C"/>
                        <stop offset="100%" stopColor="#C21927"/>
                      </linearGradient>
                    </defs>
                    <path d="M 20 105 A 80 80 0 0 1 180 105" fill="none" stroke="rgba(250,250,247,.06)" strokeWidth="16" strokeLinecap="round"/>
                    <path d="M 20 105 A 80 80 0 0 1 180 105" fill="none" stroke="url(#gaugeGrad)" strokeWidth="16" strokeLinecap="round" strokeDasharray={`${(velocity.pct/100) * 251} 251`}/>
                    <line x1="100" y1="105" x2={100 + 75 * Math.cos(gaugeAngle * Math.PI/180)} y2={105 + 75 * Math.sin(gaugeAngle * Math.PI/180)} stroke="#FAFAF7" strokeWidth="2.5" strokeLinecap="round"/>
                    <circle cx="100" cy="105" r="6" fill="#FAFAF7"/>
                    <circle cx="100" cy="105" r="3" fill="#0A0A0A"/>
                  </svg>
                  <div className="gauge-center">
                    <div className="gauge-val">{velocity.avg}<span>{velocity.unit}</span></div>
                    <div className="gauge-lbl">Promedio</div>
                  </div>
                </div>
                <div className="gauge-bench">
                  <div><div className="mono val">{velocity.best}d</div><div className="mono lbl">Mejor</div></div>
                  <div style={{textAlign:"right"}}><div className="mono val">{velocity.worst}d</div><div className="mono lbl">Peor</div></div>
                </div>
                <div className="gauge-insight">
                  <span style={{color:"#4FB97A"}}>↓ 18% más rápido</span> que el mes pasado.
                </div>
              </div>

              <div className="crm-card glass">
                <div className="crm-card-head">
                  <div>
                    <div className="crm-card-eyebrow">Pipeline</div>
                    <h3 className="crm-card-title">Embudo de conversión</h3>
                  </div>
                  <span className="mono" style={{fontSize:11, color:"rgba(250,250,247,.5)"}}>Este mes</span>
                </div>
                <div className="funnel-chart">
                  {funnel.map((f, i) => (
                    <div key={f.stage} className="funnel-stage">
                      <div className="funnel-bar-wrap">
                        <div className="funnel-bar" style={{width: f.pct + "%", background: `linear-gradient(90deg, ${f.color}, ${f.color}cc)`}}>
                          <span className="funnel-count">{f.count}</span>
                        </div>
                        {f.conv && (
                          <div className="funnel-conv" style={{color: f.color}}>{f.conv}</div>
                        )}
                      </div>
                      <div className="funnel-label">{f.stage}</div>
                    </div>
                  ))}
                </div>
              </div>

              <div className="crm-card glass">
                <div className="crm-card-head">
                  <div>
                    <div className="crm-card-eyebrow">Scoring de interés</div>
                    <h3 className="crm-card-title">🔥 Oportunidades calientes</h3>
                  </div>
                  <span className="crm-live"><span className="pulse"></span> Live</span>
                </div>
                <div className="hot-opps">
                  {hotOpps.map((o, i) => (
                    <div key={i} className="hot-opp">
                      <div className="opp-score" style={{background: `conic-gradient(#F06D5A ${o.score * 3.6}deg, rgba(250,250,247,.1) 0)`}}>
                        <div className="opp-score-inner">{o.score}</div>
                      </div>
                      <div style={{flex:1, minWidth:0}}>
                        <div style={{fontSize:13, fontWeight:600}}>{o.name}</div>
                        <div style={{fontSize:11, color:"rgba(250,250,247,.7)", marginTop:2}}>{o.act}</div>
                        <div style={{fontSize:10, color:"rgba(250,250,247,.4)", fontFamily:"var(--mono)", marginTop:2}}>{o.time}</div>
                      </div>
                      <button className="opp-cta">Contactar</button>
                    </div>
                  ))}
                </div>
              </div>
            </section>
          </div>

          <div id="sec-agenda" className="crm-block">
            <div className="block-head">
              <div className="block-eyebrow">Bloque 02 · Relaciones</div>
              <h2 className="block-title">Gestión de actividades</h2>
            </div>
            <section className="crm-row-rel">
              <div className="crm-card glass">
                <div className="crm-card-head">
                  <div>
                    <div className="crm-card-eyebrow">Alta prioridad · {agenda.filter(a=>a.priority==="alta").length} citas</div>
                    <h3 className="crm-card-title">Hoy · Domingo 19</h3>
                  </div>
                  <button className="crm-btn-ghost">+ Agendar</button>
                </div>
                <div className="agenda-list">
                  {agenda.map((a, i) => (
                    <div key={i} className={"agenda-item " + a.priority}>
                      <div className="agenda-time">
                        <div className="t">{a.time}</div>
                        <div className="d mono">{a.dur}</div>
                      </div>
                      <div className="agenda-line" style={{background: a.color}}></div>
                      <div className="agenda-body">
                        <div className="agenda-type" style={{color: a.color}}>{a.type.toUpperCase()}</div>
                        <div className="agenda-title">{a.title}</div>
                        <div className="agenda-who">con {a.who}</div>
                      </div>
                    </div>
                  ))}
                </div>
              </div>

              <div className="crm-card glass">
                <div className="crm-card-head">
                  <div>
                    <div className="crm-card-eyebrow">Motor de sugerencias IA</div>
                    <h3 className="crm-card-title">🤖 Recordatorios inteligentes</h3>
                  </div>
                </div>
                <div className="reminders">
                  {smartReminders.map((r, i) => (
                    <div key={i} className={"reminder " + (r.urgent ? "urgent" : "")}>
                      <div className="rem-icon">{r.icon}</div>
                      <div style={{flex:1, minWidth:0}}>
                        <div className="rem-title">{r.title}</div>
                        <div className="rem-hint">{r.hint}</div>
                      </div>
                      <button className={"rem-action " + (r.urgent ? "u" : "")}>{r.action}</button>
                    </div>
                  ))}
                </div>
              </div>
            </section>
          </div>

          <div id="sec-market" className="crm-block">
            <div className="block-head">
              <div className="block-eyebrow">Bloque 03 · Inteligencia</div>
              <h2 className="block-title">Mercado y propiedades</h2>
            </div>
            <section className="crm-row-mkt">
              <div className="crm-card glass">
                <div className="crm-card-head">
                  <div>
                    <div className="crm-card-eyebrow">Rotación · tiempo real</div>
                    <h3 className="crm-card-title">Inventario caliente</h3>
                  </div>
                </div>
                <div className="rotation-list">
                  {hotInventory.map((h, i) => (
                    <div key={i} className="rot-row">
                      <div className="rot-rank mono">#{i+1}</div>
                      <div style={{flex:1, minWidth:0}}>
                        <div style={{fontSize:13, fontWeight:600}}>{h.title}</div>
                        <div style={{fontSize:11, color:"rgba(250,250,247,.55)", marginTop:3}}>{h.change} · {h.days}d activa</div>
                      </div>
                      <div className="rot-bar"><div className="rot-fill" style={{width: h.rotation + "%"}}></div></div>
                    </div>
                  ))}
                </div>
              </div>
              <div className="crm-card glass">
                <div className="crm-card-head">
                  <div>
                    <div className="crm-card-eyebrow">Geo-intensidad</div>
                    <h3 className="crm-card-title">🗺 Mapa de calor CDMX</h3>
                  </div>
                </div>
                <div className="heatmap" style={{height:220, display:"flex", alignItems:"center", justifyContent:"center"}}>
                  <div style={{textAlign:"center", color:"rgba(250,250,247,.5)"}}>
                    <Icon name="map" size={40} style={{marginBottom:10}} color={undefined} />
                    <div>Mapa interactivo de calor</div>
                  </div>
                </div>
              </div>
            </section>
          </div>

          <div id="sec-listings" className="crm-block">
            <div className="crm-card glass">
              <div className="crm-card-head">
                <div>
                  <div className="crm-card-eyebrow">Inventario personal</div>
                  <h3 className="crm-card-title">Mis propiedades</h3>
                </div>
                <button className="crm-btn-ghost" onClick={() => router.push("/publish")}>+ Publicar</button>
              </div>
              <div className="crm-listings">
                {myListings.map(l => (
                  <div key={l.id} className="crm-listing">
                    <div className="crm-list-thumb"><ArchPlaceholder palette={l.palette} seed={0}/></div>
                    <div className="crm-list-info">
                      <div className="crm-list-title">{l.title}</div>
                      <div className="crm-list-loc">{l.colonia}, {l.city}</div>
                      <div className="crm-list-meta">
                        <span>{l.views} vistas</span><span>·</span><span>{l.leads} leads</span><span>·</span><span>{l.days}d publicada</span>
                      </div>
                    </div>
                    <div className="crm-list-right">
                      <div className="crm-list-price">{fmtMXN(l.price, true)}</div>
                      <div className={"crm-list-status s-" + l.status}>{l.status === "hot" ? "🔥 Hot" : l.status === "stale" ? "⚠ Baja" : "Activa"}</div>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </main>
      </div>
    </div>
  );
}
