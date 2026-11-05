/**
 * Client-only helpers (they touch window/localStorage); the inline script string below is also used by the server layout.
 *
 * Cookie consent state (Google Consent Mode v2).
 * The default — everything denied — is set by `consentDefaultsScript` before any Google tag can load.
 */
export type Consent = "granted" | "denied";

const KEY = "cookie-consent";
const CHANGE_EVENT = "consent-change";
export const OPEN_SETTINGS_EVENT = "open-cookie-settings";

type Gtag = (...args: unknown[]) => void;
declare global {
  interface Window {
    gtag?: Gtag;
    dataLayer?: unknown[];
  }
}

export function readConsent(): Consent | null {
  try {
    const raw = JSON.parse(localStorage.getItem(KEY) ?? "null") as { value?: Consent } | null;
    return raw?.value === "granted" || raw?.value === "denied" ? raw.value : null;
  } catch {
    return null;
  }
}

export function writeConsent(value: Consent) {
  try {
    localStorage.setItem(KEY, JSON.stringify({ value, date: new Date().toISOString() }));
  } catch {}
  window.gtag?.("consent", "update", { analytics_storage: value });
  if (value === "denied") clearAnalyticsCookies();
  window.dispatchEvent(new Event(CHANGE_EVENT));
}

export function subscribeConsent(cb: () => void) {
  const onStorage = (e: StorageEvent) => e.key === KEY && cb();
  window.addEventListener(CHANGE_EVENT, cb);
  window.addEventListener("storage", onStorage); // keep other tabs in sync
  return () => {
    window.removeEventListener(CHANGE_EVENT, cb);
    window.removeEventListener("storage", onStorage);
  };
}

/** Remove Google Analytics cookies (_ga, _ga_<id>, _gid) on this host and its parent domain. */
function clearAnalyticsCookies() {
  const host = location.hostname;
  const domains = ["", host, `.${host.split(".").slice(-2).join(".")}`];
  for (const name of document.cookie.split(";").map((c) => c.split("=")[0].trim())) {
    if (!/^(_ga|_gid|_gat)/.test(name)) continue;
    for (const d of domains) {
      document.cookie = `${name}=; Max-Age=0; path=/${d ? `; domain=${d}` : ""}`;
    }
  }
}

/**
 * Inline <head> script: defines gtag, sets Consent Mode defaults to denied and
 * re-applies a previously granted choice — all before GTM can load.
 */
export const consentDefaultsScript = `(()=>{window.dataLayer=window.dataLayer||[];window.gtag=function(){dataLayer.push(arguments)};gtag("consent","default",{ad_storage:"denied",ad_user_data:"denied",ad_personalization:"denied",analytics_storage:"denied",functionality_storage:"granted",security_storage:"granted"});try{var c=JSON.parse(localStorage.getItem("${KEY}")||"null");if(c&&c.value==="granted")gtag("consent","update",{analytics_storage:"granted"})}catch(e){}})()`;
