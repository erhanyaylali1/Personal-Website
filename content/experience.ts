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
      "Building data-driven analytics dashboards for an enterprise client's internal platform on AWS, with all infrastructure provisioned as code through Terraform.",
      "Running a fully cloud-native, serverless architecture: AWS Glue ETL jobs, Amazon S3 data storage, Amazon Athena queries, AWS Lambda functions and managed authentication.",
      "Delivering containerized Node.js services and an Angular frontend with Docker, keeping environments consistent from development to production.",
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
      "Improved clients' search engine visibility by building fast, accessible and SEO-optimized web pages with semantic markup and a strong focus on Core Web Vitals.",
      "Wrote maintainable, scalable frontend code to a high quality standard, raising user experience and long-term sustainability across client projects.",
      "Advised clients on their digital roadmaps: analysed existing problems, balanced budget and scope, and proposed technical solutions that fit their business goals.",
    ],
  },
  {
    company: "Orion Innovation",
    role: "Full Stack Developer",
    location: "Istanbul, Turkey",
    start: "2021-12",
    end: "2022-07",
    highlights: [
      "Built a company intelligence platform from the ground up on Google Cloud Platform, owning both the Node.js backend and the React frontend.",
      "Designed the data model in Firebase Cloud Firestore to store rich company profiles — founding date, CEO and leadership, headcount, revenue and other firmographic data.",
      "Integrated external data sources to enrich company records on demand, combining stored data with live lookups for a complete, searchable company profile.",
    ],
    stack: ["Node.js", "React", "Google Cloud Platform", "Firebase", "Firestore"],
  },
  {
    company: "Yapı Kredi Technology",
    role: "Full Stack Developer",
    location: "Istanbul, Turkey",
    start: "2021-07",
    end: "2021-12",
    highlights: [
      "Developed banking applications end to end, with React on the frontend and Java Spring services on the backend.",
      "Wrote comprehensive unit tests to keep code quality and reliability high in a regulated financial environment.",
      "Integrated the bank's proprietary internal tools and frameworks into new features, following enterprise banking standards.",
    ],
    stack: ["React", "Java", "Spring", "Unit Testing"],
  },
  {
    company: "Ibtech",
    role: "Junior Full Stack Developer",
    location: "Gebze, Turkey",
    start: "2021-02",
    end: "2021-07",
    highlights: [
      "Developed an internal HR management tool that streamlined human resources workflows and reduced manual work for HR teams.",
      "Built the backend with .NET and C# and the user interface with React, delivering features across the full stack.",
    ],
    stack: [".NET", "C#", "React"],
  },
  {
    company: "Exhibin",
    role: "Front End Developer (Student)",
    location: "Istanbul, Turkey",
    start: "2020-09",
    end: "2020-12",
    highlights: [
      "Built a virtual trade fair platform where companies could host online exhibitions and live-stream events to their visitors.",
      "Focused on the frontend, developing interactive, responsive React interfaces for virtual booths and live broadcasts.",
    ],
    stack: ["React"],
  },
  {
    company: "IBM",
    role: "AI Cloud Intern",
    location: "Istanbul, Turkey",
    start: "2020-07",
    end: "2020-08",
    highlights: [
      "Used IBM Cloud services to add monitoring, control and automation to the training process of language-model-based AI systems.",
    ],
    stack: ["IBM Cloud", "AI / Machine Learning"],
  },
];
