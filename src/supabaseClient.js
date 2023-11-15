import { createClient } from "@supabase/supabase-js";

// const supabaseUrl = import.meta.env.VITE_SUPABASE_URL;
// const supabaseAnonKey = import.meta.env.VITE_SUPABASE_ANON_KEY;

const supabaseUrl = "https://wtshkfventeeyqafhdee.supabase.co";
const supabaseAnonKey =
  "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6Ind0c2hrZnZlbnRlZXlxYWZoZGVlIiwicm9sZSI6ImFub24iLCJpYXQiOjE3MDAwNjE2NDcsImV4cCI6MjAxNTYzNzY0N30.jAciFFmmcijkBEeGukJc_DtoLBafrjj9LA03MZvVSqg";
const supabase = createClient(supabaseUrl, supabaseAnonKey);
export default supabase;
