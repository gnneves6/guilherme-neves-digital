import { supabase } from "@/integrations/supabase/client";

/**
 * Counting what the site does, without tracking who does it.
 *
 * Every design decision on this site so far has been made by reasoning: which
 * pages get read, where people stop, whether anybody follows the links we
 * argued about. All of it inferred, none of it known. That was affordable
 * while nobody was arriving, and stops being affordable the week a daily
 * posting habit starts pointing people here.
 *
 * Not a third-party analytics product, on purpose. Those set cookies, build
 * profiles across sites, and would put a consent banner on a site that has
 * just been stripped back. This writes four non-identifying facts into the
 * database that already exists, and `/privacy` describes it in the same words.
 *
 * The session id is a random value in `sessionStorage`, not a cookie and not
 * `localStorage`. It dies when the tab closes, is never shared with another
 * site, and is never attached to a name or an address. It exists for one
 * question: whether one person read five pages, or five people read one.
 *
 * Nothing here is allowed to matter. It never blocks a render, never throws
 * into the app, and a failed write is dropped in silence, because a counter
 * that can break the page is worse than no counter.
 */

const KEY = "gn_s";

const sessionId = (): string => {
  try {
    const existing = sessionStorage.getItem(KEY);
    if (existing) return existing;
    // Random, not derived from anything about the person or the device.
    const fresh =
      typeof crypto !== "undefined" && "randomUUID" in crypto
        ? crypto.randomUUID().replace(/-/g, "").slice(0, 24)
        : Math.random().toString(36).slice(2) + Date.now().toString(36);
    sessionStorage.setItem(KEY, fresh);
    return fresh;
  } catch {
    // Private mode, or storage blocked. Still count the view, just without
    // being able to group it, which is the right way round to fail.
    return "nostore" + Math.random().toString(36).slice(2, 10);
  }
};

/** Where they came from, at host level only. A full referrer can carry a
 *  private document's URL, and nothing here needs it. */
const refHost = (): string | null => {
  try {
    if (!document.referrer) return null;
    const host = new URL(document.referrer).hostname;
    return host && host !== window.location.hostname ? host.slice(0, 120) : null;
  } catch {
    return null;
  }
};

const widthBucket = (): "phone" | "tablet" | "desktop" => {
  const w = window.innerWidth;
  return w < 640 ? "phone" : w < 1024 ? "tablet" : "desktop";
};

/** Guards against the same path being written twice for one arrival, which
 *  React's development double-render and a hash-only change both cause. */
let last = "";

export const recordView = (path: string) => {
  if (import.meta.env.DEV) return;
  if (path === last) return;
  last = path;

  try {
    // `types.ts` is generated from the live schema and does not know about
    // `page_views` until the migration has been applied and the types are
    // regenerated. Casting the client here rather than hand-editing a
    // generated file, so the next regeneration overwrites nothing and this
    // line simply stops needing the cast.
    void (supabase as unknown as {
      from: (t: string) => {
        insert: (row: Record<string, unknown>) => PromiseLike<unknown>;
      };
    })
      .from("page_views")
      .insert({
        created_at: new Date().toISOString(),
        path: path.slice(0, 200),
        ref_host: refHost(),
        width_bucket: widthBucket(),
        session_id: sessionId(),
      })
      .then(
        () => undefined,
        () => undefined
      );
  } catch {
    /* counting is never worth an error */
  }
};
