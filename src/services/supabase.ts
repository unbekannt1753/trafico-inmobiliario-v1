import { CRMService } from "./index";
import { supabase } from "../lib/supabase";
import { Property } from "../types/property";

export class SupabaseCRMService implements CRMService {
  async getProperties(filters?: any): Promise<Property[]> {
    let query = supabase.from('properties').select('*');
    
    if (filters?.type) query = query.eq('type', filters.type);
    if (filters?.city) query = query.eq('city', filters.city);
    
    const { data, error } = await query;
    if (error) {
      console.error("Error fetching properties:", error);
      return [];
    }
    return data as unknown as Property[];
  }

  async getPropertyById(id: string): Promise<Property | null> {
    const { data, error } = await supabase
      .from('properties')
      .select('*')
      .eq('id', id)
      .single();
      
    if (error) {
      console.error(`Error fetching property ${id}:`, error);
      return null;
    }
    return data as unknown as Property;
  }

  async saveLead(lead: any): Promise<string> {
    const { data, error } = await supabase
      .from('leads')
      .insert([lead])
      .select()
      .single();
      
    if (error) {
      console.error("Error saving lead:", error);
      throw error;
    }
    return data.id;
  }

  async getLeads(agentId?: string): Promise<any[]> {
    let query = supabase.from('leads').select('*, property:properties(title)');
    
    if (agentId) query = query.eq('agent_id', agentId);
    
    const { data, error } = await query;
    if (error) {
      console.error("Error fetching leads:", error);
      return [];
    }
    return data;
  }

  async scheduleAppointment(appointment: any): Promise<boolean> {
    const { error } = await supabase
      .from('appointments')
      .insert([appointment]);
      
    if (error) {
      console.error("Error scheduling appointment:", error);
      return false;
    }
    return true;
  }

  async getAgents(): Promise<any[]> {
    const { data, error } = await supabase
      .from('profiles')
      .select('*')
      .eq('role', 'agent');
      
    if (error) {
      console.error("Error fetching agents:", error);
      return [];
    }
    return data;
  }
}

export const supabaseCRM = new SupabaseCRMService();
