// CRM Dashboard — glassmorphism
const CRM = ({ goto }) => {
  const [section, setSection] = useState("dashboard");
  const [range, setRange] = useState("6m");

  // KPIs
  const kpis = [
    { lbl: "Propiedades activas", val: "248", delta: "+12", icon: "building", tone: "orange" },
    { lbl: "Leads este mes", val: "1,394", delta: "+18%", icon: "user", tone: "green" },
    { lbl: "Citas agendadas", val: "76", delta: "+5", icon: "check", tone: "blue" },
    { lbl: "Comisiones MXN", val: "$3.2M", delta: "+24%", icon: "sparkle", tone: "orange" },
  ];

  // Chart data (normalized 0-1)
  const months = ["Ene","Feb","Mar","Abr","May","Jun","Jul","Ago","Sep","Oct","Nov","Dic"];
  const leadsData = [0.42, 0.38, 0.55, 0.61, 0.49, 0.72, 0.78, 0.65, 0.81, 0.88, 0.76, 0.92];
  const closedData = [0.28, 0.31, 0.35, 0.42, 0.38, 0.55, 0.58, 0.52, 0.63, 0.71, 0.66, 0.79];

  const makePath = (data) => {
    const w = 560, h = 180, pad = 10;
    const step = (w - pad*2) / (data.length - 1);
    return data.map((v, i) => {
      const x = pad + i * step;
      const y = h - pad - v * (h - pad*2);
      if (i === 0) return `M ${x} ${y}`;
      const px = pad + (i-1) * step;
      const py = h - pad - data[i-1] * (h - pad*2);
      const cx = (px + x) / 2;
      return `C ${cx} ${py} ${cx} ${y} ${x} ${y}`;
    }).join(" ");
  };

  // Pipeline stages
  const pipeline = [
    { stage: "Lead nuevo", count: 412, value: "$180M", pct: 100, color: "#C21927" },
    { stage: "Contactado", count: 284, value: "$124M", pct: 69, color: "#E03B4A" },
    { stage: "Visita", count: 156, value: "$84M", pct: 38, color: "#F06D5A" },
    { stage: "Oferta", count: 62, value: "$48M", pct: 15, color: "#F2A65A" },
    { stage: "Cerrado", count: 28, value: "$22M", pct: 7, color: "#2E7D4F" },
  ];

  // Active listings
  const listings = PROPERTIES.slice(0, 5).map((p, i) => ({
    ...p,
    views: 234 + i * 87,
    leads: 12 + i * 4,
    offers: i,
    status: i === 0 ? "hot" : i === 1 ? "hot" : i === 4 ? "stale" : "active",
  }));

  // Recent activity
  const activity = [
    { t: "hace 3 min", who: "Ana García", what: "agendó visita", prop: "Casa Roma Norte", type: "cita" },
    { t: "hace 18 min", who: "Luis Ramírez", what: "hizo oferta de $4.2M", prop: "Depa Condesa", type: "oferta" },
    { t: "hace 42 min", who: "Marisol V.", what: "envió mensaje", prop: "PH Polanco", type: "msg" },
    { t: "hace 1 h", who: "Carlos Méndez", what: "marcó favorito", prop: "Villa Tulum", type: "fav" },
    { t: "hace 2 h", who: "Andrea P.", what: "cerró operación", prop: "Casa San Miguel", type: "cierre" },
  ];

  // Team
  const team = [
    { name: "Daniela Ruiz", role: "Lead Agent", deals: 14, pct: 92, init: "DR" },
    { name: "Roberto Kim", role: "Senior", deals: 11, pct: 78, init: "RK" },
    { name: "Paulina López", role: "Agent", deals: 8, pct: 64, init: "PL" },
    { name: "Miguel Ángel", role: "Junior", deals: 5, pct: 41, init: "MA" },
  ];

  return (
    <div className="crm-shell">
      {/* Ambient background */}
      <div className="crm-bg">
        <div className="crm-bg-blob b1"></div>
        <div className="crm-bg-blob b2"></div>
        <div className="crm-bg-blob b3"></div>
        <div className="crm-bg-grid"></div>
      </div>

      <div className="crm-layout">
        {/* Sidebar */}
        <aside className="crm-side glass">
          <div className="crm-side-logo" onClick={() => goto("home")}>
            <div className="crm-logo-mark">
              <svg viewBox="0 0 24 24" width="18" height="18" fill="none" stroke="currentColor" strokeWidth="2"><path d="m3 11 9-7 9 7v9a1 1 0 0 1-1 1h-5v-6h-6v6H4a1 1 0 0 1-1-1z"/></svg>
            </div>
          </div>
          <nav className="crm-side-nav">
            {[
              { id: "dashboard", icon: "grid", label: "Dashboard" },
              { id: "properties", icon: "building", label: "Propiedades" },
              { id: "leads", icon: "user", label: "Leads" },
              { id: "calendar", icon: "check", label: "Agenda" },
              { id: "messages", icon: "message", label: "Mensajes" },
              { id: "reports", icon: "area", label: "Reportes" },
            ].map(i => (
              <button key={i.id} className={"crm-side-btn" + (section === i.id ? " active" : "")} onClick={() => setSection(i.id)} title={i.label}>
                <Icon name={i.icon} size={18}/>
              </button>
            ))}
          </nav>
          <div className="crm-side-bottom">
            <button className="crm-side-btn" title="Ajustes"><Icon name="sparkle" size={18}/></button>
            <button className="crm-side-btn" title="Salir" onClick={() => goto("home")}><Icon name="arrow-left" size={18}/></button>
          </div>
        </aside>

        {/* Main */}
        <main className="crm-main">
          {/* Top header */}
          <header className="crm-head">
            <div>
              <div className="crm-crumb">CRM · Agente</div>
              <h1 className="crm-title">Panel de <span className="it">control</span></h1>
            </div>
            <div className="crm-head-right">
              <div className="crm-search glass">
                <Icon name="search" size={15}/>
                <input placeholder="Buscar propiedad, cliente, folio..."/>
                <span className="mono kbd">⌘K</span>
              </div>
              <button className="crm-icon-btn glass"><Icon name="message" size={16}/><span className="crm-dot"></span></button>
              <button className="crm-icon-btn glass"><Icon name="heart" size={16}/></button>
              <div className="crm-user glass">
                <div className="crm-avatar">DR</div>
                <div>
                  <div style={{fontSize:13, fontWeight:600}}>Daniela Ruiz</div>
                  <div style={{fontSize:10, color:"rgba(250,250,247,.6)", fontFamily:"var(--mono)"}}>AMPI · 4782</div>
                </div>
              </div>
            </div>
          </header>

          {/* KPIs */}
          <section className="crm-kpis">
            {kpis.map(k => (
              <div key={k.lbl} className="crm-kpi glass">
                <div className={"crm-kpi-icon tone-" + k.tone}><Icon name={k.icon} size={16}/></div>
                <div className="crm-kpi-body">
                  <div className="crm-kpi-lbl">{k.lbl}</div>
                  <div className="crm-kpi-val">{k.val}</div>
                  <div className="crm-kpi-delta">
                    <svg width="10" height="10" viewBox="0 0 10 10" fill="none"><path d="M2 7l3-3 3 3" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round"/></svg>
                    {k.delta} <span style={{opacity:.6}}>vs mes ant.</span>
                  </div>
                </div>
              </div>
            ))}
          </section>

          {/* Row: chart + right column */}
          <section className="crm-row-1">
            <div className="crm-card glass crm-chart">
              <div className="crm-card-head">
                <div>
                  <div className="crm-card-eyebrow">Rendimiento</div>
                  <h3 className="crm-card-title">Leads y cierres</h3>
                </div>
                <div className="crm-seg">
                  {["1m","3m","6m","1a"].map(r => (
                    <button key={r} className={"crm-seg-btn" + (range === r ? " active" : "")} onClick={() => setRange(r)}>{r}</button>
                  ))}
                </div>
              </div>
              <div className="crm-legend">
                <span><span className="dot" style={{background:"#F06D5A"}}></span> Leads generados</span>
                <span><span className="dot" style={{background:"#FAFAF7"}}></span> Operaciones cerradas</span>
              </div>
              <svg className="crm-svg" viewBox="0 0 560 180" preserveAspectRatio="none">
                <defs>
                  <linearGradient id="areaLeads" x1="0" x2="0" y1="0" y2="1">
                    <stop offset="0%" stopColor="#F06D5A" stopOpacity="0.35"/>
                    <stop offset="100%" stopColor="#F06D5A" stopOpacity="0"/>
                  </linearGradient>
                </defs>
                {/* grid */}
                {[0.25, 0.5, 0.75].map(y => (
                  <line key={y} x1="10" x2="550" y1={180 - 10 - y*160} y2={180 - 10 - y*160} stroke="rgba(250,250,247,.06)" strokeDasharray="2 4"/>
                ))}
                {/* area under leads */}
                <path d={makePath(leadsData) + ` L 550 170 L 10 170 Z`} fill="url(#areaLeads)"/>
                {/* leads line */}
                <path d={makePath(leadsData)} fill="none" stroke="#F06D5A" strokeWidth="2.5" strokeLinecap="round"/>
                {/* closed line (dashed in future) */}
                <path d={makePath(closedData)} fill="none" stroke="rgba(250,250,247,.9)" strokeWidth="2" strokeLinecap="round" strokeDasharray="0"/>
                {/* highlight dot */}
                <circle cx={10 + 9*(540/11)} cy={180 - 10 - leadsData[9]*160} r="5" fill="#F06D5A" stroke="#FAFAF7" strokeWidth="2"/>
                <rect x={10 + 9*(540/11) - 34} y={180 - 10 - leadsData[9]*160 - 34} width="68" height="22" rx="6" fill="rgba(10,10,10,.8)" stroke="rgba(250,250,247,.15)"/>
                <text x={10 + 9*(540/11)} y={180 - 10 - leadsData[9]*160 - 19} fill="#FAFAF7" fontSize="11" fontWeight="600" textAnchor="middle" fontFamily="Inter">152 leads</text>
              </svg>
              <div className="crm-xaxis">
                {months.map(m => <span key={m}>{m}</span>)}
              </div>
            </div>

            {/* Profile + pipeline card */}
            <div className="crm-col">
              <div className="crm-card glass crm-profile">
                <div className="crm-profile-banner"></div>
                <div className="crm-profile-body">
                  <div className="crm-profile-avatar">
                    <div className="crm-avatar big">DR</div>
                    <span className="crm-status-chip">🟢 En línea</span>
                  </div>
                  <div style={{textAlign:"center", marginTop:14}}>
                    <div style={{fontSize:18, fontWeight:600}}>Daniela Ruiz</div>
                    <div style={{fontSize:12, color:"rgba(250,250,247,.6)", marginTop:2}}>Agente Lead · AMPI #4782</div>
                  </div>
                  <div className="crm-profile-stats">
                    <div><div className="n">14</div><div className="l">Activas</div></div>
                    <div><div className="n">92%</div><div className="l">Conversión</div></div>
                    <div><div className="n">4.9</div><div className="l">Rating</div></div>
                  </div>
                  <div className="crm-quick-actions">
                    <button><Icon name="plus" size={14}/><span>Publicar</span></button>
                    <button><Icon name="message" size={14}/><span>Mensaje</span></button>
                    <button><Icon name="check" size={14}/><span>Cita</span></button>
                    <button><Icon name="upload" size={14}/><span>Export</span></button>
                  </div>
                </div>
              </div>
            </div>
          </section>

          {/* Row 2: pipeline + listings */}
          <section className="crm-row-2">
            <div className="crm-card glass">
              <div className="crm-card-head">
                <div>
                  <div className="crm-card-eyebrow">Embudo</div>
                  <h3 className="crm-card-title">Pipeline de ventas</h3>
                </div>
                <button className="crm-btn-ghost">Ver todo →</button>
              </div>
              <div className="crm-pipeline">
                {pipeline.map(p => (
                  <div key={p.stage} className="crm-pipe-row">
                    <div className="crm-pipe-head">
                      <span className="crm-pipe-stage">{p.stage}</span>
                      <span className="crm-pipe-count">{p.count}</span>
                    </div>
                    <div className="crm-pipe-bar">
                      <div className="crm-pipe-fill" style={{width: p.pct + "%", background: p.color}}></div>
                    </div>
                    <div className="crm-pipe-value mono">{p.value}</div>
                  </div>
                ))}
              </div>
            </div>

            <div className="crm-card glass">
              <div className="crm-card-head">
                <div>
                  <div className="crm-card-eyebrow">Inventario</div>
                  <h3 className="crm-card-title">Propiedades activas</h3>
                </div>
                <button className="crm-btn-ghost">Ver todas →</button>
              </div>
              <div className="crm-listings">
                {listings.map(l => (
                  <div key={l.id} className="crm-listing">
                    <div className="crm-list-thumb">
                      <ArchPlaceholder palette={l.palette} seed={0}/>
                    </div>
                    <div className="crm-list-info">
                      <div className="crm-list-title">{l.title}</div>
                      <div className="crm-list-loc">{l.colonia}, {l.city}</div>
                      <div className="crm-list-meta">
                        <span>{l.views} vistas</span>
                        <span>·</span>
                        <span>{l.leads} leads</span>
                        {l.offers > 0 && <><span>·</span><span style={{color:"var(--orange)"}}>{l.offers} oferta{l.offers>1?"s":""}</span></>}
                      </div>
                    </div>
                    <div className="crm-list-right">
                      <div className="crm-list-price">{fmtMXN(l.price, true)}</div>
                      <div className={"crm-list-status s-" + l.status}>
                        {l.status === "hot" ? "🔥 Hot" : l.status === "stale" ? "⚠ Enfriando" : "Activa"}
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          </section>

          {/* Row 3: activity + team */}
          <section className="crm-row-3">
            <div className="crm-card glass">
              <div className="crm-card-head">
                <div>
                  <div className="crm-card-eyebrow">Feed en vivo</div>
                  <h3 className="crm-card-title">Actividad reciente</h3>
                </div>
                <span className="crm-live"><span className="pulse"></span> Live</span>
              </div>
              <div className="crm-activity">
                {activity.map((a, i) => (
                  <div key={i} className="crm-act-row">
                    <div className={"crm-act-dot t-" + a.type}></div>
                    <div className="crm-act-body">
                      <div className="crm-act-text"><strong>{a.who}</strong> {a.what} · <span style={{color:"rgba(250,250,247,.6)"}}>{a.prop}</span></div>
                      <div className="crm-act-time mono">{a.t}</div>
                    </div>
                  </div>
                ))}
              </div>
            </div>

            <div className="crm-card glass">
              <div className="crm-card-head">
                <div>
                  <div className="crm-card-eyebrow">Equipo</div>
                  <h3 className="crm-card-title">Top agentes del mes</h3>
                </div>
                <button className="crm-btn-ghost">Gestionar →</button>
              </div>
              <div className="crm-team">
                {team.map((t, i) => (
                  <div key={t.name} className="crm-team-row">
                    <div className="crm-team-rank mono">#{i+1}</div>
                    <div className="crm-avatar sm">{t.init}</div>
                    <div style={{flex:1, minWidth:0}}>
                      <div style={{fontSize:13, fontWeight:600}}>{t.name}</div>
                      <div style={{fontSize:11, color:"rgba(250,250,247,.55)"}}>{t.role} · {t.deals} cerrados</div>
                      <div className="crm-team-bar"><div className="crm-team-fill" style={{width: t.pct + "%"}}></div></div>
                    </div>
                    <div className="mono" style={{fontSize:12, fontWeight:600, color:"var(--orange)"}}>{t.pct}%</div>
                  </div>
                ))}
              </div>
            </div>

            <div className="crm-card glass crm-goal-card">
              <div className="crm-card-eyebrow">Meta trimestral</div>
              <h3 className="crm-card-title" style={{marginBottom:20}}>Q2 · Abril–Junio</h3>
              <div className="crm-donut">
                <svg viewBox="0 0 120 120" width="160" height="160">
                  <circle cx="60" cy="60" r="50" stroke="rgba(250,250,247,.08)" strokeWidth="10" fill="none"/>
                  <circle cx="60" cy="60" r="50" stroke="url(#donutGrad)" strokeWidth="10" fill="none" strokeDasharray={`${2*Math.PI*50*0.68} ${2*Math.PI*50}`} strokeDashoffset="0" strokeLinecap="round" transform="rotate(-90 60 60)"/>
                  <defs>
                    <linearGradient id="donutGrad" x1="0" x2="1" y1="0" y2="1">
                      <stop offset="0%" stopColor="#F06D5A"/>
                      <stop offset="100%" stopColor="#C21927"/>
                    </linearGradient>
                  </defs>
                </svg>
                <div className="crm-donut-center">
                  <div className="crm-donut-val">68%</div>
                  <div className="crm-donut-lbl">Completado</div>
                </div>
              </div>
              <div className="crm-goal-stats">
                <div><span className="mono">$3.2M</span> cerrado</div>
                <div><span className="mono">$4.7M</span> meta</div>
              </div>
              <button className="btn btn-orange btn-sm" style={{width:"100%", justifyContent:"center", marginTop:14}}>
                Ver detalle <Icon name="arrow-right" size={14}/>
              </button>
            </div>
          </section>
        </main>
      </div>
    </div>
  );
};

Object.assign(window, { CRM });
