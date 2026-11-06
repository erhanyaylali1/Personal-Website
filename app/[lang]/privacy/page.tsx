import type { Metadata } from "next";
import { CookieSettingsButton } from "@/components/cookie-banner";
import { Container } from "@/components/ui/container";
import { getProfile } from "@/content/profile";
import { formatDate } from "@/lib/format";
import { languageAlternates, type Locale, type Localized } from "@/lib/i18n";
import { JsonLd, simplePageSchema } from "@/lib/jsonld";
import { getLocale } from "@/lib/locale";

const updated = "2026-11-06";

type Copy = {
  label: string;
  title: string;
  description: string;
  lastUpdated: string;
  sections: { id: string; heading: string; body: string[] }[];
};

function copy(locale: Locale): Copy {
  const p = getProfile(locale);
  const content: Localized<Copy> = {
    en: {
      label: "Legal",
      title: "Privacy policy",
      description: `How ${p.name}'s website uses cookies and analytics, and how to change your choice.`,
      lastUpdated: "Last updated",
      sections: [
        {
          id: "who-is-responsible",
          heading: "Who is responsible",
          body: [
            `This website is run by ${p.name}, ${p.location.city}, ${p.location.country}. For any privacy question, email ${p.email}.`,
          ],
        },
        {
          id: "analytics-cookies-only-with-your-consent",
          heading: "Analytics cookies — only with your consent",
          body: [
            "If you click “Accept”, the site loads Google Tag Manager and Google Analytics 4 to measure which pages are visited, roughly where visitors come from and which device types they use. Google Analytics then sets cookies such as _ga and _ga_<ID>.",
            "If you click “Decline”, or make no choice, none of these scripts load and no analytics cookies are set. Google Consent Mode defaults to “denied” before anything else runs.",
            "Analytics data is processed by Google and kept for the retention period configured in Google Analytics. Advertising features are not used: ad storage and personalisation stay denied in every case.",
          ],
        },
        {
          id: "stored-in-your-browser",
          heading: "Stored in your browser",
          body: [
            "Your theme preference (light or dark) and your cookie choice are saved in your browser's local storage. They never leave your device.",
          ],
        },
        {
          id: "legal-basis-and-your-rights",
          heading: "Legal basis and your rights",
          body: [
            "Analytics is based on your consent (GDPR Art. 6(1)(a); KVKK Art. 5). You can withdraw consent at any time — analytics stops immediately and its cookies are removed. You may also request access to, correction of or deletion of personal data by email.",
          ],
        },
        {
          id: "links-to-other-sites",
          heading: "Links to other sites",
          body: [
            "Project pages link to live demos and code on other domains (for example GitHub). Those sites have their own privacy policies.",
          ],
        },
      ],
    },
    tr: {
      label: "Yasal",
      title: "Gizlilik politikası",
      description: `${p.name} web sitesinin çerezleri ve analitiği nasıl kullandığı ve tercihinizi nasıl değiştirebileceğiniz.`,
      lastUpdated: "Son güncelleme",
      sections: [
        {
          id: "who-is-responsible",
          heading: "Sorumlu kişi",
          body: [
            `Bu web sitesi ${p.name} (${p.location.city}, ${p.location.country}) tarafından işletilmektedir. Gizlilikle ilgili tüm sorularınız için ${p.email} adresine e-posta gönderebilirsiniz.`,
          ],
        },
        {
          id: "analytics-cookies-only-with-your-consent",
          heading: "Analitik çerezler — yalnızca onayınızla",
          body: [
            "“Kabul et”e tıklarsanız site; hangi sayfaların ziyaret edildiğini, ziyaretçilerin yaklaşık olarak nereden geldiğini ve hangi cihaz türlerini kullandığını ölçmek için Google Tag Manager ve Google Analytics 4'ü yükler. Ardından Google Analytics, _ga ve _ga_<ID> gibi çerezler oluşturur.",
            "“Reddet”e tıklarsanız ya da herhangi bir seçim yapmazsanız bu betiklerin hiçbiri yüklenmez ve hiçbir analitik çerez oluşturulmaz. Google Consent Mode, başka hiçbir şey çalışmadan önce varsayılan olarak “reddedildi” durumuna ayarlanır.",
            "Analitik veriler Google tarafından işlenir ve Google Analytics'te yapılandırılan saklama süresi boyunca tutulur. Reklam özellikleri kullanılmaz: reklam amaçlı depolama ve kişiselleştirme her durumda kapalı kalır.",
          ],
        },
        {
          id: "stored-in-your-browser",
          heading: "Tarayıcınızda saklananlar",
          body: [
            "Tema tercihiniz (açık veya koyu) ve çerez tercihiniz tarayıcınızın yerel depolama alanında (local storage) saklanır. Bu bilgiler cihazınızdan hiçbir zaman çıkmaz.",
          ],
        },
        {
          id: "legal-basis-and-your-rights",
          heading: "Hukuki dayanak ve haklarınız",
          body: [
            "Analitik, açık rızanıza dayanır (GDPR md. 6(1)(a); KVKK md. 5). Onayınızı dilediğiniz zaman geri çekebilirsiniz — analitik hemen durur ve ilgili çerezler silinir. Ayrıca kişisel verilerinize erişim, bunların düzeltilmesi veya silinmesi talebinde e-posta yoluyla bulunabilirsiniz.",
          ],
        },
        {
          id: "links-to-other-sites",
          heading: "Diğer sitelere bağlantılar",
          body: [
            "Proje sayfaları, başka alan adlarındaki canlı demolara ve kaynak kodlara (örneğin GitHub) bağlantı verir. Bu sitelerin kendi gizlilik politikaları vardır.",
          ],
        },
      ],
    },
  };
  return content[locale];
}

