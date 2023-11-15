import { createClient } from "@supabase/supabase-js";

// const supabaseUrl = import.meta.env.VITE_SUPABASE_URL;
// const supabaseAnonKey = import.meta.env.VITE_SUPABASE_ANON_KEY;

const supabaseUrl = "https://qbhyakuxysxhrnpsifjz.supabase.co";
const supabaseAnonKey =
  "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6InFiaHlha3V4eXN4aHJucHNpZmp6Iiwicm9sZSI6ImFub24iLCJpYXQiOjE3MDAwNDg4MzEsImV4cCI6MjAxNTYyNDgzMX0.ompp7R2eEX4D72j9_FJR1m_Wep-CEHtOIUc8hMytxsg";
const supabase = createClient(supabaseUrl, supabaseAnonKey);
export default supabase;
