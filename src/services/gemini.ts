import { AIService } from "./index";
import { GoogleGenerativeAI } from "@google/generative-ai";
import { Property } from "../types/property";

export class GeminiAIService implements AIService {
  private genAI: GoogleGenerativeAI;
  private model: any;

  constructor() {
    const apiKey = process.env.NEXT_PUBLIC_GEMINI_API_KEY || "";
    this.genAI = new GoogleGenerativeAI(apiKey);
    this.model = this.genAI.getGenerativeModel({ model: "gemini-1.5-flash" });
  }

  async generateDescription(property: Partial<Property>): Promise<string> {
    if (!process.env.NEXT_PUBLIC_GEMINI_API_KEY) return "Configura GEMINI_API_KEY para generar descripciones.";
    
    const prompt = `Actúa como un experto en marketing inmobiliario de Tráfico Inmobiliario. 
    Crea una descripción persuasiva, elegante y optimizada para SEO para esta propiedad:
    Título: ${property.title}
    Precio: ${property.price} ${property.currency}
    Ubicación: ${property.location}
    Tipo: ${property.type}
    Características: ${property.bedrooms} recámaras, ${property.bathrooms} baños, ${property.parking} estacionamientos.
    Amenidades: ${property.amenities?.join(", ")}
    
    Estructura la descripción con:
    1. Un gancho emocional.
    2. Puntos clave (Bullet points).
    3. Llamado a la acción (CTA) para agendar una cita.
    
    La descripción debe ser en español y reflejar el prestigio de Tráfico Inmobiliario.`;

    try {
      const result = await this.model.generateContent(prompt);
      const response = await result.response;
      return response.text();
    } catch (e) {
      console.error("Gemini Error:", e);
      return "Error al generar la descripción con IA.";
    }
  }

  async analyzeLeadInterest(interactions: any[]): Promise<number> {
    if (!process.env.NEXT_PUBLIC_GEMINI_API_KEY) return 50;

    const interactionText = interactions.map(i => `${i.role}: ${i.content}`).join("\n");
    const prompt = `Analiza la siguiente conversación entre un cliente y una IA inmobiliaria. 
    Determina el nivel de interés del cliente en una escala del 0 al 100, donde:
    - 0-30: Frío (Spam, curiosidad sin intención, lenguaje agresivo).
    - 31-70: Tibio (Pregunta detalles pero no agenda).
    - 71-100: Caliente (Pregunta disponibilidad, pide cita, habla de presupuesto).
    
    Conversación:
    ${interactionText}
    
    Responde ÚNICAMENTE con el número del score.`;

    try {
      const result = await this.model.generateContent(prompt);
      const response = await result.response;
      const score = parseInt(response.text().trim());
      return isNaN(score) ? 50 : score;
    } catch (e) {
      return 50;
    }
  }

  async suggestPropertyResponse(message: string, context: any): Promise<string> {
    if (!process.env.NEXT_PUBLIC_GEMINI_API_KEY) return "Hola, gracias por contactarnos. En breve un asesor te atenderá.";

    const prompt = `Actúa como la Secretaria IA personal de ${context.agentName}, de la inmobiliaria "Tráfico Inmobiliario".
    Tu objetivo es ser extremadamente servicial, profesional y persuasiva.
    
    Contexto del mensaje del cliente: "${message}"
    
    Instrucciones:
    1. Preséntate como el asistente inteligente de ${context.agentName}.
    2. Responde de forma cálida y profesional.
    3. Si el cliente pregunta por una propiedad, intenta agendar una breve llamada o visita.
    4. Usa un tono elegante pero cercano.
    5. No uses más de 3 párrafos.
    
    Respuesta de la IA:`;

    try {
      const result = await this.model.generateContent(prompt);
      const response = await result.response;
      return response.text();
    } catch (e) {
      return `Hola, soy el asistente de ${context.agentName}. Gracias por tu mensaje, lo revisaremos de inmediato.`;
    }
  }

  async suggestAction(message: string, context: any): Promise<{ action: 'NONE' | 'SCHEDULE_VISIT' | 'SEND_DETAILS', details?: any }> {
    if (!process.env.NEXT_PUBLIC_GEMINI_API_KEY) return { action: 'NONE' };

    const prompt = `Analiza el mensaje del cliente y determina la intención principal.
    
    Mensaje: "${message}"
    
    Opciones:
    - SCHEDULE_VISIT: El cliente quiere ver la propiedad o agendar una cita/llamada.
    - SEND_DETAILS: El cliente pide más fotos, ficha técnica o ubicación exacta.
    - NONE: Saludo, pregunta general o despedida.
    
    Responde ÚNICAMENTE en formato JSON:
    { "action": "OPCION", "reason": "por qué" }`;

    try {
      const result = await this.model.generateContent(prompt);
      const response = await result.response;
      const text = response.text().replace(/```json|```/g, "").trim();
      return JSON.parse(text);
    } catch (e) {
      return { action: 'NONE' };
    }
  }

  async checkSpam(message: string): Promise<{ isSpam: boolean; reason?: string }> {
    if (!process.env.NEXT_PUBLIC_GEMINI_API_KEY) return { isSpam: false };

    const prompt = `Actúa como un experto en seguridad digital. Analiza el siguiente mensaje de WhatsApp enviado a una inmobiliaria.
    Determina si es SPAM, Intento de Phishing, Ataque de Ingeniería Social o Lenguaje Ofensivo.
    
    Mensaje: "${message}"
    
    Responde en formato JSON:
    {
      "isSpam": boolean,
      "reason": "breve explicación si es spam"
    }`;

    try {
      const result = await this.model.generateContent(prompt);
      const response = await result.response;
      const text = response.text().replace(/```json|```/g, "").trim();
      return JSON.parse(text);
    } catch (e) {
      return { isSpam: false };
    }
  }
}

export const geminiAI = new GeminiAIService();
