
-- contact_messages: replace permissive INSERT, add explicit deny-SELECT
DROP POLICY IF EXISTS "Anyone can submit contact messages" ON public.contact_messages;

CREATE POLICY "Public can submit validated contact messages"
ON public.contact_messages
FOR INSERT
TO anon, authenticated
WITH CHECK (
  char_length(name) BETWEEN 1 AND 100
  AND char_length(email) BETWEEN 3 AND 255
  AND email ~* '^[^@\s]+@[^@\s]+\.[^@\s]+$'
  AND char_length(message) BETWEEN 1 AND 2000
  AND (subject IS NULL OR char_length(subject) <= 200)
  AND (source_page IS NULL OR char_length(source_page) <= 100)
);

CREATE POLICY "Deny read access to contact messages"
ON public.contact_messages
FOR SELECT
TO anon, authenticated
USING (false);

-- resource_interest: replace permissive INSERT, add explicit deny-SELECT
DROP POLICY IF EXISTS "Anyone can submit resource interest" ON public.resource_interest;

CREATE POLICY "Public can submit validated resource interest"
ON public.resource_interest
FOR INSERT
TO anon, authenticated
WITH CHECK (
  char_length(name) BETWEEN 1 AND 100
  AND char_length(email) BETWEEN 3 AND 255
  AND email ~* '^[^@\s]+@[^@\s]+\.[^@\s]+$'
  AND char_length(resource_slug) BETWEEN 1 AND 100
  AND char_length(resource_title) BETWEEN 1 AND 200
  AND char_length(interest_type) BETWEEN 1 AND 50
  AND (message_optional IS NULL OR char_length(message_optional) <= 2000)
  AND (source_page IS NULL OR char_length(source_page) <= 100)
);

CREATE POLICY "Deny read access to resource interest"
ON public.resource_interest
FOR SELECT
TO anon, authenticated
USING (false);
