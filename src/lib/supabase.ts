import { createClient } from '@supabase/supabase-js'

const supabaseUrl = process.env.NEXT_PUBLIC_SUPABASE_URL || ''
// Uses the modern secret string variable configuration
const adminKey =
  process.env.SUPABASE_SECRET_KEY || process.env.SUPABASE_SERVICE_ROLE_KEY || ''

export const hasSupabaseAdminConfig = Boolean(supabaseUrl && adminKey)

if (!supabaseUrl) {
  console.warn(
    '[SUPABASE] Warning: Target endpoint environment string is unassigned.'
  )
}

if (!adminKey) {
  console.warn(
    '[SUPABASE] Warning: Service role environment string is unassigned.'
  )
}

// Backend administrative client: bypasses RLS policies securely using the Secret Key
export const supabaseAdmin = hasSupabaseAdminConfig
  ? createClient(supabaseUrl, adminKey, {
      auth: {
        persistSession: false,
        autoRefreshToken: false
      }
    })
  : null
