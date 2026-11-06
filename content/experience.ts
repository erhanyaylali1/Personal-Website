import { tx, type Locale, type Localized, type Text } from "@/lib/i18n";

export type Experience = {
  company: string;
  role: string;
  location: string;
  /** ISO year-month, e.g. "2024-12" */
  start: string;
  /** ISO year-month, or null while current */
  end: string | null;
  highlights?: string[];
  stack?: string[];
};

type ExperienceSource = Omit<Experience, "role" | "location" | "highlights" | "stack"> & {
  role: Text;
  location: Text;
  highlights?: Localized<string[]>;
  stack?: Text[];
};

const istanbul: Text = { en: "Istanbul, Turkey", tr: "İstanbul, Türkiye" };

const source: ExperienceSource[] = [
  {
    company: "Accenture",
    role: { en: "Senior Software Developer", tr: "Kıdemli Yazılım Geliştirici" },
    location: istanbul,
    start: "2024-12",
    end: null,
    highlights: {
      en: [
        "Building data-driven analytics dashboards for an enterprise client's internal platform on AWS, with all infrastructure provisioned as code through Terraform.",
        "Running a fully cloud-native, serverless architecture: AWS Glue ETL jobs, Amazon S3 data storage, Amazon Athena queries, AWS Lambda functions and managed authentication.",
        "Delivering containerized Node.js services and an Angular frontend with Docker, keeping environments consistent from development to production.",
      ],
      tr: [
        "Kurumsal bir müşterinin iç platformu için AWS üzerinde veri odaklı analitik paneller geliştiriyorum; tüm altyapı Terraform ile kod olarak (Infrastructure as Code) yönetiliyor.",
        "Tamamen bulut tabanlı, sunucusuz (serverless) bir mimari işletiyorum: AWS Glue ETL işleri, Amazon S3 veri depolama, Amazon Athena sorguları, AWS Lambda fonksiyonları ve yönetilen kimlik doğrulama.",
        "Node.js servislerini ve Angular arayüzünü Docker ile container'laştırarak geliştirmeden canlı ortama kadar tutarlı ortamlar sağlıyorum.",
      ],
    },
    stack: ["Node.js", "Angular", "Docker", "Terraform", "AWS"],
  },
  {
    company: "Hesehus A/S",
    role: { en: "Frontend Developer", tr: "Frontend Geliştirici" },
    location: { en: "Odense, Denmark", tr: "Odense, Danimarka" },
    start: "2022-07",
    end: "2024-12",
    highlights: {
      en: [
        "Improved clients' search engine visibility by building fast, accessible and SEO-optimized web pages with semantic markup and a strong focus on Core Web Vitals.",
        "Wrote maintainable, scalable frontend code to a high quality standard, raising user experience and long-term sustainability across client projects.",
        "Advised clients on their digital roadmaps: analysed existing problems, balanced budget and scope, and proposed technical solutions that fit their business goals.",
      ],
      tr: [
        "Semantik HTML ve Core Web Vitals odağıyla hızlı, erişilebilir ve SEO uyumlu sayfalar geliştirerek müşterilerin arama motoru görünürlüğünü artırdım.",
        "Yüksek kalite standartlarında, sürdürülebilir ve ölçeklenebilir frontend kodu yazarak müşteri projelerinde kullanıcı deneyimini ve uzun vadeli bakım kolaylığını iyileştirdim.",
        "Müşterilere dijital yol haritaları konusunda danışmanlık verdim: mevcut sorunları analiz ettim, bütçe ve kapsamı dengeledim ve iş hedeflerine uygun teknik çözümler önerdim.",
      ],
    },
  },
  {
    company: "Orion Innovation",
    role: { en: "Full Stack Developer", tr: "Full Stack Geliştirici" },
    location: istanbul,
    start: "2021-12",
    end: "2022-07",
    highlights: {
      en: [
        "Built a company intelligence platform from the ground up on Google Cloud Platform, owning both the Node.js backend and the React frontend.",
        "Designed the data model in Firebase Cloud Firestore to store rich company profiles — founding date, CEO and leadership, headcount, revenue and other firmographic data.",
        "Integrated external data sources to enrich company records on demand, combining stored data with live lookups for a complete, searchable company profile.",
      ],
      tr: [
        "Google Cloud Platform üzerinde bir şirket bilgi platformunu (company intelligence) sıfırdan geliştirdim; hem Node.js backend'ini hem de React frontend'ini üstlendim.",
        "Kuruluş tarihi, CEO ve yönetim kadrosu, çalışan sayısı, gelir ve diğer firmografik verileri içeren kapsamlı şirket profilleri için Firebase Cloud Firestore'da veri modelini tasarladım.",
        "Şirket kayıtlarını anlık olarak zenginleştirmek için harici veri kaynaklarını entegre ettim; saklanan veriyi canlı sorgularla birleştirerek eksiksiz ve aranabilir şirket profilleri oluşturdum.",
      ],
    },
    stack: ["Node.js", "React", "Google Cloud Platform", "Firebase", "Firestore"],
  },
  {
    company: "Yapı Kredi Technology",
    role: { en: "Full Stack Developer", tr: "Full Stack Geliştirici" },
    location: istanbul,
    start: "2021-07",
    end: "2021-12",
    highlights: {
      en: [
        "Developed banking applications end to end, with React on the frontend and Java Spring services on the backend.",
        "Wrote comprehensive unit tests to keep code quality and reliability high in a regulated financial environment.",
        "Integrated the bank's proprietary internal tools and frameworks into new features, following enterprise banking standards.",
      ],
      tr: [
        "Frontend'de React, backend'de Java Spring servisleriyle bankacılık uygulamalarını uçtan uca geliştirdim.",
        "Regülasyona tabi bir finans ortamında kod kalitesini ve güvenilirliği yüksek tutmak için kapsamlı birim testleri (unit test) yazdım.",
        "Bankanın kuruma özel iç araçlarını ve framework'lerini, kurumsal bankacılık standartlarına uygun şekilde yeni özelliklere entegre ettim.",
      ],
    },
    stack: ["React", "Java", "Spring", { en: "Unit Testing", tr: "Birim Testi" }],
  },
  {
    company: "Ibtech",
    role: { en: "Junior Full Stack Developer", tr: "Junior Full Stack Geliştirici" },
    location: { en: "Gebze, Turkey", tr: "Gebze, Türkiye" },
    start: "2021-02",
    end: "2021-07",
    highlights: {
      en: [
        "Developed an internal HR management tool that streamlined human resources workflows and reduced manual work for HR teams.",
        "Built the backend with .NET and C# and the user interface with React, delivering features across the full stack.",
      ],
      tr: [
        "İK ekiplerinin iş akışlarını kolaylaştıran ve manuel iş yükünü azaltan, şirket içi bir insan kaynakları yönetim aracı geliştirdim.",
        "Backend'i .NET ve C# ile, kullanıcı arayüzünü React ile geliştirerek full-stack özellikler teslim ettim.",
      ],
    },
    stack: [".NET", "C#", "React"],
  },
  {
    company: "Exhibin",
    role: { en: "Front End Developer (Student)", tr: "Frontend Geliştirici (Öğrenci)" },
    location: istanbul,
    start: "2020-09",
    end: "2020-12",
    highlights: {
      en: [
        "Built a virtual trade fair platform where companies could host online exhibitions and live-stream events to their visitors.",
        "Focused on the frontend, developing interactive, responsive React interfaces for virtual booths and live broadcasts.",
      ],
      tr: [
        "Şirketlerin çevrim içi fuar düzenleyebildiği ve ziyaretçilerine canlı yayın yapabildiği bir sanal fuar platformu geliştirdim.",
        "Frontend tarafına odaklanarak sanal stantlar ve canlı yayınlar için React ile etkileşimli, responsive arayüzler geliştirdim.",
      ],
    },
    stack: ["React"],
  },
  {
    company: "IBM",
    role: { en: "AI Cloud Intern", tr: "Yapay Zeka ve Bulut Stajyeri" },
    location: istanbul,
    start: "2020-07",
    end: "2020-08",
    highlights: {
      en: [
        "Used IBM Cloud services to add monitoring, control and automation to the training process of language-model-based AI systems.",
      ],
      tr: [
        "IBM Cloud servislerini kullanarak dil modeli tabanlı yapay zeka sistemlerinin eğitim sürecine izleme, kontrol ve otomasyon kazandırdım.",
      ],
    },
    stack: ["IBM Cloud", { en: "AI / Machine Learning", tr: "Yapay Zeka / Makine Öğrenmesi" }],
  },
];

export const getExperience = (locale: Locale): Experience[] =>
  source.map((e) => ({
    ...e,
    role: tx(e.role, locale),
    location: tx(e.location, locale),
    highlights: e.highlights?.[locale],
    stack: e.stack?.map((s) => tx(s, locale)),
  }));
