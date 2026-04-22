import { Property } from "../types/property";

export class EasyBrokerService {
  private apiUrl: string = "https://api.easybroker.com/v1";
  private apiKey: string;

  constructor() {
    this.apiKey = process.env.NEXT_PUBLIC_EASYBROKER_API_KEY || "";
  }

  /**
   * Obtiene las propiedades desde EasyBroker
   */
  async fetchProperties(page: number = 1): Promise<any> {
    if (!this.apiKey) {
      console.warn("EasyBroker API Key no configurada.");
      return { content: [] };
    }

    try {
      const response = await fetch(`${this.apiUrl}/properties?page=${page}&limit=50`, {
        headers: {
          'X-Authorization': this.apiKey,
          'accept': 'application/json'
        }
      });
      
      if (!response.ok) throw new Error(`EB API Error: ${response.statusText}`);
      
      return await response.json();
    } catch (e) {
      console.error("Error al consultar EasyBroker:", e);
      return { content: [] };
    }
  }

  /**
   * Mapea un objeto de EasyBroker a nuestra interfaz Property
   */
  mapEBToProperty(ebItem: any): Partial<Property> {
    return {
      title: ebItem.title,
      price: ebItem.property_files?.[0]?.price || 0,
      location: `${ebItem.location?.name || ''}, ${ebItem.location?.city || ''}`,
      bedrooms: ebItem.bedrooms || 0,
      bathrooms: ebItem.bathrooms || 0,
      parking: ebItem.parking_spaces || 0,
      description: ebItem.description,
      images: ebItem.property_images?.map((img: any) => img.url) || [],
      type: ebItem.property_type,
      operation: ebItem.operations?.[0]?.type || 'sale',
      amenities: ebItem.features || [],
      colonia: ebItem.location?.name,
      city: ebItem.location?.city,
      state: ebItem.location?.state
    };
  }

  /**
   * Sincroniza los datos con Supabase
   */
  async syncWithSupabase(supabaseClient: any): Promise<{ total: number, processed: number }> {
    let page = 1;
    let hasMore = true;
    let processed = 0;
    let total = 0;

    while (hasMore && page <= 10) { // Limit to 10 pages (500 properties) to avoid timeouts
      const data = await this.fetchProperties(page);
      if (!data.content || data.content.length === 0) {
        hasMore = false;
        break;
      }

      total = data.pagination?.total || total;
      
      const propertiesToUpsert = data.content.map((item: any) => ({
        external_id: item.public_id,
        title: item.title,
        price: item.operations?.[0]?.amount || 0,
        currency: item.operations?.[0]?.currency || 'MXN',
        location: `${item.location?.name || ''}, ${item.location?.city || ''}`,
        colonia: item.location?.name,
        city: item.location?.city,
        state: item.location?.state,
        type: item.property_type,
        operation: item.operations?.[0]?.type || 'sale',
        bedrooms: item.bedrooms || 0,
        bathrooms: item.bathrooms || 0,
        parking: item.parking_spaces || 0,
        lot_size: item.lot_size || 0,
        construction_size: item.construction_size || 0,
        description: item.description,
        images: item.property_images?.map((img: any) => img.url) || [],
        amenities: item.features || [],
        status: 'active',
        updated_at: new Date()
      }));

      const { error } = await supabaseClient
        .from('properties')
        .upsert(propertiesToUpsert, { onConflict: 'external_id' });

      if (error) {
        console.error(`Error syncing page ${page}:`, error);
      } else {
        processed += propertiesToUpsert.length;
      }

      page++;
      if (page > data.pagination.total_pages) hasMore = false;
    }

    return { total, processed };
  }
}

export const easyBroker = new EasyBrokerService();
