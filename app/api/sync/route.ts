import { NextResponse } from 'next/server';
import { easyBroker } from '@/src/services/easybroker';
import { createClient } from '@supabase/supabase-js';
import { createHash, timingSafeEqual } from 'node:crypto';

const supabaseUrl = process.env.NEXT_PUBLIC_SUPABASE_URL || 'https://placeholder.supabase.co';
const supabaseKey = process.env.SUPABASE_SERVICE_ROLE_KEY || process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY || 'placeholder';
const supabase = createClient(supabaseUrl, supabaseKey);

/**
 * Constant-time string comparison to prevent timing attacks.
 * Hashes both strings with SHA-256 to ensure they have the same length before comparison.
 */
function safeCompare(a: string, b: string): boolean {
  const aHash = createHash('sha256').update(a).digest();
  const bHash = createHash('sha256').update(b).digest();
  return timingSafeEqual(aHash, bHash);
}

export async function POST(req: Request) {
  // Security check: Verify Authorization header
  const authHeader = req.headers.get('authorization') || '';
  const syncSecret = process.env.SYNC_SECRET_KEY;
  const expectedAuthHeader = `Bearer ${syncSecret}`;

  if (!syncSecret || !safeCompare(authHeader, expectedAuthHeader)) {
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
