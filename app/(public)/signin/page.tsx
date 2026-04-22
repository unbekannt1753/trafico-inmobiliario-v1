"use client";
import React, { useState } from 'react';
import { useRouter } from 'next/navigation';
import Icon from '@/src/components/Icon';

type SignInMode = "login" | "register";
type AuthMethod = "email" | "phone";
type UserType = "comprador" | "agente" | "propietario";

export default function SignIn() {
  const router = useRouter();
  const [mode, setMode] = useState<SignInMode>("login");
  const [method, setMethod] = useState<AuthMethod>("email");
  const [email, setEmail] = useState("");
  const [phone, setPhone] = useState("");
  const [password, setPassword] = useState("");
  const [name, setName] = useState("");
  const [userType, setUserType] = useState<UserType>("comprador");
  const [showPwd, setShowPwd] = useState(false);
  const [remember, setRemember] = useState(true);
  const [accepted, setAccepted] = useState(false);

  const canSubmit = mode === "login"
    ? ((method === "email" ? email.includes("@") : phone.length >= 10) && password.length >= 4)
    : (name.length >= 2 && email.includes("@") && password.length >= 6 && accepted);

  const submit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!canSubmit) return;
    router.push("/");
  };

  return (
    <div className="page-fade signin-page">
      <div className="signin-wrap">
        {/* Left: editorial panel */}
        <aside className="signin-aside">
          <div className="signin-aside-inner">
            <div className="eyebrow" style={{color:"rgba(250,250,247,.7)"}}>
              <span className="dot" style={{background:"#FAFAF7"}}></span>
              Ingreso · Miembros
            </div>

            <h2 className="signin-hook">
              Tu próximo<br/>
              <span className="it">hogar</span> empieza<br/>
              con un <span style={{color:"var(--orange)"}}>acceso</span>.
            </h2>

            <ul className="signin-benefits">
              <li><span className="mono">01</span> Guarda favoritos en todos tus dispositivos</li>
              <li><span className="mono">02</span> Alertas cuando baje el precio</li>
              <li><span className="mono">03</span> Habla directo con agentes verificados</li>
              <li><span className="mono">04</span> Publica propiedades sin comisión</li>
            </ul>

            <div className="signin-quote">
              <div className="q-mark">"</div>
              <p>En tres días encontré el departamento en Condesa. El agente respondió el mismo día, sin letra chiquita.</p>
              <div className="q-author">
                <div className="q-avatar"><span>MR</span></div>
                <div>
                  <div style={{fontWeight:600, fontSize:13}}>Mariana R.</div>
                  <div style={{fontSize:11, color:"rgba(250,250,247,.6)"}}>CDMX · compradora 2025</div>
                </div>
              </div>
            </div>

            <div className="signin-foot">
              <span>© 2026 Tráfico Inmobiliario</span>
              <span className="mono">Hecho en MX</span>
            </div>
          </div>
        </aside>

        {/* Right: form */}
        <main className="signin-main">
          <div className="signin-topbar">
            <div className="eyebrow"><span className="dot"></span>{mode === "login" ? "Vol. 01 · Ingresar" : "Vol. 01 · Crear cuenta"}</div>
            <button className="btn-link-sm" onClick={() => router.push("/")}>← Volver al inicio</button>
          </div>

          <div className="signin-form-wrap">
            <h1 className="signin-title">
              {mode === "login" ? (<>Hola de <span className="it">nuevo</span>.</>) : (<>Únete a <span className="it">Tráfico</span>.</>)}
            </h1>
            <p className="signin-sub">
              {mode === "login"
                ? "Ingresa para ver tus favoritos, alertas y conversaciones."
                : "Crea tu cuenta gratis. Toma menos de un minuto."}
            </p>

            <div className="signin-toggle">
              <button className={"st-btn" + (mode === "login" ? " active" : "")} onClick={() => setMode("login")}>Ingresar</button>
              <button className={"st-btn" + (mode === "register" ? " active" : "")} onClick={() => setMode("register")}>Crear cuenta</button>
            </div>

            {/* Social */}
            <div className="signin-social">
              <button className="sc-btn">
                <svg width="18" height="18" viewBox="0 0 18 18"><path fill="#4285F4" d="M17.64 9.2c0-.64-.06-1.25-.17-1.84H9v3.48h4.84a4.14 4.14 0 0 1-1.8 2.72v2.26h2.91c1.7-1.57 2.69-3.88 2.69-6.62z"/><path fill="#34A853" d="M9 18c2.43 0 4.47-.8 5.96-2.18l-2.91-2.26c-.8.54-1.83.86-3.05.86-2.35 0-4.34-1.58-5.05-3.71H.94v2.33A9 9 0 0 0 9 18z"/><path fill="#FBBC05" d="M3.95 10.71A5.4 5.4 0 0 1 3.66 9c0-.6.1-1.17.29-1.71V4.96H.94A9 9 0 0 0 0 9c0 1.45.35 2.82.94 4.04l3.01-2.33z"/><path fill="#EA4335" d="M9 3.58c1.32 0 2.5.45 3.44 1.35L15.05 2.3A9 9 0 0 0 9 0 9 9 0 0 0 .94 4.96l3.01 2.33C4.66 5.16 6.65 3.58 9 3.58z"/></svg>
                Continuar con Google
              </button>
              <button className="sc-btn">
                <svg width="18" height="18" viewBox="0 0 18 18" fill="currentColor"><path d="M12.5 0c.1 1-.3 2-.9 2.7-.6.7-1.6 1.3-2.5 1.2-.1-1 .4-2 .9-2.6.7-.7 1.7-1.3 2.5-1.3zM15.7 13.2c-.4.8-.9 1.7-1.5 2.4-.9.9-1.8 1.9-3.1 1.9-1.3 0-1.6-.8-3.1-.8-1.4 0-1.8.8-3 .8-1.3 0-2.3-1-3.2-2C.2 14 0 11.1 1 9c.6-1.4 1.8-2.3 3.1-2.3 1.3 0 2.5.9 3.1.9.6 0 2-1 3.5-1 1.3.1 2.4.7 3.1 1.7-2.8 1.5-2.3 5.4 1.9 4.9z"/></svg>
                Continuar con Apple
              </button>
            </div>

            <div className="signin-div"><span>o con {method === "email" ? "correo" : "teléfono"}</span></div>

            <form onSubmit={submit} className="signin-form">
              {mode === "register" && (
                <label className="f-field">
                  <span className="f-lbl">Nombre completo</span>
                  <input type="text" value={name} onChange={e => setName(e.target.value)} placeholder="Ana García López" autoComplete="name"/>
                </label>
              )}

              <div className="method-switch">
                <button type="button" className={"ms-btn" + (method === "email" ? " active" : "")} onClick={() => setMethod("email")}>
                  <Icon name="mail" size={13}/> Correo
                </button>
                <button type="button" className={"ms-btn" + (method === "phone" ? " active" : "")} onClick={() => setMethod("phone")}>
                  <Icon name="phone" size={13}/> Teléfono
                </button>
              </div>

              {method === "email" ? (
                <label className="f-field">
                  <span className="f-lbl">Correo electrónico</span>
                  <input type="email" value={email} onChange={e => setEmail(e.target.value)} placeholder="tu@correo.com" autoComplete="email"/>
                </label>
              ) : (
                <label className="f-field">
                  <span className="f-lbl">Teléfono</span>
                  <div className="phone-row">
                    <span className="phone-cc">🇲🇽 +52</span>
                    <input type="tel" value={phone} onChange={e => setPhone(e.target.value.replace(/\D/g,''))} placeholder="55 1234 5678" autoComplete="tel" maxLength={10}/>
                  </div>
                </label>
              )}

              <label className="f-field">
                <span className="f-lbl">
                  Contraseña
                  {mode === "login" && <a className="f-link">¿Olvidaste?</a>}
                </span>
                <div className="pwd-row">
                  <input type={showPwd ? "text" : "password"} value={password} onChange={e => setPassword(e.target.value)} placeholder={mode === "register" ? "Mínimo 6 caracteres" : "••••••••"} autoComplete={mode === "login" ? "current-password" : "new-password"}/>
                  <button type="button" className="pwd-eye" onClick={() => setShowPwd(!showPwd)} aria-label="Mostrar">
                    <Icon name={showPwd ? "eye-off" : "eye"} size={15}/>
                  </button>
                </div>
                {mode === "register" && password.length > 0 && (
                  <div className="pwd-meter">
                    <div className={"pm-bar" + (password.length >= 6 ? " ok" : password.length >= 3 ? " mid" : " weak")}></div>
                    <span className="mono">{password.length >= 10 ? "Fuerte" : password.length >= 6 ? "OK" : "Débil"}</span>
                  </div>
                )}
              </label>

              {mode === "register" && (
                <div className="f-field">
                  <span className="f-lbl">Soy</span>
                  <div className="user-type">
                    {[
                      { id: "comprador", label: "Comprador / Rentador", desc: "Busco un inmueble" },
                      { id: "propietario", label: "Propietario", desc: "Quiero vender o rentar" },
                      { id: "agente", label: "Agente inmobiliario", desc: "Cédula AMPI" },
                    ].map(t => (
                      <label key={t.id} className={"ut-card" + (userType === t.id ? " active" : "")}>
                        <input type="radio" name="ut" checked={userType === t.id} onChange={() => setUserType(t.id as UserType)}/>
                        <div>
                          <div className="ut-lbl">{t.label}</div>
                          <div className="ut-desc">{t.desc}</div>
                        </div>
                      </label>
                    ))}
                  </div>
                </div>
              )}

              {mode === "login" ? (
                <label className="checkrow">
                  <input type="checkbox" checked={remember} onChange={() => setRemember(!remember)}/>
                  <span>Mantener sesión iniciada</span>
                </label>
              ) : (
                <label className="checkrow">
                  <input type="checkbox" checked={accepted} onChange={() => setAccepted(!accepted)}/>
                  <span>Acepto los <a className="f-link">Términos</a> y el <a className="f-link">Aviso de privacidad</a></span>
                </label>
              )}

              <button type="submit" className={"btn btn-orange btn-lg signin-submit" + (!canSubmit ? " disabled" : "")} disabled={!canSubmit}>
                {mode === "login" ? "Ingresar" : "Crear mi cuenta"} <Icon name="arrow-right" size={16}/>
              </button>

              <div className="signin-alt">
                {mode === "login" ? (
                  <>¿Primera vez? <a onClick={() => setMode("register")} style={{cursor:"pointer", color:"var(--orange)", fontWeight:500}}>Crea tu cuenta</a></>
                ) : (
                  <>¿Ya tienes cuenta? <a onClick={() => setMode("login")} style={{cursor:"pointer", color:"var(--orange)", fontWeight:500}}>Ingresa</a></>
                )}
              </div>
            </form>

            <div className="signin-legal">
              Al continuar aceptas nuestro uso de cookies esenciales. Verificamos cédulas AMPI para agentes.
            </div>
          </div>
        </main>
      </div>
    </div>
  );
}
