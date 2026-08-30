-- Counting what the site does, without tracking who does it.
--
-- The site has been redesigned repeatedly on reasoning alone: no numbers, no
-- idea which pages are read, which links are followed or where people stop.
-- That is affordable while nobody is arriving. It stops being affordable the
-- week a daily posting habit starts pointing people here.
--
-- Deliberately not a third-party analytics product. Those set cookies, build
-- cross-site profiles, and would drag a consent banner onto a site that has
-- just been simplified. This stores four facts in the database that is already
-- here, none of which identify a person:
--
--   path          which page
--   ref_host      the host that sent them, never the full URL, so a private
--                 link someone pasted never lands in this table
--   width_bucket  desktop, tablet or phone, as a word rather than a number
--   session_id    a random value held in sessionStorage, which dies with the
--                 tab, is never shared across sites and is never linked to a
--                 person. It exists only to tell "one person read five pages"
--                 apart from "five people read one page"
--
-- No IP, no user agent, no cookie, no identifier that survives the visit.

CREATE TABLE IF NOT EXISTS public.page_views (
  id            bigserial PRIMARY KEY,
  created_at    timestamptz NOT NULL DEFAULT now(),
  path          text        NOT NULL,
  ref_host      text,
  width_bucket  text,
  session_id    text        NOT NULL
);

CREATE INDEX IF NOT EXISTS page_views_created_at_idx ON public.page_views (created_at DESC);
CREATE INDEX IF NOT EXISTS page_views_path_idx ON public.page_views (path);

ALTER TABLE public.page_views ENABLE ROW LEVEL SECURITY;

-- Same shape as the two form tables: the public may write a validated row and
-- may never read one back. The bounds are what stop this being an open text
-- endpoint for anybody who finds the publishable key.
CREATE POLICY "Public can record a validated page view"
ON public.page_views
FOR INSERT
TO anon, authenticated
WITH CHECK (
  char_length(path) BETWEEN 1 AND 200
  AND (ref_host IS NULL OR char_length(ref_host) <= 120)
  AND (width_bucket IS NULL OR width_bucket IN ('phone', 'tablet', 'desktop'))
  AND char_length(session_id) BETWEEN 8 AND 64
);

CREATE POLICY "Deny read access to page views"
ON public.page_views
FOR SELECT
TO anon, authenticated
USING (false);
