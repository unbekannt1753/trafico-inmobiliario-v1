import { NextResponse } from 'next/server';
import { easyBroker } from '@/src/services/easybroker';
import { createClient } from '@supabase/supabase-js';

const supabaseUrl = process.env.NEXT_PUBLIC_SUPABASE_URL || 'https://placeholder.supabase.co';
const supabaseKey = process.env.SUPABASE_SERVICE_ROLE_KEY || process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY || 'placeholder';
const supabase = createClient(supabaseUrl, supabaseKey);

export async function POST(req: Request) {
  // Security check: Verify Authorization header
  const authHeader = req.headers.get('authorization');
  const syncSecret = process.env.SYNC_SECRET_KEY;

  if (!syncSecret || authHeader !== `Bearer ${syncSecret}`) {
    return NextResponse.json({ success: false, error: 'Unauthorized' }, { status: 401 });
  }

  try {
    const result = await easyBroker.syncWithSupabase(supabase);
    return NextResponse.json({ 
      success: true, 
      message: `Sincronización completada. ${result.processed} propiedades de ${result.total} procesadas.`,
      result 
    });
  } catch (error: any) {
    return NextResponse.json({ success: false, error: error.message }, { status: 500 });
  }
}
