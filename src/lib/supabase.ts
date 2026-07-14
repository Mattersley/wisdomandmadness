import { createClient } from '@supabase/supabase-js'

const supabaseUrl = process.env.NEXT_PUBLIC_SUPABASE_URL || ''

// Public publishable key for client-side interactions
export const supabasePublishableKey =
  process.env.NEXT_PUBLIC_SUPABASE_PUBLISHABLE_KEY || ''

// Private secret key for backend administrative access
const adminKey = process.env.SUPABASE_SECRET_KEY || ''

// Configuration safety flags
export const hasSupabaseAdminConfig = Boolean(supabaseUrl && adminKey)
export const hasSupabasePublicConfig = Boolean(
  supabaseUrl && supabasePublishableKey
)

// Missing configuration warnings
if (!supabaseUrl) {
  console.warn(
    '[SUPABASE] Warning: Target endpoint environment string is unassigned.'
  )
}

if (!adminKey) {
  console.warn(
    '[SUPABASE] Warning: Secret key environment string is unassigned.'
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
