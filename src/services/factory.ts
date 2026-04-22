import { AIService, MessagingService, CRMService } from "./index";
import { supabaseCRM } from "./supabase";
import { geminiAI } from "./gemini";
import { whatsappService } from "./whatsapp";
import { MockAIService, MockCRMService, MockMessagingService } from "./mock";

class ServiceFactory {
  private static instance: ServiceFactory;
  
  private aiService: AIService;
  private messagingService: MessagingService;
  private crmService: CRMService;
  private demoMode: boolean = false;

  private constructor() {
    this.updateServices();
  }

  private updateServices() {
    const hasSupabase = process.env.NEXT_PUBLIC_SUPABASE_URL && process.env.NEXT_PUBLIC_SUPABASE_URL !== 'https://placeholder.supabase.co';
    const hasGemini = !!process.env.NEXT_PUBLIC_GEMINI_API_KEY;
    
    if (this.demoMode) {
      this.aiService = MockAIService;
      this.messagingService = MockMessagingService;
      this.crmService = MockCRMService;
    } else {
      this.aiService = hasGemini ? geminiAI : MockAIService;
      this.messagingService = process.env.NEXT_PUBLIC_EVOLUTION_API_URL ? whatsappService : MockMessagingService;
      this.crmService = hasSupabase ? supabaseCRM : MockCRMService;
    }
  }

  public setMode(demo: boolean) {
    this.demoMode = demo;
    this.updateServices();
  }

  public isDemo(): boolean {
    return this.demoMode;
  }

  public static getInstance(): ServiceFactory {
    if (!ServiceFactory.instance) {
      ServiceFactory.instance = new ServiceFactory();
    }
    return ServiceFactory.instance;
  }

  public getAI(): AIService { return this.aiService; }
  public getMessaging(): MessagingService { return this.messagingService; }
  public getCRM(): CRMService { return this.crmService; }
}

export const services = ServiceFactory.getInstance();
