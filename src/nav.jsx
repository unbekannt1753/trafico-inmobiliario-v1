const Nav = ({ route, goto, favCount }) => {
  const links = [
    { id: "home", label: "Inicio" },
    { id: "search", label: "Comprar" },
    { id: "rent", label: "Rentar" },
    { id: "publish", label: "Publicar" },
  ];
  return (
    <nav className="nav">
      <div className="container nav-inner">
        <div className="nav-left">
          <Logo onClick={() => goto("home")} />
          <div className="nav-links">
            {links.map(l => (
              <div key={l.id} className={"nav-link" + (route === l.id ? " active" : "")}
                onClick={() => goto(l.id === "rent" ? "search" : l.id, l.id === "rent" ? { op: "renta" } : null)}>
                {l.label}
              </div>
            ))}
          </div>
        </div>
        <div className="nav-right">
          <button className="btn btn-ghost btn-sm" onClick={() => goto("crm")} title="Admin">
            <Icon name="grid" size={14}/> Admin
          </button>
          <button className="btn btn-ghost btn-sm" onClick={() => goto("agent-crm")} title="Agente">
            <Icon name="user" size={14}/> Mi CRM
          </button>
          <button className="btn btn-ghost btn-sm" onClick={() => goto("favorites")}>
            <Icon name="heart" size={14}/> Favoritos {favCount > 0 && <span className="mono" style={{color:"var(--orange)"}}>{favCount}</span>}
          </button>
          <button className="btn btn-dark btn-sm" onClick={() => goto("signin")}>
            <Icon name="user" size={14}/> Ingresar
          </button>
        </div>
      </div>
    </nav>
  );
};

const Footer = () => (
  <footer className="foot">
    <div className="container">
      <div className="foot-grid">
        <div>
          <Logo />
          <p style={{color:"var(--ink-soft)", fontSize:14, marginTop:16, maxWidth:320, lineHeight:1.55}}>
            La forma mexicana de mover inmuebles. Publica, encuentra y cierra con transparencia.
          </p>
        </div>
        <div>
          <h5>Operaciones</h5>
          <ul>
            <li><a>Casas en venta</a></li>
            <li><a>Departamentos en renta</a></li>
            <li><a>Terrenos</a></li>
            <li><a>Preventa</a></li>
            <li><a>Comerciales</a></li>
          </ul>
        </div>
        <div>
          <h5>Ciudades</h5>
          <ul>
            <li><a>CDMX</a></li>
            <li><a>Guadalajara</a></li>
            <li><a>Monterrey</a></li>
            <li><a>Tulum</a></li>
            <li><a>San Miguel de Allende</a></li>
          </ul>
        </div>
        <div>
          <h5>Compañía</h5>
          <ul>
            <li><a>Nosotros</a></li>
            <li><a>Agentes</a></li>
            <li><a>Blog</a></li>
            <li><a>Prensa</a></li>
            <li><a>Contacto</a></li>
          </ul>
        </div>
      </div>
      <div className="foot-bottom">
        <div>© 2026 Tráfico Inmobiliario · Hecho en México</div>
        <div>Cédula · AMPI · Aviso de privacidad</div>
      </div>
    </div>
  </footer>
);

Object.assign(window, { Nav, Footer });
