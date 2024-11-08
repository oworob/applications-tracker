export interface IApplication {
  status: IApplicationStatus;
  position: string;
  company: string;
  seniority: IApplicationSeniority;
  applied: Date;
  employment_forms: IApplicationEmploymentForm[];
  salaries: IApplicationSalary[];
  locations: string[];
  mode: IApplicationMode;
  days_in_office: number;
  skills: string[];
  link: string;
  notes: string;
}

export interface IApplicationSalary {
  min: number;
  max: number;
  employment_form: IApplicationEmploymentForm;
}

export interface IApiApplication extends IApplication {
  id: number;
}

export type IApplicationStatus = "Applied" | "Interview Scheduled" | "Post Interview" | "Rejected" | "Offer" | "Accepted" | "Ghosted" | "Withdrawn";
export const ApplicationStatuses: IApplicationStatus[] = ["Applied", "Interview Scheduled", "Post Interview", "Rejected", "Offer", "Accepted", "Ghosted", "Withdrawn"];

export type IApplicationEmploymentForm = "Permanent" | "Mandate" | "B2B" | "Internship" | "Contract";
export const ApplicationEmploymentForms: IApplicationEmploymentForm[] = ["Permanent", "Mandate", "B2B", "Internship", "Contract"];

export type IApplicationSeniority = "Intern" | "Junior" | "Mid" | "Senior";
export const ApplicationSeniorities: IApplicationSeniority[] = ["Intern", "Junior", "Mid", "Senior"];

export type IApplicationMode = "Remote" | "Hybrid" | "Office";
export const ApplicationModes: IApplicationMode[] = ["Remote", "Hybrid", "Office"];
