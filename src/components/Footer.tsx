import React from 'react';
import Logo from './Logo';

const Footer: React.FC = () => (
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

export default Footer;
