import "server-only";
import { createClient, type SupabaseClient } from "@supabase/supabase-js";

// Server-only client using the SECRET key. It bypasses Row Level Security, so it must never be
// imported from a Client Component ("server-only" above makes the build fail if that ever happens).

export const BLOG_MEDIA_BUCKET = "blog-media";

export function isSupabaseConfigured(): boolean {
  return Boolean(process.env.SUPABASE_URL && process.env.SUPABASE_SECRET_KEY);
}

let client: SupabaseClient | undefined;

export function supabaseAdmin(): SupabaseClient {
  if (!isSupabaseConfigured()) throw new Error("SUPABASE_URL / SUPABASE_SECRET_KEY are not set.");
  client ??= createClient(process.env.SUPABASE_URL!, process.env.SUPABASE_SECRET_KEY!, {
    auth: { persistSession: false, autoRefreshToken: false },
    // Never let Next.js store raw Supabase responses in its fetch/Data Cache: that cache outlives builds
    // and deployments and isn't cleared by updateTag(), so it served an empty post list after publishing.
    // Caching happens one level up, in lib/blog/queries.ts ("use cache" + cacheTag).
    global: { fetch: (input, init) => fetch(input, { ...init, cache: "no-store" }) },
  });
  return client;
}
