-- SQL Schema setup for Pravartak V2 saved roadmaps
-- Paste this script directly in the Supabase SQL Editor

CREATE TABLE IF NOT EXISTS public.saved_roadmaps (
  user_id UUID PRIMARY KEY REFERENCES auth.users(id) ON DELETE CASCADE,
  process_ids TEXT[] NOT NULL DEFAULT '{}'::TEXT[],
  updated_at TIMESTAMP WITH TIME ZONE DEFAULT TIMEZONE('utc'::text, NOW()) NOT NULL
);

-- Enable Row Level Security (RLS)
ALTER TABLE public.saved_roadmaps ENABLE ROW LEVEL SECURITY;

-- Select Policy (Read own data)
CREATE POLICY "Users can read their own saved roadmaps" 
  ON public.saved_roadmaps 
  FOR SELECT 
  TO authenticated
  USING (auth.uid() = user_id);

-- Insert Policy (Create own data)
CREATE POLICY "Users can insert their own saved roadmaps" 
  ON public.saved_roadmaps 
  FOR INSERT 
  TO authenticated
  WITH CHECK (auth.uid() = user_id);

-- Update Policy (Modify own data)
CREATE POLICY "Users can update their own saved roadmaps" 
  ON public.saved_roadmaps 
  FOR UPDATE 
  TO authenticated
  USING (auth.uid() = user_id)
  WITH CHECK (auth.uid() = user_id);
