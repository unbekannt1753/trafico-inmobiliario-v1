import { Property } from "../types/property";

/**
 * AI Service Interface (Gemini)
 */
export interface AIService {
  generateDescription(property: Partial<Property>): Promise<string>;
  analyzeLeadInterest(interactions: any[]): Promise<number>; // Scoring 0-100
  suggestPropertyResponse(message: string, context: any): Promise<string>;
  suggestAction(message: string, context: any): Promise<{ action: 'NONE' | 'SCHEDULE_VISIT' | 'SEND_DETAILS', details?: any }>;
  checkSpam(message: string): Promise<{ isSpam: boolean; reason?: string }>;
}

/**
 * Messaging Service Interface (WhatsApp / Evolution API)
 */
export interface MessagingService {
  sendMessage(to: string, content: string): Promise<boolean>;
  sendTemplate(to: string, templateName: string, variables: Record<string, string>): Promise<boolean>;
  onMessageReceived(callback: (msg: any) => void): void;
}

/**
 * CRM / Database Service Interface (Supabase / EasyBroker)
 */
export interface CRMService {
  getProperties(filters?: any): Promise<Property[]>;
  getPropertyById(id: string): Promise<Property | null>;
  saveLead(lead: any): Promise<string>; // returns lead ID
  getLeads(agentId?: string): Promise<any[]>;
  getAgents(): Promise<any[]>;
  scheduleAppointment(appointment: any): Promise<boolean>;
}
