const Favorites = ({ goto, favs, toggleFav }) => {
  const favProps = PROPERTIES.filter(p => favs.has(p.id));

  return (
    <div className="page-fade">
      <div className="container" style={{padding: "60px 32px 120px"}}>
        <div style={{display:"flex", alignItems:"flex-end", justifyContent:"space-between", flexWrap:"wrap", gap:20, marginBottom:48}}>
          <div>
            <div className="eyebrow" style={{marginBottom:16}}><span className="dot"></span>Tu colección</div>
            <h1 className="display" style={{fontSize:"clamp(48px, 7vw, 96px)", margin:0}}>
              Favoritos<span style={{color:"var(--orange)", fontStyle:"italic"}}>.</span>
            </h1>
            <p style={{color:"var(--ink-soft)", marginTop:14, fontSize:16, maxWidth:460}}>
              {favProps.length > 0
                ? `${favProps.length} ${favProps.length === 1 ? "propiedad guardada" : "propiedades guardadas"}. Tráfico te avisa cuando bajan de precio o reciben visitas.`
                : "Guarda propiedades con el corazón y te avisamos cuando bajan de precio o reciben visitas."}
            </p>
          </div>
          {favProps.length > 0 && (
            <div style={{display:"flex", gap:10}}>
              <button className="btn btn-ghost btn-sm"><Icon name="share" size={14}/> Compartir lista</button>
              <button className="btn btn-dark btn-sm"><Icon name="sparkle" size={14}/> Comparar</button>
            </div>
          )}
        </div>

        {favProps.length > 0 ? (
          <div className="grid-3">
            {favProps.map((p, i) => (
              <PropertyCard key={p.id} p={p} onOpen={(pr) => goto("detail", { id: pr.id })} favs={favs} toggleFav={toggleFav} seed={i}/>
            ))}
          </div>
        ) : (
          <div className="fav-empty">
            <div style={{width:64, height:64, borderRadius:"50%", background:"var(--orange-wash)", color:"var(--orange)", display:"grid", placeItems:"center", margin:"0 auto 20px"}}>
              <Icon name="heart" size={28}/>
            </div>
            <h3>Aún nada guardado</h3>
            <p style={{color:"var(--ink-soft)", maxWidth:380, margin:"12px auto 28px"}}>
              Explora el catálogo y toca el corazón en las propiedades que te gusten. Las encontrarás aquí.
            </p>
            <button className="btn btn-primary" onClick={() => goto("search")}>
              Explorar propiedades <Icon name="arrow-right" size={14}/>
            </button>
          </div>
        )}

        {favProps.length > 0 && (
          <div style={{marginTop:80, padding:40, background:"var(--ink)", color:"var(--bg)", borderRadius:"var(--radius-xl)", display:"grid", gridTemplateColumns:"1fr 1fr", gap:40, alignItems:"center"}}>
            <div>
              <div className="eyebrow" style={{color:"var(--orange)", marginBottom:14}}><span className="dot" style={{background:"var(--orange)"}}></span>Alertas activas</div>
              <div style={{fontFamily:"var(--serif)", fontSize:40, lineHeight:1.05}}>
                Avísame cuando <span style={{color:"var(--orange)", fontStyle:"italic"}}>bajen</span> de precio.
              </div>
            </div>
            <div>
              <p style={{color:"rgba(250,250,247,.7)", lineHeight:1.6, marginBottom:20}}>
                Tráfico monitorea tus favoritos. Te mandamos email y WhatsApp cuando cambian precio, reciben ofertas o pierden disponibilidad.
              </p>
              <button className="btn btn-primary">Activar alertas</button>
            </div>
          </div>
        )}
      </div>
    </div>
  );
};

Object.assign(window, { Favorites });