export async function generateMetadata(): Promise<Metadata> {
  const locale = await getLocale();
  const { title, description } = copy(locale);
  const alternates = languageAlternates(locale, "/privacy");
  return {
    title,
    description,
    alternates,
    openGraph: { title: `${title} · ${getProfile(locale).name}`, description, url: alternates.canonical },
  };
}

export default async function PrivacyPage() {
  const locale = await getLocale();
  const c = copy(locale);
  return (
    <>
      <JsonLd data={simplePageSchema(locale, "/privacy", c.title, c.description, updated)} />
      <article className="py-16 sm:py-24">
        <Container>
          {/* Inner wrapper: Container already sets max-w-6xl, so a second max-w on it would conflict. */}
          <div className="max-w-[68ch]">
          <p className="font-mono text-xs tracking-[0.16em] text-fg-subtle uppercase">{c.label}</p>
          <h1 className="mt-4 text-h2 font-semibold text-fg">{c.title}</h1>
          <p className="mt-4 text-sm text-fg-muted">
            {c.lastUpdated} <time dateTime={updated}>{formatDate(updated, locale)}</time>
          </p>

          <div className="mt-12 space-y-10">
            {c.sections.map((s) => (
              <section key={s.id} aria-labelledby={s.id}>
                <h2 id={s.id} className="text-lg font-semibold tracking-tight text-fg">
                  {s.heading}
                </h2>
                {s.body.map((p) => (
                  <p key={p} className="mt-3 text-[16px] leading-[1.75] text-fg-muted">
                    {p}
                  </p>
                ))}
              </section>
            ))}
          </div>

          <div className="mt-12 border-t border-border pt-8">
            <CookieSettingsButton className="inline-flex h-11 cursor-pointer items-center rounded-full border border-border-strong px-5 text-sm font-medium text-fg transition-[background-color,border-color] duration-200 hover:border-fg/40 hover:bg-surface" />
          </div>
          </div>
        </Container>
      </article>
    </>
  );
}
