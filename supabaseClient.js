import AsyncStorage from '@react-native-async-storage/async-storage';
import {createClient} from '@supabase/supabase-js';
const supabaseUrl = 'https://bvwcceuikynazuyeuvqj.supabase.co';
const supabaseKey = process.env.SUPABASE_KEY;

const supabase = createClient(supabaseUrl, supabaseKey, {
  auth: {
    storage: AsyncStorage,
    autoRefreshToken: true,
    persistSession: true,
    detectSessionInUrl: false,
  },
});

export default supabase;
