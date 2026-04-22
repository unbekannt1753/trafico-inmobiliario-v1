"use client";
import React from 'react';
import Link from 'next/link';
import { usePathname } from 'next/navigation';
import Logo from './Logo';
import Icon from './Icon';
import { useAppContext } from '../context/AppContext';

const Nav: React.FC = () => {
  const pathname = usePathname();
  const { favs } = useAppContext();
  const favCount = favs.size;
  
  const links = [
    { id: "/", label: "Inicio" },
    { id: "/search", label: "Comprar" },
    { id: "/search?op=renta", label: "Rentar" },
    { id: "/publish", label: "Publicar" },
  ];

  return (
    <nav className="nav">
      <div className="container nav-inner">
        <div className="nav-left">
          <Link href="/">
            <Logo />
          </Link>
          <div className="nav-links">
            {links.map(l => (
              <Link 
                key={l.id} 
                href={l.id} 
                className={"nav-link" + (pathname === l.id ? " active" : "")}
              >
                {l.label}
              </Link>
            ))}
          </div>
        </div>
        <div className="nav-right">
          <Link href="/crm" className="btn btn-ghost btn-sm" title="Admin">
            <Icon name="grid" size={14}/> Admin
          </Link>
          <Link href="/agent-crm" className="btn btn-ghost btn-sm" title="Agente">
            <Icon name="user" size={14}/> Mi CRM
          </Link>
          <Link href="/favorites" className="btn btn-ghost btn-sm">
            <Icon name="heart" size={14}/> Favoritos {favCount > 0 && <span className="mono" style={{color:"var(--orange)"}}>{favCount}</span>}
          </Link>
          <Link href="/signin" className="btn btn-dark btn-sm">
            <Icon name="user" size={14}/> Ingresar
          </Link>
        </div>
      </div>
    </nav>
  );
};

export default Nav;
