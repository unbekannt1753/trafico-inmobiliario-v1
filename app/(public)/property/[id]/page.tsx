import React from 'react';
import { Metadata } from 'next';
import { services } from '@/src/services/factory';
import PropertyDetailClient from './PropertyDetailClient';

interface Props {
  params: { id: string };
}

/**
 * Genera metadata dinámica para SEO
 */
export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const property = await services.getCRM().getPropertyById(params.id);
  
  if (!property) {
    return {
      title: 'Propiedad no encontrada | Tráfico Inmobiliario',
    };
  }

  return {
    title: `${property.title} | ${property.city} | Tráfico Inmobiliario`,
    description: property.desc.substring(0, 160),
    openGraph: {
      title: property.title,
      description: property.desc.substring(0, 160),
      images: property.images || [],
    },
    twitter: {
      card: 'summary_large_image',
      title: property.title,
      description: property.desc.substring(0, 160),
    }
  };
}

export default async function Page({ params }: Props) {
  const property = await services.getCRM().getPropertyById(params.id);

  if (!property) {
    return (
      <div className="container" style={{padding: "100px 20px", textAlign: "center"}}>
        <h1 className="serif">Propiedad no encontrada</h1>
        <p>Lo sentimos, no pudimos encontrar la propiedad que buscas.</p>
      </div>
    );
  }

  return <PropertyDetailClient property={property} />;
}
