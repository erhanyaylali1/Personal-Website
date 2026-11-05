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

export const experience: Experience[] = [
  {
    company: "Accenture",
    role: "Senior Software Developer",
    location: "Istanbul, Turkey",
    start: "2024-12",
    end: null,
    highlights: [
      "Building dashboards on AWS services for a client's internal platform, on an infrastructure-as-code setup.",
      "Running the product fully in the cloud with Glue jobs, S3, Athena, Lambda and managed auth.",
    ],
    stack: ["Node.js", "Angular", "Docker", "Terraform", "AWS"],
  },
  {
    company: "Hesehus A/S",
    role: "Frontend Developer",
    location: "Odense, Denmark",
    start: "2022-07",
    end: "2024-12",
    highlights: [
      "Helped customers get better SEO results with user-friendly, accessible pages and high-quality, sustainable code.",
      "Weighed budget and scope to help customers plan their roadmap, analyse current problems and find solutions that fit.",
    ],
  },
  {
    company: "Orion Innovation",
    role: "Full Stack Developer",
    location: "Istanbul, Turkey",
    start: "2021-12",
    end: "2022-07",
  },
  {
    company: "Yapı Kredi Technology",
    role: "Full Stack Developer",
    location: "Istanbul, Turkey",
    start: "2021-07",
    end: "2021-12",
  },
  {
    company: "Ibtech",
    role: "Junior Full Stack Developer",
    location: "Gebze, Turkey",
    start: "2021-02",
    end: "2021-07",
  },
  {
    company: "Exhibin",
    role: "Front End Developer (Student)",
    location: "Istanbul, Turkey",
    start: "2020-09",
    end: "2020-12",
  },
  {
    company: "IBM",
    role: "AI Cloud Intern",
    location: "Istanbul, Turkey",
    start: "2020-07",
    end: "2020-08",
  },
];
