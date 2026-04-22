import { PROPERTIES } from "../data";
import { supabase } from "../lib/supabase";

export async function seedProperties() {
  console.log("Seeding properties...");
  
  // Clean first (optional, be careful)
  // await supabase.from('properties').delete().neq('id', '00000000-0000-0000-0000-000000000000');

  const formatted = PROPERTIES.map(p => ({
    title: p.title,
    price: p.price,
    currency: 'MXN',
    location: p.location,
    colonia: p.colonia,
    city: p.city,
    state: p.state,
    type: p.type,
    operation: p.operation,
    bedrooms: p.bedrooms,
    bathrooms: p.bathrooms,
    parking: p.parking,
    m2_const: p.m2_const,
    m2_land: p.m2_land,
    description: p.description || p.title,
    amenities: p.amenities,
    images: p.images,
    palette: p.palette,
    is_featured: p.isFeatured
  }));

  const { data, error } = await supabase.from('properties').insert(formatted);
  
  if (error) {
    console.error("Error seeding properties:", error);
  } else {
    console.log("Successfully seeded properties!");
  }
}
