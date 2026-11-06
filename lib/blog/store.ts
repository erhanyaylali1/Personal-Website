import "server-only";
import { isSupabaseConfigured } from "@/lib/supabase/server";
import * as memory from "./store-memory";
import * as supabase from "./store-supabase";

/*
  The app's only entry point to persistence.
  • SUPABASE_URL + SUPABASE_SECRET_KEY set → Supabase (Postgres + Storage)
  • otherwise                              → in-memory demo (lost on restart)
*/
export const usingDemoStore = !isSupabaseConfigured();

const impl = (usingDemoStore ? memory : supabase) as typeof memory;

if (usingDemoStore && process.env.NODE_ENV === "production" && process.env.NEXT_PHASE !== "phase-production-build") {
  console.warn("[blog] Supabase is not configured — using the in-memory demo store. Posts are lost on restart.");
}

export const {
  listPosts,
  findPostBySlug,
  findPostById,
  insertPost,
  updatePost,
  removePost,
  incrementViews,
  checkPassword,
  setPassword,
  getSessionVersion,
  getLoginLock,
  recordFailedLogin,
  clearLoginFailures,
  createUpload,
  saveLocalMedia,
  readLocalMedia,
} = impl;
