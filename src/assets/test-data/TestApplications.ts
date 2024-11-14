import { IApplication } from "models/application";

export const TestIApplications: IApplication[] = [
  {
    status: "Applied",
    position: "Frontend Developer",
    company: "Google",
    seniority: "Mid",
    applied: new Date("2021-01-01"),
    employment_forms: ["Permanent", "B2B"],
    salaries: [
      { min: 5000, max: 7000, employment_form: "Permanent" },
      { min: 7000, max: 9000, employment_form: "B2B" },
    ],
    locations: ["Warsaw", "Remote"],
    mode: "Remote",
    days_in_office: 0,
    skills: ["React", "TypeScript", "Redux"],
    link: "https://www.google.com",
    notes: "Great company to work for",
  },
  {
    status: "Interview Scheduled",
    position: "Backend Developer",
    company: "Facebook",
    seniority: "Mid",
    applied: new Date("2021-02-01"),
    employment_forms: ["Permanent"],
    salaries: [{ min: 6000, max: 8000, employment_form: "Permanent" }],
    locations: ["Warsaw", "Remote"],
    mode: "Remote",
    days_in_office: 0,
    skills: ["Node.js", "Express", "MongoDB"],
    link: "https://www.facebook.com",
    notes: "Great company to work for",
  },
];

export const TestIApiApplications = TestIApplications.map((application, index) => ({ ...application, id: index + 1 }));
