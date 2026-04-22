import React from 'react';
import Icon from './Icon';
import ArchPlaceholder from './ArchPlaceholder';
import { fmtMXN } from '../data';
import { Property } from '../types/property';

interface PropertyCardProps {
  p: Property;
  onOpen: (p: Property) => void;
  favs?: Set<string>;
  toggleFav?: (id: string) => void;
  seed?: number;
}

const PropertyCard: React.FC<PropertyCardProps> = ({ p, onOpen, favs, toggleFav, seed = 0 }) => {
  const isFav = favs?.has(p.id);
  const opLabel = p.operation === "venta" ? "Venta" : p.operation === "renta" ? "Renta" : "Preventa";
  
  return (
    <div className="prop-card" onClick={() => onOpen(p)}>
      <div className="prop-media">
        <ArchPlaceholder palette={p.palette} seed={seed} />
        <div className="tag-row">
          <span className="tag orange">{opLabel}</span>
          {p.tag && <span className="tag">{p.tag}</span>}
        </div>
        <button className={"fav" + (isFav ? " active" : "")} onClick={(e) => { e.stopPropagation(); toggleFav?.(p.id); }}>
          <Icon name={isFav ? "heart-fill" : "heart"} size={16} />
        </button>
      </div>
      <div className="prop-body">
        <div className="prop-price">
          {fmtMXN(p.price, true)}
          <span className="mxn">MXN</span>
          {p.operation === "renta" && <span className="per">/ mes</span>}
        </div>
        <div className="prop-title">{p.title}</div>
        <div className="prop-loc">
          <Icon name="pin" size={13} /> {p.location}
        </div>
        {p.type !== "Terreno" ? (
          <div className="prop-specs">
            <span className="s"><Icon name="bed" size={14}/> {p.beds}</span>
            <span className="s"><Icon name="bath" size={14}/> {p.baths}</span>
            <span className="s"><Icon name="car" size={14}/> {p.parking}</span>
            <span className="s"><Icon name="area" size={14}/> {p.m2} m²</span>
          </div>
        ) : (
          <div className="prop-specs">
            <span className="s"><Icon name="area" size={14}/> {p.m2?.toLocaleString("es-MX")} m²</span>
          </div>
        )}
      </div>
    </div>
  );
};

export default PropertyCard;
