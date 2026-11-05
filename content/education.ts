export type Education = {
  institution: string;
  degree: string;
  field?: string;
  start: string;
  end: string;
  url?: string;
};

export const education: Education[] = [
  {
    institution: "Istanbul Technical University",
    degree: "Bachelor's degree",
    field: "Computer Engineering",
    start: "2016",
    end: "2021",
    url: "https://www.itu.edu.tr",
  },
  {
    institution: "Çiğli Science High School",
    degree: "High school diploma",
    start: "2012",
    end: "2016",
  },
];
