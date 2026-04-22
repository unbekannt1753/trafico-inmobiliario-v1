export type LeadStatus = 'new' | 'contacted' | 'qualified' | 'appointment' | 'closed' | 'spam';
export type LeadHeat = 'hot' | 'warm' | 'cold';

export interface Lead {
  id: string;
  easybroker_id?: string;
  name: string;
  phone: string;
  email?: string;
  source?: string;
  property_id?: string;
  agent_id?: string;
  status: LeadStatus;
  heat: LeadHeat;
  qualification?: {
    budget?: number;
    zone?: string;
    urgency?: string;
    property_type?: string;
    score: number;
  };
  ai_report?: string;
  created_at: string;
  updated_at: string;
}
