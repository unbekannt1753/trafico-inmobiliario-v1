export interface Property {
  id: string;
  public_id?: string;
  title: string;
  type: string;
  operation: 'venta' | 'renta' | string;
  price: number;
  location: string;
  city?: string;
  colonia?: string;
  beds?: number;
  baths?: number;
  m2?: number;
  parking?: number;
  year?: number | null;
  featured?: boolean;
  tag?: string;
  desc?: string;
  specs?: Array<[string, string]>;
  amenities?: string[];
  agent?: {
    name: string;
    role?: string;
    rating?: number;
    reviews?: number;
    initials?: string;
    id?: string;
  };
  palette?: string[];
  accent?: string;
  created_at?: string;
  updated_at?: string;
}
