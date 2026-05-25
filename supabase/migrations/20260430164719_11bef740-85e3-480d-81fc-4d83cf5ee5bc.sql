
-- Contact messages table
CREATE TABLE public.contact_messages (
  id UUID NOT NULL DEFAULT gen_random_uuid() PRIMARY KEY,
  created_at TIMESTAMP WITH TIME ZONE NOT NULL DEFAULT now(),
  name TEXT NOT NULL,
  email TEXT NOT NULL,
  subject TEXT DEFAULT '',
  message TEXT NOT NULL,
  source_page TEXT DEFAULT 'contact'
);

ALTER TABLE public.contact_messages ENABLE ROW LEVEL SECURITY;

-- Allow anyone to insert (public contact form)
CREATE POLICY "Anyone can submit contact messages"
  ON public.contact_messages
  FOR INSERT
  TO anon, authenticated
  WITH CHECK (true);

-- Resource interest table
CREATE TABLE public.resource_interest (
  id UUID NOT NULL DEFAULT gen_random_uuid() PRIMARY KEY,
  created_at TIMESTAMP WITH TIME ZONE NOT NULL DEFAULT now(),
  name TEXT NOT NULL,
  email TEXT NOT NULL,
  resource_slug TEXT NOT NULL,
  resource_title TEXT NOT NULL,
  interest_type TEXT NOT NULL,
  message_optional TEXT,
  consent BOOLEAN NOT NULL DEFAULT false,
  source_page TEXT DEFAULT '/'
);

ALTER TABLE public.resource_interest ENABLE ROW LEVEL SECURITY;

-- Allow anyone to insert (public resource interest form)
CREATE POLICY "Anyone can submit resource interest"
  ON public.resource_interest
  FOR INSERT
  TO anon, authenticated
  WITH CHECK (true);
