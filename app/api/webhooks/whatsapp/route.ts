import { NextResponse } from 'next/server';
import { createClient } from '@supabase/supabase-js';
import { services } from '@/src/services/factory';

const supabaseUrl = process.env.NEXT_PUBLIC_SUPABASE_URL || 'https://placeholder.supabase.co';
const supabaseKey = process.env.SUPABASE_SERVICE_ROLE_KEY || process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY || 'placeholder';
const supabase = createClient(supabaseUrl, supabaseKey);

/**
 * Endpoint para recibir Webhooks de Evolution API (WhatsApp)
 */
export async function POST(req: Request) {
  try {
    const body = await req.json();
    
    // Solo procesamos mensajes entrantes (type: 'messages-upsert' en Evolution API)
    if (body.event !== 'messages.upsert') {
      return NextResponse.json({ status: 'ignored' });
    }

    const messageData = body.data;
    const from = messageData.key.remoteJid.split('@')[0]; // Número de teléfono del cliente
    const text = messageData.message?.conversation || 
                 messageData.message?.extendedTextMessage?.text || "";

    if (!text) return NextResponse.json({ status: 'no_text' });

    // 1. Capa de Seguridad: Check Spam
    const spamCheck = await services.getAI().checkSpam(text);
    if (spamCheck.isSpam) {
      console.warn(`[Spam Detectado] De ${from}: ${spamCheck.reason}`);
      return NextResponse.json({ status: 'blocked', reason: spamCheck.reason });
    }

    // 2. Buscar o Crear Lead
    let { data: lead, error: leadError } = await supabase
      .from('leads')
      .select('*, agent:profiles(*)')
      .eq('phone', from)
      .single();

    if (leadError || !lead) {
      // Round-robin simple para asignar agente
      const { data: agents } = await supabase.from('profiles').select('id').eq('role', 'agent');
      const randomAgent = agents ? agents[Math.floor(Math.random() * agents.length)] : null;

      const { data: newLead, error: createError } = await supabase
        .from('leads')
        .insert({
          phone: from,
          full_name: 'Lead Nuevo',
          status: 'new',
          profiles_id: randomAgent?.id,
          interest_level: 50
        })
        .select('*, agent:profiles(*)')
        .single();
      
      if (createError) throw createError;
      lead = newLead;
    }

    // 3. Generar Respuesta con IA
    // Contexto para la IA
    const context = {
      agentName: lead.agent?.full_name || "un asesor de Tráfico Inmobiliario",
      lastInteractions: [] // Podríamos cargar el historial aquí
    };

    const aiResponse = await services.getAI().suggestPropertyResponse(text, context);
    const aiAction = await services.getAI().suggestAction(text, context);

    // 4. Enviar Respuesta por WhatsApp
    await services.getMessaging().sendMessage(from, aiResponse);

    // 5. Actualizar Lead y Acciones Automáticas
    const updateData: any = {
      last_contact_at: new Date(),
      status: 'active'
    };

    if (aiAction.action === 'SCHEDULE_VISIT') {
      updateData.status = 'interested';
      updateData.notes = (lead.notes || "") + "\n[IA] Solicitó agendar visita.";
    }

    await supabase.from('leads').update(updateData).eq('id', lead.id);

    return NextResponse.json({ status: 'success', response: aiResponse });

  } catch (error: any) {
    console.error("Webhook Error:", error);
    return NextResponse.json({ status: 'error', message: error.message }, { status: 500 });
  }
}
