import { createClient } from '@supabase/supabase-js'

const supabaseUrl = process.env.NEXT_PUBLIC_SUPABASE_URL || ''
// Uses the modern publishable string variable configuration
const publishableKey = process.env.NEXT_PUBLIC_SUPABASE_PUBLISHABLE_KEY || ''
// Uses the modern secret string variable configuration
const secretKey = process.env.SUPABASE_SECRET_KEY || ''

if (!supabaseUrl) {
  console.warn(
    '[SUPABASE] Warning: Target endpoint environment string is unassigned.'
  )
}

// Backend administrative client: bypasses RLS policies securely using the Secret Key
export const supabaseAdmin = createClient(
  supabaseUrl,
  secretKey || publishableKey,
  {
    auth: {
      persistSession: false,
      autoRefreshToken: false
    }
  }
)
