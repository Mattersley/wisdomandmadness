import { createClient } from '@supabase/supabase-js'

const supabaseUrl = process.env.NEXT_PUBLIC_SUPABASE_URL || ''

const secretKey = process.env.SUPABASE_SECRET_KEY || ''
const publishableKey = process.env.NEXT_PUBLIC_SUPABASE_PUBLISHABLE_KEY || ''

export const supabasePublishableKey = publishableKey
const adminKey = secretKey

export const supabaseAdminKeySource = secretKey
  ? 'SUPABASE_SECRET_KEY'
  : null
export const supabasePublishableKeySource = publishableKey
  ? 'NEXT_PUBLIC_SUPABASE_PUBLISHABLE_KEY'
  : null

export const hasSupabaseAdminConfig = Boolean(supabaseUrl && adminKey)
export const hasSupabasePublicConfig = Boolean(
  supabaseUrl && supabasePublishableKey
)

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
