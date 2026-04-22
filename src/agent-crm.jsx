// Agent CRM Dashboard — personal view (role: agent)
const AgentCRM = ({ goto }) => {
  const [section, setSection] = useState("dashboard");
  const today = new Date(2026, 3, 19);
  const [selDay, setSelDay] = useState(today.getDate());
  const [selLead, setSelLead] = useState(0);

  // ===== 1. TÁCTICO =====
  // Velocímetro: tiempo promedio lead → cita
  const velocity = { avg: 2.4, best: 0.5, worst: 7, unit: "días", pct: 72 }; // pct de posición en gauge (0-100)

  // Embudo detallado con tasas de conversión
  const funnel = [
    { stage: "Contacto nuevo", count: 47, pct: 100, drop: null, conv: null, color: "#5A9BF0" },
    { stage: "Calificación", count: 32, pct: 68, drop: -32, conv: "68%", color: "#7BA7E8" },
    { stage: "Visita programada", count: 18, pct: 38, drop: -44, conv: "56%", color: "#E8C28C" },
    { stage: "Negociación", count: 9, pct: 19, drop: -50, conv: "50%", color: "#F06D5A" },
    { stage: "Cierre", count: 3, pct: 6, drop: -67, conv: "33%", color: "#4FB97A" },
  ];

  // Oportunidades calientes (leads que interactuaron recientemente)
  const hotOpps = [
    { name: "Ana García", act: "Visitó 3 veces Casa Roma Norte hoy", score: 94, time: "hace 12 min", signal: "web" },
    { name: "Luis Ramírez", act: "Abrió tu correo y hizo click en precio", score: 88, time: "hace 34 min", signal: "email" },
    { name: "Marisol V.", act: "Guardó 4 propiedades en favoritos", score: 81, time: "hace 2 h", signal: "fav" },
    { name: "Pedro L.", act: "Descargó el brochure de Tulum", score: 74, time: "hace 3 h", signal: "web" },
  ];

  // ===== 2. RELACIONES =====
  // Agenda
  const agenda = [
    { time: "09:00", type: "visita", title: "Visita Casa Roma Norte", who: "Ana García", dur: "45 min", color: "#F06D5A", priority: "alta" },
    { time: "11:30", type: "llamada", title: "Seguimiento oferta", who: "Luis Ramírez", dur: "20 min", color: "#5A9BF0", priority: "alta" },
    { time: "14:00", type: "visita", title: "Tour Depa Condesa", who: "Marisol V.", dur: "60 min", color: "#F06D5A", priority: "media" },
    { time: "16:30", type: "firma", title: "Firma de contrato", who: "Pedro & Julia", dur: "90 min", color: "#4FB97A", priority: "alta" },
    { time: "18:00", type: "reunion", title: "Junta equipo semanal", who: "Oficina", dur: "30 min", color: "#E8C28C", priority: "baja" },
  ];

  // Recordatorios inteligentes
  const smartReminders = [
    { type: "warning", icon: "⚠", title: "Carlos M. sin respuesta hace 52h", hint: "Envía WhatsApp con Villa Tulum", action: "Enviar ahora", urgent: true },
    { type: "info", icon: "📬", title: "Sofía López cumple años mañana", hint: "Oportunidad de reconexión", action: "Programar mensaje", urgent: false },
    { type: "hot", icon: "🔥", title: "Ana vio tu propiedad 3 veces hoy", hint: "Llámala antes del cierre del día", action: "Llamar", urgent: true },
    { type: "follow", icon: "🔄", title: "Oferta de Luis vence en 18h", hint: "Aún sin respuesta del vendedor", action: "Escalar", urgent: true },
  ];

  // Calendar
  const firstDay = new Date(2026, 3, 1).getDay();
  const daysInMonth = 30;
  const offset = firstDay === 0 ? 6 : firstDay - 1;
  const days = [];
  for (let i = 0; i < offset; i++) days.push(null);
  for (let d = 1; d <= daysInMonth; d++) days.push(d);
  while (days.length % 7 !== 0) days.push(null);
  const eventDays = { 19: 5, 20: 3, 21: 2, 22: 4, 23: 1, 25: 2, 28: 3 };

  // Leads + Historial 360
  const myLeads = [
    { name: "Ana García", prop: "Casa Roma Norte", stage: "Visita", heat: "hot", budget: "$8–10M", last: "hoy 09:00", phone: "+52 55 1234 5678",
      objections: ["Precio por metro cuadrado", "Espacio para 2 autos"],
      seen: ["Casa Roma", "PH Condesa", "Casa Narvarte"],
      notes: "Busca cerrar antes de junio. Familia con 2 hijos, trabaja en Polanco.",
      interactions: 14 },
    { name: "Luis Ramírez", prop: "Depa Condesa", stage: "Oferta", heat: "hot", budget: "$4–5M", last: "ayer", phone: "+52 33 9012 3456",
      objections: ["Cuota de mantenimiento", "Sin estacionamiento"],
      seen: ["Depa Condesa", "Depa Del Valle"],
      notes: "Segunda oferta: $4.3M. Contra-oferta del vendedor: $4.6M. Pendiente.",
      interactions: 9 },
    { name: "Marisol V.", prop: "PH Polanco", stage: "Contactado", heat: "warm", budget: "$12M+", last: "2d", phone: "+52 55 7788 9900",
      objections: ["Orientación norte"],
      seen: ["PH Polanco", "Torre Santa Fe", "Casa Lomas"],
      notes: "Inversora. Busca segundo inmueble de renta. Solicitó CMA.",
      interactions: 6 },
    { name: "Carlos M.", prop: "Villa Tulum", stage: "Lead nuevo", heat: "cold", budget: "$6M", last: "3d", phone: "+52 998 2233 4455",
      objections: ["Distancia a la playa"],
      seen: ["Villa Tulum"],
      notes: "Primera consulta. Pregunta básica vía WhatsApp.",
      interactions: 2 },
    { name: "Andrea P.", prop: "Casa San Miguel", stage: "Cerrado", heat: "done", budget: "$5.5M", last: "1 sem", phone: "+52 415 1020 3040",
      objections: [],
      seen: ["Casa San Miguel"],
      notes: "Cerrado $5.2M. Firma 22 abril. Comisión estimada $62,400.",
      interactions: 18 },
  ];

  // ===== 3. MERCADO =====
  // Inventario rotación
  const hotInventory = [
    { title: "Casa Roma Norte", change: "precio -3%", trend: "down", rotation: 92, days: 14 },
    { title: "Depa Condesa", change: "nueva", trend: "new", rotation: 88, days: 3 },
    { title: "Villa Tulum", change: "+2 ofertas", trend: "up", rotation: 81, days: 21 },
    { title: "PH Polanco", change: "precio -5%", trend: "down", rotation: 76, days: 38 },
    { title: "Loft Juárez", change: "nueva", trend: "new", rotation: 68, days: 1 },
  ];

  // Mapa de calor por colonia
  const heatmapZones = [
    { name: "Roma Norte", cdmx: true, leads: 18, intensity: 95, x: 30, y: 45 },
    { name: "Condesa", cdmx: true, leads: 14, intensity: 82, x: 25, y: 55 },
    { name: "Polanco", cdmx: true, leads: 9, intensity: 68, x: 40, y: 35 },
    { name: "Del Valle", cdmx: true, leads: 6, intensity: 48, x: 45, y: 65 },
    { name: "Narvarte", cdmx: true, leads: 4, intensity: 32, x: 55, y: 60 },
    { name: "San Ángel", cdmx: true, leads: 3, intensity: 22, x: 35, y: 80 },
    { name: "Coyoacán", cdmx: true, leads: 2, intensity: 18, x: 55, y: 80 },
  ];

  // CMA data
  const cmaTarget = { title: "Casa Roma Norte · 220 m²", ask: 9200000 };
  const cmaComps = [
    { addr: "Casa Querétaro 14", m2: 215, price: 8900000, status: "vendida", days: 22 },
    { addr: "Dep. Orizaba 88", m2: 225, price: 9450000, status: "activa", days: 18 },
    { addr: "Casa Zacatecas 55", m2: 210, price: 8600000, status: "vendida", days: 45 },
    { addr: "Dep. Puebla 201", m2: 230, price: 9800000, status: "activa", days: 9 },
  ];
  const cmaAvg = Math.round(cmaComps.reduce((a, c) => a + c.price/c.m2, 0) / cmaComps.length);

  // ===== 4. KPIs =====
  const monthQuota = { sold: 186400, goal: 250000, pct: 74 };
  const effectiveness = { visits: 24, offers: 9, closed: 3, visitToOffer: 38, offerToClose: 33, visitToClose: 13 };
  const projectedIncome = {
    confirmed: 124000,
    inProgress: 62400,
    forecast: 285000,
    byStage: [
      { stage: "Firmadas", amount: 124000, prob: 100, color: "#4FB97A" },
      { stage: "En negociación", amount: 98000, prob: 65, color: "#F06D5A" },
      { stage: "En visita", amount: 145000, prob: 35, color: "#E8C28C" },
      { stage: "Calificación", amount: 220000, prob: 15, color: "#5A9BF0" },
    ]
  };

  // Performance sparkline
  const perfData = [0.5, 0.58, 0.62, 0.55, 0.68, 0.72, 0.78, 0.81, 0.85];
  const perfPath = (() => {
    const w = 300, h = 60, pad = 4;
    const step = (w - pad*2) / (perfData.length - 1);
    return perfData.map((v, i) => {
      const x = pad + i * step;
      const y = h - pad - v * (h - pad*2);
      if (i === 0) return `M ${x} ${y}`;
      const px = pad + (i-1) * step;
      const py = h - pad - perfData[i-1] * (h - pad*2);
      const cx = (px + x) / 2;
      return `C ${cx} ${py} ${cx} ${y} ${x} ${y}`;
    }).join(" ");
  })();

  // Personal listings
  const myListings = PROPERTIES.slice(0, 4).map((p, i) => ({
    ...p,
    views: 120 + i * 53,
    leads: 3 + i * 2,
    days: 8 + i * 12,
    status: i === 0 ? "hot" : i === 3 ? "stale" : "active",
  }));

  const heatColor = { hot: "#F06D5A", warm: "#E8C28C", cold: "#5A9BF0", done: "#4FB97A" };
  const heatLbl = { hot: "🔥 Caliente", warm: "⚡ Tibio", cold: "❄ Frío", done: "✓ Cerrado" };
  const lead = myLeads[selLead];

  // Velocímetro arc calculation
  const gaugeAngle = -90 + (velocity.pct / 100) * 180; // -90 to 90 deg

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
        {/* Expanded sticky sidebar */}
        <aside className="crm-side-wide glass">
          <div className="crm-side-top">
            <div className="crm-side-logo" onClick={() => goto("home")}>
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
            <div className="crm-avatar">PL</div>
            <div style={{flex:1, minWidth:0}}>
              <div style={{fontSize:12, fontWeight:600, whiteSpace:"nowrap", overflow:"hidden", textOverflow:"ellipsis"}}>Paulina López</div>
              <div style={{fontSize:10, color:"rgba(250,250,247,.55)", fontFamily:"var(--mono)"}}>AMPI 9214</div>
            </div>
            <button className="crm-side-btn sm" onClick={() => goto("home")}><Icon name="arrow-left" size={14}/></button>
          </div>
        </aside>

        <main className="crm-main">
          <header className="crm-head">
            <div>
              <div className="crm-crumb">CRM · Panel personal · Dom 19 abr · 08:42</div>
              <h1 className="crm-title">Buenos días, <span className="it">Paulina</span></h1>
            </div>
            <div className="crm-head-right">
              <div className="crm-search glass">
                <Icon name="search" size={15}/>
                <input placeholder="Buscar cliente, propiedad, tarea..."/>
                <span className="mono kbd">⌘K</span>
              </div>
              <button className="btn btn-orange btn-sm"><Icon name="plus" size={13}/> Nueva acción</button>
            </div>
          </header>

          {/* ============= BLOQUE 1 · TÁCTICO ============= */}
          <div id="sec-dashboard"></div>
          <div id="sec-tactical" className="crm-block">
            <div className="block-head">
              <div className="block-eyebrow">Bloque 01 · Táctico</div>
              <h2 className="block-title">Vista rápida del día</h2>
            </div>

            <section className="crm-row-tac">
              {/* Velocímetro */}
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
                    {/* Needle */}
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
                  <span style={{color:"#4FB97A"}}>↓ 18% más rápido</span> que el mes pasado. Sigue así.
                </div>
              </div>

              {/* Embudo */}
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
                <div className="funnel-insight">
                  <div><span className="mono" style={{color:"#F06D5A"}}>50%</span> pierdes en visita→negociación — <strong>peor que promedio</strong></div>
                </div>
              </div>

              {/* Oportunidades calientes */}
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
                        <div style={{fontSize:10, color:"rgba(250,250,247,.4)", fontFamily:"var(--mono)", marginTop:2}}>{o.time} · señal: {o.signal}</div>
                      </div>
                      <button className="opp-cta">Contactar</button>
                    </div>
                  ))}
                </div>
              </div>
            </section>
          </div>

          {/* ============= BLOQUE 2 · RELACIONES ============= */}
          <div id="sec-agenda" className="crm-block">
            <div className="block-head">
              <div className="block-eyebrow">Bloque 02 · Relaciones</div>
              <h2 className="block-title">Gestión de actividades</h2>
            </div>

            <section className="crm-row-rel">
              {/* Agenda + Calendar */}
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
                        <div className="agenda-type" style={{color: a.color}}>{a.type.toUpperCase()} · {a.priority}</div>
                        <div className="agenda-title">{a.title}</div>
                        <div className="agenda-who">con {a.who}</div>
                      </div>
                    </div>
                  ))}
                </div>

                <div style={{marginTop:18, paddingTop:14, borderTop:"1px solid rgba(250,250,247,.06)"}}>
                  <div className="crm-card-eyebrow" style={{marginBottom:10}}>Abril 2026</div>
                  <div className="cal-grid compact">
                    <div className="cal-wday">L</div><div className="cal-wday">M</div><div className="cal-wday">M</div><div className="cal-wday">J</div><div className="cal-wday">V</div><div className="cal-wday">S</div><div className="cal-wday">D</div>
                    {days.map((d, i) => (
                      <div key={i} className={"cal-day compact" + (!d ? " empty" : "") + (d === today.getDate() ? " today" : "") + (d === selDay ? " selected" : "")} onClick={() => d && setSelDay(d)}>
                        {d && <><span>{d}</span>{eventDays[d] && <div className="cal-dots">{Array.from({length: Math.min(eventDays[d], 3)}).map((_, j) => <span key={j} className="cal-dot"></span>)}</div>}</>}
                      </div>
                    ))}
                  </div>
                </div>
              </div>

              {/* Recordatorios inteligentes */}
              <div className="crm-card glass">
                <div className="crm-card-head">
                  <div>
                    <div className="crm-card-eyebrow">Motor de sugerencias IA</div>
                    <h3 className="crm-card-title">🤖 Recordatorios inteligentes</h3>
                  </div>
                  <span className="mono" style={{fontSize:11, color:"#F06D5A"}}>{smartReminders.filter(r=>r.urgent).length} urgentes</span>
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
                <div className="reminder-foot">
                  <Icon name="sparkle" size={12}/> Actualizado hace 3 min · Basado en 47 interacciones
                </div>
              </div>
            </section>

            {/* Historial 360 */}
            <div id="sec-leads" style={{marginTop:14}}>
              <div className="crm-card glass">
                <div className="crm-card-head">
                  <div>
                    <div className="crm-card-eyebrow">Historial 360°</div>
                    <h3 className="crm-card-title">Mis leads activos</h3>
                  </div>
                  <div className="crm-seg">
                    {["Todos", "Hot", "Warm", "Cold"].map(f => (
                      <button key={f} className={"crm-seg-btn" + (f === "Todos" ? " active" : "")}>{f}</button>
                    ))}
                  </div>
                </div>
                <div className="lead360">
                  <div className="lead-list">
                    {myLeads.map((l, i) => (
                      <button key={i} className={"lead-row" + (i === selLead ? " active" : "")} onClick={() => setSelLead(i)}>
                        <span className="lead-heat" style={{background: heatColor[l.heat]}}></span>
                        <div style={{flex:1, minWidth:0}}>
                          <div style={{fontSize:13, fontWeight:600, whiteSpace:"nowrap", overflow:"hidden", textOverflow:"ellipsis"}}>{l.name}</div>
                          <div style={{fontSize:10, color:"rgba(250,250,247,.5)", fontFamily:"var(--mono)", marginTop:2}}>{l.stage} · {l.last}</div>
                        </div>
                        <Icon name="chevron-right" size={12}/>
                      </button>
                    ))}
                  </div>
                  <div className="lead-detail">
                    <div className="ld-head">
                      <div className="crm-avatar big">{lead.name.split(" ").map(s=>s[0]).join("").slice(0,2)}</div>
                      <div style={{flex:1}}>
                        <div style={{fontSize:20, fontFamily:"var(--serif)"}}>{lead.name}</div>
                        <div style={{fontSize:12, color:"rgba(250,250,247,.6)", marginTop:2}}>{heatLbl[lead.heat]} · {lead.phone}</div>
                      </div>
                      <span className={"stage-pill s-" + lead.heat}>{lead.stage}</span>
                    </div>
                    <div className="ld-grid">
                      <div className="ld-box">
                        <div className="ld-lbl">Presupuesto real</div>
                        <div className="ld-val">{lead.budget}</div>
                      </div>
                      <div className="ld-box">
                        <div className="ld-lbl">Interacciones</div>
                        <div className="ld-val">{lead.interactions}</div>
                      </div>
                      <div className="ld-box">
                        <div className="ld-lbl">Último contacto</div>
                        <div className="ld-val">{lead.last}</div>
                      </div>
                    </div>
                    <div className="ld-section">
                      <div className="ld-lbl">Propiedades vistas</div>
                      <div className="ld-tags">
                        {lead.seen.map((s, i) => <span key={i} className="ld-tag">{s}</span>)}
                      </div>
                    </div>
                    {lead.objections.length > 0 && (
                      <div className="ld-section">
                        <div className="ld-lbl">Objeciones planteadas</div>
                        <ul className="ld-list">
                          {lead.objections.map((o, i) => <li key={i}>{o}</li>)}
                        </ul>
                      </div>
                    )}
                    <div className="ld-section">
                      <div className="ld-lbl">Notas del agente</div>
                      <p className="ld-notes">{lead.notes}</p>
                    </div>
                    <div className="ld-actions">
                      <button className="btn btn-orange btn-sm"><Icon name="phone" size={13}/> Llamar</button>
                      <button className="btn btn-ghost btn-sm"><Icon name="message" size={13}/> Mensaje</button>
                      <button className="btn btn-ghost btn-sm"><Icon name="check" size={13}/> Agendar</button>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>

          {/* ============= BLOQUE 3 · MERCADO ============= */}
          <div id="sec-market" className="crm-block">
            <div className="block-head">
              <div className="block-eyebrow">Bloque 03 · Inteligencia</div>
              <h2 className="block-title">Mercado y propiedades</h2>
            </div>

            <section className="crm-row-mkt">
              {/* Inventario en tiempo real */}
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
                        <div style={{fontSize:13, fontWeight:600, whiteSpace:"nowrap", overflow:"hidden", textOverflow:"ellipsis"}}>{h.title}</div>
                        <div style={{fontSize:11, color:"rgba(250,250,247,.55)", marginTop:3, display:"flex", gap:8, alignItems:"center"}}>
                          <span className={"rot-tag " + h.trend}>{h.change}</span>
                          <span>{h.days}d activa</span>
                        </div>
                      </div>
                      <div className="rot-bar">
                        <div className="rot-fill" style={{width: h.rotation + "%"}}></div>
                      </div>
                    </div>
                  ))}
                </div>
              </div>

              {/* Mapa de calor */}
              <div className="crm-card glass">
                <div className="crm-card-head">
                  <div>
                    <div className="crm-card-eyebrow">Geo-intensidad</div>
                    <h3 className="crm-card-title">🗺 Mapa de calor CDMX</h3>
                  </div>
                  <span className="mono" style={{fontSize:11, color:"rgba(250,250,247,.5)"}}>56 leads · 30d</span>
                </div>
                <div className="heatmap">
                  <svg viewBox="0 0 100 100" preserveAspectRatio="none" style={{width:"100%", height:220}}>
                    <defs>
                      <radialGradient id="heatBlob" cx="50%" cy="50%" r="50%">
                        <stop offset="0%" stopColor="#F06D5A" stopOpacity="0.9"/>
                        <stop offset="100%" stopColor="#F06D5A" stopOpacity="0"/>
                      </radialGradient>
                    </defs>
                    {/* CDMX contour abstract */}
                    <path d="M20 20 L80 15 L85 45 L78 80 L30 85 L15 55 Z" fill="rgba(250,250,247,.04)" stroke="rgba(250,250,247,.1)" strokeWidth="0.3"/>
                    {/* Street grid */}
                    {[30, 45, 60, 75].map(y => <line key={y} x1="15" x2="85" y1={y} y2={y} stroke="rgba(250,250,247,.04)" strokeWidth="0.2"/>)}
                    {[30, 45, 60, 75].map(x => <line key={x} x1={x} x2={x} y1="15" y2="85" stroke="rgba(250,250,247,.04)" strokeWidth="0.2"/>)}
                    {/* Heat zones */}
                    {heatmapZones.map((z, i) => (
                      <g key={z.name}>
                        <circle cx={z.x} cy={z.y} r={z.intensity / 8} fill="url(#heatBlob)" opacity={z.intensity/100}/>
                        <circle cx={z.x} cy={z.y} r="1.5" fill="#F06D5A"/>
                        <text x={z.x} y={z.y - 4} fill="#FAFAF7" fontSize="2.6" textAnchor="middle" fontFamily="Inter" fontWeight="600">{z.name}</text>
                        <text x={z.x} y={z.y + 5.5} fill="rgba(250,250,247,.7)" fontSize="2" textAnchor="middle" fontFamily="JetBrains Mono">{z.leads} leads</text>
                      </g>
                    ))}
                  </svg>
                </div>
                <div className="heatmap-scale">
                  <span>Menos</span>
                  <div className="heat-grad"></div>
                  <span>Más</span>
                </div>
              </div>

              {/* CMA Express */}
              <div className="crm-card glass" id="sec-cma">
                <div className="crm-card-head">
                  <div>
                    <div className="crm-card-eyebrow">CMA Express</div>
                    <h3 className="crm-card-title">Comparativa de mercado</h3>
                  </div>
                  <button className="btn btn-orange btn-sm"><Icon name="sparkle" size={13}/> Generar PDF</button>
                </div>
                <div className="cma-target">
                  <div>
                    <div style={{fontSize:11, color:"rgba(250,250,247,.55)"}}>Propiedad</div>
                    <div style={{fontSize:15, fontWeight:600, marginTop:2}}>{cmaTarget.title}</div>
                  </div>
                  <div style={{textAlign:"right"}}>
                    <div style={{fontSize:11, color:"rgba(250,250,247,.55)"}}>Precio solicitado</div>
                    <div style={{fontSize:16, fontWeight:700, color:"#F06D5A"}}>{fmtMXN(cmaTarget.ask, true)}</div>
                  </div>
                </div>

                <div className="cma-table">
                  <div className="cma-row head">
                    <span>Comparable</span>
                    <span>m²</span>
                    <span>Precio</span>
                    <span>MXN/m²</span>
                    <span>Estado</span>
                  </div>
                  {cmaComps.map((c, i) => (
                    <div key={i} className="cma-row">
                      <span>{c.addr}</span>
                      <span className="mono">{c.m2}</span>
                      <span className="mono">{fmtMXN(c.price, true)}</span>
                      <span className="mono" style={{color:"#F06D5A"}}>${Math.round(c.price/c.m2/1000)}k</span>
                      <span><span className={"cma-status " + c.status}>{c.status}</span></span>
                    </div>
                  ))}
                </div>
                <div className="cma-summary">
                  <div><span className="mono">Precio/m² promedio</span><strong>${cmaAvg.toLocaleString()}</strong></div>
                  <div><span className="mono">Tu precio/m²</span><strong style={{color:"#F06D5A"}}>${Math.round(cmaTarget.ask/220).toLocaleString()}</strong></div>
                  <div><span className="mono">Posición</span><strong style={{color:"#4FB97A"}}>En rango de mercado</strong></div>
                </div>
              </div>
            </section>
          </div>

          {/* ============= BLOQUE 4 · KPIs ============= */}
          <div id="sec-kpis" className="crm-block">
            <div className="block-head">
              <div className="block-eyebrow">Bloque 04 · Rendimiento</div>
              <h2 className="block-title">Mis métricas</h2>
            </div>

            <section className="crm-row-kpi">
              {/* Cuota mensual */}
              <div className="crm-card glass">
                <div className="crm-card-eyebrow">Progreso de cuota</div>
                <h3 className="crm-card-title" style={{marginBottom:16}}>Meta abril</h3>
                <div className="quota-viz">
                  <svg viewBox="0 0 120 120" width="160" height="160">
                    <circle cx="60" cy="60" r="50" stroke="rgba(250,250,247,.08)" strokeWidth="10" fill="none"/>
                    <circle cx="60" cy="60" r="50" stroke="url(#quotaGrad)" strokeWidth="10" fill="none" strokeDasharray={`${2*Math.PI*50*monthQuota.pct/100} ${2*Math.PI*50}`} strokeLinecap="round" transform="rotate(-90 60 60)"/>
                    <defs>
                      <linearGradient id="quotaGrad" x1="0" x2="1" y1="0" y2="1">
                        <stop offset="0%" stopColor="#F06D5A"/>
                        <stop offset="100%" stopColor="#C21927"/>
                      </linearGradient>
                    </defs>
                  </svg>
                  <div className="quota-center">
                    <div className="quota-val">{monthQuota.pct}%</div>
                    <div className="quota-lbl">de tu meta</div>
                  </div>
                </div>
                <div className="quota-breakdown">
                  <div><span className="mono">Cerrado</span><strong>${monthQuota.sold.toLocaleString()}</strong></div>
                  <div><span className="mono">Meta</span><strong>${monthQuota.goal.toLocaleString()}</strong></div>
                  <div><span className="mono">Faltan</span><strong style={{color:"#F06D5A"}}>${(monthQuota.goal-monthQuota.sold).toLocaleString()}</strong></div>
                </div>
                <div className="quota-days">
                  <span>Te quedan <strong>11 días</strong> · ritmo necesario: <strong style={{color:"#F06D5A"}}>$5,780/día</strong></span>
                </div>
              </div>

              {/* Tasa de efectividad */}
              <div className="crm-card glass">
                <div className="crm-card-eyebrow">Tasa de efectividad</div>
                <h3 className="crm-card-title" style={{marginBottom:14}}>Conversiones clave</h3>
                <div className="efficacy">
                  <div className="eff-row">
                    <div>
                      <div className="eff-lbl">Visita → Oferta</div>
                      <div className="eff-sub mono">{effectiveness.offers} ofertas / {effectiveness.visits} visitas</div>
                    </div>
                    <div className="eff-val" style={{color:"#E8C28C"}}>{effectiveness.visitToOffer}%</div>
                  </div>
                  <div className="eff-bar"><div className="eff-fill" style={{width: effectiveness.visitToOffer + "%", background:"#E8C28C"}}></div></div>

                  <div className="eff-row">
                    <div>
                      <div className="eff-lbl">Oferta → Cierre</div>
                      <div className="eff-sub mono">{effectiveness.closed} cierres / {effectiveness.offers} ofertas</div>
                    </div>
                    <div className="eff-val" style={{color:"#F06D5A"}}>{effectiveness.offerToClose}%</div>
                  </div>
                  <div className="eff-bar"><div className="eff-fill" style={{width: effectiveness.offerToClose + "%", background:"#F06D5A"}}></div></div>

                  <div className="eff-row">
                    <div>
                      <div className="eff-lbl">Visita → Cierre (global)</div>
                      <div className="eff-sub mono">End-to-end</div>
                    </div>
                    <div className="eff-val" style={{color:"#4FB97A"}}>{effectiveness.visitToClose}%</div>
                  </div>
                  <div className="eff-bar"><div className="eff-fill" style={{width: effectiveness.visitToClose*3 + "%", background:"#4FB97A"}}></div></div>

                  <div style={{marginTop:14, paddingTop:12, borderTop:"1px solid rgba(250,250,247,.06)"}}>
                    <div style={{fontSize:11, color:"rgba(250,250,247,.5)", marginBottom:6}}>9 días de racha</div>
                    <svg viewBox="0 0 300 60" preserveAspectRatio="none" style={{width:"100%", height:40}}>
                      <defs>
                        <linearGradient id="perfGrad" x1="0" x2="0" y1="0" y2="1">
                          <stop offset="0%" stopColor="#F06D5A" stopOpacity="0.4"/>
                          <stop offset="100%" stopColor="#F06D5A" stopOpacity="0"/>
                        </linearGradient>
                      </defs>
                      <path d={perfPath + ` L 296 56 L 4 56 Z`} fill="url(#perfGrad)"/>
                      <path d={perfPath} fill="none" stroke="#F06D5A" strokeWidth="1.8" strokeLinecap="round"/>
                    </svg>
                  </div>
                </div>
              </div>

              {/* Ingresos proyectados */}
              <div className="crm-card glass">
                <div className="crm-card-eyebrow">💰 Comisiones proyectadas</div>
                <h3 className="crm-card-title" style={{marginBottom:16}}>${projectedIncome.forecast.toLocaleString()}</h3>
                <div style={{fontSize:11, color:"rgba(250,250,247,.55)", marginBottom:14}}>Estimado ponderado por probabilidad</div>
                <div className="income-stages">
                  {projectedIncome.byStage.map((s, i) => (
                    <div key={i} className="income-row">
                      <div>
                        <div style={{display:"flex", alignItems:"center", gap:8}}>
                          <span className="inc-dot" style={{background: s.color}}></span>
                          <span style={{fontSize:13, fontWeight:500}}>{s.stage}</span>
                        </div>
                        <div style={{fontSize:10, color:"rgba(250,250,247,.5)", fontFamily:"var(--mono)", marginTop:3, marginLeft:16}}>
                          ${s.amount.toLocaleString()} × {s.prob}% prob.
                        </div>
                      </div>
                      <div style={{textAlign:"right"}}>
                        <div style={{fontFamily:"var(--mono)", fontSize:13, fontWeight:700, color:"#FAFAF7"}}>${Math.round(s.amount*s.prob/100).toLocaleString()}</div>
                      </div>
                    </div>
                  ))}
                </div>
                <div className="income-foot">
                  <div style={{fontSize:11, color:"rgba(250,250,247,.55)"}}>Confirmado (pagado + firma)</div>
                  <div style={{fontFamily:"var(--mono)", fontSize:16, fontWeight:700, color:"#4FB97A"}}>${(projectedIncome.confirmed + projectedIncome.inProgress).toLocaleString()}</div>
                </div>
                <button className="btn btn-ghost btn-sm" style={{width:"100%", justifyContent:"center", marginTop:10}}>Ver historial →</button>
              </div>
            </section>
          </div>

          {/* ============= INVENTARIO PERSONAL ============= */}
          <div id="sec-listings" className="crm-block">
            <div className="crm-card glass">
              <div className="crm-card-head">
                <div>
                  <div className="crm-card-eyebrow">Inventario personal</div>
                  <h3 className="crm-card-title">Mis propiedades</h3>
                </div>
                <button className="crm-btn-ghost">+ Publicar</button>
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
};

Object.assign(window, { AgentCRM });
