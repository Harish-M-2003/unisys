import 'dotenv/config';
import { createClient } from '@supabase/supabase-js'

const supabaseUrl = process.env.SUPABASE_PUBLIC_URL
const supabaseKey = process.env.SUPABASE_ANON_KEY

export const supabase = createClient(supabaseUrl!, supabaseKey!)