interface projectExp {
  [projectName: string]: {
    role?: string;
    details?: string[];
  };
}

export type JobExperience = {
  start_month: string;
  start_year: string;
  is_present?: boolean;
  finish_month?: string;
  finish_year?: string;
  company: string;
  career_level?: string;
  project: projectExp | string[];
};

export type imgData = {
  img: string;
  preview_img: string;
  title?: string;
};
