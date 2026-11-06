import { tx, type Locale, type Text } from "@/lib/i18n";

export type Education = {
  institution: string;
  degree: string;
  field?: string;
  start: string;
  end: string;
  url?: string;
};

type Source = Omit<Education, "institution" | "degree" | "field"> & { institution: Text; degree: Text; field?: Text };

const education: Source[] = [
  {
    institution: { en: "Istanbul Technical University", tr: "İstanbul Teknik Üniversitesi" },
    degree: { en: "Bachelor's degree", tr: "Lisans" },
    field: { en: "Computer Engineering", tr: "Bilgisayar Mühendisliği" },
    start: "2016",
    end: "2021",
    url: "https://www.itu.edu.tr",
  },
  {
    institution: { en: "Çiğli Science High School", tr: "Çiğli Fen Lisesi" },
    degree: { en: "High school diploma", tr: "Lise diploması" },
    start: "2012",
    end: "2016",
  },
];

export const getEducation = (locale: Locale): Education[] =>
  education.map((e) => ({
    ...e,
    institution: tx(e.institution, locale),
    degree: tx(e.degree, locale),
    field: e.field && tx(e.field, locale),
  }));
