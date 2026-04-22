import { MessagingService } from "./index";

export class EvolutionWhatsAppService implements MessagingService {
  private apiUrl: string;
  private apikey: string;
  private instance: string;

  constructor() {
    this.apiUrl = process.env.NEXT_PUBLIC_EVOLUTION_API_URL || "";
    this.apikey = process.env.NEXT_PUBLIC_EVOLUTION_API_KEY || "";
    this.instance = process.env.NEXT_PUBLIC_EVOLUTION_INSTANCE || "TraficoInmobiliario";
  }

  async sendMessage(to: string, content: string): Promise<boolean> {
    if (!this.apiUrl) {
      console.log("[Mock WhatsApp] Enviando mensaje a", to, ":", content);
      return true;
    }

    try {
      const response = await fetch(`${this.apiUrl}/message/sendText/${this.instance}`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          'apikey': this.apikey
        },
        body: JSON.stringify({
          number: to,
          text: content
        })
      });
      return response.ok;
    } catch (e) {
      console.error("WhatsApp Send Error:", e);
      return false;
    }
  }

  async sendTemplate(to: string, templateName: string, variables: Record<string, string>): Promise<boolean> {
    // Implementación específica de Evolution API para plantillas
    return true;
  }

  onMessageReceived(callback: (msg: any) => void): void {
    // Aquí se configuraría el Webhook o WebSocket
  }
}

export const whatsappService = new EvolutionWhatsAppService();
