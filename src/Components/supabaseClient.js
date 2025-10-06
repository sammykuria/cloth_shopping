// src/supabaseClient.js
import { createClient } from '@supabase/supabase-js'

const supabaseUrl = "https://dqlljdecdykjxhtwyaqp.supabase.co"
const supabaseAnonKey = "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6ImRxbGxqZGVjZHlranhodHd5YXFwIiwicm9sZSI6ImFub24iLCJpYXQiOjE3NTk1OTczNTUsImV4cCI6MjA3NTE3MzM1NX0.rdDwBuydx8VUYK4PPs0_PA3ALmW_O94NQCDzv393V9Q"

export const supabase = createClient(supabaseUrl, supabaseAnonKey)
