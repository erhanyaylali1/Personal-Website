// Signed admin session cookie. Uses Web Crypto so it also runs in proxy.ts.
//
// Token: "<expiresAtMs>.<sessionVersion>.<hmac>". The version lets a password change invalidate
// every existing session (checked server-side in dal.ts).

export const SESSION_COOKIE = "ey_admin";
export const SESSION_TTL_MS = 12 * 60 * 60 * 1000;

const encoder = new TextEncoder();
const DEV_SECRET = "dev-only-secret-set-ADMIN_SESSION_SECRET-in-production";

/** Fails closed in production: without a real secret, nobody can sign in (and forged cookies can't pass). */
function secret(): string | null {
  const s = process.env.ADMIN_SESSION_SECRET;
  if (s && s.length >= 32) return s;
  return process.env.NODE_ENV === "production" ? null : DEV_SECRET;
}

export const isSessionSecretConfigured = () => secret() !== null;

async function hmac(key: string, payload: string): Promise<string> {
  const k = await crypto.subtle.importKey("raw", encoder.encode(key), { name: "HMAC", hash: "SHA-256" }, false, ["sign"]);
  const sig = await crypto.subtle.sign("HMAC", k, encoder.encode(payload));
  return btoa(String.fromCharCode(...new Uint8Array(sig))).replace(/\+/g, "-").replace(/\//g, "_").replace(/=+$/, "");
}

export async function createSessionToken(version: number): Promise<string> {
  const key = secret();
  if (!key) throw new Error("ADMIN_SESSION_SECRET is not set (min. 32 characters).");
  const payload = `${Date.now() + SESSION_TTL_MS}.${version}`;
  return `${payload}.${await hmac(key, payload)}`;
}

/** Returns the session version if the token is authentic and unexpired. */
export async function readSessionToken(token: string | undefined): Promise<number | null> {
  const key = secret();
  if (!token || !key) return null;
  const [exp, version, sig] = token.split(".");
  if (!exp || !version || !sig) return null;
  if (!(Number(exp) > Date.now())) return null;
  const expected = await hmac(key, `${exp}.${version}`);
  if (expected.length !== sig.length) return null;
  let diff = 0;
  for (let i = 0; i < sig.length; i++) diff |= expected.charCodeAt(i) ^ sig.charCodeAt(i);
  return diff === 0 ? Number(version) : null;
}
