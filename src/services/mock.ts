import { AIService, MessagingService, CRMService } from "./index";
import { PROPERTIES } from "../data";
import { Property } from "../types/property";

export const MockAIService: AIService = {
  async generateDescription(property: Partial<Property>) {
    return `Esta es una descripción generada automáticamente para ${property.title}. Una excelente oportunidad en ${property.location}.`;
  },
  async analyzeLeadInterest(interactions: any[]) {
    return Math.floor(Math.random() * 100);
  },
  async suggestPropertyResponse(message: string, context: any) {
    return "Hola, gracias por tu interés. ¿Te gustaría agendar una visita?";
  },
  async suggestAction(message: string, context: any) {
    return { action: 'NONE' };
  },
  async checkSpam(message: string) {
    return { isSpam: false };
  }
};

export const MockMessagingService: MessagingService = {
  async sendMessage(to: string, content: string) {
    console.log(`[Mock WhatsApp] Enviando a ${to}: ${content}`);
    return true;
  },
  async sendTemplate(to: string, templateName: string, variables: Record<string, string>) {
    console.log(`[Mock WhatsApp Template] Enviando ${templateName} a ${to}`, variables);
    return true;
  },
  onMessageReceived(callback: (msg: any) => void) {
    // Simular recepción en el futuro
  }
};

export const MockCRMService: CRMService = {
  async getProperties(filters?: any) {
    return PROPERTIES;
  },
  async getPropertyById(id: string) {
    return PROPERTIES.find(p => p.id === id) || null;
  },
  async saveLead(lead: any) {
    console.log("[Mock CRM] Guardando lead:", lead);
    return "lead_" + Math.random().toString(36).substr(2, 9);
  },
  async getLeads(agentId?: string) {
    return [
      { id: '1', name: 'Javier M.', phone: '5512345678', email: 'javier@example.com', property_id: '1', interest_level: 85, status: 'interested', created_at: new Date(), last_contact_at: new Date(), interactions: 12, notes: "Busca casa cerca de Polanco" },
      { id: '2', name: 'Sofia R.', phone: '5587654321', email: 'sofia@example.com', property_id: '2', interest_level: 40, status: 'active', created_at: new Date(), last_contact_at: new Date(), interactions: 3, notes: "Preguntó por estacionamiento" }
    ];
  },
  async getAgents() {
    return [
      { id: '1', full_name: 'Paulina López', role: 'agent', license_id: 'AMPI 9214' }
    ];
  },
  async scheduleAppointment(appointment: any) {
    console.log("[Mock CRM] Agendando cita:", appointment);
    return true;
  }
};
